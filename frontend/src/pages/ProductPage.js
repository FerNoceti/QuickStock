import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { getProducts } from "../services/productService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  };

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleFormSubmit = () => {
    loadProducts();
    setSelectedProduct(null);
  };

  return (
    <div>
      <ProductForm productToEdit={selectedProduct} onSubmit={handleFormSubmit} />
      <ProductList products={products} onEdit={handleProductEdit} />
    </div>
  );
};

export default ProductPage;
