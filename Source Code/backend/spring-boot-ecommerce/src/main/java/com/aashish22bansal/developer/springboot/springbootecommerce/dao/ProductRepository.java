package com.aashish22bansal.developer.springboot.springbootecommerce.dao;

import com.aashish22bansal.developer.springboot.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * Adding the Query Method findByCategoryId().
 * Here, we will match the Category ID using the Parameter Value "id". For this,
 * Spring Data REST would automatically expose the required endpoint.
 */
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Adding the Query Method
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
