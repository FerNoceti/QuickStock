import React from "react";
import Product from "./Product";

const ProductList = ({ products, onEdit }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Product product={product} />
            <button onClick={() => onEdit(product)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
