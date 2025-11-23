import React from 'react';
import { Clock, CheckCircle, XCircle, Star, Package } from 'lucide-react';

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          label: 'Pending'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          label: 'Rejected'
        };
      case 'completed':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Star,
          label: 'Completed'
        };
      case 'confirmed':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: CheckCircle,
          label: 'Confirmed'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Package,
          label: status || 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };

  return (
    <div className={`inline-flex items-center space-x-1 border rounded-full ${sizeClasses[size]} ${config.color}`}>
      <Icon className="w-3 h-3" />
      <span className="font-medium">{config.label}</span>
    </div>
  );
};

export default StatusBadge;
