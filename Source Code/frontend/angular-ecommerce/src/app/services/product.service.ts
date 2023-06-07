import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // defining the Base URL for the Spring Boot REST API
  private baseUrl = 'http://localhost:8080/api/products';

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

    // So, we will return the searchUrl instead of the baseUrl
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}