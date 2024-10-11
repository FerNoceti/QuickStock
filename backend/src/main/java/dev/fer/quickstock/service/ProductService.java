package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;
import dev.fer.quickstock.dto.ProductResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ResponseEntity<List<Product>> getProducts();

    ResponseEntity<Product> getProductById(Long id);

    ResponseEntity<ProductResponse> saveProductToUser(Product product, String username);

    ResponseEntity<Product> updateProduct(Long id, Product product);

    ResponseEntity<Object> deleteProduct(Long id);
}
