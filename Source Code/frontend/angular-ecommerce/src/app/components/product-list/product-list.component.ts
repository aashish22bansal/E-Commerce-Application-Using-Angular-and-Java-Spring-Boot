import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  // List of Products
  products: Product[] = [];

  // Adding a property for currentCategoryId
  currentCategoryId: number = 1;

  /**
   * 
   * @param productService 
   * @param route 
   * Used for Injecting the Activated Route.
   * It is the current active route that loaded the component which is useful for 
   * accessing route parameters because we need that for accessing the given category
   * ID.
   */
  constructor(private productService: ProductService,
              private route: ActivatedRoute
             ){}
  
  /**
   * Here, we will need to subscribe on the paramMap for this given route.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  /**
   * Here, we will check if the "id" parameter is available just to know if we can use 
   * that value or if we need to use the default value.
   * We will first check if there is a value being passed or not. If there is a value 
   * being passed, then we will fetch that value and convert that value into a number. It
   * is possible that the value in the currentCategoryId variable might be a null value, so
   * we will need to use the non-null assertion operator (!) which tells the compiler that
   * the object is not null. This helps in resolving the compiler errors. If there is no
   * value, then we will return the default value.
   * After this, we will obtain the products for that value of the Category ID. For this, 
   * we will pass the this.currentCategoryId to the getProductList() method which is mapped
   * to product.service.ts file.
   */
  listProducts(){
    // obtaining the passed value
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); // This will return true if the parameter is available.

    // checking based on the boolean value obtained above
    if(hasCategoryId){
      // reading the Category ID and then converting it to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      // since the Category ID is not available, we will return the default value of 1
      this.currentCategoryId = 1;
    }

    // Calling the ProductService and subscribing to the data.
    // Fetching the products for the given Category ID.
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
