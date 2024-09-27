package dev.fer.quickstock.controller;

import dev.fer.quickstock.dto.Product;
import dev.fer.quickstock.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @PostMapping("/product")
    public Product saveProduct(Product product) {
        return productService.saveProduct(product);
    }

    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/product/{id}")
    public boolean deleteProduct(@PathVariable("id") Long id) {
        return productService.deleteProduct(id);
    }

}
