import React from "react";
import Product from "./Product";

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleDelete = (product) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el producto "${product.name}"?`);
    if (confirmDelete) {
      onDelete(product.id);
    }
  };

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Product product={product} />
            <button onClick={() => onEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product)}>Eliminar</button> {}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
