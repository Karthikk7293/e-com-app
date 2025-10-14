import axiosInstance from '../config/axiosConfig';
import { API_ENDPOINTS } from '../config/constants';

export const createOrder = (orderData) => {
  return axiosInstance.post(API_ENDPOINTS.ORDER.CREATE, orderData);
};

export const getOrders = (params = {}) => {
  return axiosInstance.get(API_ENDPOINTS.ORDER.LIST, { params });
};

export const getOrderById = (id) => {
  const url = API_ENDPOINTS.ORDER.DETAIL.replace(':id', id);
  return axiosInstance.get(url);
};

export const cancelOrder = (id) => {
  const url = API_ENDPOINTS.ORDER.CANCEL.replace(':id', id);
  return axiosInstance.post(url);
};

export const updateOrderStatus = (id, status) => {
  return axiosInstance.put(`${API_ENDPOINTS.ADMIN.ORDERS}/${id}/status`, { status });
};
