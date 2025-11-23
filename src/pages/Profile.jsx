import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Camera, Save, Calendar, MapPin, Users, FileText, Download } from 'lucide-react';
import useStore from '../store/useStore';
import IDScanner from '../components/IDScanner';

const Profile = () => {
  const { currentUser, updateUser, parseGovernmentIdImage } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    phone: currentUser.phone,
    address: currentUser.address,
    dateOfBirth: currentUser.dateOfBirth,
    emergencyContact: currentUser.emergencyContact,
    emergencyContactPhone: currentUser.emergencyContactPhone,
  });
  const [showIdScanner, setShowIdScanner] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser(currentUser.id, { profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUser(currentUser.id, formData);
    setIsEditing(false);
  };

  const handleIdScanConfirm = async (imageDataUrl) => {
    const targetField = currentUser.role === 'customer' ? 'driverLicense' : 'governmentId';
    updateUser(currentUser.id, { [targetField]: imageDataUrl });

    try {
      const parsed = await parseGovernmentIdImage(imageDataUrl);
      if (parsed) {
        const updates = {
          name: currentUser.name || parsed.name || currentUser.name,
          address: currentUser.address || parsed.address || currentUser.address,
          dateOfBirth: currentUser.dateOfBirth || parsed.dateOfBirth || currentUser.dateOfBirth,
        };

        updateUser(currentUser.id, updates);
        setFormData(prev => ({
          ...prev,
          name: prev.name || parsed.name || prev.name,
          address: prev.address || parsed.address || prev.address,
          dateOfBirth: prev.dateOfBirth || parsed.dateOfBirth || prev.dateOfBirth,
        }));
      }
    } catch {
      // silent fail for mock parser
    }
  };

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-4xl font-bold text-charcoal mb-8">
          My <span className="text-coral">Profile</span>
        </h1>

        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-coral to-red-400 h-40"></div>
          
          <div className="px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative -mt-20 mb-8 flex items-end justify-between">
              <div className="flex items-end space-x-6">
                <div className="w-40 h-40 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
                  {currentUser.profilePic ? (
                    <img src={currentUser.profilePic} alt={currentUser.name} className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <User className="w-20 h-20 text-coral" />
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="font-poppins text-3xl font-bold text-charcoal">{currentUser.name}</h2>
                  <p className="text-gray-600 capitalize">{currentUser.role === 'customer' ? 'Renter' : currentUser.role === 'owner' ? 'Car Owner' : 'Administrator'}</p>
                  {currentUser.verified && (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePicUpload"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
                <label
                  htmlFor="profilePicUpload"
                  className="w-12 h-12 bg-coral rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors shadow-lg cursor-pointer"
                >
                  <Camera className="w-6 h-6" />
                </label>
              </div>
            </div>

            {/* Profile Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Email Address</label>
                <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                  <Mail className="w-5 h-5 text-coral flex-shrink-0" />
                  <span className="text-charcoal font-medium">{currentUser.email}</span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                    <Phone className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="text-charcoal font-medium">{currentUser.phone}</span>
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                    <Calendar className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="text-charcoal font-medium">{formData.dateOfBirth || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                    <MapPin className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="text-charcoal font-medium">{formData.address || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                    <Users className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="text-charcoal font-medium">{formData.emergencyContact || 'Not provided'}</span>
                  </div>
                )}
              </div>

              {/* Emergency Contact Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Emergency Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none"
                  />
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-3 bg-softwhite rounded-lg">
                    <Phone className="w-5 h-5 text-coral flex-shrink-0" />
                    <span className="text-charcoal font-medium">{formData.emergencyContactPhone || 'Not provided'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats for Owner */}
            {currentUser.role === 'owner' && (
              <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="p-6 bg-gradient-to-br from-coral to-red-400 rounded-xl text-white text-center">
                  <p className="text-4xl font-bold mb-1">{currentUser.totalRentals || 0}</p>
                  <p className="text-sm opacity-90">Total Rentals</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white text-center">
                  <p className="text-4xl font-bold mb-1">₱{currentUser.totalEarnings || 0}</p>
                  <p className="text-sm opacity-90">Total Earnings</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex-1 gradient-btn text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border-2 border-charcoal text-charcoal font-semibold py-3 rounded-lg hover:bg-charcoal hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full gradient-btn text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ID Documents Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Driver License / Government ID */}
          {(currentUser.driverLicense || currentUser.governmentId) && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-coral" />
                <h3 className="font-poppins text-xl font-bold text-charcoal">
                  {currentUser.role === 'customer' ? "Driver's License" : 'Government ID'}
                </h3>
              </div>
              {currentUser.role === 'customer' && currentUser.driverLicense ? (
                <div>
                  <img src={currentUser.driverLicense} alt="Driver License" className="w-full h-auto rounded-lg border border-gray-300 mb-4" />
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-coral text-coral rounded-lg hover:bg-coral hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ) : currentUser.role === 'owner' && currentUser.governmentId ? (
                <div>
                  <img src={currentUser.governmentId} alt="Government ID" className="w-full h-auto rounded-lg border border-gray-300 mb-4" />
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-coral text-coral rounded-lg hover:bg-coral hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">No ID document uploaded yet</p>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowIdScanner(true)}
                  className="px-4 py-2 text-xs font-semibold text-coral border border-coral rounded-lg hover:bg-coral hover:text-white transition-colors"
                >
                  Scan new ID
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Security Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6">Account Security</h2>
          <div className="space-y-4">
            <button className="w-full text-left px-6 py-4 border border-gray-200 rounded-lg hover:border-coral hover:bg-coral hover:bg-opacity-5 transition-all">
              <p className="font-semibold text-charcoal">Change Password</p>
              <p className="text-sm text-gray-600">Update your password regularly for security</p>
            </button>
            <button className="w-full text-left px-6 py-4 border border-gray-200 rounded-lg hover:border-coral hover:bg-coral hover:bg-opacity-5 transition-all">
              <p className="font-semibold text-charcoal">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </button>
            <button className="w-full text-left px-6 py-4 border border-gray-200 rounded-lg hover:border-coral hover:bg-coral hover:bg-opacity-5 transition-all">
              <p className="font-semibold text-charcoal">Privacy Settings</p>
              <p className="text-sm text-gray-600">Manage your data and privacy preferences</p>
            </button>
          </div>
        </div>

        {showIdScanner && (
          <IDScanner
            expectedName={currentUser.name}
            onClose={() => setShowIdScanner(false)}
            onConfirm={(imageDataUrl) => handleIdScanConfirm(imageDataUrl)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
