package com.aashish22bansal.developer.springboot.springbootecommerce.config;

import com.aashish22bansal.developer.springboot.springbootecommerce.entity.Product;
import com.aashish22bansal.developer.springboot.springbootecommerce.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{
    /**
     *
     * Generating the method configureRepositoryRestConfiguration()
     * @param config Main configuration bean.
     * @param cors CORS configuration.
     */
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        //RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        // Setup an array for the method for the unsupported actions
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Disabling HTTP Methods for Product: PUT, POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class) // This will apply to the ProductRepository
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))) // So, for the given Product Item, we will make use of the Java Lambdas Syntax with the Arrow Symbol and then we will use the httpMethods.disable and we pass theUnsupportedActions[] array.
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        // Disabling HTTP Methods for ProductCategory: PUT, POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }
}
