import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Mail, Phone, Shield, MapPin, Calendar, ArrowLeft, Star } from 'lucide-react';
import useStore from '../store/useStore';

const UserProfile = () => {
  const { id } = useParams();
  const userId = parseInt(id, 10);
  const { users, currentUser, cars, reviews } = useStore();

  const user = users?.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="bg-softwhite min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h2 className="font-poppins text-2xl font-bold text-charcoal mb-2">User not found</h2>
          <p className="text-gray-600 mb-6">The profile you are looking for does not exist.</p>
          <Link to="/" className="text-coral font-semibold hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Compute ratings for owners based on reviews of their cars
  const userCars = user.role === 'owner' ? cars.filter((car) => car.ownerId === user.id) : [];
  const userCarIds = userCars.map((car) => car.id);
  const ownerReviews = user.role === 'owner'
    ? reviews.filter((review) => userCarIds.includes(review.carId))
    : [];
  const averageRating = ownerReviews.length > 0
    ? (ownerReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / ownerReviews.length).toFixed(1)
    : null;

  const canSeeContact = () => {
    if (!currentUser) return false;
    if (currentUser.id === user.id) return true;
    if (currentUser.role === 'admin') return true;
    return false;
  };

  const maskedEmail = user.email
    ? `${user.email.split('@')[0].slice(0, 2)}***@${user.email.split('@')[1]}`
    : '';
  const maskedPhone = user.phone ? `${user.phone.slice(0, 4)}***${user.phone.slice(-2)}` : '';

  const showContact = canSeeContact();

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to={currentUser ? '/profile' : '/'} className="inline-flex items-center text-coral hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-coral to-red-500 px-8 py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-poppins text-2xl font-bold text-white flex items-center space-x-2">
                  <span>{user.name}</span>
                  {user.verificationBadge && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  )}
                </h1>
                <p className="text-white/80 text-sm capitalize">{user.role}</p>
                {user.role === 'owner' && (
                  <div className="flex items-center space-x-2 mt-1 text-xs text-white">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span>{averageRating ? `${averageRating} / 5` : 'No ratings yet'}</span>
                    </div>
                    {ownerReviews.length > 0 && (
                      <span className="text-white/80">
                        ({ownerReviews.length} review{ownerReviews.length > 1 ? 's' : ''})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-poppins text-lg font-semibold text-charcoal mb-2">Profile Details</h2>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-charcoal">{showContact ? user.email : maskedEmail || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-charcoal">{showContact ? user.phone : maskedPhone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm text-charcoal">{user.address || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-xs text-gray-500">Date of Birth</p>
                  <p className="text-sm text-charcoal">{user.dateOfBirth || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-poppins text-lg font-semibold text-charcoal mb-2">Security & ID</h2>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-coral" />
                <div>
                  <p className="text-xs text-gray-500">Verification Status</p>
                  <p className="text-sm text-charcoal">
                    {user.verified ? 'Verified user with valid ID on file.' : 'Not yet verified. ID verification pending.'}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Contact details may be partially hidden for privacy. They become fully visible to you where appropriate (for example, on your own profile or for administrators).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
