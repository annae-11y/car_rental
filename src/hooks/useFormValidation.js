import { useState } from 'react';

export const useFormValidation = (initialState = {}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value, rules) => {
    const fieldErrors = [];
    
    if (rules.required && (!value || value.toString().trim() === '')) {
      fieldErrors.push(`${name} is required`);
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      fieldErrors.push(`${name} must be at least ${rules.minLength} characters`);
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      fieldErrors.push(`${name} must not exceed ${rules.maxLength} characters`);
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      fieldErrors.push(rules.message || `${name} format is invalid`);
    }

    if (rules.min && value && Number(value) < rules.min) {
      fieldErrors.push(`${name} must be at least ${rules.min}`);
    }

    if (rules.max && value && Number(value) > rules.max) {
      fieldErrors.push(`${name} must not exceed ${rules.max}`);
    }

    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      fieldErrors.push('Please enter a valid email address');
    }

    if (rules.phone && value && !/^[+]?[\d\s-()]+$/.test(value)) {
      fieldErrors.push('Please enter a valid phone number');
    }

    return fieldErrors;
  };

  const validateForm = (formData, validationRules) => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const fieldErrors = validateField(
        field, 
        formData[field], 
        validationRules[field]
      );
      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setFieldError = (field, error) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  const setFieldTouched = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const getFieldError = (field) => {
    return touched[field] ? errors[field] : [];
  };

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    touched,
    hasErrors,
    validateForm,
    setFieldError,
    clearFieldError,
    clearAllErrors,
    setFieldTouched,
    getFieldError
  };
};
