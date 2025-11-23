import React from 'react';

const FormTextarea = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  disabled = false,
  rows = 3,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent outline-none resize-none transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormTextarea;
