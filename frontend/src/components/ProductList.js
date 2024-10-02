import React from "react";
import Product from "./Product";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleDelete = (product) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de eliminar el producto "${product.name}"?`
    );
    if (confirmDelete) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-list">
      <ul className="product-list-ul">
        {products.map((product) => (
          <li key={product.id} className="product-list-item">
            <Product product={product} />
            <div className="product-list-actions">
              <button
                className="product-list-btn edit-btn"
                onClick={() => onEdit(product)}
              >
                Editar
              </button>
              <button
                className="product-list-btn delete-btn"
                onClick={() => handleDelete(product)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
