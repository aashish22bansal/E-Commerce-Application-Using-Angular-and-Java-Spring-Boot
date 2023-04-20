package com.aashish22bansal.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {
    /**
     * The @Entity denotes that this is an Entity and we will set up the JPA Annotation for Table to map this to the
     * Product.
     * We will use the @Data Annotation from the Lombok Project which will automatically generate the Getters and
     * Setters for the Project.
     *
     * We will be defining the Fields and for each of the Fields, we will need to add the JPA Mappings between the
     * Actual Fields and Columns using the @Column Annotation. We will use the @Id Annotation for the ID Attribute.
     * We will use the @CreationTimestamp and @UpdateTimestamp Annotation to automatically manage the Timestamp for
     * the Attributes.
     *
     * The @ManyToOne Annotation is being used to define the other side of the relationship from the ProductCategory.java
     * class. Along with this, we will also need to specify the Join Column using the @JoinColumn Annotation.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int unitsInStock;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
}
