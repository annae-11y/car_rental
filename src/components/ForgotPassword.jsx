import React, { useState } from 'react';
import { Mail, Key, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import useStore from '../store/useStore';

const ForgotPassword = ({ onClose }) => {
  const { users, resetUserPassword } = useStore();
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // EmailJS Configuration
  // Get your credentials from https://dashboard.emailjs.com/
  // 1. Create an account and add an email service
  // 2. Create an email template with variables: {{to_name}}, {{reset_code}}, {{app_name}}
  // 3. Copy your Service ID, Template ID, and Public Key below
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if email exists
    const user = users.find(u => u.email === email.trim());
    if (!user) {
      setError('Email not found. Please check and try again.');
      setLoading(false);
      return;
    }

    // Generate 6-digit code
    const resetCode = generateCode();
    setGeneratedCode(resetCode);

    // Send email via EmailJS
    try {
      const templateParams = {
        to_email: email,
        to_name: user.name,
        reset_code: resetCode,
        app_name: 'Elite Drive',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSuccess(`Verification code sent to ${email}`);
      setStep(2);
    } catch (err) {
      // For development: Check browser console for detailed error
      // For production: Log to error monitoring service
      setError('Failed to send email. Please check your EmailJS configuration or try again later.');
    }
    setLoading(false);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');

    if (code.trim() !== generatedCode) {
      setError('Invalid verification code. Please check your email and try again.');
      return;
    }

    setSuccess('Code verified! Please set your new password.');
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Reset password in store
    const success = resetUserPassword(email, newPassword);
    if (success) {
      setSuccess('Password reset successfully! You can now login with your new password.');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gradient-to-r from-coral to-red-400">
          <h3 className="font-poppins text-lg font-semibold text-white">Forgot Password</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-coral' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-coral text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="text-sm font-semibold">Email</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-coral' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-coral' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-coral text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="text-sm font-semibold">Code</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-coral' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-coral' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-coral text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="text-sm font-semibold">Reset</span>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter the email address associated with your account</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full gradient-btn text-white font-semibold py-3 rounded-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}`}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Verification Code</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
              </div>
              <button
                type="submit"
                className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Verify Code
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full border border-gray-300 text-charcoal font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                Back to Email
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
