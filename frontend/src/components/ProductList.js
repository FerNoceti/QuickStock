import React, { useState } from "react";
import Product from "./Product";
import Confirmation from "./Confirmation";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Manejar la solicitud de eliminación con confirmación
  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowConfirmation(true);
  };

  // Confirmar la eliminación del producto
  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
    }
    setShowConfirmation(false);
    setProductToDelete(null);
  };

  // Cancelar la eliminación del producto
  const cancelDelete = () => {
    setShowConfirmation(false);
    setProductToDelete(null);
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

      {showConfirmation && productToDelete && (
        <Confirmation
          message={`¿Estás seguro de que deseas eliminar ${productToDelete.name}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
