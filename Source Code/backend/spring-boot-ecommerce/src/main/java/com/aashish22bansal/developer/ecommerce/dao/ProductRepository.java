package com.aashish22bansal.developer.ecommerce.dao;

import com.aashish22bansal.developer.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
