import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'normal',
  hover = false,
  shadow = 'normal' 
}) => {
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-4';
      case 'normal':
        return 'p-6';
      case 'large':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  const getShadowClasses = () => {
    switch (shadow) {
      case 'none':
        return '';
      case 'small':
        return 'shadow-sm';
      case 'normal':
        return 'shadow-lg';
      case 'large':
        return 'shadow-xl';
      default:
        return 'shadow-lg';
    }
  };

  return (
    <div 
      className={`bg-white rounded-2xl ${getPaddingClasses()} ${getShadowClasses()} ${
        hover ? 'hover:shadow-xl transition-shadow' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
