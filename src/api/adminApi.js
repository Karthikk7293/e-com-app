import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Dashboard APIs
export const getDashboardStats = () => {
  return apiClient.get('/admin/dashboard/stats');
};

// Product Management APIs
export const getAllProducts = (params = {}) => {
  return apiClient.get('/admin/products', { params });
};

export const createProduct = (productData) => {
  return apiClient.post('/admin/products', productData);
};

export const updateProduct = (productId, productData) => {
  return apiClient.put(`/admin/products/${productId}`, productData);
};

export const deleteProduct = (productId) => {
  return apiClient.delete(`/admin/products/${productId}`);
};

export const updateProductStock = (productId, stock) => {
  return apiClient.patch(`/admin/products/${productId}/stock`, { stock });
};

// User Management APIs
export const getAllUsers = (params = {}) => {
  return apiClient.get('/admin/users', { params });
};

export const getUserById = (userId) => {
  return apiClient.get(`/admin/users/${userId}`);
};

export const updateUserRole = (userId, role) => {
  return apiClient.patch(`/admin/users/${userId}/role`, { role });
};

export const updateUserStatus = (userId, status) => {
  return apiClient.patch(`/admin/users/${userId}/status`, { status });
};

export const deleteUser = (userId) => {
  return apiClient.delete(`/admin/users/${userId}`);
};

// Order Management APIs
export const getAllOrders = (params = {}) => {
  return apiClient.get('/admin/orders', { params });
};

export const getOrderById = (orderId) => {
  return apiClient.get(`/admin/orders/${orderId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return apiClient.patch(`/admin/orders/${orderId}/status`, { status });
};

export const cancelOrder = (orderId) => {
  return apiClient.post(`/admin/orders/${orderId}/cancel`);
};

// Payment Management APIs
export const getAllPayments = (params = {}) => {
  return apiClient.get('/admin/payments', { params });
};

export const getPaymentById = (paymentId) => {
  return apiClient.get(`/admin/payments/${paymentId}`);
};

export const refundPayment = (paymentId) => {
  return apiClient.post(`/admin/payments/${paymentId}/refund`);
};

export const getPaymentStats = () => {
  return apiClient.get('/admin/payments/stats');
};

// Analytics APIs
export const getRevenueAnalytics = (params = {}) => {
  return apiClient.get('/admin/analytics/revenue', { params });
};

export const getSalesAnalytics = (params = {}) => {
  return apiClient.get('/admin/analytics/sales', { params });
};

export const getUserAnalytics = (params = {}) => {
  return apiClient.get('/admin/analytics/users', { params });
};

// Banner Management APIs
export const getAllBanners = (params = {}) => {
  return apiClient.get('/admin/banners', { params });
};

export const getBannerById = (bannerId) => {
  return apiClient.get(`/admin/banners/${bannerId}`);
};

export const createBanner = (bannerData) => {
  return apiClient.post('/admin/banners', bannerData);
};

export const updateBanner = (bannerId, bannerData) => {
  return apiClient.put(`/admin/banners/${bannerId}`, bannerData);
};

export const deleteBanner = (bannerId) => {
  return apiClient.delete(`/admin/banners/${bannerId}`);
};

export const updateBannerStatus = (bannerId, status) => {
  return apiClient.patch(`/admin/banners/${bannerId}/status`, { status });
};

export const updateBannerOrder = (bannerId, order) => {
  return apiClient.patch(`/admin/banners/${bannerId}/order`, { order });
};

export const getBannerAnalytics = (bannerId) => {
  return apiClient.get(`/admin/banners/${bannerId}/analytics`);
};

// Export APIs
export const exportOrders = (params = {}) => {
  return apiClient.get('/admin/export/orders', { 
    params,
    responseType: 'blob'
  });
};

export const exportPayments = (params = {}) => {
  return apiClient.get('/admin/export/payments', { 
    params,
    responseType: 'blob'
  });
};

export const exportUsers = (params = {}) => {
  return apiClient.get('/admin/export/users', { 
    params,
    responseType: 'blob'
  });
};
