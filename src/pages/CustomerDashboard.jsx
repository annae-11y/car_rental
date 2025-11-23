import React, { useState } from 'react';
import { Calendar, Package, Star, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const CustomerDashboard = () => {
  const { currentUser, getBookingsByCustomer, bookings: allBookings } = useStore();
  const myBookings = getBookingsByCustomer(currentUser.id);
  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = myBookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    if (status === 'pending') return 'Pending Approval';
    if (status === 'approved') return 'Active / Ongoing Rental';
    if (status === 'completed') return 'Completed';
    if (status === 'rejected') return 'Rejected';
    return status;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'completed': return <Star className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getTimelineStatusLabel = (status) => {
    if (status === 'pending') return 'Pending Approval';
    if (status === 'approved') return 'Approved';
    if (status === 'released') return 'Car Released to Renter';
    if (status === 'returned') return 'Car Returned';
    if (status === 'completed') return 'Rental Completed';
    if (status === 'payment_pending') return 'Pending Payment';
    if (status === 'payment_complete') return 'Payment Complete';
    if (status === 'rejected') return 'Rejected';
    if (status === 'cancelled') return 'Cancelled';
    return status;
  };

  const getPaymentStatusLabel = (payment) => {
    if (!payment || !payment.status) return 'Pending Payment';
    const s = String(payment.status).toLowerCase();
    if (s === 'paid' || s === 'completed' || s === 'settled') return 'Payment Complete';
    if (s === 'partial' || s === 'partially_paid') return 'Pending Payment';
    if (s === 'pending' || s === 'unpaid') return 'Pending Payment';
    return payment.status;
  };

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins text-4xl font-bold text-charcoal mb-2">
            My <span className="text-coral">Bookings</span>
          </h1>
          <p className="text-gray-600">Manage and track your car rental bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-coral" />
              <span className="text-3xl font-bold text-charcoal">{myBookings.length}</span>
            </div>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              <span className="text-3xl font-bold text-charcoal">
                {myBookings.filter(b => b.status === 'pending').length}
              </span>
            </div>
            <p className="text-gray-600">Pending</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-3xl font-bold text-charcoal">
                {myBookings.filter(b => b.status === 'approved').length}
              </span>
            </div>
            <p className="text-gray-600">Approved</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-charcoal">
                {myBookings.filter(b => b.status === 'completed').length}
              </span>
            </div>
            <p className="text-gray-600">Completed</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['all', 'pending', 'approved', 'completed'].map(tab => (
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

        {/* Bookings List */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-poppins text-xl font-semibold text-charcoal mb-2">No bookings found</h3>
              <p className="text-gray-600">Start exploring and book your first car!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Car Image */}
                    <img
                      src={booking.carImage}
                      alt={booking.carName}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    
                    {/* Booking Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-poppins text-xl font-semibold text-charcoal">{booking.carName}</h3>
                          <p className="text-sm text-gray-600">
                            Owner:{' '}
                            <Link to={`/users/${booking.ownerId}`} className="text-coral hover:underline">
                              {booking.ownerName}
                            </Link>
                          </p>
                        </div>
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          <span className="text-sm font-semibold">{getStatusLabel(booking.status)}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Pickup</p>
                          <p className="font-semibold text-charcoal">{booking.pickupDate}</p>
                          <p className="text-gray-500">{booking.pickupTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Return</p>
                          <p className="font-semibold text-charcoal">{booking.returnDate}</p>
                          <p className="text-gray-500">{booking.returnTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold text-charcoal">{booking.totalDays} days</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="font-semibold text-coral text-lg">₱{booking.totalAmount}</p>
                          {booking.payment && (
                            <p className="mt-1 text-xs text-gray-600">
                              Payment: <span className="font-semibold">{getPaymentStatusLabel(booking.payment)}</span>
                              {typeof booking.payment.paid === 'number' && typeof booking.payment.total === 'number' && (
                                <>
                                  {' '}• Paid: ₱{booking.payment.paid} / ₱{booking.payment.total}
                                  {' '}({`Remaining: ₱${Math.max(booking.payment.total - booking.payment.paid, 0)}`})
                                </>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600"><strong>Notes:</strong> {booking.notes}</p>
                        </div>
                      )}
                      {booking.statusHistory && booking.statusHistory.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Rental Status Timeline</p>
                          <ul className="text-xs text-gray-600 space-y-1 max-h-24 overflow-y-auto">
                            {booking.statusHistory.map((entry, index) => (
                              <li key={index} className="flex justify-between">
                                <span>{getTimelineStatusLabel(entry.status)}</span>
                                <span>{entry.at ? format(new Date(entry.at), 'PPp') : ''}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="mt-3 flex justify-end">
                        <Link
                          to={`/chat/${booking.id}`}
                          className="text-sm font-semibold text-coral hover:underline"
                        >
                          Message owner
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
