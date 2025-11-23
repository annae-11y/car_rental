import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, DollarSign } from 'lucide-react';

const Fines = () => {
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
            Fines & <span className="text-coral">Penalties</span>
          </h1>
          <p className="text-gray-600">Understanding charges and penalties for Elite Drive rentals</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Warning */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
                <p className="text-red-800">All fines and penalties are charged to the renter's account. Unpaid fines may result in account suspension and legal action.</p>
              </div>
            </div>
          </div>

          {/* Damage Charges */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <DollarSign className="w-8 h-8 text-coral" />
              <h2 className="text-3xl font-poppins font-bold text-charcoal">Damage Charges</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3 text-lg">Minor Damage</h3>
                <ul className="space-y-2 text-red-800">
                  <li className="flex justify-between">
                    <span>Small scratches</span>
                    <span className="font-bold">₱500 - ₱1,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Small dents</span>
                    <span className="font-bold">₱800 - ₱1,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Paint chips</span>
                    <span className="font-bold">₱300 - ₱800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tire damage</span>
                    <span className="font-bold">₱2,000 - ₱3,500</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 mb-3 text-lg">Moderate Damage</h3>
                <ul className="space-y-2 text-orange-800">
                  <li className="flex justify-between">
                    <span>Large dents/creases</span>
                    <span className="font-bold">₱2,000 - ₱4,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Broken headlight/taillight</span>
                    <span className="font-bold">₱1,500 - ₱3,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Broken mirror</span>
                    <span className="font-bold">₱1,000 - ₱2,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Broken window</span>
                    <span className="font-bold">₱3,000 - ₱5,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3 text-lg">Interior Damage</h3>
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex justify-between">
                    <span>Seat stains/tears</span>
                    <span className="font-bold">₱1,000 - ₱3,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dashboard damage</span>
                    <span className="font-bold">₱1,500 - ₱4,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Carpet/floor damage</span>
                    <span className="font-bold">₱800 - ₱2,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Electronics damage</span>
                    <span className="font-bold">₱2,000 - ₱5,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-400 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3 text-lg">Major Damage</h3>
                <ul className="space-y-2 text-red-900">
                  <li className="flex justify-between">
                    <span>Engine damage</span>
                    <span className="font-bold">Full repair cost</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Transmission damage</span>
                    <span className="font-bold">Full repair cost</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total loss/theft</span>
                    <span className="font-bold">Full vehicle value</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Accident damage</span>
                    <span className="font-bold">Full repair cost</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Late Return Charges */}
          <section>
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Late Return Charges</h2>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-300">
                    <th className="text-left py-3 px-4 font-semibold text-orange-900">Duration Late</th>
                    <th className="text-right py-3 px-4 font-semibold text-orange-900">Charge</th>
                  </tr>
                </thead>
                <tbody className="text-orange-800">
                  <tr className="border-b border-orange-200">
                    <td className="py-3 px-4">30 minutes - 1 hour</td>
                    <td className="text-right py-3 px-4 font-bold">25% of daily rate</td>
                  </tr>
                  <tr className="border-b border-orange-200">
                    <td className="py-3 px-4">1 - 2 hours</td>
                    <td className="text-right py-3 px-4 font-bold">50% of daily rate</td>
                  </tr>
                  <tr className="border-b border-orange-200">
                    <td className="py-3 px-4">2 - 4 hours</td>
                    <td className="text-right py-3 px-4 font-bold">100% of daily rate</td>
                  </tr>
                  <tr className="border-b border-orange-200">
                    <td className="py-3 px-4">4 - 24 hours</td>
                    <td className="text-right py-3 px-4 font-bold">Full day charge + ₱500</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">More than 24 hours</td>
                    <td className="text-right py-3 px-4 font-bold">Full day charge per day + ₱1,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Traffic & Legal Violations */}
          <section>
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Traffic & Legal Violations</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-300 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3">Renter Responsibility</h3>
                <p className="text-red-800 mb-3">Renters are fully responsible for all traffic violations and fines incurred during the rental period.</p>
                <ul className="space-y-2 text-red-800">
                  <li className="flex justify-between">
                    <span>Speeding ticket</span>
                    <span className="font-bold">Full fine + ₱500 admin fee</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Parking violation</span>
                    <span className="font-bold">Full fine + ₱500 admin fee</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Traffic accident</span>
                    <span className="font-bold">Full damage cost</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Reckless driving</span>
                    <span className="font-bold">₱2,000 - ₱5,000 + fines</span>
                  </li>
                  <li className="flex justify-between">
                    <span>DUI/DWI</span>
                    <span className="font-bold">₱10,000 + legal action</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Fuel & Cleaning */}
          <section>
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Fuel & Cleaning Charges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Fuel Charges</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex justify-between">
                    <span>Fuel not refilled (per liter)</span>
                    <span className="font-bold">₱50 + ₱200 fee</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Empty tank return</span>
                    <span className="font-bold">Full tank cost</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-300 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Cleaning Charges</h3>
                <ul className="space-y-2 text-green-800">
                  <li className="flex justify-between">
                    <span>Light cleaning</span>
                    <span className="font-bold">₱500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Heavy cleaning</span>
                    <span className="font-bold">₱1,000 - ₱2,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Odor removal</span>
                    <span className="font-bold">₱1,000 - ₱3,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Stain removal</span>
                    <span className="font-bold">₱500 - ₱2,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment & Disputes */}
          <section>
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Payment & Dispute Resolution</h2>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-300 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Payment Terms</h3>
                <ul className="space-y-2 text-purple-800">
                  <li>• Fines are charged to the renter's registered payment method</li>
                  <li>• Payment is due within 7 days of notification</li>
                  <li>• Late payment incurs ₱500 additional penalty per week</li>
                  <li>• Unpaid fines result in account suspension</li>
                </ul>
              </div>

              <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-6">
                <h3 className="font-semibold text-indigo-900 mb-3">Dispute Process</h3>
                <ol className="space-y-2 text-indigo-800 list-decimal list-inside">
                  <li>Contact Elite Drive within 48 hours with evidence</li>
                  <li>Provide photos, videos, or receipts</li>
                  <li>Elite Drive reviews within 7 days</li>
                  <li>Decision is final and binding</li>
                  <li>Refunds processed within 14 days if approved</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Examples */}
          <section>
            <h2 className="text-3xl font-poppins font-bold text-charcoal mb-6">Example Scenarios</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-charcoal mb-2">Scenario 1: Minor Damage</h3>
                <p className="text-gray-700 mb-2">Renter returns car with small scratch on door.</p>
                <p className="text-gray-600"><strong>Charge:</strong> ₱500 - ₱1,000 + ₱200 admin fee = ₱700 - ₱1,200</p>
              </div>

              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-charcoal mb-2">Scenario 2: Late Return</h3>
                <p className="text-gray-700 mb-2">Renter returns car 3 hours late. Daily rate: ₱2,000</p>
                <p className="text-gray-600"><strong>Charge:</strong> 100% of ₱2,000 + ₱500 = ₱2,500</p>
              </div>

              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-charcoal mb-2">Scenario 3: Multiple Issues</h3>
                <p className="text-gray-700 mb-2">Renter returns car 2 hours late, with broken mirror, and empty fuel tank.</p>
                <p className="text-gray-600 space-y-1">
                  <div><strong>Late charge:</strong> ₱1,000 (50% of ₱2,000)</div>
                  <div><strong>Mirror damage:</strong> ₱1,500</div>
                  <div><strong>Fuel charge:</strong> ₱1,200 (full tank)</div>
                  <div><strong>Total:</strong> ₱3,700</div>
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-coral bg-opacity-10 border-2 border-coral rounded-lg p-6 text-center">
            <h3 className="font-semibold text-charcoal mb-2">Questions About Fines?</h3>
            <p className="text-gray-700 mb-4">Contact our support team for clarification</p>
            <a href="mailto:support@elitedrive.com" className="inline-block gradient-btn text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fines;
