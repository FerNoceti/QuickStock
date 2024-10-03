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

  const [errors, setErrors] = useState({}); // Para almacenar los errores

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

  // Función para validar los campos del formulario
  const validateForm = () => {
    let formErrors = {};
  
    // Validar el nombre del producto (alfabético y no vacío)
    if (!product.name.trim()) {
      formErrors.name = "El nombre es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(product.name.trim())) {
      formErrors.name = "El nombre solo debe contener letras.";
    }
  
    // Validar el precio (número positivo)
    const price = parseFloat(product.price);
    if (!price || isNaN(price) || price <= 0) {
      formErrors.price = "El precio debe ser un número positivo.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
      formErrors.price = "El precio debe tener como máximo dos decimales.";
    }
  
    // Validar el stock (número no negativo)
    const stock = parseInt(product.stock, 10);
    if (isNaN(stock)) {
      formErrors.stock = "El stock debe ser un número.";
    } else if (stock < 0) {
      formErrors.stock = "El stock debe ser cero o un número positivo.";
    }
  
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Devuelve true si no hay errores
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
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
    }
  };

  const handleClear = () => {
    setProduct({ name: "", description: "", price: "", stock: "" }); // Limpiar el formulario manualmente
    setErrors({}); // Limpiar los errores
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
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <input
          type="text"
          name="description"
          placeholder="Descripción (Opcional)"
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
        {errors.price && <p className="error-text">{errors.price}</p>}
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
        {errors.stock && <p className="error-text">{errors.stock}</p>}
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
