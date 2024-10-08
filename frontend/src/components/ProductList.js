import React, { useState } from "react";
import Product from "./Product";
import Confirmation from "./Confirmation";
import "../styles/ProductList.css";

const ProductList = ({ products, onEdit, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDelete = (product) => {
    setProductToDelete(product); // Guardar el producto a eliminar
    setShowConfirmation(true); // Mostrar el modal de confirmación
  };

  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id); // Llamar a la función onDelete pasada por props usando el ID del producto
      setShowConfirmation(false); // Ocultar el modal después de confirmar
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null); // Limpiar el producto seleccionado
    setShowConfirmation(false); // Ocultar el modal
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

      {/* Mostrar el modal de confirmación solo si showConfirmation es true */}
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
