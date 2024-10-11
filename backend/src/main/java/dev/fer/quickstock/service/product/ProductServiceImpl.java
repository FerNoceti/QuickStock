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

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository, JwtTokenService jwtTokenService) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    public ResponseEntity<List<ProductResponse>> getAllProductsByUser(String username, String token) {
        String tokenUsername = jwtTokenService.extractUsername(token);

        if (!username.equals(tokenUsername)) {
            throw new ForbiddenException("You are not allowed to access this user's products");
        }

        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Product> products = user.getProducts();

        List<ProductResponse> productResponses = products.stream()
                .map(product -> new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getStock(), new UserResponse(user.getUsername())))
                .toList();

        return new ResponseEntity<>(productResponses, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductResponse> getProductByIdForUser(Long id, String username, String token) {
        String tokenUsername = jwtTokenService.extractUsername(token);

        if (!username.equals(tokenUsername)) {
            throw new ForbiddenException("You are not allowed to access this user's products");
        }

        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!product.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to access this product");
        }

        ProductResponse productResponse = new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getStock(), new UserResponse(user.getUsername()));

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductResponse> addProductForUser(Product product, String username) {
        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        product.setUser(user);

        Product savedProduct = productRepository.save(product);
        ProductResponse productResponse = new ProductResponse(savedProduct.getId(), savedProduct.getName(), savedProduct.getDescription(), savedProduct.getPrice(), savedProduct.getStock(), new UserResponse(user.getUsername()));

        return new ResponseEntity<>(productResponse, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ProductResponse> updateProductForUser(Long id, Product product, String username, String token) {
        String tokenUsername = jwtTokenService.extractUsername(token);

        if (!username.equals(tokenUsername)) {
            throw new ForbiddenException("You are not allowed to update this user's products");
        }

        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        Product existingProduct = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!existingProduct.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to update this product");
        }

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStock(product.getStock());

        Product updatedProduct = productRepository.save(existingProduct);
        ProductResponse productResponse = new ProductResponse(updatedProduct.getId(), updatedProduct.getName(), updatedProduct.getDescription(), updatedProduct.getPrice(), updatedProduct.getStock(), new UserResponse(user.getUsername()));

        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Void> deleteProductForUser(Long id, String username, String token) {
        User user = userRepository.findById(username).orElseThrow(() -> new UserNotFoundException("User not found"));

        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));

        if (!product.getUser().getUsername().equals(username)) {
            throw new ForbiddenException("You are not allowed to delete this product");
        }

        productRepository.delete(product);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
