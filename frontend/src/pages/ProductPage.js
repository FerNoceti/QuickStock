import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import { useProductService } from "../services/productService";

const ProductPage = () => {
  const { getProducts, createProduct, updateProduct, deleteProduct } = useProductService();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  // Manejar la edición del producto, colocando el producto en el formulario
  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  // Manejar el envío del formulario (creación o actualización de un producto)
  const handleFormSubmit = async (product) => {
    try {
      if (selectedProduct) {
        // Actualizar producto existente
        const updatedProduct = await updateProduct(selectedProduct.id, product);
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
      } else {
        // Crear un nuevo producto
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
      }
      setSelectedProduct(null); // Limpiar el formulario
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Manejar la eliminación de un producto
  const handleProductDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-page">
      <div className="product-list-container">
        <h1>Lista de Productos</h1>
        <ProductList
          products={products}
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
        />
      </div>
      <div className="product-form-container">
        <h1>Formulario de Producto</h1>
        <ProductForm
          productToEdit={selectedProduct}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default ProductPage;
