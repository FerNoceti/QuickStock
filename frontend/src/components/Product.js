import React from "react";

function Product({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>
        Descripción:{" "}
        {product.description
          ? product.description
          : "Sin descripción disponible"}
      </p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default Product;
