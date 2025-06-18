import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Validate a coupon code
export const validateCouponCode = async (code) => {
  try {
    const response = await axios.post(`${API_URL}/coupons/validate`, { code });
    return response.data;
  } catch (error) {
    // If backend returns error, throw the error message
    throw error.response?.data?.message || 'Coupon validation failed';
  }
}; 