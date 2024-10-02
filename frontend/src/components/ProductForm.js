import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/productService";
import "../styles/ProductForm.css";

const ProductForm = ({ productToEdit, onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit); // Precargar el producto en modo edición
    } else {
      setProduct({ name: "", description: "", price: "", stock: "" }); // Limpiar el formulario si no hay producto
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      updateProduct(product.id, product)
        .then(() => {
          onSubmit();
          setProduct({ name: "", description: "", price: "", stock: "" }); // Limpiar el formulario
        })
        .catch((err) => console.log(err));
    } else {
      addProduct(product)
        .then(() => {
          onSubmit();
          setProduct({ name: "", description: "", price: "", stock: "" }); // Limpiar el formulario
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClear = () => {
    setProduct({ name: "", description: "", price: "", stock: "" }); // Limpiar el formulario manualmente
    onSubmit(); // Salir del modo edición
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Nombre del producto</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={product.description}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="form-button">
          {productToEdit ? "Actualizar Producto" : "Crear Producto"}
        </button>
        <button type="button" onClick={handleClear} className="form-button clear-button">
          Limpiar Formulario
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
