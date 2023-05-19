package com.aashish22bansal.developer.springboot.springbootecommerce.dao;

import com.aashish22bansal.developer.springboot.springbootecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
