import { create } from 'zustand';

const useStore = create((set, get) => ({
  // User state
  currentUser: null,
  isAuthenticated: false,
  
  // Notifications and Messages
  notifications: [],
  
  // Feedback data
  feedback: [],
  
  // Cars data
  cars: [
    {
      id: 1,
      name: 'Toyota Fortuner 2022',
      brand: 'Toyota',
      model: 'Fortuner',
      year: 2022,
      color: 'White',
      type: 'SUV',
      plateNumber: 'ABC1234',
      description: 'Well-maintained SUV perfect for family trips',
      condition: 'Excellent',
      dailyRate: 2500,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      capacity: 7,
      location: 'Naval, Biliran',
      images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'],
      ownerId: 2,
      ownerName: 'Juan dela Cruz',
      ownerPhone: '09123456789',
      ownerEmail: 'juan@email.com',
      status: 'approved',
      available: true,
      rating: 4.8,
      totalReviews: 24,
      airconditioned: true,
      photo: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
      rules: {
        speedLimit: '80 km/h',
        allowedArea: 'Biliran only',
        noRecklessDriving: true,
        noSmoking: true,
        handlingResponsibility: 'Renter responsible for minor damages under ₱2000',
        fuelPolicy: 'Return with same fuel level',
      },
    },
    {
      id: 2,
      name: 'Honda City 2023',
      brand: 'Honda',
      model: 'City',
      year: 2023,
      color: 'Gray',
      type: 'Sedan',
      plateNumber: 'XYZ5678',
      description: 'Fuel-efficient sedan for city drives',
      condition: 'Excellent',
      dailyRate: 1500,
      transmission: 'Automatic',
      fuelType: 'Gasoline',
      capacity: 5,
      location: 'Caibiran, Biliran',
      images: ['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'],
      ownerId: 3,
      ownerName: 'Maria Santos',
      ownerPhone: '09187654321',
      ownerEmail: 'maria@email.com',
      status: 'approved',
      available: true,
      rating: 4.6,
      totalReviews: 18,
      airconditioned: true,
      photo: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200',
      rules: {
        speedLimit: '70 km/h',
        allowedArea: 'Biliran only',
        noRecklessDriving: true,
        noSmoking: true,
        handlingResponsibility: 'Renter responsible for minor damages under ₱1500',
        fuelPolicy: 'Return with same fuel level',
      },
    },
    {
      id: 3,
      name: 'Mitsubishi Xpander 2021',
      brand: 'Mitsubishi',
      model: 'Xpander',
      year: 2021,
      color: 'Black',
      type: 'MPV',
      plateNumber: 'DEF9012',
      description: 'Spacious MPV for group travels',
      condition: 'Very Good',
      dailyRate: 2000,
      transmission: 'Manual',
      fuelType: 'Gasoline',
      capacity: 7,
      location: 'Naval, Biliran',
      images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
      ownerId: 2,
      ownerName: 'Juan dela Cruz',
      ownerPhone: '09123456789',
      ownerEmail: 'juan@email.com',
      status: 'approved',
      available: true,
      rating: 4.7,
      totalReviews: 15,
      airconditioned: true,
      photo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200',
      rules: {
        speedLimit: '75 km/h',
        allowedArea: 'Naval & Caibiran only',
        noRecklessDriving: true,
        noSmoking: true,
        handlingResponsibility: 'Renter responsible for damages as per inspection',
        fuelPolicy: 'Return with same fuel level',
      },
    },
  ],
  
  // Bookings data
  bookings: [],
  
  // Reviews data
  reviews: [],
  rentalAgreements: [],
  
  // Users data
  users: [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@elitedrive.com',
      phone: '09111111111',
      role: 'admin',
      password: 'admin123',
      verified: true,
      profilePic: null,
      dateOfBirth: '',
      address: '',
      emergencyContact: '',
      emergencyContactPhone: '',
      governmentId: null,
      driverLicense: null,
      governmentIdImage: null,
      verificationBadge: false,
      idVerificationAttempts: [],
    },
    {
      id: 2,
      name: 'Juan dela Cruz',
      email: 'juan@email.com',
      phone: '09123456789',
      role: 'owner',
      password: 'owner123',
      verified: true,
      profilePic: null,
      dateOfBirth: '1990-05-15',
      address: 'Naval, Biliran',
      emergencyContact: 'Maria dela Cruz',
      emergencyContactPhone: '09123456788',
      governmentId: null,
      driverLicense: null,
      governmentIdImage: null,
      verificationBadge: true,
      totalEarnings: 45000,
      totalRentals: 28,
      idVerificationAttempts: [],
    },
    {
      id: 3,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '09187654321',
      role: 'owner',
      password: 'owner123',
      verified: true,
      profilePic: null,
      dateOfBirth: '1992-08-22',
      address: 'Caibiran, Biliran',
      emergencyContact: 'Juan Santos',
      emergencyContactPhone: '09187654320',
      governmentId: null,
      driverLicense: null,
      governmentIdImage: null,
      verificationBadge: true,
      totalEarnings: 32000,
      totalRentals: 21,
      idVerificationAttempts: [],
    },
    {
      id: 4,
      name: 'Pedro Reyes',
      email: 'pedro@email.com',
      phone: '09198765432',
      role: 'customer',
      password: 'customer123',
      verified: true,
      profilePic: null,
      dateOfBirth: '1995-03-10',
      address: 'Biliran, Biliran',
      emergencyContact: 'Rosa Reyes',
      emergencyContactPhone: '09198765431',
      governmentId: null,
      driverLicense: null,
      governmentIdImage: null,
      verificationBadge: false,
      idVerificationAttempts: [],
    },
  ],
  
  // Actions
  login: (email, password) => {
    const users = get().users;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
  
  register: (userData) => {
    const users = get().users;
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }
    
    const newUser = {
      id: users.length + 1,
      ...userData,
      verified: false,
      verificationBadge: false,
      profilePic: null,
      dateOfBirth: userData.dateOfBirth || '',
      address: userData.address || '',
      emergencyContact: userData.emergencyContact || '',
      emergencyContactPhone: userData.emergencyContactPhone || '',
      governmentId: userData.governmentId || null,
      driverLicense: userData.driverLicense || null,
      totalEarnings: 0,
      totalRentals: 0,
      idVerificationAttempts: [],
    };
    
    set({ users: [...users, newUser] });
    return { success: true, user: newUser };
  },
  
  updateUser: (userId, updates) => {
    const users = get().users;
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...updates } : user
    );
    set({ users: updatedUsers });
    
    // Update current user if it's the logged-in user
    const currentUser = get().currentUser;
    if (currentUser && currentUser.id === userId) {
      set({ currentUser: { ...currentUser, ...updates } });
    }
  },
  
  addCar: (carData) => {
    const cars = get().cars;
    const currentUser = get().currentUser;
    
    const newCar = {
      id: cars.length + 1,
      ...carData,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      ownerPhone: currentUser.phone,
      ownerEmail: currentUser.email,
      status: 'pending',
      available: true,
      rating: 0,
      totalReviews: 0,
    };
    
    set({ cars: [...cars, newCar] });
    return { success: true, car: newCar };
  },
  
  updateCar: (carId, updates) => {
    const cars = get().cars;
    const updatedCars = cars.map(car => 
      car.id === carId ? { ...car, ...updates } : car
    );
    set({ cars: updatedCars });
  },
  
  deleteCar: (carId) => {
    const cars = get().cars;
    set({ cars: cars.filter(car => car.id !== carId) });
  },
  
  createBooking: (bookingData) => {
    const bookings = get().bookings;
    const currentUser = get().currentUser;
    const cars = get().cars;
    const car = cars.find(c => c.id === bookingData.carId);
    const createdAt = new Date().toISOString();

    // Check for booking conflicts first
    const conflicts = get().checkBookingConflict(bookingData.carId, bookingData.pickupDate, bookingData.returnDate);
    if (conflicts.length > 0) {
      // Suggest alternative cars available for the same dates
      const alternatives = get().getAvailableCars(bookingData.pickupDate, bookingData.returnDate).filter(c => c.id !== bookingData.carId);

      // Suggest next available date for this car (nearest end of conflicting booking)
      const nextAvailableDate = conflicts.reduce((latest, b) => {
        const bReturn = new Date(b.returnDate);
        return bReturn > latest ? bReturn : latest;
      }, new Date()).toISOString().split('T')[0];

      return {
        success: false,
        message: 'This car is unavailable on the selected dates. Please choose another date or select another available car.',
        suggestions: {
          alternativeCars: alternatives.slice(0,3),
          nextAvailableDate,
        }
      };
    }

    const reference = `EDR-${String(bookings.length + 1).padStart(5, '0')}`;

    const newBooking = {
      id: bookings.length + 1,
      ...bookingData,
      reference,
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone,
      status: 'pending',
      approvalStatus: 'pending',
      createdAt,
      beforePhoto: null,
      afterPhoto: null,
      conditionNotes: '',
      conditionStatus: 'Good',
      statusHistory: [
        { status: 'pending', at: createdAt },
        { status: 'payment_pending', at: createdAt },
      ],
      messages: [],
      pickupLocation: bookingData.pickupLocation || (car ? car.location : ''),
      returnLocation: bookingData.returnLocation || (car ? car.location : ''),
      sameLocationReturn: bookingData.sameLocationReturn !== undefined ? bookingData.sameLocationReturn : true,
      securityDeposit: bookingData.securityDeposit || 0,
      addons: bookingData.addons || {},
      addonsTotal: bookingData.addonsTotal || 0,
      promoCode: bookingData.promoCode || null,
      discountAmount: bookingData.discountAmount || 0,
      lateFees: bookingData.lateFees || 0,
      conditionChecklist: bookingData.conditionChecklist || null,
      payment: {
        status: 'pending',
        paid: 0,
        total: bookingData.totalAmount || 0,
        method: bookingData.paymentMethod || 'cash',
        securityDeposit: bookingData.securityDeposit || 0,
        addonsTotal: bookingData.addonsTotal || 0,
        discountAmount: bookingData.discountAmount || 0,
        lateFees: bookingData.lateFees || 0,
      },
      agreedToTerms: bookingData.agreedToTerms || false,
    };

    set({ bookings: [...bookings, newBooking] });

    // Add notification for owner
    const notifications = get().notifications;
    const ownerNotification = {
      id: notifications.length + 1,
      type: 'booking_request',
      userId: car.ownerId,
      title: 'New Booking Request Pending Approval',
      message: `${currentUser.name} requested to book ${car.name} from ${bookingData.pickupDate} to ${bookingData.returnDate}. Please review and approve or reject this booking.`,
      bookingId: newBooking.id,
      read: false,
      createdAt: new Date().toISOString(),
    };

    set({ notifications: [...notifications, ownerNotification] });

    return { success: true, booking: newBooking };
  },
  
  approveBooking: (bookingId) => {
    const bookings = get().bookings;
    const notifications = get().notifications;
    
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found' };
    
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'approved', approvalStatus: 'approved', statusHistory: [...(b.statusHistory||[]), { status: 'approved', at: new Date().toISOString() }] } : b
    );
    
    set({ bookings: updatedBookings });
    
    // Add notification for customer
    const customerNotification = {
      id: notifications.length + 1,
      type: 'booking_approved',
      userId: booking.customerId,
      title: 'Booking Approved!',
      message: 'Your booking has been approved.',
      bookingId: bookingId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    set({ notifications: [...notifications, customerNotification] });
    
    return { success: true, message: 'Booking approved' };
  },
  
  rejectBooking: (bookingId, reason = '') => {
    const bookings = get().bookings;
    const notifications = get().notifications;
    
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found' };
    
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'rejected', approvalStatus: 'rejected', rejectionReason: reason } : b
    );
    
    set({ bookings: updatedBookings });
    
    // Add notification for customer
    const customerNotification = {
      id: notifications.length + 1,
      type: 'booking_rejected',
      userId: booking.customerId,
      title: 'Booking Rejected',
      message: `Your booking for ${booking.carName} has been rejected. ${reason ? `Reason: ${reason}` : ''}`,
      bookingId: bookingId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    set({ notifications: [...notifications, customerNotification] });
    
    return { success: true, message: 'Booking rejected' };
  },
  
  addNotification: (notification) => {
    const notifications = get().notifications;
    const newNotification = {
      id: notifications.length + 1,
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    };
    set({ notifications: [...notifications, newNotification] });
  },

  // Messaging for transactions
  sendMessage: (bookingId, fromUserId, toUserId, text) => {
    const bookings = get().bookings;
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found' };

    const msg = { id: (booking.messages||[]).length + 1, bookingId, from: fromUserId, to: toUserId, text, createdAt: new Date().toISOString() };
    const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, messages: [...(b.messages||[]), msg] } : b);
    set({ bookings: updatedBookings });
    return { success: true, message: msg };
  },

  getMessagesByBooking: (bookingId) => {
    const bookings = get().bookings;
    const booking = bookings.find(b => b.id === bookingId);
    return booking ? (booking.messages || []) : [];
  },

  // Owner uploads condition photos
  uploadBeforePhoto: (bookingId, imageUrl, notes = '') => {
    const bookings = get().bookings;
    const updated = bookings.map(b => b.id === bookingId ? { ...b, beforePhoto: imageUrl, conditionNotes: notes, conditionStatus: b.conditionStatus || 'Good' } : b);
    set({ bookings: updated });
  },

  uploadAfterPhoto: (bookingId, imageUrl, notes = '', status = 'Good') => {
    const bookings = get().bookings;
    const updated = bookings.map(b => b.id === bookingId ? { ...b, afterPhoto: imageUrl, conditionNotes: notes, conditionStatus: status, statusHistory: [...(b.statusHistory||[]), { status: 'returned', at: new Date().toISOString() }] } : b);
    set({ bookings: updated });
  },

  // Parse government ID (mocked stub for autofill)
  parseGovernmentIdImage: async (imageFileOrUrl) => {
    // This is a mock parser. In production integrate OCR service.
    // We'll return sample extracted data to autofill forms.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'Extracted Name', address: 'Extracted Address', dateOfBirth: '1990-01-01' });
      }, 600);
    });
  },
  
  recordIdVerificationAttempt: (success) => {
    const currentUser = get().currentUser;
    if (!currentUser) return;

    const users = get().users;

    const updatedUsers = users.map(user => {
      if (user.id !== currentUser.id) return user;
      const attempts = user.idVerificationAttempts || [];
      const newAttempt = {
        id: attempts.length + 1,
        success,
        at: new Date().toISOString(),
      };
      const updatedUser = {
        ...user,
        idVerificationAttempts: [...attempts, newAttempt],
      };
      if (success) {
        updatedUser.verified = true;
        updatedUser.verificationBadge = true;
      }
      return updatedUser;
    });

    const updatedCurrent = updatedUsers.find(u => u.id === currentUser.id);
    set({ users: updatedUsers, currentUser: updatedCurrent });
  },
  
  markNotificationAsRead: (notificationId) => {
    const notifications = get().notifications;
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    set({ notifications: updated });
  },
  
  addFeedback: (feedbackData) => {
    const feedback = get().feedback;
    const currentUser = get().currentUser;
    
    const newFeedback = {
      id: feedback.length + 1,
      ...feedbackData,
      userId: currentUser.id,
      userName: currentUser.name,
      createdAt: new Date().toISOString(),
    };
    
    set({ feedback: [...feedback, newFeedback] });
    return { success: true, feedback: newFeedback };
  },
  
  updateBooking: (bookingId, updates) => {
    const bookings = get().bookings;
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, ...updates } : booking
    );
    set({ bookings: updatedBookings });
  },
  
  addReview: (reviewData) => {
    const reviews = get().reviews;
    const currentUser = get().currentUser;
    
    const newReview = {
      id: reviews.length + 1,
      ...reviewData,
      userId: currentUser.id,
      userName: currentUser.name,
      createdAt: new Date().toISOString(),
    };
    
    set({ reviews: [...reviews, newReview] });
    
    // Update car rating
    const cars = get().cars;
    const carReviews = [...reviews, newReview].filter(r => r.carId === reviewData.carId);
    const avgRating = carReviews.reduce((sum, r) => sum + r.rating, 0) / carReviews.length;
    
    const updatedCars = cars.map(car => 
      car.id === reviewData.carId 
        ? { ...car, rating: avgRating, totalReviews: carReviews.length }
        : car
    );
    
    set({ cars: updatedCars });
    return { success: true, review: newReview };
  },
  
  // Filter helpers
  getCarsByOwner: (ownerId) => {
    const cars = get().cars;
    return cars.filter(car => car.ownerId === ownerId);
  },
  
  getBookingsByCustomer: (customerId) => {
    const bookings = get().bookings;
    return bookings.filter(booking => booking.customerId === customerId);
  },
  
  getBookingsByOwner: (ownerId) => {
    const bookings = get().bookings;
    const cars = get().cars;
    const ownerCarIds = cars.filter(car => car.ownerId === ownerId).map(car => car.id);
    return bookings.filter(booking => ownerCarIds.includes(booking.carId));
  },
  
  checkBookingConflict: (carId, pickupDate, returnDate) => {
    const bookings = get().bookings;
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    return bookings.filter(booking => {
      if (booking.carId !== carId) return false;
      if (booking.status === 'cancelled' || booking.status === 'rejected') return false;
      
      const bookingPickup = new Date(booking.pickupDate);
      const bookingReturn = new Date(booking.returnDate);
      
      // Check for overlap
      return pickup < bookingReturn && returnD > bookingPickup;
    });
  },
  
  getAvailableCars: (pickupDate, returnDate) => {
    const cars = get().cars;
    const bookings = get().bookings;
    
    return cars.filter(car => {
      if (!car.available || car.status !== 'approved') return false;
      
      const conflicts = bookings.filter(booking => {
        if (booking.carId !== car.id) return false;
        if (booking.status === 'cancelled' || booking.status === 'rejected') return false;
        
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const bookingPickup = new Date(booking.pickupDate);
        const bookingReturn = new Date(booking.returnDate);
        
        return pickup < bookingReturn && returnD > bookingPickup;
      });
      
      return conflicts.length === 0;
    });
  },

  createRentalAgreement: (agreementData) => {
    const agreements = get().rentalAgreements || [];
    const newAgreement = {
      id: agreements.length + 1,
      ...agreementData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set({ rentalAgreements: [...agreements, newAgreement] });
    return { success: true, agreement: newAgreement };
  },

  updateRentalAgreement: (agreementId, updates) => {
    const agreements = get().rentalAgreements || [];
    let updatedAgreement = null;

    const updatedAgreements = agreements.map(agreement => {
      if (agreement.id !== agreementId) return agreement;
      updatedAgreement = {
        ...agreement,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return updatedAgreement;
    });

    set({ rentalAgreements: updatedAgreements });

    if (!updatedAgreement) {
      return { success: false, message: 'Agreement not found' };
    }

    return { success: true, agreement: updatedAgreement };
  },

  getRentalAgreementByOwner: (ownerId) => {
    const agreements = get().rentalAgreements || [];
    return agreements.find(agreement => agreement.ownerId === ownerId) || null;
  },
}));

export default useStore;
