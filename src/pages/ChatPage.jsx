import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle } from 'lucide-react';
import useStore from '../store/useStore';

const ChatPage = () => {
  const { bookingId } = useParams();
  const id = parseInt(bookingId, 10);

  const { currentUser, bookings, sendMessage, getMessagesByBooking } = useStore();
  const booking = bookings.find(b => b.id === id);

  const [messageText, setMessageText] = useState('');

  if (!booking) {
    return (
      <div className="bg-softwhite min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <h2 className="font-poppins text-2xl font-bold text-charcoal mb-2">Chat not found</h2>
          <p className="text-gray-600 mb-6">This booking no longer exists or cannot be found.</p>
          <Link
            to="/dashboard/customer"
            className="text-coral font-semibold hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const messages = getMessagesByBooking(id) || [];

  const isCustomer = currentUser && currentUser.id === booking.customerId;
  const otherUser = isCustomer
    ? { id: booking.ownerId, name: booking.ownerName }
    : { id: booking.customerId, name: booking.customerName };

  const getSenderName = (msg) => {
    if (!msg) return 'User';
    if (currentUser && msg.from === currentUser.id) {
      return currentUser.name || 'You';
    }
    if (msg.from === booking.ownerId) return booking.ownerName;
    if (msg.from === booking.customerId) return booking.customerName;
    return 'User';
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    if (!currentUser) return;

    const toUserId = otherUser.id;
    const text = messageText.trim();

    const result = sendMessage(id, currentUser.id, toUserId, text);
    if (result && result.success) {
      setMessageText('');
    }
  };

  return (
    <div className="bg-softwhite min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to={isCustomer ? '/dashboard/customer' : '/dashboard/owner'}
              className="inline-flex items-center text-coral hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg flex flex-col flex-1 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-poppins text-lg font-bold text-charcoal flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-coral" />
                <span>Chat about {booking.carName}</span>
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                With {otherUser.name} • {booking.pickupDate} - {booking.returnDate}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 sm:px-6 py-4 overflow-y-auto space-y-3 bg-softwhite">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">No messages yet. Start the conversation below.</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = currentUser && msg.from === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isMe
                          ? 'bg-coral text-white rounded-br-sm'
                          : 'bg-white text-charcoal rounded-bl-sm border border-gray-100'
                      }`}
                    >
                      <p className={`text-[11px] font-semibold mb-0.5 ${isMe ? 'text-white/90' : 'text-gray-700'}`}>
                        {getSenderName(msg)}
                      </p>
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      <p className={`mt-1 text-[10px] ${isMe ? 'text-coral-100/80' : 'text-gray-400'}`}>
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t px-4 sm:px-6 py-3 bg-white">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-coral focus:border-transparent outline-none text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-coral text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!messageText.trim()}
              >
                <Send className="w-4 h-4 mr-1" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
