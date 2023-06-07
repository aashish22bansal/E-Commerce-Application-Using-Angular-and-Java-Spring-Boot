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

    // @TODO: need to build URL based on Category ID


    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}