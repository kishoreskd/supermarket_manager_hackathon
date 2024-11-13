// Validation utility functions
export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) && email.toLowerCase().endsWith('.com');
};

export const validateOrderId = (orderId) => {
  return /^ORD\d{5}$/.test(orderId);
};

export const validateQuantity = (quantity) => {
  const num = Number(quantity);
  return num > 0 && num <= 100;
};

export const validateRole = (role) => {
  const validRoles = ['MANAGER', 'BILLER', 'SUPERVISOR', 'FACILITY'];
  return validRoles.includes(role.toUpperCase());
};

export const validateCouponPercentage = (percentage) => {
  const num = Number(percentage);
  return num > 0 && num <= 25;
};

export const validateDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

export const SECURITY_QUESTIONS = [
  "What is your pet's name?",
  "What is your favorite movie?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was your first car?"
]; 