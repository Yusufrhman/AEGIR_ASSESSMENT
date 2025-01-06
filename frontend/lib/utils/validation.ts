// Email Validation
export const validateEmail = (email: string): string => {
  if (!email) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return "";
};

// Password Validation
export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return "";
};

// Confirm Password Validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
