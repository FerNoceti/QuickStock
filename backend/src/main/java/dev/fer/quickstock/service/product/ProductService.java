package dev.fer.quickstock.service.product;

import dev.fer.quickstock.dto.product.Product;
import dev.fer.quickstock.dto.product.ProductResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {

    ResponseEntity<List<ProductResponse>> getAllProductsByUser(String username, String token);

    ResponseEntity<ProductResponse> getProductByIdForUser(Long id, String username, String token);

    ResponseEntity<ProductResponse> addProductForUser(Product product, String username, String token);

    ResponseEntity<ProductResponse> updateProductForUser(Long id, Product product, String username, String token);

    ResponseEntity<Void> deleteProductForUser(Long id, String username, String token);

}
