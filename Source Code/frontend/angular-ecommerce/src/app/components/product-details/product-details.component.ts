import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // Defining Property for Product
  product!: Product;
  
  // Injecting Dependencies for the ProductService and Activated Route
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){}

  // Subscribe on the @params
  ngOnInit(): void{
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    // Obtain the ID Parameter String and convert it to Number using "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    // With the help of "id", we will use the ProductService
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
  }
}
