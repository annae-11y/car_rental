import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, MapPin, Users, Upload, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import IDScanner from '../components/IDScanner';
import logo from '../assets/logos/final logo EliteDrive.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    governmentId: null,
    driverLicense: null,
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [idPreview, setIdPreview] = useState({ governmentId: null, driverLicense: null });
  const [showIdScanner, setShowIdScanner] = useState(false);
  const { register, addNotification, parseGovernmentIdImage } = useStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [fieldName]: reader.result
        });
        setIdPreview({
          ...idPreview,
          [fieldName]: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanConfirm = async (imageDataUrl, _extractedText) => {
    const targetField = formData.role === 'customer' ? 'driverLicense' : 'governmentId';

    setFormData(prev => ({
      ...prev,
      [targetField]: imageDataUrl,
    }));

    setIdPreview(prev => ({
      ...prev,
      [targetField]: imageDataUrl,
    }));

    try {
      const parsed = await parseGovernmentIdImage(imageDataUrl);
      if (parsed) {
        setFormData(prev => ({
          ...prev,
          name: prev.name || parsed.name || prev.name,
          address: prev.address || parsed.address || prev.address,
          dateOfBirth: prev.dateOfBirth || parsed.dateOfBirth || prev.dateOfBirth,
        }));
      }
    } catch {
      // Silent fail for mock parser
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.dateOfBirth) {
      setError('Date of birth is required');
      return;
    }

    if (!formData.address) {
      setError('Address is required');
      return;
    }

    if (!formData.emergencyContact) {
      setError('Emergency contact name is required');
      return;
    }

    if (!formData.emergencyContactPhone) {
      setError('Emergency contact phone is required');
      return;
    }

    if (formData.role === 'customer' && !formData.driverLicense) {
      setError('Driver\'s License upload is required for renters');
      return;
    }

    if (formData.role === 'owner' && !formData.governmentId) {
      setError('Government ID upload is required for owners');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms & Conditions');
      return;
    }
    
    const result = register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      emergencyContactPhone: formData.emergencyContactPhone,
      governmentId: formData.governmentId,
      driverLicense: formData.driverLicense,
    });
    
    if (result.success) {
      setSuccess('✓ Account created successfully! Redirecting to login...');
      addNotification({
        type: 'signup_success',
        title: 'Welcome to Elite Drive!',
        message: `Welcome ${formData.name}! Your account has been created successfully.`,
      });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-softwhite">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <img src={logo} alt="Elite Drive logo" className="w-12 h-12 rounded-full object-contain" />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-charcoal">Join Elite Drive</h2>
            <p className="text-gray-600 mt-2">Create your account to get started</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-3">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === 'customer' ? 'border-coral bg-coral bg-opacity-5' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === 'customer'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="font-semibold text-charcoal">Rent a Car</span>
                </label>
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.role === 'owner' ? 'border-coral bg-coral bg-opacity-5' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === 'owner'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="font-semibold text-charcoal">List My Car</span>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-charcoal mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="09123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Full Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="Street, City, Province"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-charcoal mb-4">Emergency Contact</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Contact Name</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="emergencyContact"
                      required
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="Contact person name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      required
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="09123456789"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ID Upload */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-charcoal mb-4">
                {formData.role === 'customer' ? "Driver's License" : 'Government ID'}
              </h3>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">
                  Upload {formData.role === 'customer' ? "Driver's License" : 'Government ID'} (Required)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, formData.role === 'customer' ? 'driverLicense' : 'governmentId')}
                    className="hidden"
                    id={formData.role === 'customer' ? 'driverLicense' : 'governmentId'}
                  />
                  <label htmlFor={formData.role === 'customer' ? 'driverLicense' : 'governmentId'} className="cursor-pointer">
                    <Upload className="w-8 h-8 text-coral mx-auto mb-2" />
                    <p className="text-sm font-semibold text-charcoal">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                {idPreview[formData.role === 'customer' ? 'driverLicense' : 'governmentId'] && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-charcoal mb-2">Preview:</p>
                    <img
                      src={idPreview[formData.role === 'customer' ? 'driverLicense' : 'governmentId']}
                      alt="ID Preview"
                      className="max-w-xs h-auto rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowIdScanner(true)}
                    className="text-xs font-semibold text-coral border border-coral px-3 py-2 rounded-lg hover:bg-coral hover:text-white transition-colors"
                  >
                    Use ID Scanner (OCR)
                  </button>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-charcoal mb-4">Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-coral"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-coral"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="border-t pt-6">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-coral rounded focus:ring-2 focus:ring-coral"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-coral font-semibold hover:underline">
                    Terms & Conditions
                  </Link>
                  {' '}and understand the{' '}
                  <Link to="/fines" className="text-coral font-semibold hover:underline">
                    fines and penalties
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-coral font-semibold hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>

      {showIdScanner && (
        <IDScanner
          expectedName={formData.name}
          onClose={() => setShowIdScanner(false)}
          onConfirm={handleScanConfirm}
        />
      )}
    </div>
  );
};

export default Register;
