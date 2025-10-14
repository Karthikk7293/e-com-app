import { USER_ROLES, STORAGE_KEYS } from '../config/constants';

export const isAuthenticated = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return !!token;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user?.role || USER_ROLES.GUEST;
};

export const isAdmin = () => {
  return getUserRole() === USER_ROLES.ADMIN;
};

export const isUser = () => {
  return getUserRole() === USER_ROLES.USER;
};

export const hasRole = (role) => {
  return getUserRole() === role;
};

export const canAccessAdminPanel = () => {
  return isAdmin();
};

export const setAuthData = (token, user) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};
