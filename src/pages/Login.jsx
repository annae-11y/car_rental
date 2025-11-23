import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Car, CheckCircle, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import logo from '../assets/logos/final logo EliteDrive.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, addNotification } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const result = login(email, password);
    
    if (result.success) {
      setSuccess(`✓ Welcome back, ${result.user.name}!`);
      addNotification({
        type: 'login_success',
        title: 'Login Successful',
        message: `Welcome back, ${result.user.name}!`,
      });
      
      // Redirect based on user role
      setTimeout(() => {
        switch (result.user.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'owner':
            navigate('/dashboard/owner');
            break;
          case 'customer':
            navigate('/dashboard/customer');
            break;
          default:
            navigate('/');
        }
      }, 1000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-softwhite">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
              <img src={logo} alt="Elite Drive logo" className="w-12 h-12 rounded-full object-contain" />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-charcoal">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login to your Elite Drive account</p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-coral hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-coral font-semibold hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
