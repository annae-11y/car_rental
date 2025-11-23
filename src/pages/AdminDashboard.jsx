import React, { useState } from 'react';
import { Users, Car, Calendar, DollarSign, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import useStore from '../store/useStore';

const AdminDashboard = () => {
  const { users, cars, bookings, updateCar } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: users.length,
    totalCars: cars.length,
    totalBookings: bookings.length,
    pendingApprovals: cars.filter(c => c.status === 'pending').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalAmount, 0),
  };

  const getBookingStatusLabel = (status) => {
    if (status === 'pending') return 'Pending Approval';
    if (status === 'approved') return 'Active / Ongoing Rental';
    if (status === 'completed') return 'Completed';
    if (status === 'rejected') return 'Rejected';
    return status;
  };

  const handleApproveCar = (carId) => {
    updateCar(carId, { status: 'approved' });
  };

  const handleRejectCar = (carId) => {
    updateCar(carId, { status: 'rejected' });
  };

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-2">
            Admin <span className="text-coral">Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage users, cars, and monitor platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-coral" />
              <span className="text-3xl font-bold text-charcoal">{stats.totalUsers}</span>
            </div>
            <p className="text-gray-600">Total Users</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Car className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-charcoal">{stats.totalCars}</span>
            </div>
            <p className="text-gray-600">Total Cars</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-charcoal">{stats.totalBookings}</span>
            </div>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-charcoal">{stats.pendingApprovals}</span>
            </div>
            <p className="text-gray-600">Pending Approvals</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-purple-500" />
              <span className="text-3xl font-bold text-charcoal">₱{stats.totalRevenue}</span>
            </div>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['overview', 'users', 'cars', 'bookings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-coral border-b-2 border-coral'
                    : 'text-gray-600 hover:text-coral'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-poppins text-2xl font-bold text-charcoal mb-4">Platform Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Distribution */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-4">User Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Customers</span>
                        <span className="font-bold text-charcoal">{users.filter(u => u.role === 'customer').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Car Owners</span>
                        <span className="font-bold text-charcoal">{users.filter(u => u.role === 'owner').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Admins</span>
                        <span className="font-bold text-charcoal">{users.filter(u => u.role === 'admin').length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Car Status */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-4">Car Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Approved</span>
                        <span className="font-bold text-green-600">{cars.filter(c => c.status === 'approved').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-bold text-yellow-600">{cars.filter(c => c.status === 'pending').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available</span>
                        <span className="font-bold text-blue-600">{cars.filter(c => c.available).length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Stats */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-4">Booking Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Approved</span>
                        <span className="font-bold text-green-600">{bookings.filter(b => b.status === 'approved').length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-bold text-blue-600">{bookings.filter(b => b.status === 'completed').length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Performers */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-charcoal mb-4">Top Rated Cars</h3>
                    <div className="space-y-3">
                      {cars
                        .filter(c => c.status === 'approved')
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map(car => (
                          <div key={car.id} className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">{car.name}</span>
                            <span className="font-bold text-coral">{car.rating} ⭐</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Approvals */}
              {cars.filter(c => c.status === 'pending').length > 0 && (
                <div>
                  <h2 className="font-poppins text-2xl font-bold text-charcoal mb-4">Pending Car Approvals</h2>
                  <div className="space-y-4">
                    {cars.filter(c => c.status === 'pending').map(car => (
                      <div key={car.id} className="border border-gray-200 rounded-xl p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={car.images[0]} alt={car.name} className="w-24 h-24 object-cover rounded-lg" />
                          <div>
                            <h3 className="font-semibold text-charcoal">{car.name}</h3>
                            <p className="text-sm text-gray-600">Owner: {car.ownerName}</p>
                            <p className="text-sm text-gray-600">Rate: ₱{car.dailyRate}/day</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleApproveCar(car.id)}
                            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleRejectCar(car.id)}
                            className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-softwhite">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-charcoal">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-softwhite">
                        <td className="px-6 py-4 text-sm text-charcoal">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.role === 'owner' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cars Tab */}
          {activeTab === 'cars' && (
            <div>
              <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6">All Cars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <div key={car.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <img src={car.images[0]} alt={car.name} className="w-full h-40 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-charcoal">{car.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          car.status === 'approved' ? 'bg-green-100 text-green-800' :
                          car.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {car.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Owner: {car.ownerName}</p>
                      <p className="text-coral font-bold">₱{car.dailyRate}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <h2 className="font-poppins text-2xl font-bold text-charcoal mb-6">All Bookings</h2>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-center text-gray-600 py-12">No bookings yet</p>
                ) : (
                  bookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-charcoal">{booking.carName}</h3>
                          <p className="text-sm text-gray-600">Customer: {booking.customerName}</p>
                          <p className="text-sm text-gray-600">Owner: {booking.ownerName}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getBookingStatusLabel(booking.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Pickup</p>
                          <p className="font-semibold">{booking.pickupDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Return</p>
                          <p className="font-semibold">{booking.returnDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{booking.totalDays} days</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-semibold text-coral">₱{booking.totalAmount}</p>
                        </div>
                      </div>
                      {booking.payment && (
                        <div className="mt-2 text-xs text-gray-600">
                          <span className="font-semibold">Payment:</span>{' '}
                          <span className="capitalize">{booking.payment.status}</span>
                          {typeof booking.payment.paid === 'number' && typeof booking.payment.total === 'number' && (
                            <> • ₱{booking.payment.paid} / ₱{booking.payment.total}</>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
