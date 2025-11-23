import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, Star, Clock, Car, MapPin, DollarSign, Zap, Play, X, Image as ImageIcon, MessageCircle } from 'lucide-react';
import useStore from '../store/useStore';
import logo from '../assets/logos/final logo EliteDrive.png';
import poster from '../assets/images/poster elite drive.png';

const Home = () => {
  const { cars } = useStore();
  const featuredCars = cars.filter(car => car.status === 'approved' && car.available).slice(0, 3);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-charcoal via-gray-800 to-charcoal text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="font-poppins text-5xl md:text-6xl font-bold leading-tight">
              Discover <span className="text-coral">Elite Drive Car Rental</span> in Biliran
              <br className="hidden md:block" />
              Luxury and Comfort on Every Trip
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rent the perfect vehicle for your journey. Whether it's business, leisure, or adventure - we've got you covered.
            </p>
            
            <Link 
              to="/cars"
              className="inline-block mt-8 gradient-btn text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all"
            >
              Browse All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-center mb-12 text-charcoal">
            Why Choose <span className="text-coral">Elite Drive?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full">
                <Shield className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-charcoal">Verified Cars</h3>
              <p className="text-gray-600">All vehicles are inspected and verified for your safety</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full">
                <DollarSign className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-charcoal">Best Prices</h3>
              <p className="text-gray-600">Competitive rates with transparent pricing, no hidden fees</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full">
                <Clock className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-charcoal">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer service for your peace of mind</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-coral bg-opacity-10 rounded-full">
                <Zap className="w-8 h-8 text-coral" />
              </div>
              <h3 className="font-poppins text-xl font-semibold text-charcoal">Instant Booking</h3>
              <p className="text-gray-600">Book in minutes and get instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-softwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal">
              Featured <span className="text-coral">Cars</span>
            </h2>
            <Link 
              to="/cars"
              className="text-coral hover:underline font-semibold flex items-center space-x-2"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map(car => (
              <Link 
                key={car.id}
                to={`/cars/${car.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={car.images[0]} 
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-charcoal">
                    ₱{car.dailyRate}/day
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <h3 className="font-poppins text-xl font-semibold text-charcoal">{car.name}</h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <img src={logo} alt="car" className="w-6 h-6 rounded-full object-contain" />
                      <span>{car.type}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{car.location}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-coral text-coral" />
                      <span className="font-semibold text-charcoal">{car.rating}</span>
                      <span className="text-gray-500 text-sm">({car.totalReviews})</span>
                    </div>
                    <span className="text-coral font-semibold">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-charcoal mb-4">
              About <span className="text-coral">Elite Drive</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Your trusted car rental platform in Biliran, connecting car owners with renters for seamless, affordable mobility solutions.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setShowLogoModal(true)}
                className="flex items-center justify-center px-6 py-3 bg-coral text-white rounded-lg font-medium hover:bg-red-500 transition-colors shadow-md hover:shadow-lg"
              >
                <img src={logo} alt="Logo" className="w-6 h-6 mr-2" />
                View Logo
              </button>
              
              <button 
                onClick={() => setShowPosterModal(true)}
                className="flex items-center justify-center px-6 py-3 bg-coral text-white rounded-lg font-medium hover:bg-red-500 transition-colors shadow-md hover:shadow-lg"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                View Poster
              </button>
              
              <button 
                onClick={() => setShowVideoModal(true)}
                className="flex items-center justify-center px-6 py-3 bg-coral text-white rounded-lg font-medium hover:bg-red-500 transition-colors shadow-md hover:shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Why Choose Us */}
            <div className="space-y-6">
              <h3 className="text-2xl font-poppins font-bold text-charcoal">Why Elite Drive?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-coral font-bold mt-1">✓</span>
                  <span><strong>Verified Vehicles:</strong> All cars are inspected and verified for safety and quality</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-coral font-bold mt-1">✓</span>
                  <span><strong>Best Prices:</strong> Competitive rates with transparent pricing, no hidden fees</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-coral font-bold mt-1">✓</span>
                  <span><strong>Easy Booking:</strong> Simple and fast booking process in just a few clicks</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-coral font-bold mt-1">✓</span>
                  <span><strong>24/7 Support:</strong> Round-the-clock customer service for your peace of mind</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-coral font-bold mt-1">✓</span>
                  <span><strong>Local Community:</strong> Supporting local car owners and renters in Biliran</span>
                </li>
              </ul>
            </div>

            {/* Right: Quick Links */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
              <h3 className="text-2xl font-poppins font-bold text-charcoal mb-6">Quick Links</h3>
              <div className="space-y-4">
                <a 
                  href="#featured-cars" 
                  className="block px-6 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Car className="w-5 h-5 mr-3 text-coral" />
                  Browse Available Cars
                </a>
                <a 
                  href="#how-it-works" 
                  className="block px-6 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Zap className="w-5 h-5 mr-3 text-coral" />
                  How It Works
                </a>
                <a 
                  href="#testimonials" 
                  className="block px-6 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Star className="w-5 h-5 mr-3 text-coral" />
                  Customer Testimonials
                </a>
                <a 
                  href="#contact" 
                  className="block px-6 py-3 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <MessageCircle className="w-5 h-5 mr-3 text-coral" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowLogoModal(false)}>
          <div className="relative max-w-md w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-coral transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center p-6">
              <img 
                src={logo} 
                alt="Elite Drive Logo" 
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-coral transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/sMvkA4sb56U?si=dCX_B13QNHc_YF42&autoplay=1"
                title="Elite Drive - Our Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Poster Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowPosterModal(false)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-coral transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={poster} 
                alt="Elite Drive Poster" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-coral to-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Have a car? Earn extra income!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Elite Drive as a car owner and start earning by renting out your vehicle to trusted customers.
          </p>
          <Link 
            to="/register"
            className="inline-block bg-white text-coral font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Become a Host
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
