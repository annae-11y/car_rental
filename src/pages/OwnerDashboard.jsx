import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Car, DollarSign, Calendar, Check, X, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import useStore from '../store/useStore';
import CarConditionTracker from '../components/CarConditionTracker';

const OwnerDashboard = () => {
  const { currentUser, getCarsByOwner, getBookingsByOwner, addCar, updateCar, updateBooking, deleteCar, approveBooking, rejectBooking, uploadBeforePhoto, uploadAfterPhoto } = useStore();
  const myCars = getCarsByOwner(currentUser.id);
  const myBookings = getBookingsByOwner(currentUser.id);
  const [activeTab, setActiveTab] = useState('cars');
  const [conditionBooking, setConditionBooking] = useState(null);
  const [photoState, setPhotoState] = useState({});
  const navigate = useNavigate();

  const setPhotoField = (bookingId, field, value) => {
    setPhotoState(prev => ({
      ...prev,
      [bookingId]: {
        ...(prev[bookingId] || {}),
        [field]: value,
      }
    }));
  };

  const handleUploadBefore = (booking) => {
    const s = photoState[booking.id] || {};
    if (!s.beforeUrl) return alert('Please provide a before photo URL');
    uploadBeforePhoto(booking.id, s.beforeUrl, s.beforeNotes || '');
    setPhotoField(booking.id, 'beforeUrl', '');
    setPhotoField(booking.id, 'beforeNotes', '');
  };

  const handleUploadAfter = (booking) => {
    const s = photoState[booking.id] || {};
    if (!s.afterUrl) return alert('Please provide an after photo URL');
    uploadAfterPhoto(booking.id, s.afterUrl, s.afterNotes || '', s.afterStatus || 'Good');
    setPhotoField(booking.id, 'afterUrl', '');
    setPhotoField(booking.id, 'afterNotes', '');
    setPhotoField(booking.id, 'afterStatus', 'Good');
  };

  const handleRelease = (booking) => {
    updateBooking(booking.id, { status: 'released', statusHistory: [...(booking.statusHistory||[]), { status: 'released', at: new Date().toISOString() }] });
  };

  const handleReturn = (booking) => {
    updateBooking(booking.id, { status: 'returned', statusHistory: [...(booking.statusHistory||[]), { status: 'returned', at: new Date().toISOString() }] });
  };
  const [showAddCar, setShowAddCar] = useState(false);
  const [carForm, setCarForm] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    type: 'Sedan',
    plateNumber: '',
    description: '',
    condition: 'Excellent',
    dailyRate: '',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    capacity: 5,
    location: 'Naval, Biliran',
    images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
    airconditioned: true,
    photo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
    rules: '',
    engineType: '',
    horsepower: '',
    mileage: '',
    fuelEfficiency: '',
    driveType: 'FWD',
    suspensionType: '',
    tireTypeCondition: '',
    hasSpareTire: true,
    features: {
      bluetooth: false,
      usb: false,
      aux: false,
      gps: false,
      touchscreen: false,
      backupCamera: false,
      parkingSensors: false,
      alarmSystem: false,
      cruiseControl: false,
      sunroof: false,
      smartKey: false,
      childLock: false,
      carMat: false,
    },
    airbagCount: 2,
    windowTintLevel: '',
    existingScratchPhotos: [],
    existingDentPhotos: [],
    tireWearLevel: '',
    batteryCondition: '',
    interiorCleanliness: '',
    recentRepairs: '',
    lastInspectedDate: '',
    registrationValidity: '',
    emissionTestValidity: '',
    orCrDocument: null,
    ownerReferenceId: '',
    plateExpiryMonth: '',
  });

  const totalEarnings = myBookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const handleAddCar = (e) => {
    e.preventDefault();
    addCar(carForm);
    setShowAddCar(false);
    setCarForm({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      type: 'Sedan',
      plateNumber: '',
      description: '',
      condition: 'Excellent',
      dailyRate: '',
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      capacity: 5,
      location: 'Naval, Biliran',
      images: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800'],
      airconditioned: true,
      photo: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
      rules: '',
      engineType: '',
      horsepower: '',
      mileage: '',
      fuelEfficiency: '',
      driveType: 'FWD',
      suspensionType: '',
      tireTypeCondition: '',
      hasSpareTire: true,
      features: {
        bluetooth: false,
        usb: false,
        aux: false,
        gps: false,
        touchscreen: false,
        backupCamera: false,
        parkingSensors: false,
        alarmSystem: false,
        cruiseControl: false,
        sunroof: false,
        smartKey: false,
        childLock: false,
        carMat: false,
      },
      airbagCount: 2,
      windowTintLevel: '',
      existingScratchPhotos: [],
      existingDentPhotos: [],
      tireWearLevel: '',
      batteryCondition: '',
      interiorCleanliness: '',
      recentRepairs: '',
      lastInspectedDate: '',
      registrationValidity: '',
      emissionTestValidity: '',
      orCrDocument: null,
      ownerReferenceId: '',
      plateExpiryMonth: '',
    });
  };

  const handleBookingAction = (bookingId, action) => {
    if (action === 'approved') return approveBooking(bookingId);
    if (action === 'rejected') return rejectBooking(bookingId);
    return updateBooking(bookingId, { status: action });
  };

  const handleToggleAvailability = (carId, currentStatus) => {
    updateCar(carId, { available: !currentStatus });
  };

  const getBookingStatusLabel = (status) => {
    if (status === 'pending') return 'Pending Approval';
    if (status === 'approved') return 'Active / Ongoing Rental';
    return status;
  };

  const getTimelineStatusLabel = (status) => {
    if (status === 'pending') return 'Pending Approval';
    if (status === 'approved') return 'Approved';
    if (status === 'released') return 'Car Released to Renter';
    if (status === 'returned') return 'Car Returned';
    if (status === 'completed') return 'Rental Completed';
    if (status === 'payment_pending') return 'Pending Payment';
    if (status === 'payment_complete') return 'Payment Complete';
    if (status === 'rejected') return 'Rejected';
    if (status === 'cancelled') return 'Cancelled';
    return status;
  };

  const getPaymentStatusLabel = (payment) => {
    if (!payment || !payment.status) return 'Pending Payment';
    const s = String(payment.status).toLowerCase();
    if (s === 'paid' || s === 'completed' || s === 'settled') return 'Payment Complete';
    if (s === 'partial' || s === 'partially_paid') return 'Pending Payment';
    if (s === 'pending' || s === 'unpaid') return 'Pending Payment';
    return payment.status;
  };

  return (
    <>
      <div className="bg-softwhite min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-2">
            Owner <span className="text-coral">Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage your cars and bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-coral" />
              <span className="text-3xl font-bold text-charcoal">{myCars.length}</span>
            </div>
            <p className="text-gray-600">My Cars</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-charcoal">{myBookings.length}</span>
            </div>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-charcoal">₱{totalEarnings}</span>
            </div>
            <p className="text-gray-600">Total Earnings</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Check className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-charcoal">
                {myBookings.filter(b => b.status === 'pending').length}
              </span>
            </div>
            <p className="text-gray-600">Pending Approval</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('cars')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'cars'
                  ? 'text-coral border-b-2 border-coral'
                  : 'text-gray-600 hover:text-coral'
              }`}
            >
              My Cars
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'bookings'
                  ? 'text-coral border-b-2 border-coral'
                  : 'text-gray-600 hover:text-coral'
              }`}
            >
              Booking Requests
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          {activeTab === 'cars' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-poppins text-2xl font-bold text-charcoal">My Cars</h2>
                <button
                  onClick={() => setShowAddCar(true)}
                  className="gradient-btn text-white px-6 py-3 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Car</span>
                </button>
              </div>

              {/* Add Car Form */}
              {showAddCar && (
                <form onSubmit={handleAddCar} className="bg-softwhite rounded-xl p-6 mb-6 space-y-4">
                  <h3 className="font-poppins text-xl font-semibold text-charcoal mb-4">Add New Car</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Car Name"
                      value={carForm.name}
                      onChange={(e) => setCarForm({ ...carForm, name: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Brand"
                      value={carForm.brand}
                      onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Model"
                      value={carForm.model}
                      onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Year"
                      value={carForm.year}
                      onChange={(e) => setCarForm({ ...carForm, year: parseInt(e.target.value) })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Color"
                      value={carForm.color}
                      onChange={(e) => setCarForm({ ...carForm, color: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <select
                      value={carForm.type}
                      onChange={(e) => setCarForm({ ...carForm, type: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>MPV</option>
                      <option>Van</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Plate Number"
                      value={carForm.plateNumber}
                      onChange={(e) => setCarForm({ ...carForm, plateNumber: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Daily Rate (₱)"
                      value={carForm.dailyRate}
                      onChange={(e) => setCarForm({ ...carForm, dailyRate: parseInt(e.target.value) })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <select
                      value={carForm.transmission}
                      onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option>Automatic</option>
                      <option>Manual</option>
                    </select>
                    <select
                      value={carForm.fuelType}
                      onChange={(e) => setCarForm({ ...carForm, fuelType: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option>Gasoline</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                    </select>
                    <input
                      type="number"
                      required
                      placeholder="Capacity"
                      value={carForm.capacity}
                      onChange={(e) => setCarForm({ ...carForm, capacity: parseInt(e.target.value) })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Location"
                      value={carForm.location}
                      onChange={(e) => setCarForm({ ...carForm, location: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <select
                      value={carForm.airconditioned ? 'yes' : 'no'}
                      onChange={(e) => setCarForm({ ...carForm, airconditioned: e.target.value === 'yes' })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option value="yes">Airconditioned</option>
                      <option value="no">Not Airconditioned</option>
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files && e.target.files[0];
                        if (!file) return;
                        const imageUrl = URL.createObjectURL(file);
                        setCarForm({ ...carForm, photo: imageUrl, images: [imageUrl] });
                      }}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral bg-white"
                    />
                  </div>
                  
                  <h4 className="font-poppins text-lg font-semibold text-charcoal mt-4">Car Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Engine Type (e.g., 1.5L, Turbo, Hybrid)"
                      value={carForm.engineType}
                      onChange={(e) => setCarForm({ ...carForm, engineType: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="number"
                      placeholder="Horsepower"
                      value={carForm.horsepower}
                      onChange={(e) => setCarForm({ ...carForm, horsepower: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="number"
                      placeholder="Mileage / Odometer Reading"
                      value={carForm.mileage}
                      onChange={(e) => setCarForm({ ...carForm, mileage: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Fuel Efficiency (km/L)"
                      value={carForm.fuelEfficiency}
                      onChange={(e) => setCarForm({ ...carForm, fuelEfficiency: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <select
                      value={carForm.driveType}
                      onChange={(e) => setCarForm({ ...carForm, driveType: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                      <option value="4x4">4x4</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Suspension Type"
                      value={carForm.suspensionType}
                      onChange={(e) => setCarForm({ ...carForm, suspensionType: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      placeholder="Tire Type & Condition"
                      value={carForm.tireTypeCondition}
                      onChange={(e) => setCarForm({ ...carForm, tireTypeCondition: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <select
                      value={carForm.hasSpareTire ? 'yes' : 'no'}
                      onChange={(e) => setCarForm({ ...carForm, hasSpareTire: e.target.value === 'yes' })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    >
                      <option value="yes">Spare Tire Available</option>
                      <option value="no">No Spare Tire</option>
                    </select>
                  </div>

                  <h4 className="font-poppins text-lg font-semibold text-charcoal mt-4">Car Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.bluetooth}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, bluetooth: e.target.checked } })}
                      />
                      <span>Bluetooth</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.usb}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, usb: e.target.checked } })}
                      />
                      <span>USB Support</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.aux}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, aux: e.target.checked } })}
                      />
                      <span>AUX Support</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.gps}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, gps: e.target.checked } })}
                      />
                      <span>GPS Navigation</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.touchscreen}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, touchscreen: e.target.checked } })}
                      />
                      <span>Touchscreen Display</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.backupCamera}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, backupCamera: e.target.checked } })}
                      />
                      <span>Backup Camera</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.parkingSensors}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, parkingSensors: e.target.checked } })}
                      />
                      <span>Parking Sensors</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.alarmSystem}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, alarmSystem: e.target.checked } })}
                      />
                      <span>Alarm / Anti-theft System</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.cruiseControl}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, cruiseControl: e.target.checked } })}
                      />
                      <span>Cruise Control</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.sunroof}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, sunroof: e.target.checked } })}
                      />
                      <span>Sunroof / Moonroof</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.smartKey}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, smartKey: e.target.checked } })}
                      />
                      <span>Smart Key / Push Start</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.childLock}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, childLock: e.target.checked } })}
                      />
                      <span>Child Lock</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={carForm.features.carMat}
                        onChange={(e) => setCarForm({ ...carForm, features: { ...carForm.features, carMat: e.target.checked } })}
                      />
                      <span>Car Mats Available</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input
                      type="number"
                      placeholder="Airbag Count"
                      value={carForm.airbagCount}
                      onChange={(e) => setCarForm({ ...carForm, airbagCount: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      placeholder="Window Tint Level"
                      value={carForm.windowTintLevel}
                      onChange={(e) => setCarForm({ ...carForm, windowTintLevel: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                  </div>

                  <h4 className="font-poppins text-lg font-semibold text-charcoal mt-4">Damage & Condition Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Existing Scratches (photos)</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          if (!files.length) return;
                          const urls = files.map(file => URL.createObjectURL(file));
                          setCarForm({ ...carForm, existingScratchPhotos: urls });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral bg-white"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Existing Dents (photos)</p>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          if (!files.length) return;
                          const urls = files.map(file => URL.createObjectURL(file));
                          setCarForm({ ...carForm, existingDentPhotos: urls });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Tire Wear Level"
                      value={carForm.tireWearLevel}
                      onChange={(e) => setCarForm({ ...carForm, tireWearLevel: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      placeholder="Battery Condition"
                      value={carForm.batteryCondition}
                      onChange={(e) => setCarForm({ ...carForm, batteryCondition: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      placeholder="Interior Cleanliness Rating"
                      value={carForm.interiorCleanliness}
                      onChange={(e) => setCarForm({ ...carForm, interiorCleanliness: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <input
                      type="text"
                      placeholder="Recent Repairs / Replacements"
                      value={carForm.recentRepairs}
                      onChange={(e) => setCarForm({ ...carForm, recentRepairs: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Car Last Inspected Date</p>
                      <input
                        type="date"
                        value={carForm.lastInspectedDate}
                        onChange={(e) => setCarForm({ ...carForm, lastInspectedDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                      />
                    </div>
                  </div>

                  <h4 className="font-poppins text-lg font-semibold text-charcoal mt-4">Ownership & Admin Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Car Registration Validity</p>
                      <input
                        type="date"
                        value={carForm.registrationValidity}
                        onChange={(e) => setCarForm({ ...carForm, registrationValidity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Emission Test Validity</p>
                      <input
                        type="date"
                        value={carForm.emissionTestValidity}
                        onChange={(e) => setCarForm({ ...carForm, emissionTestValidity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 mb-1">OR/CR Upload</p>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0];
                          if (!file) return;
                          const docUrl = URL.createObjectURL(file);
                          setCarForm({ ...carForm, orCrDocument: docUrl });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Car Owner's Internal Reference ID"
                      value={carForm.ownerReferenceId}
                      onChange={(e) => setCarForm({ ...carForm, ownerReferenceId: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                    />
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Plate Number Expiration Month</p>
                      <input
                        type="month"
                        value={carForm.plateExpiryMonth}
                        onChange={(e) => setCarForm({ ...carForm, plateExpiryMonth: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral"
                      />
                    </div>
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder="Description"
                    value={carForm.description}
                    onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-coral resize-none"
                  />

                  <div className="flex space-x-3">
                    <button type="submit" className="gradient-btn text-white px-6 py-3 rounded-lg">
                      Add Car
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCar(false)}
                      className="border-2 border-charcoal text-charcoal px-6 py-3 rounded-lg hover:bg-charcoal hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Cars List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCars.map(car => (
                  <div key={car.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <img src={car.images[0]} alt={car.name} className="w-full h-40 object-cover" />
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-charcoal">{car.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          car.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {car.status}
                        </span>
                      </div>
                      
                      <p className="text-coral font-bold">₱{car.dailyRate}/day</p>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleAvailability(car.id, car.available)}
                          className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                            car.available
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {car.available ? 'Available' : 'Unavailable'}
                        </button>
                        <button
                          onClick={() => deleteCar(car.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6">Booking Requests</h2>
              
              {myBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No booking requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-charcoal text-lg">{booking.carName}</h3>
                          <p className="text-sm text-gray-600">
                            Customer:{' '}
                            <Link to={`/users/${booking.customerId}`} className="text-coral hover:underline">
                              {booking.customerName}
                            </Link>
                          </p>
                          <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {getBookingStatusLabel(booking.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Pickup</p>
                          <p className="font-semibold">{booking.pickupDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Return</p>
                          <p className="font-semibold">{booking.returnDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{booking.totalDays} days</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-semibold text-coral">₱{booking.totalAmount}</p>
                        </div>
                      </div>
                      {booking.payment && (
                        <div className="mb-4 text-sm text-gray-600">
                          <span className="font-semibold">Payment:</span>{' '}
                          <span className="">{getPaymentStatusLabel(booking.payment)}</span>
                          {typeof booking.payment.paid === 'number' && typeof booking.payment.total === 'number' && (
                            <>
                              {' '}• Paid: ₱{booking.payment.paid} / ₱{booking.payment.total}
                              {' '}({`Remaining: ₱${Math.max(booking.payment.total - booking.payment.paid, 0)}`})
                            </>
                          )}
                        </div>
                      )}
                      {booking.statusHistory && booking.statusHistory.length > 0 && (
                        <div className="mb-4 text-xs text-gray-700">
                          <p className="font-semibold mb-1">Rental Status Timeline</p>
                          <ul className="space-y-1 max-h-24 overflow-y-auto">
                            {booking.statusHistory.map((entry, index) => (
                              <li key={index} className="flex justify-between">
                                <span>{getTimelineStatusLabel(entry.status)}</span>
                                <span>{entry.at ? format(new Date(entry.at), 'PPp') : ''}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {booking.status === 'pending' && (
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleBookingAction(booking.id, 'approved')}
                            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve Booking</span>
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'rejected')}
                            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject Booking</span>
                          </button>
                          <button
                            onClick={() => navigate(`/chat/${booking.id}`)}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                          >
                            <span>Message</span>
                          </button>
                        </div>
                      )}

                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => setConditionBooking(booking)}
                          className="px-4 py-2 text-sm font-semibold text-coral border border-coral rounded-lg hover:bg-coral hover:text-white transition-colors"
                        >
                          View condition & penalties
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </div>

      {conditionBooking && (
        <CarConditionTracker
          booking={conditionBooking}
          onSave={() => setConditionBooking(null)}
          onClose={() => setConditionBooking(null)}
        />
      )}
    </>
  );
};

export default OwnerDashboard;
