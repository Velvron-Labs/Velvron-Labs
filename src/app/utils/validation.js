/**
 * Form validation utilities
 */

// Email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic international format)
const PHONE_REGEX = /^[\d\s\+\-\(\)]{10,}$/;

/**
 * Validate contact form data
 * @param {Object} data - Form data object
 * @returns {Object} Error object with field names as keys
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Validate name
  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters';
  }

  // Validate email
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  } else if (data.email.length > 254) {
    errors.email = 'Email must not exceed 254 characters';
  }

  // Validate subject (optional but if provided, must be valid)
  if (data.subject && data.subject.trim().length > 200) {
    errors.subject = 'Subject must not exceed 200 characters';
  }

  // Validate message
  if (!data.message || !data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 5000) {
    errors.message = 'Message must not exceed 5000 characters';
  }

  return errors;
};

/**
 * Sanitize form input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>\"']/g, (char) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      };
      return escapeMap[char] || char;
    });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  return EMAIL_REGEX.test(email?.trim() || '');
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  return PHONE_REGEX.test(phone?.trim() || '');
};

/**
 * Check if form has any errors
 * @param {Object} errors - Error object
 * @returns {boolean} True if there are errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
