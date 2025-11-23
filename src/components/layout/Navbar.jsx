import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut, LayoutDashboard, Bell } from 'lucide-react';
import useStore from '../../store/useStore';
import logo from '../../assets/logos/final logo EliteDrive.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { isAuthenticated, currentUser, logout, notifications, markNotificationAsRead } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/';
    switch (currentUser.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'owner':
        return '/dashboard/owner';
      case 'customer':
        return '/dashboard/customer';
      default:
        return '/';
    }
  };

  const userNotifications = currentUser
    ? (notifications || []).filter(n => n.userId === currentUser.id)
    : [];

  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleToggleNotifications = () => {
    if (!isNotifOpen && currentUser) {
      userNotifications
        .filter(n => !n.read)
        .forEach(n => markNotificationAsRead(n.id));
    }
    setIsNotifOpen(!isNotifOpen);
  };

  return (
    <nav className="bg-charcoal text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="Elite Drive logo" className="w-12 h-12 rounded-full object-contain group-hover:scale-110 transition-transform" />
            <span className="font-poppins text-2xl font-bold">
              Elite <span className="text-coral">Drive</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-coral transition-colors">
              Home
            </Link>
            <Link to="/cars" className="hover:text-coral transition-colors">
              Browse Cars
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="hover:text-coral transition-colors flex items-center space-x-1"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleToggleNotifications}
                    className="relative p-2 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white text-charcoal rounded-xl shadow-xl border border-gray-200 z-50">
                      <div className="px-4 py-2 border-b flex items-center justify-between">
                        <span className="text-sm font-semibold">Notifications</span>
                        {unreadCount === 0 ? (
                          <span className="text-[11px] text-gray-500">All caught up</span>
                        ) : (
                          <span className="text-[11px] text-red-500 font-semibold">{unreadCount} new</span>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto divide-y">
                        {userNotifications.length === 0 ? (
                          <div className="px-4 py-4 text-xs text-gray-500">No notifications yet.</div>
                        ) : (
                          [...userNotifications].reverse().map((n) => (
                            <div
                              key={n.id}
                              className={`px-4 py-3 text-xs hover:bg-gray-50 transition-colors ${
                                !n.read ? 'bg-coral/5' : ''
                              }`}
                            >
                              <p className="font-semibold text-charcoal text-[11px] mb-0.5">{n.title}</p>
                              <p className="text-gray-600 text-[11px] leading-snug">{n.message}</p>
                              <p className="mt-1 text-[10px] text-gray-400">
                                {new Date(n.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Link 
                  to="/profile" 
                  className="hover:text-coral transition-colors flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span>{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-coral transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-coral transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="gradient-btn px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-charcoal border-t border-gray-700">
          <div className="px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className="block hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="block hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Cars
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="block hover:text-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="block hover:text-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile ({currentUser.name})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-coral transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block hover:text-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block gradient-btn px-6 py-2 rounded-full text-white font-semibold text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
