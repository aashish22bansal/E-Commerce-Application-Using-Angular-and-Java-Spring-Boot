package com.aashish22bansal.developer.springboot.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
public class ProductCategory {
    /**
     * We will set the JPA Annotation for Table using the @Entity Annotation to map this argument table Product.
     *
     * For this class, we did not use the @Data Annotation because it is a known bug whenever we make use of
     * annotations like OneToMany and ManyToOne and hence we use the @Getter and @setter Annotations. These are
     * also Lombok Annotations and will generate the required code accordingly.
     *
     * We will add the JPA Annotations here as well just like the "Product" class.
     *
     * Now, we know that "products" here is a collection which displays a One-To-Many
     * relationship, so we will set the cascadeType to ALL and map it by "category".
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
}
