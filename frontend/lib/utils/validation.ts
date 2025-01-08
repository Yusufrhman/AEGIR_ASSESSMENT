// Email Validation
 const validateEmail = (email: string): string => {
  if (!email) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return "";
};

// Password Validation
 const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return "";
};


export function validateForm(data: Record<string, string>): {
  email: string;
  password: string;
} {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
  };
}
