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