import React from "react";
import "../styles/Product.css";

function Product({ product }) {
  return (
    <div className="product-card">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">
        Descripción:{" "}
        {product.description
          ? product.description
          : "Sin descripción disponible"}
      </p>
      <p className="product-price">Precio: ${product.price}</p>
      <p className="product-stock">Stock: {product.stock}</p>
    </div>
  );
}

export default Product;
