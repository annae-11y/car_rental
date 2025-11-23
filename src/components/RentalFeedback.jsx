import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send, X, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';

const RentalFeedback = ({ booking, isOpen, onClose, onSubmitFeedback }) => {
  const { addReview } = useStore();
  const [feedback, setFeedback] = useState({
    rating: 5,
    overallExperience: '',
    carCondition: '',
    ownerService: '',
    wouldRecommend: true,
    improvements: '',
    anonymous: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratingCategories = [
    { key: 'overallExperience', label: 'Overall Experience', placeholder: 'How was your rental experience?' },
    { key: 'carCondition', label: 'Car Condition', placeholder: 'Was the car clean and well-maintained?' },
    { key: 'ownerService', label: 'Owner Service', placeholder: 'How was the owner\'s service and communication?' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.overallExperience.trim()) return;

    setSubmitting(true);

    const reviewData = {
      bookingId: booking.id,
      carId: booking.carId,
      carName: booking.carName,
      ownerName: booking.ownerName,
      customerId: booking.customerId,
      customerName: booking.renterDetails?.fullName || 'Anonymous',
      rating: feedback.rating,
      feedback: {
        ...feedback,
        submittedAt: new Date().toISOString(),
        rentalPeriod: `${booking.pickupDate} to ${booking.returnDate}`,
        totalDays: booking.totalDays,
        totalAmount: booking.totalAmount
      }
    };

    try {
      await addReview(reviewData);
      if (onSubmitFeedback) {
        onSubmitFeedback(reviewData);
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, onRatingChange) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange && onRatingChange(star)}
          className="transition-colors"
        >
          <Star
            className={`w-6 h-6 ${
              star <= rating
                ? 'fill-coral text-coral'
                : 'text-gray-300 hover:text-coral'
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. It helps us improve our service and assists other customers.
          </p>
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-coral text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-coral" />
              <h3 className="text-xl font-semibold text-gray-800">Rental Feedback</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share your experience for {booking.carName} ({booking.pickupDate} - {booking.returnDate})
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Overall Rating */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Overall Rating
            </label>
            <div className="flex items-center justify-center">
              {renderStars(feedback.rating, (rating) => 
                setFeedback(prev => ({ ...prev, rating }))
              )}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {feedback.rating === 5 && 'Excellent!'}
              {feedback.rating === 4 && 'Good'}
              {feedback.rating === 3 && 'Average'}
              {feedback.rating === 2 && 'Below Average'}
              {feedback.rating === 1 && 'Poor'}
            </p>
          </div>

          {/* Detailed Feedback */}
          <div className="space-y-4">
            {ratingCategories.map((category) => (
              <div key={category.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {category.label}
                </label>
                <textarea
                  value={feedback[category.key]}
                  onChange={(e) => setFeedback(prev => ({ 
                    ...prev, 
                    [category.key]: e.target.value 
                  }))}
                  placeholder={category.placeholder}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
                />
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className="bg-blue-50 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Would you recommend this car to others?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  feedback.wouldRecommend
                    ? 'bg-coral text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  !feedback.wouldRecommend
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Improvements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Suggestions for Improvement (Optional)
            </label>
            <textarea
              value={feedback.improvements}
              onChange={(e) => setFeedback(prev => ({ 
                ...prev, 
                improvements: e.target.value 
              }))}
              placeholder="What could we do to make your experience better?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent resize-none"
            />
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="anonymous"
              checked={feedback.anonymous}
              onChange={(e) => setFeedback(prev => ({ 
                ...prev, 
                anonymous: e.target.checked 
              }))}
              className="w-4 h-4 text-coral border-gray-300 rounded focus:ring-coral"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Submit feedback anonymously
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !feedback.overallExperience.trim()}
              className={`flex items-center px-6 py-2 bg-coral text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalFeedback;
