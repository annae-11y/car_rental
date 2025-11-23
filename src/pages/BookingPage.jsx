import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, CheckCircle, AlertCircle, Car as CarIcon } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import useStore from '../store/useStore';

const ADDON_PRICES = {
  childSeat: 300,
  wifi: 200,
  dashcam: 200,
  extraDriver: 500,
  delivery: 400,
  fullTank: 800,
};

const getStatusLabel = (status) => {
  if (status === 'pending') return 'Pending Approval';
  if (status === 'approved') return 'Approved';
  if (status === 'rejected') return 'Rejected';
  if (status === 'released') return 'Car Released';
  if (status === 'returned') return 'Car Returned';
  if (status === 'completed') return 'Completed';
  if (status === 'cancelled') return 'Cancelled';
  return status;
};

const BookingPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { cars, createBooking, currentUser, checkBookingConflict, getAvailableCars } = useStore();
  const car = cars.find(c => c.id === parseInt(carId));
  
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    pickupTime: '09:00',
    returnTime: '09:00',
    pickupLocation: '',
    returnLocation: '',
    sameLocationReturn: true,
    paymentMethod: 'cash',
    securityDeposit: '',
    promoCode: '',
    addons: {
      childSeat: false,
      wifi: false,
      dashcam: false,
      extraDriver: false,
      delivery: false,
      fullTank: false,
    },
    notes: '',
    agreeToTerms: false,
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [bookingConflict, setBookingConflict] = useState(false);
  const [suggestedCars, setSuggestedCars] = useState([]);
  const [nextAvailableDate, setNextAvailableDate] = useState(null);

  if (!car) {
    return <div className="min-h-screen flex items-center justify-center">Car not found</div>;
  }

  const calculateBaseRental = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const days = differenceInDays(new Date(formData.returnDate), new Date(formData.pickupDate));
    return days > 0 ? days * car.dailyRate : 0;
  };

  const calculateAddonsTotal = () => {
    const addons = formData.addons || {};
    return Object.keys(addons).reduce((sum, key) => {
      if (!addons[key]) return sum;
      const price = ADDON_PRICES[key] || 0;
      return sum + price;
    }, 0);
  };

  const calculateDiscount = (base, addonsTotal) => {
    if (!formData.promoCode) return 0;
    const code = formData.promoCode.trim().toUpperCase();
    const subtotal = base + addonsTotal;
    if (!subtotal) return 0;
    if (code === 'BILIRAN10') return Math.round(subtotal * 0.1);
    if (code === 'ELITEDRIVE5') return Math.round(subtotal * 0.05);
    return 0;
  };

  const calculateGrandTotal = () => {
    const base = calculateBaseRental();
    const addonsTotal = calculateAddonsTotal();
    const securityDeposit = Number(formData.securityDeposit || 0);
    const discount = calculateDiscount(base, addonsTotal);
    const lateFees = 0;
    const total = base + addonsTotal + securityDeposit + lateFees - discount;
    return total > 0 ? total : 0;
  };

  const totalDays = formData.pickupDate && formData.returnDate
    ? differenceInDays(new Date(formData.returnDate), new Date(formData.pickupDate))
    : 0;

  // Initialize default pickup/return locations and deposit based on car details
  useEffect(() => {
    if (!car) return;
    setFormData((prev) => {
      const updated = { ...prev };
      if (!updated.pickupLocation) {
        updated.pickupLocation = car.location || '';
      }
      if (updated.sameLocationReturn && !updated.returnLocation) {
        updated.returnLocation = car.location || '';
      }
      if (!updated.securityDeposit && car.dailyRate) {
        updated.securityDeposit = car.dailyRate;
      }
      return updated;
    });
  }, [car]);

  // Keep return location in sync when "same location" toggle is enabled
  useEffect(() => {
    if (!formData.sameLocationReturn) return;
    setFormData((prev) => ({
      ...prev,
      returnLocation: prev.pickupLocation,
    }));
  }, [formData.sameLocationReturn, formData.pickupLocation]);

  // Check for booking conflicts when dates change
  useEffect(() => {
    if (formData.pickupDate && formData.returnDate) {
      const conflicts = checkBookingConflict(car.id, formData.pickupDate, formData.returnDate);
      if (conflicts.length > 0) {
        setBookingConflict(true);
        // Get alternative cars
        const alternatives = getAvailableCars(formData.pickupDate, formData.returnDate)
          .filter(c => c.id !== car.id)
          .slice(0, 3);
        setSuggestedCars(alternatives);
        // Suggest next available date based on conflicting bookings
        const latestReturn = conflicts.reduce((latest, b) => {
          const bReturn = new Date(b.returnDate);
          return bReturn > latest ? bReturn : latest;
        }, new Date());
        setNextAvailableDate(latestReturn.toISOString().split('T')[0]);
      } else {
        setBookingConflict(false);
        setSuggestedCars([]);
        setNextAvailableDate(null);
      }
    }
  }, [formData.pickupDate, formData.returnDate, car.id, checkBookingConflict, getAvailableCars]);

  // Countdown timer until pickup once booking is created
  useEffect(() => {
    if (!showConfirmation || !createdBooking) return;

    const updateCountdown = () => {
      const pickupDate = createdBooking.pickupDate;
      const pickupTime = createdBooking.pickupTime || '09:00';
      if (!pickupDate) {
        setCountdown('');
        return;
      }

      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      const now = new Date();
      const diffMs = pickupDateTime - now;

      if (diffMs <= 0) {
        setCountdown('Ready for pickup');
        return;
      }

      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0 || days > 0) parts.push(`${hours}h`);
      parts.push(`${minutes}m`);
      setCountdown(parts.join(' '));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [showConfirmation, createdBooking]);

  const baseRental = calculateBaseRental();
  const addonsTotal = calculateAddonsTotal();
  const discountAmount = calculateDiscount(baseRental, addonsTotal);
  const securityDeposit = Number(formData.securityDeposit || 0);
  const grandTotal = calculateGrandTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (totalDays <= 0) {
      alert('Please select valid dates');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('You must agree to the Terms & Conditions before booking.');
      return;
    }

    if (bookingConflict) {
      alert('This car is unavailable on the selected dates. Please choose another date or select another available car.');
      return;
    }

    const baseAmount = baseRental;
    const lateFees = 0;
    const totalAmount = grandTotal;

    const pickupLocation = formData.pickupLocation || car.location;
    const returnLocation = formData.sameLocationReturn
      ? pickupLocation
      : (formData.returnLocation || pickupLocation);

    const bookingData = {
      carId: car.id,
      carName: car.name,
      carImage: car.images[0],
      ownerId: car.ownerId,
      ownerName: car.ownerName,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      pickupTime: formData.pickupTime,
      returnTime: formData.returnTime,
      pickupLocation,
      returnLocation,
      sameLocationReturn: formData.sameLocationReturn,
      totalDays,
      dailyRate: car.dailyRate,
      baseAmount,
      totalAmount,
      securityDeposit,
      addonsTotal,
      promoCode: formData.promoCode || null,
      discountAmount,
      lateFees,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
      addons: formData.addons,
      agreedToTerms: formData.agreeToTerms,
    };

    const res = createBooking(bookingData);
    if (!res.success) {
      // show conflict message & suggestions
      alert(res.message || 'Unable to create booking');
      if (res.suggestions) {
        if (res.suggestions.alternativeCars) {
          setSuggestedCars(res.suggestions.alternativeCars);
        }
        if (res.suggestions.nextAvailableDate) {
          setNextAvailableDate(res.suggestions.nextAvailableDate);
        }
        setBookingConflict(true);
      }
      return;
    }

    setCreatedBooking(res.booking);
    setShowConfirmation(true);
  };

  const handleRequestCancel = () => {
    if (!createdBooking) return;
    const proceed = window.confirm(
      "Canceling your booking may incur penalties according to the owner's policy. Do you want to continue and send a cancellation request via chat?"
    );
    if (!proceed) return;
    navigate(`/chat/${createdBooking.id}`);
  };

  const handleRequestChange = () => {
    if (!createdBooking) return;
    alert('You can request a change in date/time via chat. The owner must approve any changes.');
    navigate(`/chat/${createdBooking.id}`);
  };

  if (showConfirmation && createdBooking) {
    return (
      <div className="min-h-screen bg-softwhite flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <div>
            <h2 className="font-poppins text-3xl font-bold text-charcoal mb-2">Booking Submitted</h2>
            <p className="text-gray-600">Your booking has been submitted and is waiting for approval from the owner.</p>
          </div>

          <div className="bg-softwhite rounded-xl p-6 space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Ref:</span>
              <span className="font-semibold text-charcoal">{createdBooking.reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Car:</span>
              <span className="font-semibold text-charcoal">{createdBooking.carName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold text-charcoal">{createdBooking.totalDays} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pickup:</span>
              <span className="font-semibold text-charcoal">{createdBooking.pickupDate} {createdBooking.pickupTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-semibold text-coral text-xl">₱{createdBooking.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Security Deposit:</span>
              <span className="font-semibold text-charcoal">₱{createdBooking.securityDeposit || (createdBooking.payment && createdBooking.payment.securityDeposit) || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold text-charcoal">{(createdBooking.payment && createdBooking.payment.method) || createdBooking.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className="font-semibold text-charcoal capitalize">{(createdBooking.payment && createdBooking.payment.status) || 'pending'}</span>
            </div>
            {countdown && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Countdown until pickup: </span>
                <span className="font-semibold text-charcoal text-sm">{countdown}</span>
              </div>
            )}
          </div>

          {createdBooking.statusHistory && createdBooking.statusHistory.length > 0 && (
            <div className="bg-softwhite rounded-xl p-6 space-y-2 text-left">
              <h3 className="font-semibold text-charcoal text-sm">Status Timeline</h3>
              <ul className="text-xs text-gray-700 space-y-1 max-h-32 overflow-y-auto">
                {createdBooking.statusHistory.map((entry, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{getStatusLabel(entry.status)}</span>
                    <span>{entry.at ? format(new Date(entry.at), 'PPp') : ''}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-500">
            You and the owner will receive notifications as this booking is approved, the car is released and returned, and payments are updated.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard/customer')}
              className="w-full gradient-btn text-white font-semibold py-3 rounded-lg"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/cars')}
              className="w-full border-2 border-charcoal text-charcoal font-semibold py-3 rounded-lg hover:bg-charcoal hover:text-white transition-colors"
            >
              Browse More Cars
            </button>
            <button
              type="button"
              onClick={handleRequestCancel}
              className="w-full text-xs text-red-600 hover:underline"
            >
              Request to cancel booking
            </button>
            <button
              type="button"
              onClick={handleRequestChange}
              className="w-full text-xs text-gray-600 hover:underline"
            >
              Request to change date/time
            </button>
            <p className="text-[11px] text-gray-500">
              Changes and cancellations are subject to owner approval and may incur penalties.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-4xl font-bold text-charcoal mb-8">
          Complete Your <span className="text-coral">Booking</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            {/* Booking Conflict Alert */}
            {bookingConflict && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Car Not Available</h3>
                    <p className="text-red-700 text-sm mb-4">
                      This car is unavailable on the selected dates. Please choose another date or select another available car.
                    </p>
                    {nextAvailableDate && (
                      <p className="text-red-700 text-xs mb-3">
                        Suggested next available start date for this car: <span className="font-semibold">{nextAvailableDate}</span>
                      </p>
                    )}
                    {suggestedCars.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-red-800 mb-3">Available Alternatives:</p>
                        <div className="space-y-2">
                          {suggestedCars.map(altCar => (
                            <button
                              key={altCar.id}
                              onClick={() => navigate(`/booking/${altCar.id}`)}
                              className="w-full text-left p-3 bg-white border border-red-200 rounded hover:border-coral hover:bg-coral hover:bg-opacity-5 transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-charcoal">{altCar.name}</p>
                                  <p className="text-xs text-gray-600">₱{altCar.dailyRate}/day</p>
                                </div>
                                <CarIcon className="w-4 h-4 text-coral" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {/* Rental Period */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Rental Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Pickup Date</label>
                    <input
                      type="date"
                      required
                      min={format(new Date(), 'yyyy-MM-dd')}
                      value={formData.pickupDate}
                      onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Pickup Time</label>
                    <input
                      type="time"
                      required
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Return Date</label>
                    <input
                      type="date"
                      required
                      min={formData.pickupDate || format(new Date(), 'yyyy-MM-dd')}
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Return Time</label>
                    <input
                      type="time"
                      required
                      value={formData.returnTime}
                      onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup & Return Locations */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Pickup & Return Locations</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Pickup Location</label>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="e.g., Naval, Biliran or specific address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.sameLocationReturn}
                        onChange={(e) => setFormData({ ...formData, sameLocationReturn: e.target.checked })}
                      />
                      <span>Return to same location</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Return Location</label>
                    <input
                      type="text"
                      value={formData.returnLocation}
                      onChange={(e) => setFormData({ ...formData, returnLocation: e.target.value })}
                      disabled={formData.sameLocationReturn}
                      placeholder={formData.sameLocationReturn ? 'Same as pickup location' : 'Enter return location'}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none ${formData.sameLocationReturn ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-coral transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold text-charcoal">Cash on Hand</p>
                      <p className="text-sm text-gray-600">Pay in cash when you collect the car</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-coral transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="gcash"
                      checked={formData.paymentMethod === 'gcash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold text-charcoal">GCash</p>
                      <p className="text-sm text-gray-600">Pay via GCash</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-coral transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paymaya"
                      checked={formData.paymentMethod === 'paymaya'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="mr-3"
                    />
                    <div>
                      <p className="font-semibold text-charcoal">PayMaya</p>
                      <p className="text-sm text-gray-600">Pay via PayMaya</p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Security Deposit Amount</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.securityDeposit}
                      onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Discount / Promo Code</label>
                    <input
                      type="text"
                      value={formData.promoCode}
                      onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                      placeholder="e.g., BILIRAN10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <p className="mt-2 text-xs text-gray-600">
                  Payment Status: <span className="font-semibold text-yellow-700">Pending</span> (will be updated after the owner confirms your payment)
                </p>
              </div>


              {/* Optional Add-ons for Renters */}
              <div>
                <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Optional Add-ons for Renters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.childSeat}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, childSeat: e.target.checked },
                        })}
                      />
                      <span>Child seat</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.childSeat}</span>
                  </label>
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.wifi}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, wifi: e.target.checked },
                        })}
                      />
                      <span>WiFi hotspot</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.wifi}</span>
                  </label>
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.dashcam}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, dashcam: e.target.checked },
                        })}
                      />
                      <span>Dashcam rental</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.dashcam}</span>
                  </label>
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.extraDriver}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, extraDriver: e.target.checked },
                        })}
                      />
                      <span>Extra driver registration</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.extraDriver}</span>
                  </label>
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.delivery}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, delivery: e.target.checked },
                        })}
                      />
                      <span>Delivery fee for pickup</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.delivery}</span>
                  </label>
                  <label className="flex items-center justify-between text-sm text-gray-700">
                    <span className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.addons.fullTank}
                        onChange={(e) => setFormData({
                          ...formData,
                          addons: { ...formData.addons, fullTank: e.target.checked },
                        })}
                      />
                      <span>Full tank service</span>
                    </span>
                    <span className="text-xs text-gray-600">₱{ADDON_PRICES.fullTank}</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Selected add-ons will be added to your total booking amount and may be confirmed again with the owner.
                </p>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Additional Notes (Optional)</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none resize-none"
                ></textarea>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={formData.agreeToTerms} onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })} />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="text-coral font-semibold">
                      Terms & Conditions
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full gradient-btn text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
              <h3 className="font-poppins text-xl font-semibold text-charcoal">Booking Summary</h3>
              
              {/* Car Info */}
              <div className="flex space-x-4">
                <img
                  src={car.images[0]}
                  alt={car.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold text-charcoal">{car.name}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily Rate</span>
                  <span className="font-semibold text-charcoal">₱{car.dailyRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-charcoal">{totalDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rental fee</span>
                  <span className="font-semibold text-charcoal">₱{baseRental}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Add-ons</span>
                  <span className="font-semibold text-charcoal">₱{addonsTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security deposit</span>
                  <span className="font-semibold text-charcoal">₱{securityDeposit}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-₱{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-semibold text-charcoal">Estimated Total</span>
                  <span className="font-bold text-coral text-xl">₱{grandTotal}</span>
                </div>
              </div>

              {/* Biliran Map */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-poppins text-sm font-semibold text-charcoal mb-2">Pickup Area Map (Biliran)</h4>
                <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    title="Biliran map"
                    src="https://www.google.com/maps?q=Biliran,Philippines&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">Important:</p>
                <ul className="space-y-1 text-xs">
                  <li>✓ Valid driver's license required</li>
                  <li>✓ Valid ID for verification</li>
                  <li>✓ Owner approval needed</li>
                  <li>✓ Full tank policy applies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
