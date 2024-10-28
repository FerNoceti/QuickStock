import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

// Hook personalizado para manejar las llamadas de productos usando el token del contexto
export function useProductService() {
  const { user, token } = useAuth();

  // Obtener todos los productos del usuario
  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  // Obtener un producto por ID
  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/product/${user.username}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  };

  // Crear un nuevo producto
  const createProduct = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/product`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  // Actualizar un producto
  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(
        `${API_URL}/product/${user.username}/${id}`,
        product,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/product/${user.username}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
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
