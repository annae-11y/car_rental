import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Users, Fuel, Settings, Star, Phone, Mail, Calendar, ArrowLeft, Shield } from 'lucide-react';
import useStore from '../store/useStore';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, isAuthenticated, currentUser, getRentalAgreementByOwner } = useStore();
  const car = cars.find(c => c.id === parseInt(id));
  
  const [selectedImage, setSelectedImage] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Car not found</h2>
          <Link to="/cars" className="text-coral hover:underline">Back to listings</Link>
        </div>
      </div>
    );
  }

  const ownerAgreement = getRentalAgreementByOwner ? getRentalAgreementByOwner(car.ownerId) : null;

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (currentUser.role !== 'customer') {
      alert('Only customers can book cars');
      return;
    }
    
    navigate(`/booking/${car.id}`);
  };

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/cars"
          className="inline-flex items-center space-x-2 text-coral hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-96">
                <img
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-lg font-bold text-charcoal shadow-lg">
                  ₱{car.dailyRate}/day
                </div>
              </div>
              
              {car.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto scrollbar-hide">
                  {car.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                        selectedImage === idx ? 'border-coral' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`${car.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-poppins text-3xl font-bold text-charcoal mb-2">{car.name}</h1>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-coral" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-coral bg-opacity-10 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 fill-coral text-coral" />
                    <span className="font-bold text-charcoal">{car.rating}</span>
                    <span className="text-gray-600 text-sm">({car.totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-softwhite rounded-xl">
                  <div className="text-center">
                    <Users className="w-6 h-6 text-coral mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold text-charcoal">{car.capacity} seats</p>
                  </div>
                  <div className="text-center">
                    <Settings className="w-6 h-6 text-coral mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold text-charcoal">{car.transmission}</p>
                  </div>
                  <div className="text-center">
                    <Fuel className="w-6 h-6 text-coral mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold text-charcoal">{car.fuelType}</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-coral mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Condition</p>
                    <p className="font-semibold text-charcoal">{car.condition}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{car.description}</p>
              </div>

              {/* Details */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-3">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="font-semibold text-charcoal">{car.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Model</p>
                    <p className="font-semibold text-charcoal">{car.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold text-charcoal">{car.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Color</p>
                    <p className="font-semibold text-charcoal">{car.color}</p>
                  </div>
                </div>
              </div>

              {/* Car Rules & Limitations */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-3">Car Rules & Limitations</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {ownerAgreement && (
                    <>
                      {ownerAgreement.usageRestriction && (
                        <p><span className="font-semibold">Geographic Restriction:</span> {ownerAgreement.usageRestriction}</p>
                      )}
                      {ownerAgreement.speedLimit && (
                        <p><span className="font-semibold">Speed Limit:</span> {ownerAgreement.speedLimit}</p>
                      )}
                      {ownerAgreement.fuelRequirement && (
                        <p><span className="font-semibold">Fuel Requirement:</span> {ownerAgreement.fuelRequirement}</p>
                      )}
                      {ownerAgreement.cleanlinessRequirement && (
                        <p><span className="font-semibold">Cleanliness:</span> {ownerAgreement.cleanlinessRequirement}</p>
                      )}
                      {Array.isArray(ownerAgreement.prohibitedActivities) && ownerAgreement.prohibitedActivities.length > 0 && (
                        <div>
                          <p className="font-semibold">Prohibited Activities:</p>
                          <ul className="list-disc list-inside text-xs text-gray-700">
                            {ownerAgreement.prohibitedActivities.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {car.rules && typeof car.rules === 'object' && !Array.isArray(car.rules) && (
                    <>
                      {car.rules.allowedArea && (
                        <p><span className="font-semibold">Allowed Area:</span> {car.rules.allowedArea}</p>
                      )}
                      {car.rules.speedLimit && (
                        <p><span className="font-semibold">Speed Limit:</span> {car.rules.speedLimit}</p>
                      )}
                      {car.rules.fuelPolicy && (
                        <p><span className="font-semibold">Fuel Policy:</span> {car.rules.fuelPolicy}</p>
                      )}
                      {(car.rules.noRecklessDriving || car.rules.noSmoking) && (
                        <ul className="list-disc list-inside text-xs text-gray-700">
                          {car.rules.noRecklessDriving && <li>No reckless driving</li>}
                          {car.rules.noSmoking && <li>No smoking in the vehicle</li>}
                        </ul>
                      )}
                      {car.rules.handlingResponsibility && (
                        <p className="text-xs text-gray-700">{car.rules.handlingResponsibility}</p>
                      )}
                    </>
                  )}

                  {car.rules && typeof car.rules === 'string' && (
                    <p>{car.rules}</p>
                  )}

                  {!ownerAgreement && !car.rules && (
                    <p className="text-xs text-gray-600">No specific rules provided by the owner. Standard platform policies apply.</p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    For full policy details, please review our{' '}
                    <Link to="/terms" className="text-coral font-semibold hover:underline">Terms & Conditions</Link>
                    {' '}and{' '}
                    <Link to="/fines" className="text-coral font-semibold hover:underline">Fines &amp; Penalties</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              {/* Price */}
              <div className="text-center pb-6 border-b border-gray-200">
                <p className="text-gray-600 mb-2">Daily Rate</p>
                <p className="font-poppins text-4xl font-bold text-charcoal">₱{car.dailyRate}</p>
                <p className="text-sm text-gray-500">per day</p>
              </div>

              {/* Owner Info */}
              <div>
                <h3 className="font-poppins text-lg font-semibold text-charcoal mb-3">Car Owner</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-coral bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-coral text-lg">{car.ownerName.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">
                        <Link to={`/users/${car.ownerId}`} className="hover:text-coral hover:underline">
                          {car.ownerName}
                        </Link>
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-coral text-coral" />
                        <span className="text-sm text-gray-600">Verified Owner</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4 text-coral" />
                      <span>{car.ownerPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4 text-coral" />
                      <span>{car.ownerEmail}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Available Now</span>
                </div>
                <p className="text-sm text-green-700 mt-1">This car is ready for booking</p>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                className="w-full gradient-btn text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all"
              >
                Book Now
              </button>

              {/* Info */}
              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>✓ Instant booking confirmation</p>
                <p>✓ Secure payment</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
