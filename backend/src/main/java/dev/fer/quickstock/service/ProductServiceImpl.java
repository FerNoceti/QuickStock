package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;
import dev.fer.quickstock.dto.ProductResponse;
import dev.fer.quickstock.dto.User;
import dev.fer.quickstock.dto.UserResponse;
import dev.fer.quickstock.repository.ProductRepository;
import dev.fer.quickstock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Product> getProductById(Long id) {
        return productRepository.findById(id)
                .map(product -> new ResponseEntity<>(product, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    public ResponseEntity<ProductResponse> saveProductToUser(Product product, String username) {
        User user = userRepository.findById(username).orElse(null);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.setPassword("");
        product.setUser(user);

        Product savedProduct = productRepository.save(product);


        UserResponse userResponse = new UserResponse();
        userResponse.setUsername(user.getUsername());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(savedProduct.getId());
        productResponse.setName(savedProduct.getName());
        productResponse.setDescription(savedProduct.getDescription());
        productResponse.setPrice(savedProduct.getPrice());
        productResponse.setStock(savedProduct.getStock());
        productResponse.setUser(userResponse);

        return new ResponseEntity<>(productResponse, HttpStatus.CREATED);
    }


    @Override
    public ResponseEntity<Product> updateProduct(Long id, Product product) {
        return productRepository.findById(id).map(productToUpdate -> {
            productToUpdate.setName(product.getName());
            productToUpdate.setDescription(product.getDescription());
            productToUpdate.setPrice(product.getPrice());
            productToUpdate.setStock(product.getStock());
            Product updatedProduct = productRepository.save(productToUpdate);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<Object> deleteProduct(Long id) {
        return productRepository.findById(id).map(productToDelete -> {
            productRepository.delete(productToDelete);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
