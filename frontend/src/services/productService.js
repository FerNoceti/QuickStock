import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = () => {
  return axios
    .get(`${API_URL}products`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error: ", err);
      throw err;
    });
};

export const addProduct = (product) => {
  return axios
    .post(`${API_URL}product`, product)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error: ", err);
      throw err;
    });
};

export const updateProduct = (id, product) => {
  return axios
      .put(`${API_URL}product/${id}`, product)
      .then((res) => res.data)
      .catch((err) => {
          console.log("Error en el PUT: ", err);
          throw err;
      });
};

export const deleteProduct = (id) => {
  return axios
    .delete(`${API_URL}product/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.log("Error en el DELETE: ", err);
      throw err;
    });
};
