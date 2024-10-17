package dev.fer.quickstock.service.product;

import dev.fer.quickstock.dto.product.Product;
import dev.fer.quickstock.dto.product.ProductResponse;
import dev.fer.quickstock.dto.user.User;
import dev.fer.quickstock.dto.user.UserResponse;
import dev.fer.quickstock.exception.ForbiddenException;
import dev.fer.quickstock.exception.UserNotFoundException;
import dev.fer.quickstock.repository.ProductRepository;
import dev.fer.quickstock.repository.UserRepository;
import dev.fer.quickstock.security.JwtTokenService;
import dev.fer.quickstock.security.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;
    private final TokenBlacklistService tokenBlacklistService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository, JwtTokenService jwtTokenService, TokenBlacklistService tokenBlacklistService) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    private void validateUserAndToken(String username, String token) {
        String tokenUsername = jwtTokenService.extractUsername(token);

        if (tokenBlacklistService.isTokenRevoked(token)) {
            throw new ForbiddenException("Token has been revoked");
        }

        if (!username.equals(tokenUsername)) {
            throw new ForbiddenException("You are not allowed to perform this action");
        }
    }

    private ProductResponse createProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                new UserResponse(product.getUser().getUsername(), product.getUser().getEmail())
        );
    }

    @Override
    public ResponseEntity<List<ProductResponse>> getAllProductsByUser(String username, String token) {
        validateUserAndToken(username, token);

        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        List<ProductResponse> productResponses = user.getProducts().stream()
                .map(this::createProductResponse)
                .toList();

        return new ResponseEntity<>(productResponses, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductResponse> getProductByIdForUser(Long id, String username, String token) {
        validateUserAndToken(username, token);

        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!product.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to access this product");
        }

        ProductResponse productResponse = createProductResponse(product);

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductResponse> addProductForUser(Product product, String username, String token) {
        validateUserAndToken(username, token);

        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));
        product.setUser(user);

        Product savedProduct = productRepository.save(product);
        ProductResponse productResponse = createProductResponse(savedProduct);

        return new ResponseEntity<>(productResponse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ProductResponse> updateProductForUser(Long id, Product product, String username, String token) {
        validateUserAndToken(username, token);

        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!existingProduct.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to update this product");
        }

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());

        Product updatedProduct = productRepository.save(existingProduct);
        ProductResponse productResponse = createProductResponse(updatedProduct);

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteProductForUser(Long id, String username, String token) {
        validateUserAndToken(username, token);

        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!product.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to delete this product");
        }

        productRepository.delete(product);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
