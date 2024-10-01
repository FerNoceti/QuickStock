package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ResponseEntity<List<Product>> getProducts();

    ResponseEntity<Product> getProductById(Long id);

    ResponseEntity<Product> saveProduct(Product product);

    ResponseEntity<Product> updateProduct(Long id, Product product);

    ResponseEntity<Void> deleteProduct(Long id);
}
