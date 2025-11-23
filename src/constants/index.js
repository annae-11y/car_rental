// Form validation rules
export const VALIDATION_RULES = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    email: true
  },
  phone: {
    required: true,
    phone: true,
    minLength: 10,
    maxLength: 15
  },
  age: {
    required: true,
    min: 18,
    max: 100
  },
  idNumber: {
    required: true,
    minLength: 5,
    maxLength: 50
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 200
  },
  carBrand: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  carModel: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  plateNumber: {
    required: true,
    pattern: /^[A-Z0-9\s-]+$/,
    message: 'Plate number should contain only letters, numbers, spaces, and hyphens'
  },
  vin: {
    required: true,
    minLength: 17,
    maxLength: 17,
    pattern: /^[A-HJ-NPR-Z0-9]{17}$/,
    message: 'VIN must be 17 characters containing only letters and numbers'
  },
  mileage: {
    required: true,
    min: 0,
    max: 1000000
  },
  dailyRate: {
    required: true,
    min: 100,
    max: 10000
  }
};

// ID types
export const ID_TYPES = [
  { value: "Driver's License", label: "Driver's License" },
  { value: 'Passport', label: 'Passport' },
  { value: 'National ID', label: 'National ID' },
  { value: 'Student ID', label: 'Student ID' }
];

// Car types
export const CAR_TYPES = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Pickup', label: 'Pickup Truck' },
  { value: 'Van', label: 'Van' },
  { value: 'Sports Car', label: 'Sports Car' },
  { value: 'Luxury', label: 'Luxury' },
  { value: 'Convertible', label: 'Convertible' }
];

// Fuel types
export const FUEL_TYPES = [
  { value: 'Gasoline', label: 'Gasoline' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'CNG', label: 'CNG' }
];

// Transmission types
export const TRANSMISSION_TYPES = [
  { value: 'Manual', label: 'Manual' },
  { value: 'Automatic', label: 'Automatic' },
  { value: 'CVT', label: 'CVT' },
  { value: 'Semi-Automatic', label: 'Semi-Automatic' }
];

// Condition levels
export const CONDITION_LEVELS = [
  { value: 'excellent', label: 'Excellent (no damage)' },
  { value: 'good', label: 'Good (minor wear)' },
  { value: 'fair', label: 'Fair (noticeable wear/scratches)' },
  { value: 'poor', label: 'Poor (significant damage)' }
];

// Fuel levels
export const FUEL_LEVELS = [
  { value: 'full', label: 'Full' },
  { value: '3/4', label: '3/4 Full' },
  { value: '1/2', label: '1/2 Full' },
  { value: '1/4', label: '1/4 Full' },
  { value: 'empty', label: 'Empty' }
];

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  { value: 'gcash', label: 'GCash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' }
];

// Booking statuses
export const BOOKING_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  CUSTOMER: 'customer'
};

// Default penalty amounts
export const DEFAULT_PENALTIES = {
  minorScratch: 500,
  majorDamage: 5000,
  lowFuel: 1000,
  cleaningFee: 500,
  lateReturn: 1000,
  excessiveUsage: 2000,
  interiorDamage: 1500,
  exteriorDamage: 3000
};

// Time slots for pickup/return
export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Purpose of use options
export const PURPOSE_OF_USE = [
  { value: 'personal', label: 'Personal Use' },
  { value: 'business', label: 'Business Travel' },
  { value: 'vacation', label: 'Vacation/Tourism' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'other', label: 'Other' }
];

// Seating capacity options
export const SEATING_CAPACITY = [
  { value: 2, label: '2 Seats' },
  { value: 4, label: '4 Seats' },
  { value: 5, label: '5 Seats' },
  { value: 7, label: '7 Seats' },
  { value: 8, label: '8 Seats' },
  { value: 10, label: '10+ Seats' }
];

// Car features
export const CAR_FEATURES = [
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'gps', label: 'GPS Navigation' },
  { id: 'usb', label: 'USB Charging' },
  { id: 'bluetooth', label: 'Bluetooth' },
  { id: 'cruise_control', label: 'Cruise Control' },
  { id: 'parking_sensors', label: 'Parking Sensors' },
  { id: 'rear_camera', label: 'Rear Camera' },
  { id: 'leather_seats', label: 'Leather Seats' },
  { id: 'sunroof', label: 'Sunroof' },
  { id: 'premium_audio', label: 'Premium Audio System' }
];

// Safety features
export const SAFETY_FEATURES = [
  { id: 'abs', label: 'ABS' },
  { id: 'airbags', label: 'Airbags' },
  { id: 'traction_control', label: 'Traction Control' },
  { id: 'stability_control', label: 'Stability Control' },
  { id: 'lane_assist', label: 'Lane Assist' },
  { id: 'blind_spot', label: 'Blind Spot Detection' },
  { id: 'emergency_brake', label: 'Emergency Brake Assist' }
];
