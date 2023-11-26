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

  // Search Mode
  searchMode: boolean = false;

  /**
   * Adding new Properties for Pagination.
   */
  thePageNumber: number = 1; // Represents the current page number.
  thePageSize: number = 5; // Represents the number of items per page.
  theTotalElements: number = 0;
  previousCategoryId: number = 1;

  /**
   * Keyword Pagination Search
   */
  previousKeyword: string = "";


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
   * REFACTORING CODE
   * In this method, we will call the search methods according to the Search Mode.
   * So, we will first check if this Route has a Parameter for "keyword" because if it does 
   * have a keyword parameter, then it means we are performing a search (the "keyword" parameter
   *  comes from the "route" configuration that we had setup earlier and also from the 
   * "SearchComponent" when the user enters the search data to navigate to the URL).
   */
  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }

  /**
   * Within this method, we wil take the JSON Response and we will map it to the fields here in this class.
   * So, all of the Pagination data and so forth will be assigned accordingly.
   */
  processResult(){
    return (data: any) => {
      this.products = data._embedded.products; // This is the information coming back from the JSON Response
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  /**
   * Adding new method called handleSearchProducts().
   * In this, we first need to obtain the actual keyword ("theKeyword") that the user passed in,
   * basically reading a parameter. Then, we will search for products using that given 
   * keyword.
   */
  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!; // Note the Exclamation Mark.

    /**
     * If we have a different keyword than the previousKeyword, then we can set thePageNumber Parameter to 1.
     * We have implemented something similar for the Category IDs when we were making use of listingProducts.
     */
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1; // With this, we are basically resetting it if there is a new keyword coming through
    }

    // Keeping track of the keyword
    this.previousKeyword = theKeyword;

    // Debugging Purpose
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // Search for Products using theKeyword
    // this.productService.searchProducts(theKeyword).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );

    /**
     * Now, we will search for products using the new method and update the previous section (above) code as:
     */
    this.productService.searchProductsPaginate(
        this.thePageNumber-1, 
        this.thePageSize, 
        theKeyword
      ).subscribe(
        this.processResult() // This will make a call to the processResult() method
      );
  }

  /**
   * Adding new method called handleListProducts().
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
   * 
   * 
   * For the Concept of Pagination, we will have to check if we have a different category than
   * previous.
   * NOTE: Angular will reuse a component if it is currently being viewed. Angular may not always
   *       create a new component everytime. If a component is currently being used in the browser,
   *       then Angular will simply reuse that component, so to handle it we will need to perform
   *       some additional operations.
   *       This needs to be done to reset the page number or if resetting the page number is required.
   *       If we have a different Category ID, then we will reset the Page Number to 1.
   */
  handleListProducts(){
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

    // If we have a different Category ID, then we will reset the Page Number to 1.
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    // Now, we need to keep track of the Category ID.
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    // Now, we need to obtain the products for the given Category ID by calling the service getProductListPaginate() as:
    //  Calling the ProductService and subscribing to the data.
    //  Fetching the products for the given Category ID.
    this.productService.getProductListPaginate(this.thePageNumber-1, // This is required because in Angular, pages are 1-based whereas in Spring Boot, pages are 0-based
                                               this.thePageSize, 
                                               this.currentCategoryId
                                              ).subscribe( // Mapping data from the JSON Data to the Property Response
      
      // data => {
      //   /**
      //    * In this, on the LHS, we have the properties defined in the class and in the RHS, we have the data from Spring Data REST JSON
      //    * which is from the Interface GetResponseProducts.
      //    */
      //   this.products = data._embedded.products;
      //   this.thePageNumber = data.page.number + 1; // This is required because in Angular, pages are 1-based whereas in Spring Boot, pages are 0-based
      //   this.thePageSize = data.page.size;
      //   this.theTotalElements = data.page.totalElements;
      // }
      // Refactoring the above code with the below reusable method
      this.processResult()
    )
  }

  /**
   * 
   * @param pageSize represents the Page Size selected by the User.
   * The below method will change the number of products displayed to the same number passed in the parameter.
   */
  updatePageSize(pageSize: string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts(); // This will refresh the PageView based the number of products selected.
  }

}
