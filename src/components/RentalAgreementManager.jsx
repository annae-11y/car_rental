import React, { useState, useEffect } from 'react';
import { FileText, Save, Plus, Trash2 } from 'lucide-react';
import useStore from '../store/useStore';

const RentalAgreementManager = () => {
  const { currentUser, createRentalAgreement, updateRentalAgreement, getRentalAgreementByOwner } = useStore();
  const [agreement, setAgreement] = useState({
    usageRestriction: 'Biliran only',
    speedLimit: '60 km/h',
    fuelRequirement: 'full tank',
    prohibitedActivities: ['reckless driving', 'overloading', 'illegal activities'],
    cleanlinessRequirement: 'keep car clean and safe',
    penalties: {
      minorScratch: 500,
      lowFuel: 1000,
      majorDamage: 5000,
      cleaningFee: 500,
      lateReturn: 1000
    },
    additionalRules: []
  });
  const [newRule, setNewRule] = useState('');
  const [newPenalty, setNewPenalty] = useState({ name: '', amount: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const existingAgreement = getRentalAgreementByOwner(currentUser.id);
      if (existingAgreement) {
        setAgreement(existingAgreement);
        setIsEditing(true);
      }
    }
  }, [currentUser, getRentalAgreementByOwner]);

  const handleSave = () => {
    if (!currentUser) return;

    const agreementData = {
      ...agreement,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
    };

    if (isEditing) {
      updateRentalAgreement(agreement.id, agreementData);
    } else {
      createRentalAgreement(agreementData);
    }
    alert('Rental agreement saved successfully!');
  };

  const addRule = () => {
    if (newRule.trim()) {
      setAgreement(prev => ({
        ...prev,
        additionalRules: [...prev.additionalRules, newRule.trim()]
      }));
      setNewRule('');
    }
  };

  const removeRule = (index) => {
    setAgreement(prev => ({
      ...prev,
      additionalRules: prev.additionalRules.filter((_, i) => i !== index)
    }));
  };

  const addPenalty = () => {
    if (newPenalty.name.trim() && newPenalty.amount) {
      setAgreement(prev => ({
        ...prev,
        penalties: {
          ...prev.penalties,
          [newPenalty.name.replace(/\s+/g, '')]: parseInt(newPenalty.amount)
        }
      }));
      setNewPenalty({ name: '', amount: '' });
    }
  };

  const removePenalty = (penaltyName) => {
    const updatedPenalties = { ...agreement.penalties };
    delete updatedPenalties[penaltyName];
    setAgreement(prev => ({ ...prev, penalties: updatedPenalties }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-2" />
          Rental Agreement Configuration
        </h2>
      </div>

      <div className="space-y-6">
        {/* Usage Restrictions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Usage Restrictions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Geographic Restriction</label>
              <input
                type="text"
                value={agreement.usageRestriction}
                onChange={(e) => setAgreement(prev => ({ ...prev, usageRestriction: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Speed Limit</label>
              <input
                type="text"
                value={agreement.speedLimit}
                onChange={(e) => setAgreement(prev => ({ ...prev, speedLimit: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Fuel and Cleanliness Requirements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Fuel Requirement</label>
              <input
                type="text"
                value={agreement.fuelRequirement}
                onChange={(e) => setAgreement(prev => ({ ...prev, fuelRequirement: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Cleanliness Requirement</label>
              <input
                type="text"
                value={agreement.cleanlinessRequirement}
                onChange={(e) => setAgreement(prev => ({ ...prev, cleanlinessRequirement: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Prohibited Activities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Prohibited Activities</h3>
          <div className="space-y-2">
            {agreement.prohibitedActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => {
                    const updated = [...agreement.prohibitedActivities];
                    updated[index] = e.target.value;
                    setAgreement(prev => ({ ...prev, prohibitedActivities: updated }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    setAgreement(prev => ({
                      ...prev,
                      prohibitedActivities: prev.prohibitedActivities.filter((_, i) => i !== index)
                    }));
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAgreement(prev => ({ ...prev, prohibitedActivities: [...prev.prohibitedActivities, ''] }))}
              className="flex items-center text-coral hover:text-red-600 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Prohibited Activity
            </button>
          </div>
        </div>

        {/* Additional Rules */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Additional Rules</h3>
          <div className="space-y-2">
            {agreement.additionalRules.map((rule, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => {
                    const updated = [...agreement.additionalRules];
                    updated[index] = e.target.value;
                    setAgreement(prev => ({ ...prev, additionalRules: updated }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add new rule..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
              <button
                type="button"
                onClick={addRule}
                className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-red-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Penalties */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Penalty Structure (in PHP)</h3>
          <div className="space-y-2">
            {Object.entries(agreement.penalties).map(([name, amount]) => (
              <div key={name} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={name.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAgreement(prev => ({
                      ...prev,
                      penalties: { ...prev.penalties, [name]: parseInt(e.target.value) || 0 }
                    }));
                  }}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removePenalty(name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newPenalty.name}
                onChange={(e) => setNewPenalty(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Penalty name..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
              <input
                type="number"
                value={newPenalty.amount}
                onChange={(e) => setNewPenalty(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Amount..."
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
              />
              <button
                type="button"
                onClick={addPenalty}
                className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-red-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-coral text-white rounded-lg hover:bg-red-600 font-medium"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalAgreementManager;
