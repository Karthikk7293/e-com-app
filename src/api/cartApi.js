import axiosInstance from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/constants';

export const getCart = () => {
  return axiosInstance.get(API_ENDPOINTS.CART.GET);
};

export const addToCart = (item) => {
  return axiosInstance.post(API_ENDPOINTS.CART.ADD, item);
};

export const updateCartItem = (itemId, quantity) => {
  return axiosInstance.put(API_ENDPOINTS.CART.UPDATE, { itemId, quantity });
};

export const removeFromCart = (itemId) => {
  return axiosInstance.delete(`${API_ENDPOINTS.CART.REMOVE}/${itemId}`);
};

export const clearCart = () => {
  return axiosInstance.delete(API_ENDPOINTS.CART.CLEAR);
};
