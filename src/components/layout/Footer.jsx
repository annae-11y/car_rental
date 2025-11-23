import React from 'react';
import { Car, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/final logo EliteDrive.png';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Elite Drive logo" className="w-12 h-12 rounded-full object-contain" />
              <span className="font-poppins text-2xl font-bold">
                Elite <span className="text-coral">Drive</span>
              </span>
            </div>
            <p className="text-silver text-sm">
              Your premium car rental partner in Biliran. Rent with confidence, drive with pride.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-coral transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-coral transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-silver text-sm">
              <li>
                <Link to="/" className="hover:text-coral transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-coral transition-colors">Browse Cars</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-coral transition-colors">Become a Host</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-coral transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-silver text-sm">
              <li>
                <Link to="/help" className="hover:text-coral transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-coral transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-coral transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-coral transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-silver text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
                <span>Naval, Biliran, Philippines</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-coral flex-shrink-0" />
                <span>+63 912 345 6789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-coral flex-shrink-0" />
                <span>info@elitedrive.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-silver text-sm">
          <p>&copy; {new Date().getFullYear()} Elite Drive. All rights reserved. Made with ❤️ in Biliran</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
