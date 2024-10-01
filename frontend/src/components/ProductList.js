import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Descripción: {product.description ? product.description : "Sin descripción disponible"}</p>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
