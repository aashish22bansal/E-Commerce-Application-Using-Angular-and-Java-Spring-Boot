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

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}