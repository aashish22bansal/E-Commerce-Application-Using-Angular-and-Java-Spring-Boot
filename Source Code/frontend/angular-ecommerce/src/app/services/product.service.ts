import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  // defining the Base URL for the Spring Boot REST API
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @param theCategoryId 
   * @returns the value of the currentCategoryId mapped for the getProductList() method
   */
  getProductList(theCategoryId: number): Observable<Product[]>{

    // Building the URL based on Category ID because Spring Data REST would automatically
    // expose the endpoint.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    
    console.log("within getProducts()");
    // So, we will return the searchUrl instead of the baseUrl
    return this.getProducts(searchUrl); // Refactored the code
  }

  /**
   * @param thePage: It is used to show the Page.
   * @param thePageSize: It is used to represent the Page Size.
   * @param theCategoryId: It represents the ID of the Category.
   * @param GetResponseProducts: It is used because we need to access the data in the calling application.
   * @returns the URL for required element along the concept of pagination.
   * 
   * We know that the Spring Data REST supports pagination, so we just send the parameters for page and size in the URL.
   */
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{
    // need to build URL based on Category ID, Page and Size of the Page.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  /**
   * Query Method
   * @param theKeyword: It is provided by the user.
   */
  searchProducts(theKeyword: string): Observable<Product[]> {
    // Building the URL based on "theKeyword" because Spring Data REST would automatically
    // expose the endpoint.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    console.log("within searchProducts()");
    // So, we will return the searchUrl instead of the baseUrl
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    // Build URL based on Product ID
    const productUrl = `${this.baseUrl}/${theProductId}`;

    // Performing Search
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}