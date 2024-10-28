import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Obtener todos los productos del usuario
export const getProducts = (username, token) => {
  return axios
    .get(`${API_URL}/product/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

// Obtener un producto por ID
export const getProductById = (id, username, token) => {
  return axios
    .get(`${API_URL}/product/${username}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

// Crear un nuevo producto
export const createProduct = (product, token) => {
  return axios
    .post(`${API_URL}/product`, product, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

// Actualizar un producto
export const updateProduct = (id, product, username, token) => {
  return axios
    .put(`${API_URL}/product/${username}/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

// Eliminar un producto
export const deleteProduct = (id, username, token) => {
  return axios
    .delete(`${API_URL}/product/${username}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
};
