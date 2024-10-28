import React, { useState, useEffect } from "react";
import "../styles/ProductForm.css";

const ProductForm = ({ onSubmit, productToEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  // Si se pasa un producto para editar, se actualiza el estado del formulario
  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      handleClear();
    }
  }, [productToEdit]);

  // Manejar el cambio en los inputs y actualizar el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Validar los campos requeridos
  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "El nombre es requerido";
    if (!product.price) newErrors.price = "El precio es requerido";
    if (!product.stock) newErrors.stock = "El stock es requerido";
    return newErrors;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(product);
      handleClear();
    } else {
      setErrors(validationErrors);
    }
  };

  // Limpiar el formulario
  const handleClear = () => {
    setProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    setErrors({});
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
