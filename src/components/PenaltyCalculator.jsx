import React, { useState } from 'react';
import { Calculator, AlertCircle, CheckCircle, Clock, TrendingUp, FileText, Download } from 'lucide-react';

const PenaltyCalculator = ({ booking, beforeCondition, afterCondition, onPenaltiesCalculated }) => {
  const [penalties, setPenalties] = useState([]);
  const [totalPenalty, setTotalPenalty] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Standard penalty rates
  const PENALTY_RATES = {
    // Fuel penalties
    FUEL_FULL_NOT_RETURNED: 1000,
    FUEL_3QTR_NOT_RETURNED: 750,
    FUEL_HALF_NOT_RETURNED: 500,
    FUEL_1QTR_NOT_RETURNED: 250,
    
    // Exterior damage penalties
    EXTERIOR_MINOR_SCRATCHES: 500,
    EXTERIOR_MAJOR_SCRATCHES: 2000,
    EXTERIOR_DENTS: 3000,
    EXTERIOR_BROKEN_PARTS: 5000,
    
    // Interior damage penalties
    INTERIOR_MINOR_STAINS: 500,
    INTERIOR_MAJOR_STAINS: 1500,
    INTERIOR_TEAR_DAMAGE: 2000,
    INTERIOR_BROKEN_COMPONENTS: 3000,
    
    // Usage penalties
    EXCESSIVE_MILEAGE_PER_KM: 5,
    LATE_RETURN_PER_HOUR: 200,
    SMOKING_VIOLATION: 3000,
    PET_VIOLATION: 1500,
    
    // Cleaning penalties
    INTERIOR_CLEANING_REQUIRED: 1000,
    EXTERIOR_CLEANING_REQUIRED: 500,
    
    // Document penalties
    MISSING_DOCUMENTS: 2000,
    DAMAGED_DOCUMENTS: 1000,
    
    // Additional fees
    ADMINISTRATION_FEE: 300,
    PROCESSING_FEE: 150
  };

  const calculateFuelPenalty = (beforeFuel, afterFuel) => {
    const fuelLevels = ['full', '3/4', '1/2', '1/4', 'empty'];
    const beforeIndex = fuelLevels.indexOf(beforeFuel);
    const afterIndex = fuelLevels.indexOf(afterFuel);
    
    if (beforeIndex === -1 || afterIndex === -1 || afterIndex >= beforeIndex) {
      return 0;
    }
    
    const fuelPenalties = [
      PENALTY_RATES.FUEL_FULL_NOT_RETURNED,
      PENALTY_RATES.FUEL_3QTR_NOT_RETURNED,
      PENALTY_RATES.FUEL_HALF_NOT_RETURNED,
      PENALTY_RATES.FUEL_1QTR_NOT_RETURNED
    ];
    
    return fuelPenalties[beforeIndex] || 0;
  };

  const calculateConditionPenalty = (beforeCondition, afterCondition, type) => {
    const conditionLevels = ['excellent', 'good', 'fair', 'poor'];
    const beforeIndex = conditionLevels.indexOf(beforeCondition);
    const afterIndex = conditionLevels.indexOf(afterCondition);
    
    if (beforeIndex === -1 || afterIndex === -1 || afterIndex <= beforeIndex) {
      return 0;
    }
    
    const severity = afterIndex - beforeIndex;
    
    if (type === 'exterior') {
      if (severity === 1) return PENALTY_RATES.EXTERIOR_MINOR_SCRATCHES;
      if (severity === 2) return PENALTY_RATES.EXTERIOR_MAJOR_SCRATCHES;
      if (severity === 3) return PENALTY_RATES.EXTERIOR_BROKEN_PARTS;
    } else if (type === 'interior') {
      if (severity === 1) return PENALTY_RATES.INTERIOR_MINOR_STAINS;
      if (severity === 2) return PENALTY_RATES.INTERIOR_MAJOR_STAINS;
      if (severity === 3) return PENALTY_RATES.INTERIOR_BROKEN_COMPONENTS;
    }
    
    return 0;
  };

  const calculateMileagePenalty = (beforeOdometer, afterOdometer, rentalDays) => {
    if (!beforeOdometer || !afterOdometer) return 0;
    
    const beforeKm = parseInt(beforeOdometer);
    const afterKm = parseInt(afterOdometer);
    const kmUsed = afterKm - beforeKm;
    
    // Allow 300km per day as reasonable usage
    const allowedKm = rentalDays * 300;
    const excessKm = Math.max(0, kmUsed - allowedKm);
    
    return excessKm * PENALTY_RATES.EXCESSIVE_MILEAGE_PER_KM;
  };

  const calculateLateReturnPenalty = (scheduledReturn, actualReturn) => {
    if (!scheduledReturn || !actualReturn) return 0;
    
    const scheduled = new Date(scheduledReturn);
    const actual = new Date(actualReturn);
    const hoursLate = Math.max(0, (actual - scheduled) / (1000 * 60 * 60));
    
    return Math.ceil(hoursLate) * PENALTY_RATES.LATE_RETURN_PER_HOUR;
  };

  const detectAdditionalViolations = (notes) => {
    const violations = [];
    const lowerNotes = notes.toLowerCase();
    
    if (lowerNotes.includes('smoke') || lowerNotes.includes('cigarette')) {
      violations.push({
        type: 'smoking',
        description: 'Evidence of smoking in vehicle',
        penalty: PENALTY_RATES.SMOKING_VIOLATION
      });
    }
    
    if (lowerNotes.includes('pet') || lowerNotes.includes('animal') || lowerNotes.includes('dog') || lowerNotes.includes('cat')) {
      violations.push({
        type: 'pet',
        description: 'Pet transported without authorization',
        penalty: PENALTY_RATES.PET_VIOLATION
      });
    }
    
    if (lowerNotes.includes('dirty') || lowerNotes.includes('mess') || lowerNotes.includes('trash')) {
      violations.push({
        type: 'cleaning',
        description: 'Vehicle requires professional cleaning',
        penalty: PENALTY_RATES.INTERIOR_CLEANING_REQUIRED
      });
    }
    
    return violations;
  };

  const calculateAllPenalties = () => {
    const calculatedPenalties = [];
    let total = 0;

    // Fuel penalty
    const fuelPenalty = calculateFuelPenalty(beforeCondition.fuelLevel, afterCondition.fuelLevel);
    if (fuelPenalty > 0) {
      calculatedPenalties.push({
        type: 'fuel',
        description: `Fuel not returned to ${beforeCondition.fuelLevel} tank`,
        penalty: fuelPenalty,
        category: 'Fuel'
      });
      total += fuelPenalty;
    }

    // Exterior condition penalty
    const exteriorPenalty = calculateConditionPenalty(beforeCondition.exteriorCondition, afterCondition.exteriorCondition, 'exterior');
    if (exteriorPenalty > 0) {
      calculatedPenalties.push({
        type: 'exterior',
        description: `Exterior damage detected (${beforeCondition.exteriorCondition} → ${afterCondition.exteriorCondition})`,
        penalty: exteriorPenalty,
        category: 'Damage'
      });
      total += exteriorPenalty;
    }

    // Interior condition penalty
    const interiorPenalty = calculateConditionPenalty(beforeCondition.interiorCondition, afterCondition.interiorCondition, 'interior');
    if (interiorPenalty > 0) {
      calculatedPenalties.push({
        type: 'interior',
        description: `Interior damage detected (${beforeCondition.interiorCondition} → ${afterCondition.interiorCondition})`,
        penalty: interiorPenalty,
        category: 'Damage'
      });
      total += interiorPenalty;
    }

    // Mileage penalty
    const mileagePenalty = calculateMileagePenalty(beforeCondition.odometer, afterCondition.odometer, booking.totalDays || 1);
    if (mileagePenalty > 0) {
      calculatedPenalties.push({
        type: 'mileage',
        description: `Excessive mileage charge`,
        penalty: mileagePenalty,
        category: 'Usage'
      });
      total += mileagePenalty;
    }

    // Late return penalty
    const latePenalty = calculateLateReturnPenalty(booking.returnDate, booking.actualReturnDate);
    if (latePenalty > 0) {
      calculatedPenalties.push({
        type: 'late',
        description: `Late return charge`,
        penalty: latePenalty,
        category: 'Time'
      });
      total += latePenalty;
    }

    // Additional violations from notes
    const afterViolations = detectAdditionalViolations(afterCondition.notes || '');
    calculatedPenalties.push(...afterViolations);
    total += afterViolations.reduce((sum, v) => sum + v.penalty, 0);

    // Add administration fee if there are any penalties
    if (total > 0) {
      calculatedPenalties.push({
        type: 'admin',
        description: 'Administration fee',
        penalty: PENALTY_RATES.ADMINISTRATION_FEE,
        category: 'Fees'
      });
      total += PENALTY_RATES.ADMINISTRATION_FEE;
    }

    setPenalties(calculatedPenalties);
    setTotalPenalty(total);
    
    if (onPenaltiesCalculated) {
      onPenaltiesCalculated(calculatedPenalties, total);
    }
  };

  const generatePenaltyReport = () => {
    const report = {
      bookingId: booking.id,
      carName: booking.carName,
      renterName: booking.renterDetails?.fullName || 'N/A',
      rentalPeriod: `${booking.pickupDate} to ${booking.returnDate}`,
      totalDays: booking.totalDays,
      penalties: penalties,
      totalPenalty: totalPenalty,
      calculatedAt: new Date().toISOString(),
      beforeCondition: beforeCondition,
      afterCondition: afterCondition
    };
    
    return report;
  };

  const downloadReport = () => {
    const report = generatePenaltyReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `penalty-report-${booking.id}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  React.useEffect(() => {
    if (beforeCondition && afterCondition) {
      calculateAllPenalties();
    }
  }, [beforeCondition, afterCondition]);

  const groupedPenalties = penalties.reduce((groups, penalty) => {
    if (!groups[penalty.category]) {
      groups[penalty.category] = [];
    }
    groups[penalty.category].push(penalty);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calculator className="w-6 h-6 text-coral" />
          <h3 className="text-xl font-semibold text-gray-800">Penalty Calculation</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-coral hover:text-red-600"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Penalties</p>
            <p className="text-2xl font-bold text-gray-800">₱{totalPenalty.toLocaleString()}</p>
          </div>
          <div className={`p-3 rounded-full ${totalPenalty > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
            {totalPenalty > 0 ? (
              <AlertCircle className="w-6 h-6 text-red-600" />
            ) : (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && penalties.length > 0 && (
        <div className="space-y-4">
          {Object.entries(groupedPenalties).map(([category, categoryPenalties]) => (
            <div key={category} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-3">{category}</h4>
              <div className="space-y-2">
                {categoryPenalties.map((penalty, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{penalty.description}</span>
                    <span className="font-medium text-gray-800">₱{penalty.penalty.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Penalties Message */}
      {penalties.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-medium">No penalties detected</p>
          <p className="text-green-700 text-sm mt-1">Vehicle returned in good condition</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
        <button
          onClick={calculateAllPenalties}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Recalculate
        </button>
        {penalties.length > 0 && (
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-red-600"
          >
            <Download className="w-4 h-4 inline mr-2" />
            Download Report
          </button>
        )}
      </div>
    </div>
  );
};

export default PenaltyCalculator;
