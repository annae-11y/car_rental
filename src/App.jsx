import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetails';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import TermsConditions from './pages/TermsConditions';
import Fines from './pages/Fines';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';
import ChatPage from './pages/ChatPage';
import UserProfile from './pages/UserProfile';

function App() {
  const { isAuthenticated, currentUser } = useStore();

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/fines" element={<Fines />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<AboutUs />} />
            
            <Route 
              path="/booking/:carId" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <BookingPage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/customer" 
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/owner" 
              element={
                <ProtectedRoute allowedRoles={['owner']}>
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            <Route
              path="/users/:id"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route 
              path="/chat/:bookingId"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
