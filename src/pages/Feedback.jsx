import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';

const Feedback = () => {
  const navigate = useNavigate();
  const { currentUser, addFeedback } = useStore();
  const [formData, setFormData] = useState({
    bookingId: '',
    carName: '',
    ownerName: '',
    rating: 5,
    cleanliness: 5,
    condition: 5,
    communication: 5,
    comment: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!currentUser || currentUser.role !== 'customer') {
    return (
      <div className="min-h-screen bg-softwhite flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-coral mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-charcoal mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Only renters can submit feedback.</p>
          <button
            onClick={() => navigate('/')}
            className="gradient-btn text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes('rating') || name.includes('cleanliness') || name.includes('condition') || name.includes('communication') 
        ? parseInt(value) 
        : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.bookingId) {
      setError('Please select a booking');
      return;
    }

    if (!formData.carName) {
      setError('Please enter the car name');
      return;
    }

    if (!formData.comment.trim()) {
      setError('Please write your feedback');
      return;
    }

    if (formData.comment.trim().length < 10) {
      setError('Feedback must be at least 10 characters');
      return;
    }

    const result = addFeedback({
      bookingId: formData.bookingId,
      carName: formData.carName,
      ownerName: formData.ownerName,
      overallRating: formData.rating,
      cleanliness: formData.cleanliness,
      condition: formData.condition,
      communication: formData.communication,
      comment: formData.comment,
    });

    if (result.success) {
      setSuccess('✓ Thank you! Your feedback has been submitted successfully.');
      setTimeout(() => {
        navigate('/dashboard/customer');
      }, 2000);
    } else {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-softwhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-poppins text-3xl font-bold text-charcoal mb-2">
              Share Your <span className="text-coral">Feedback</span>
            </h1>
            <p className="text-gray-600">Help us improve by sharing your rental experience</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking & Car Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Booking ID</label>
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                  placeholder="e.g., BK-001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">Car Name</label>
                <input
                  type="text"
                  name="carName"
                  value={formData.carName}
                  onChange={handleChange}
                  placeholder="e.g., Toyota Fortuner 2022"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="e.g., Juan dela Cruz"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
              />
            </div>

            {/* Ratings */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-charcoal mb-4">Rate Your Experience</h3>
              
              <div className="space-y-4">
                {/* Overall Rating */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Overall Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'fill-coral text-coral'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cleanliness */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Cleanliness</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, cleanliness: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.cleanliness
                              ? 'fill-coral text-coral'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Car Condition */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Car Condition</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, condition: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.condition
                              ? 'fill-coral text-coral'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Communication */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">Owner Communication</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, communication: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.communication
                              ? 'fill-coral text-coral'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Your Feedback</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Share your experience with this rental. What did you like? What could be improved?"
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.comment.length} characters (minimum 10)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit Feedback</span>
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-2">Why Your Feedback Matters</h4>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>✓ Helps owners improve their service</li>
              <li>✓ Builds trust in the Elite Drive community</li>
              <li>✓ Rewards honest and helpful feedback</li>
              <li>✓ Contributes to better rental experiences for everyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
