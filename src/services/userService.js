export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const formatUserName = (user) => {
  if (!user) return 'Guest';
  return user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.email;
};

export const getUserInitials = (user) => {
  if (!user) return 'G';
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  return user.email ? user.email[0].toUpperCase() : 'U';
};

export const validateAddress = (address) => {
  const required = ['street', 'city', 'state', 'zipCode', 'country'];
  return required.every(field => address[field] && address[field].trim() !== '');
};
