import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-softwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-coral hover:text-red-500 mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-2">
            Terms & <span className="text-coral">Conditions</span>
          </h1>
          <p className="text-gray-600">Please read these terms carefully before using Elite Drive</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Usage Limitations */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-coral flex-shrink-0" />
              <h2 className="text-2xl font-poppins font-bold text-charcoal">Usage Limitations</h2>
            </div>
            <div className="space-y-4 text-gray-700 ml-9">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Speed Limits</h3>
                <p>Renters must adhere to all posted speed limits and traffic regulations. Exceeding speed limits may result in fines and penalties.</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Allowed Destinations</h3>
                <p>Vehicles may only be used within Biliran province and surrounding areas. Off-road use, mountain passes, or unpaved roads are strictly prohibited unless explicitly authorized by the owner.</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Driving Restrictions</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>No driving under the influence of alcohol or drugs</li>
                  <li>No reckless or aggressive driving</li>
                  <li>No racing or stunt driving</li>
                  <li>No towing or carrying excessive loads</li>
                  <li>No commercial use without prior authorization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Passenger Limits</h3>
                <p>Do not exceed the vehicle's maximum passenger capacity as specified in the booking details.</p>
              </div>
            </div>
          </section>

          {/* Condition of the Car */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-coral flex-shrink-0" />
              <h2 className="text-2xl font-poppins font-bold text-charcoal">Condition of the Car</h2>
            </div>
            <div className="space-y-4 text-gray-700 ml-9">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Pre-Rental Inspection</h3>
                <p>Renters must inspect the vehicle before departure and report any existing damage or issues to the owner immediately. Damage not reported may be charged to the renter.</p>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Maintenance Requirements</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Keep the vehicle clean and in good condition</li>
                  <li>Do not modify or tamper with vehicle systems</li>
                  <li>Report mechanical issues immediately</li>
                  <li>Refuel the vehicle to the same level as pickup</li>
                  <li>Return the vehicle on time</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Return Condition</h3>
                <p>The vehicle must be returned in the same condition as it was rented, with normal wear and tear excepted. Excessive dirt, stains, or odors may result in cleaning charges.</p>
              </div>
            </div>
          </section>

          {/* Fines and Penalties */}
          <section>
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-coral flex-shrink-0" />
              <h2 className="text-2xl font-poppins font-bold text-charcoal">Fines & Penalties</h2>
            </div>
            <div className="space-y-4 text-gray-700 ml-9">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">Damage Charges</h3>
                <ul className="list-disc list-inside space-y-1 text-red-800">
                  <li>Minor scratches/dents: ₱500 - ₱2,000</li>
                  <li>Broken windows/mirrors: ₱2,000 - ₱5,000</li>
                  <li>Interior damage: ₱1,000 - ₱3,000</li>
                  <li>Major structural damage: Full repair cost</li>
                  <li>Total loss: Full vehicle value</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Late Return Charges</h3>
                <ul className="list-disc list-inside space-y-1 text-orange-800">
                  <li>1-2 hours late: 50% of daily rate</li>
                  <li>2-4 hours late: 100% of daily rate</li>
                  <li>More than 4 hours: Full day charge + ₱500 penalty</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Traffic Violations</h3>
                <ul className="list-disc list-inside space-y-1 text-yellow-800">
                  <li>Speeding ticket: Renter responsible for full fine</li>
                  <li>Parking violation: Renter responsible for full fine</li>
                  <li>Traffic accident: Renter responsible for damages</li>
                  <li>Administrative fee: ₱500 per violation</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Fuel & Cleaning</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Fuel not refilled: ₱50 per liter + ₱200 service fee</li>
                  <li>Excessive dirt/stains: ₱500 - ₱2,000 cleaning fee</li>
                  <li>Odor removal: ₱1,000 - ₱3,000</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Cancellation Policy</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Renter Cancellation</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>More than 7 days before: Full refund</li>
                  <li>3-7 days before: 50% refund</li>
                  <li>Less than 3 days before: No refund</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Owner Cancellation</h3>
                <p>If the owner cancels, the renter receives a full refund plus ₱500 compensation.</p>
              </div>
            </div>
          </section>

          {/* Insurance & Liability */}
          <section>
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Insurance & Liability</h2>
            <div className="space-y-4 text-gray-700">
              <p>All vehicles are covered by basic insurance. Renters are responsible for:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Deductible amounts (typically ₱5,000 - ₱10,000)</li>
                <li>Damages caused by reckless driving</li>
                <li>Traffic violations and fines</li>
                <li>Theft or loss of vehicle</li>
              </ul>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-poppins font-bold text-charcoal mb-4">Dispute Resolution</h2>
            <div className="space-y-4 text-gray-700">
              <p>In case of disputes between renters and owners:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Contact Elite Drive support within 48 hours</li>
                <li>Provide evidence (photos, videos, receipts)</li>
                <li>Elite Drive will review and make a decision within 7 days</li>
                <li>Decision is final and binding</li>
              </ol>
            </div>
          </section>

          {/* Acceptance */}
          <div className="bg-coral bg-opacity-10 border-2 border-coral rounded-lg p-6 mt-8">
            <h3 className="font-semibold text-charcoal mb-2">By using Elite Drive, you agree to:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Follow all usage limitations and restrictions</li>
              <li>Maintain the vehicle in good condition</li>
              <li>Pay all applicable fines and penalties</li>
              <li>Comply with all traffic laws</li>
              <li>Accept liability for damages and violations</li>
            </ul>
          </div>

          {/* Last Updated */}
          <div className="text-center text-sm text-gray-500 pt-8 border-t">
            <p>Last updated: November 2025</p>
            <p>For questions, contact: support@elitedrive.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
