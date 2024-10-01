import React, { useState, useEffect } from "react";
import { addProduct, updateProduct } from "../services/productService";

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
      setProduct({ name: "", description: "", price: "", stock: "" }); // Si no hay producto, limpiar el formulario
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      // Si hay un producto para editar, se hace la actualización (PUT)
      updateProduct(product.id, product)
        .then(onSubmit) // Llama a la función onSubmit para recargar la lista de productos
        .catch((err) => console.log(err));
    } else {
      // Si no hay producto para editar, se hace la creación (POST)
      addProduct(product)
        .then(onSubmit)
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre del producto"
        value={product.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={product.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={product.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
      />
      <button type="submit">
        {productToEdit ? "Actualizar Producto" : "Crear Producto"}
      </button>
    </form>
  );
};

export default ProductForm;
