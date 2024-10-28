import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

// Hook personalizado para manejar las llamadas de productos usando el token del contexto
export function useProductService() {
  const { user, token } = useAuth();
  const headers = { Authorization: `Bearer ${token}` };

  // Función genérica para manejar errores
  const handleRequestError = (error, action) => {
    console.error(`Error ${action} product:`, error.response?.data || error.message);
    throw error;
  };

  // Obtener todos los productos del usuario
  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/${user.username}`, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "fetching all");
    }
  };

  // Obtener un producto por ID
  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/product/${user.username}/${id}`, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "fetching by ID");
    }
  };

  // Crear un nuevo producto
  const createProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/product`, product, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "creating");
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(`${API_URL}/product/${user.username}/${id}`, product, { headers });
      return response.data;
    } catch (error) {
      handleRequestError(error, "updating");
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/product/${user.username}/${id}`, { headers });
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
