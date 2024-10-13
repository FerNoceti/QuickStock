package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.product.Product;
import dev.fer.quickstock.dto.product.ProductResponse;
import dev.fer.quickstock.exception.ForbiddenException;
import dev.fer.quickstock.exception.UserNotFoundException;
import dev.fer.quickstock.security.JwtTokenService;
import dev.fer.quickstock.service.product.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;
    private final JwtTokenService jwtTokenService;

    @Autowired
    public ProductController(ProductService productService, JwtTokenService jwtTokenService) {
        this.productService = productService;
        this.jwtTokenService = jwtTokenService;
    }

    @GetMapping("/product/{username}")
    public ResponseEntity<List<ProductResponse>> getProductsForUser(@PathVariable("username") String username, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        try {
            return productService.getAllProductsByUser(username, token);
        } catch (ForbiddenException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/product/{username}/{id}")
    public ResponseEntity<ProductResponse> getProductByIdForUser(@PathVariable("id") Long id, @PathVariable("username") String username, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        try {
            return productService.getProductByIdForUser(id, username, token);
        } catch (ForbiddenException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/product")
    public ResponseEntity<ProductResponse> saveProductForUser(@Valid @RequestBody Product product, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtTokenService.extractUsername(token);

        try {
            return productService.addProductForUser(product, username, token);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/product/{username}/{id}")
    public ResponseEntity<ProductResponse> updateProductForUser(@PathVariable("id") Long id, @Valid @RequestBody Product product, @PathVariable("username") String username, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        try {
            return productService.updateProductForUser(id, product, username, token);
        } catch (ForbiddenException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/product/{username}/{id}")
    public ResponseEntity<Void> deleteProductForUser(@PathVariable("id") Long id, @PathVariable("username") String username, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.substring(7);

        try {
            return productService.deleteProductForUser(id, username, token);
        } catch (ForbiddenException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}

