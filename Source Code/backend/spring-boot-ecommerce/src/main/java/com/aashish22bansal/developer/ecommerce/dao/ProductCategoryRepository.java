package com.aashish22bansal.developer.ecommerce.dao;

import com.aashish22bansal.developer.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
