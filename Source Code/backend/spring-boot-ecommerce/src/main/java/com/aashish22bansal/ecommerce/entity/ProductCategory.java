package com.aashish22bansal.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.service.spi.InjectService;

import java.util.Set;

@Entity
@Table(name = "product_category")
@Getter
@Setter
public class ProductCategory {
    /**
     * One thing with Lombok which is a known bug when using @Data Annotation whenever we use the relationships like
     * One-to-Many or Many-to-One. So, here, instead of using the @Data Annotation, we will use the @Getter and @Setter
     * Annotations. These are Lombok Annotations which will generate the getter and setter methods accordingly. This is
     * actually a workaround with this modern framework.
     *
     * We will define the required Fields in the class to which we will add the JPA Annotations.
     * For the "products" Attribute, since this is a One-to-Many, we will use the @OneToMany Annotation. This is one side
     * of the relationship, so we will have to set up the other side of the relationship as well in the Product.java
     * class as well.
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
