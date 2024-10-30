import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

export function useProductService() {
  const { token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  const handleRequestError = (error, action) => {
    console.error(`Error ${action} product:`, error.response?.data || error.message);
    throw error;
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product`, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "fetching all");
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/product/${id}`, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "fetching by ID");
    }
  };

  const createProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/product`, product, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "creating");
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(`${API_URL}/product/${id}`, product, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "updating");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${id}`, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "deleting");
    }
  };

  return {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
