import axiosInstance from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/constants';

export const getProfile = () => {
  return axiosInstance.get(API_ENDPOINTS.USER.PROFILE);
};

export const updateProfile = (userData) => {
  return axiosInstance.put(API_ENDPOINTS.USER.UPDATE_PROFILE, userData);
};

export const getAddresses = () => {
  return axiosInstance.get(API_ENDPOINTS.USER.ADDRESSES);
};

export const addAddress = (address) => {
  return axiosInstance.post(API_ENDPOINTS.USER.ADDRESSES, address);
};

export const updateAddress = (addressId, address) => {
  return axiosInstance.put(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`, address);
};

export const deleteAddress = (addressId) => {
  return axiosInstance.delete(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`);
};

export const getUserOrders = () => {
  return axiosInstance.get(API_ENDPOINTS.USER.ORDERS);
};
