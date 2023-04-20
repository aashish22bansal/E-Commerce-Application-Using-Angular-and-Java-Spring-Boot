package com.aashish22bansal.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
public class Product {
    /**
     * The @Entity denotes that this is an Entity and we will set up the JPA Annotation for Table to map this to the
     * Product.
     * We will use the @Data Annotation from the Lombok Project which will automatically generate the Getters and
     * Setters for the Project.
     */
    // Defining the Fields
    private Long id;
    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private boolean active;
    private int unitsInStock;
    private Date dateCreated;
    private Date lastUpdated;
}
