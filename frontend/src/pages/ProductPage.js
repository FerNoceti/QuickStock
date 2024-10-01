import React, { useState, useEffect } from "react";
import { getProducts } from "../service/productService";
import ProductList from "../components/ProductList";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts()
        .then((res) => setProducts(res))
        .catch((err) => console.log(err));
    }, []);
    
    return <ProductList products={products} />;
    };

export default ProductPage;