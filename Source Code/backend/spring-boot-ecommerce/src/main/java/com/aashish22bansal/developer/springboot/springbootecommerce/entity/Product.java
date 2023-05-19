package com.aashish22bansal.developer.springboot.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "product")
@Data
public class Product {
    /**
     * We will set the JPA Annotation for Table using the @Entity Annotation to map this argument table Product.
     * We will use the @Data Annotation from the Lombok Project. This will automatically generate the getters and
     * setters for us behind the scenes which would help in reducing the boilerplate code. We will not see the code
     * physically but Lombok will provide the support behind the scenes automatically.
     *
     * We will also need to add the JPA Mapping between the fields and the attributes of the tables.
     *
     * The @CreationTimestamp and @UpdateTimestamp are special Annotations and Hibernate will automatically manage
     * the timestamps using these annotations. With these, there is no need for the developer to call these fields
     * or set these fields beforehand as Hibernate will do all of this in the background.
     *
     * In this class, we will set the other side of the relationship which is Many-To-One on the "category" variable.
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
