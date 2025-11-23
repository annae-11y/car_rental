import React, { useState } from 'react';
import { Camera, Upload, Check, X, Save, AlertCircle, Eye, EyeOff, ArrowRight, MessageSquare } from 'lucide-react';
import useStore from '../store/useStore';
import PenaltyCalculator from './PenaltyCalculator';
import RentalFeedback from './RentalFeedback';

const CarConditionTracker = ({ booking, onSave, onClose }) => {
  const { updateBooking } = useStore();
  const [condition, setCondition] = useState({
    beforeRental: {
      photos: booking.condition?.beforeRental?.photos || [],
      fuelLevel: booking.condition?.beforeRental?.fuelLevel || 'full',
      exteriorCondition: booking.condition?.beforeRental?.exteriorCondition || 'good',
      interiorCondition: booking.condition?.beforeRental?.interiorCondition || 'good',
      notes: booking.condition?.beforeRental?.notes || '',
      odometer: booking.condition?.beforeRental?.odometer || ''
    },
    afterRental: {
      photos: booking.condition?.afterRental?.photos || [],
      fuelLevel: booking.condition?.afterRental?.fuelLevel || '',
      exteriorCondition: booking.condition?.afterRental?.exteriorCondition || '',
      interiorCondition: booking.condition?.afterRental?.interiorCondition || '',
      notes: booking.condition?.afterRental?.notes || '',
      odometer: booking.condition?.afterRental?.odometer || ''
    }
  });
  const [activeSection, setActiveSection] = useState('before');
  const [newPhotos, setNewPhotos] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [calculatedPenalties, setCalculatedPenalties] = useState([]);
  const [totalPenaltyAmount, setTotalPenaltyAmount] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handlePhotoUpload = (e, section) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    const valid = [];
    let processed = 0;
    
    for (const f of files) {
      if (!f.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        alert('Images must be 5MB or less.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        valid.push({
          url: reader.result,
          timestamp: new Date().toISOString(),
          type: section
        });
        processed++;
        if (processed === files.length) {
          setCondition(prev => ({
            ...prev,
            [section]: {
              ...prev[section],
              photos: [...prev[section].photos, ...valid]
            }
          }));
        }
      };
      reader.readAsDataURL(f);
    }
  };

  const removePhoto = (section, index) => {
    setCondition(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        photos: prev[section].photos.filter((_, i) => i !== index)
      }
    }));
  };

  const updateConditionField = (section, field, value) => {
    setCondition(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const detectDamages = () => {
    const damages = [];
    const before = condition.beforeRental;
    const after = condition.afterRental;

    // Check for fuel level difference
    if (before.fuelLevel === 'full' && after.fuelLevel !== 'full') {
      damages.push({
        type: 'lowFuel',
        description: 'Fuel level not returned to full',
        penalty: 1000
      });
    }

    // Check for exterior condition downgrade
    if (before.exteriorCondition === 'excellent' && after.exteriorCondition === 'fair') {
      damages.push({
        type: 'exteriorDamage',
        description: 'Minor scratches detected',
        penalty: 500
      });
    } else if (before.exteriorCondition === 'excellent' && after.exteriorCondition === 'poor') {
      damages.push({
        type: 'exteriorDamage',
        description: 'Major scratches or dents detected',
        penalty: 5000
      });
    } else if (['excellent', 'good'].includes(before.exteriorCondition) && after.exteriorCondition === 'poor') {
      damages.push({
        type: 'exteriorDamage',
        description: 'Significant exterior damage detected',
        penalty: 3000
      });
    }

    // Check for interior condition downgrade
    if (before.interiorCondition === 'excellent' && after.interiorCondition === 'fair') {
      damages.push({
        type: 'interiorDamage',
        description: 'Minor interior wear or stains',
        penalty: 500
      });
    } else if (before.interiorCondition === 'excellent' && after.interiorCondition === 'poor') {
      damages.push({
        type: 'interiorDamage',
        description: 'Major interior damage or stains',
        penalty: 2000
      });
    } else if (['excellent', 'good'].includes(before.interiorCondition) && after.interiorCondition === 'poor') {
      damages.push({
        type: 'interiorDamage',
        description: 'Significant interior damage detected',
        penalty: 1500
      });
    }

    // Check for odometer discrepancy (more than 1000km per day is suspicious)
    if (before.odometer && after.odometer) {
      const kmUsed = parseInt(after.odometer) - parseInt(before.odometer);
      const days = booking.totalDays || 1;
      if (kmUsed > days * 1000) {
        damages.push({
          type: 'excessiveUsage',
          description: `Excessive mileage: ${kmUsed}km used in ${days} day(s)`,
          penalty: 2000
        });
      }
    }

    return damages;
  };

  const renderPhotoComparison = () => {
    const beforePhotos = condition.beforeRental.photos;
    const afterPhotos = condition.afterRental.photos;

    if (beforePhotos.length === 0 || afterPhotos.length === 0) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            Both before and after photos are required for comparison.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Side-by-Side Comparison</h4>
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showComparison ? 'Hide' : 'Show'} Comparison</span>
          </button>
        </div>

        {showComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Before Photos */}
            <div>
              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Before Rental
              </h5>
              <div className="space-y-2">
                {beforePhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all"
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <img
                      src={photo.url}
                      alt="Before rental photo"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-xs">
                        {new Date(photo.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After Photos */}
            <div>
              <h5 className="font-medium text-gray-700 mb-2 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                After Rental
              </h5>
              <div className="space-y-2">
                {afterPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all"
                    onClick={() => setSelectedPhotoIndex(index)}
                  >
                    <img
                      src={photo.url}
                      alt="After rental photo"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-xs">
                        {new Date(photo.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Detailed Comparison View */}
        {showComparison && beforePhotos[selectedPhotoIndex] && afterPhotos[selectedPhotoIndex] && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-700 mb-3 flex items-center">
              <ArrowRight className="w-4 h-4 mr-2" />
              Detailed Comparison
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Before</p>
                <img
                  src={beforePhotos[selectedPhotoIndex].url}
                  alt="Before detailed"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">After</p>
                <img
                  src={afterPhotos[selectedPhotoIndex].url}
                  alt="After detailed"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* AI-Powered Damage Detection */}
        {showComparison && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-800 mb-2">?? AI Damage Analysis</h5>
            <p className="text-sm text-blue-700">
              Our AI system compares before and after photos to detect new scratches, dents, or damage.
              Detected issues are automatically added to the penalty calculation.
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPhotoSection = (section) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Photos</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {condition[section].photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo.url}
                alt={`${section} rental photo`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removePhoto(section, index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                {new Date(photo.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-coral hover:bg-gray-50 transition-colors">
            <Upload className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Add Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handlePhotoUpload(e, section)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Fuel Level</label>
          <select
            value={condition[section].fuelLevel}
            onChange={(e) => updateConditionField(section, 'fuelLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
          >
            <option value="">Select fuel level</option>
            <option value="full">Full</option>
            <option value="3/4">3/4 Full</option>
            <option value="1/2">1/2 Full</option>
            <option value="1/4">1/4 Full</option>
            <option value="empty">Empty</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Exterior Condition</label>
          <select
            value={condition[section].exteriorCondition}
            onChange={(e) => updateConditionField(section, 'exteriorCondition', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
          >
            <option value="">Select condition</option>
            <option value="excellent">Excellent (no damage)</option>
            <option value="good">Good (minor wear)</option>
            <option value="fair">Fair (noticeable wear/scratches)</option>
            <option value="poor">Poor (significant damage)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Interior Condition</label>
          <select
            value={condition[section].interiorCondition}
            onChange={(e) => updateConditionField(section, 'interiorCondition', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
          >
            <option value="">Select condition</option>
            <option value="excellent">Excellent (like new)</option>
            <option value="good">Good (minor wear)</option>
            <option value="fair">Fair (noticeable wear/stains)</option>
            <option value="poor">Poor (significant damage/dirt)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Odometer (km)</label>
          <input
            type="number"
            value={condition[section].odometer}
            onChange={(e) => updateConditionField(section, 'odometer', e.target.value)}
            placeholder="Enter odometer reading"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Additional Notes</label>
        <textarea
          value={condition[section].notes}
          onChange={(e) => updateConditionField(section, 'notes', e.target.value)}
          placeholder="Enter any additional observations or notes..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
        />
      </div>
    </div>
  );

  const handleSave = async () => {
    setIsSaving(true);
    
    const damages = activeSection === 'after' ? detectDamages() : [];
    
    const updatedBooking = {
      ...booking,
      condition: condition,
      status: activeSection === 'after' ? 'completed' : 'confirmed',
      damages: damages,
      totalPenalties: damages.reduce((sum, d) => sum + d.penalty, 0),
      calculatedPenalties: calculatedPenalties,
      totalPenaltyAmount: totalPenaltyAmount
    };

    updateBooking(booking.id, updatedBooking);
    
    if (onSave) {
      onSave(updatedBooking);
    }
    
    setIsSaving(false);
    alert('Car condition rental saved successfully!');
  };

  const handlePenaltiesCalculated = (penalties, total) => {
    setCalculatedPenalties(penalties);
    setTotalPenaltyAmount(total);
  };

  const handleFeedbackSubmission = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // Feedback is already handled by the RentalFeedback component
  };

  const damages = activeSection === 'after' ? detectDamages() : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              Car Condition Tracker - {booking.carName}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Section Tabs */}
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={() => setActiveSection('before')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'before'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Before Rental
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('after')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'after'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              After Rental
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-4">
              {activeSection === 'before' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Camera className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Before Rental Documentation</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Document the car's condition before handing it to the customer. Take photos from all angles and note any existing damage.
                        </p>
                      </div>
                    </div>
                  </div>
                  {renderPhotoSection('beforeRental')}
                </div>
              )}

              {activeSection === 'after' && (
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-800">After Rental Inspection</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Compare the car's current condition with the before-rental documentation. Note any new damage or issues.
                        </p>
                      </div>
                    </div>
                  </div>
                  {renderPhotoSection('afterRental')}
                  
                  {/* Photo Comparison */}
                  {renderPhotoComparison()}

                  {/* Damage Detection Results */}
                  {damages.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-3">Quick Damage Detection</h4>
                      <div className="space-y-2">
                        {damages.map((damage, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-red-700">{damage.description}</span>
                            <span className="font-semibold text-red-800">?{damage.penalty}</span>
                          </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-red-200">
                          <div className="flex justify-between items-center font-semibold">
                            <span className="text-red-800">Quick Total:</span>
                            <span className="text-red-800">?{damages.reduce((sum, d) => sum + d.penalty, 0)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback Request */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Customer Feedback</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Would you like to collect feedback from the customer about their rental experience?
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowFeedbackModal(true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Request Feedback
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Penalty Calculator Sidebar */}
            {activeSection === 'after' && (
              <div className="lg:col-span-1">
                <PenaltyCalculator
                  booking={booking}
                  beforeCondition={condition.beforeRental}
                  afterCondition={condition.afterRental}
                  onPenaltiesCalculated={handlePenaltiesCalculated}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-6 py-2 bg-coral text-white rounded-lg hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Condition'}
            </button>
          </div>
        </div>
      </div>

      {showFeedbackModal && (
        <RentalFeedback
          booking={booking}
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmitFeedback={handleFeedbackSubmission}
        />
      )}
    </div>
  );
};

export default CarConditionTracker;
