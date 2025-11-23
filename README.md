# Elite Drive - Premium Car Rental Platform

![Elite Drive](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3.6-06B6D4)

**Elite Drive** is a comprehensive two-sided car rental marketplace built for Biliran, Philippines. The platform connects car owners who want to earn income from their vehicles with customers who need reliable transportation.

---

## 🚗 Features

### For Customers (Renters)
- **Browse & Search**: Filter cars by type, price, location, transmission, and fuel type
- **Detailed Car Listings**: View comprehensive car information with photos, specifications, and ratings
- **Easy Booking**: Select dates, choose payment method, and book instantly
- **Booking Management**: Track all bookings with real-time status updates
- **Reviews & Ratings**: Rate cars and owners after completing rentals

### For Car Owners
- **List Your Car**: Add multiple vehicles with photos, descriptions, and pricing
- **Manage Availability**: Set your car's availability status
- **Approve Bookings**: Review and approve/reject booking requests
- **Track Earnings**: Monitor total earnings and rental statistics
- **Vehicle Management**: Edit car details, pricing, and availability

### For Administrators
- **Dashboard Analytics**: View platform-wide statistics and metrics
- **User Management**: Monitor all users (customers, owners, admins)
- **Car Approvals**: Review and approve new car listings
- **Booking Oversight**: Monitor all transactions and bookings
- **Revenue Tracking**: Track total platform revenue

---

## 🎨 Design System

### Color Palette
- **Charcoal Gray** (#2E2E2E): Primary text and UI elements
- **Silver Gray** (#D9D9D9): Secondary elements and borders
- **Coral Red** (#FF6B6B): Accent color for CTAs and highlights
- **Soft White** (#F8F8F8): Background color

### Typography
- **Headings**: Poppins Bold
- **Body Text**: Inter Regular

---

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite

---

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Setup Instructions

1. **Clone or navigate to the project directory**
```bash
cd car_rental
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

---

## 🔐 Demo Credentials

Use these credentials to test different user roles:

### Admin Account
- **Email**: admin@elitedrive.com
- **Password**: admin123
- **Access**: Full platform management and analytics

### Car Owner Account
- **Email**: juan@email.com
- **Password**: owner123
- **Access**: List cars, manage bookings, view earnings

### Customer Account
- **Email**: pedro@email.com
- **Password**: customer123
- **Access**: Browse and book cars

---

## 📱 User Roles

### 1. Customer
- Browse available cars
- Filter and search vehicles
- Book cars for specific dates
- View booking history
- Rate and review cars

### 2. Car Owner
- Add and manage car listings
- Upload car photos
- Set daily rental rates
- Approve/reject booking requests
- Track earnings and performance

### 3. Administrator
- Approve new car listings
- Monitor all users and activities
- View platform analytics
- Manage bookings and disputes
- Track revenue metrics

---

## 🗂️ Project Structure

```
car_rental/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CarListing.jsx
│   │   ├── CarDetails.jsx
│   │   ├── BookingPage.jsx
│   │   ├── CustomerDashboard.jsx
│   │   ├── OwnerDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Profile.jsx
│   ├── store/
│   │   └── useStore.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Core Functionalities

### Car Listing System
- Add car with complete details (brand, model, year, color, type)
- Upload multiple photos (camera or file upload)
- Set daily rental rates
- Specify transmission type, fuel type, and capacity
- Define pickup location
- Admin approval workflow

### Booking System
- Real-time availability checking
- Date range selection with calendar
- Automatic price calculation based on rental duration
- Multiple payment options (Cash, GCash)
- Booking status tracking (pending, approved, completed)
- Email/SMS notifications (ready for integration)

### Search & Filters
- Search by car name
- Filter by car type (SUV, Sedan, MPV, Van, Motorcycle)
- Filter by transmission (Automatic/Manual)
- Filter by fuel type (Gasoline/Diesel/Electric)
- Filter by location
- Sort by price (low to high, high to low)
- Sort by rating

### Dashboard Features
- **Customer Dashboard**: View all bookings, track status, booking history
- **Owner Dashboard**: Manage cars, approve bookings, view earnings
- **Admin Dashboard**: Platform analytics, user management, car approvals

---

## 🔧 Future Enhancements

### Phase 2 Features (Optional)
- [ ] GPS Car Tracking integration
- [ ] Insurance Partner API integration
- [ ] E-signature for rental agreements
- [ ] Promotional coupon system
- [ ] Multi-language support (English, Filipino, Waray)
- [ ] Push notifications
- [ ] In-app messaging between owners and renters
- [ ] Payment gateway integration (GCash/PayMaya API)
- [ ] Google Maps API for location
- [ ] Automated receipt/invoice PDF generation
- [ ] AI image quality detection
- [ ] ID and license verification system
- [ ] Document upload (OR/CR, insurance)

### Monetization Strategy
- Commission on each booking
- Featured car listings (premium placement)
- Insurance offerings
- Advertising space for local businesses

---

## 🌟 Key Features Implemented

✅ Multi-role authentication (Customer, Owner, Admin)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Car listing with image gallery  
✅ Advanced search and filtering  
✅ Booking management system  
✅ Owner earnings tracking  
✅ Admin analytics dashboard  
✅ Rating and review system  
✅ Profile management  
✅ Availability calendar  
✅ Status workflow (pending → approved → completed)  

---

## 📄 License

This project is created for Elite Drive car rental service in Biliran, Philippines.

---

## 👨‍💻 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📞 Support

For issues, questions, or suggestions:
- **Email**: info@elitedrive.com
- **Phone**: +63 912 345 6789
- **Location**: Naval, Biliran, Philippines

---

## 🎉 Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Login with demo credentials
4. Explore the platform as different user types

**Happy Renting! 🚗💨**

---

Made with ❤️ in Biliran | Elite Drive © 2025
