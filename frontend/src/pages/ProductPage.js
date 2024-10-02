import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { getProducts, deleteProduct } from "../services/productService";
import "../styles/ProductPage.css";

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
    setSelectedProduct(null); // Limpiar el formulario después de crear/editar
  };

  const handleProductDelete = (id) => {
    deleteProduct(id)
      .then(() => loadProducts())
      .catch((err) => console.log(err));
  };

  return (
    <div className="product-page">
      <div className="product-list-container">
        <h1>Lista de Productos</h1>
        <ProductList
          products={products}
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
        />
      </div>
      <div className="product-form-container">
        <h1>Formulario de Producto</h1>
        <ProductForm
          productToEdit={selectedProduct}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default ProductPage;
