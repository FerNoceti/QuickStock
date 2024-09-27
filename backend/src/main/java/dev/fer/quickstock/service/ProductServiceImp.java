package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;
import dev.fer.quickstock.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImp(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product productToUpdate = productRepository.findById(id).orElse(null);
        if (productToUpdate != null) {
            productToUpdate.setName(product.getName());
            return productRepository.save(productToUpdate);
        }
        return null;
    }

    @Override
    public boolean deleteProduct(Long id) {
        Product productToDelete = productRepository.findById(id).orElse(null);
        if (productToDelete != null) {
            productRepository.delete(productToDelete);
            return true;
        }
        return false;
    }
}
