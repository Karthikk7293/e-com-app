import axiosInstance from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/constants';

export const login = (credentials) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

export const register = (userData) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

export const logout = () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
};

export const forgotPassword = (email) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

export const resetPassword = (token, newPassword) => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
};

export const refreshToken = () => {
  return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH);
};
