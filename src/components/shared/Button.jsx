import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-coral text-white hover:bg-red-600 focus:ring-2 focus:ring-coral focus:ring-offset-2';
      case 'secondary':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2';
      case 'outline':
        return 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-coral focus:ring-offset-2';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2';
      default:
        return 'bg-coral text-white hover:bg-red-600 focus:ring-2 focus:ring-coral focus:ring-offset-2';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'medium':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{renderIcon()}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{renderIcon()}</span>
      )}
    </button>
  );
};

export default Button;
