package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.product.Product;
import dev.fer.quickstock.dto.product.ProductResponse;
import dev.fer.quickstock.security.JwtTokenService;
import dev.fer.quickstock.service.product.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public ProductController(ProductService productService, JwtTokenService jwtTokenService) {
        this.productService = productService;
        this.jwtTokenService = jwtTokenService;
    }

    private String extractTokenFromHeader(String authorizationHeader) {
        return authorizationHeader.substring(7);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getProductsForUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = extractTokenFromHeader(authorizationHeader);
        String username = jwtTokenService.extractUsername(token);
        return productService.getAllProductsByUser(username, token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductByIdForUser(@PathVariable("id") Long id, @RequestHeader("Authorization") String authorizationHeader) {
        String token = extractTokenFromHeader(authorizationHeader);
        String username = jwtTokenService.extractUsername(token);
        return productService.getProductByIdForUser(id, username, token);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> saveProductForUser(@Valid @RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        String token = extractTokenFromHeader(authorizationHeader);
        String username = jwtTokenService.extractUsername(token);
        return productService.addProductForUser(product, username, token);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProductForUser(@PathVariable("id") Long id, @Valid @RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        String token = extractTokenFromHeader(authorizationHeader);
        String username = jwtTokenService.extractUsername(token);
        return productService.updateProductForUser(id, product, username, token);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductForUser(@PathVariable("id") Long id, @RequestHeader("Authorization") String authorizationHeader) {
        String token = extractTokenFromHeader(authorizationHeader);
        String username = jwtTokenService.extractUsername(token);
        return productService.deleteProductForUser(id, username, token);
    }
}
