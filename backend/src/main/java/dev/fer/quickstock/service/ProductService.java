package dev.fer.quickstock.service;

import dev.fer.quickstock.dto.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProducts();

    Product saveProduct(Product product);


}
