import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// Using DummyJSON API - A better alternative with more features
// Features: 100+ products, search, pagination, filtering, sorting, etc.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getProducts = (params = {}) => {
  const { limit = 20, skip = 0, category } = params;
  
  if (category) {
    return apiClient.get(`/products/category/${category}`, {
      params: { limit, skip }
    });
  }
  
  return apiClient.get('/products', { 
    params: { limit, skip } 
  });
};

export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

export const searchProducts = (query) => {
  // DummyJSON has built-in search functionality
  return apiClient.get('/products/search', {
    params: { q: query }
  });
};

export const getCategories = () => {
  return apiClient.get('/products/categories');
};

export const getProductsByCategory = (category, params = {}) => {
  const { limit = 20, skip = 0 } = params;
  return apiClient.get(`/products/category/${category}`, {
    params: { limit, skip }
  });
};
