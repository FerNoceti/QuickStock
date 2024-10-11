package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;
import dev.fer.quickstock.dto.ProductResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ResponseEntity<List<ProductResponse>> getAllProductsByUser(String username, String token);

    ResponseEntity<ProductResponse> getProductByIdForUser(Long id, String username);

    ResponseEntity<ProductResponse> addProductForUser(Product product, String username);

    ResponseEntity<ProductResponse> updateProductForUser(Long id, Product product, String username);

    ResponseEntity<Void> deleteProductForUser(Long id, String username);

    }
