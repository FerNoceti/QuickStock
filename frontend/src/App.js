import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
	axios.get("http://localhost:8080/products")
		.then((res) => setProducts(res.data))
		.then(() => console.log(products))
		.catch((err) => console.log(err));
  }
  , []);

  return (
    <div className="App">
      <h1>Products</h1>
	  <ul>
		{products.map((product) => (
		  <li key={product.id}>
			<h2>{product.name}</h2>
			<p>{product.description}</p>
			<p>{product.price}</p>
		  </li>
		))}
	  </ul>
    </div>
  );
}

export default App;
