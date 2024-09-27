package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();

    Product getProductById(Long id);

    Product saveProduct(Product product);

    Product updateProduct(Long id, Product product);

    boolean deleteProduct(Long id);

}
