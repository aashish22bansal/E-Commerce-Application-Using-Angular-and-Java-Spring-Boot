# Base Directory
In the <code>app.module.ts</code>, we need to import the <code>HttpClientModule</code>. This is the module which contains the <code>HttpClient</code>. For these, we will also need to provide the specific import statements manually. Also, in the <code>providers</code> section, we will need to add the <code>ProductService</code> service. This will allow us to inject the given service into other parts of our application.


## Release 2.0 - Plan
<ul>
    <li>Online Shop Template Integration</li>
    <li>Search for Products by Category: For this feature, we will have a menu on the left-hand side which would consist of links and upon selecting any of the links, we will be able to select the products of that particular category.</li>
    <li>Search for Products by Text Box</li>
    <li>Master/Detail View of Products</li>
    <li>Pagination Support for Products</li>
    <li>Add Products to Shopping Cart (CRUD)</li>
    <li>Shopping Cart Check-out</li>
</ul>
<div>
    <p><b>Development Process:</b></p>
    <ol>
        <li>Obtain the HTML Template Files</li>
        <li>Install Bootstrap CSS Style locally using npm</li>
        <li>Add local custom CSS styles to Angular <code>src/styles.css</code> file</li>
        <li>Integrate template files into Angular app</li>
        <li>Add support for icons and logos</li>
        <li>Enhance application with Product Images</li>
    </ol>
</div>

## Angular Routing
<div>
    <p>In Angular, we can add links to our application which will route to other components in the application. Angular Routing will handle updating the view for the application. When a link is clicked, then it will update only a section of the page, it will not update the entire page.</p>
    <p>Some of the Key components of Angular Routing are:</p>
    <ul>
        <li><b>Router</b>: It provides the main routing service as it enables navigation between the views based on user actions.</li>
        <li><b>Route</b>: It maps a URL Path to a component.</li>
        <li><b>RouterOutlet</b>: This acts as a placeholder so it renders the desired component based on the route.</li>
        <li><b>RouterLink</b>: It is the specific link to specific routes in the application.</li>
        <li><b>ActivatedRoute</b>: It is the current active route that loaded the component. It is useful for accessing the route parameters.</li>
    </ul>
    <b>More about Routes</b>: <a href="http://angular.io/guide/route">http://angular.io/guide/route</a>
    <p>Development Process:</p>
    <ol>
        <li><b>Define the Routes</b>: A route has a <b>path</b> and a reference to a component. So, when the user selects the link for the route path, Angular will create a new instance of that component. So, we can set up the route using, for example, the following code:
            <pre><code>
            const routes: Routes = [
                { path: 'products', component: ProductListComponent }
            ]
            </code></pre>
            <p>The above code specifies the path to match and create a new instance of that component when the path matches. So, in the above example, when they go for products, then we will create a new <code>ProductListComponent</code> and pass the appropriate data to that <code>ProductListComponent</code>. <b>The path in the above code has no LEADING slashes because Angular can handle that for us.</b></p>
            <p>We can also add a route to show products for a given category ID as:</p>
            <pre><code>
                const routes: Routes = [
                    { path: 'category/:id', component: ProductListComponent },
                    { path: 'category', component: ProductListComponent },
                    { path: 'products', component: ProductListComponent },
                    { path: '', redirectTo: '/products', pathMatch: 'full' },
                    { path: '**', redirectTo: '/products', pathMatch: 'full' }
                ]
            </code></pre>
            <p>We can also add a custom PageNotFoundComponent for 404s, so that instead of redirecting to the main page, it will redirect to that specific page as:</p>
            <pre><code>
                const routes: Routes = [
                    { path: '**', component: PageNotFoundComponent }
                ]
            </code></pre>
            <p>We must make sure that we place pages such as PageNotFoundComponent in the end because the order of the routes is important as the first match wins while traversing top down. So, we should start from specific to generic.</p>
        </li> 
        <li<b>Configure the Router based on the routes</b>: 
            <p>We will configure the application in the application module file (<code>app.module.ts</code> file) as:</p>
            <pre><code>
                const routes: Routes = [ ... ];
                @NgModule({
                    declarations: [
                        AppComponent,
                        ProductListComponent
                    ],
                    imports: [
                        RouterModule.forRoot(routes),
                        BrowserModule,
                        HttpClientModule
                    ],
                    providers: [ ProductService ],
                    bootstrap: [ AppComponent ]
                })
                export class AppModule { }
            </code></pre>
            <p>So, from the above code, we can see that we have a new entry in the import section:</p>
            <pre><code>RouterModule.forRoot(routes)</code></pre>
            <>To this import, we will give the routes. These routes are defined earlier as a constant (in the above code, using <code>routes</code>). Using this, the application will know about the routes which we have setup.</p>
        </li>
        <li><b>Define the Router Outlet</b>: 
            <p>The <b>Router Outlet</b> acts as the placeholder as it renders the desired component based on route. So, in our application, we have our menu items on the left from which we select the link and then the router outlet is actually the place where the router component would be rendered. It updates only a single section of the page and it does not reload the entire page. For this, we will update the <code>app.component.html</code> to use the Router Outlet as:</p>
            <pre><code>
                <b> < router-outlet > </ router-outlet > </b>
            </code></pre>
            <p>So, based on the appropriate configuration, it will display the content here.</p>
            <p>We have some of the routes as:</p>
            <pre><code>
                const routes: Routes = [
                    {path: 'category/:id', component: ProductListComponent},
                    {path: 'category', component: ProductListComponent},
                    {path: 'products', component: ProductListComponent},
                    {path: '', redirectTo: '/products', pathMatch: 'full' },
                    {path: '**', redirectTo: '/products', pathMatch: 'full' }
                ]
            </code></pre>
            <p>So, we will create an instance of the <code>ProductListComponent</code> and we will display the products based on the given category ID for that given link. We can remove the <code>app-product-list</code> component because that information would be updated dynamically based on the router setup.</p>
            </li>
        <li>
            <b>Set up Router Links to pass category ID Parameter</b>:
            <p>In the HTML page, we will setup the links to our routes and pass the category ID as a parameter. So, we will setup the links and based on those links we will have the router outlet display the appropriate component based on the given category ID, where we are passing the category ID with the link. We will add the links to the menu sidebar as:</p>
            <pre><code>
                <li>
                    <a routeLink="/category/1" routerLinkActive="active-link">Book</a>
                </li>
                <li>
                    <a routeLink="/category/2" routerLinkActive="active-link">Coffee Mugs</a>
                </li>
            </code></pre>
            <p>So, from our configuration, we had a <code>/:id</code>, which is the actual ID that will be passed to the <code>ProductListComponent</code>. And once the user clicks the link, we can also apply a custom CSS Style. We will make the category IDs dynamic and we will read the category information from the REST API that will get the information from the database.</p>
        </li>
        <li>
            <b>Enhance <code>ProductListComponent</code> to read category ID Parameter</b>: 
            <p>So, we need to read the information so that we can use it. So, we can set a property (named <code>currentCategoryId</code> of type <code>number</code>)which would store the value of the ID and obtain the information as:</p>
            <pre><code>
                currentCategoryId: number = 1;
                ...
                this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
            </code></pre>
            <p>In the above code, for <code>currentCategoryId</code>, we have:</p>
            <ul>
                <li><code>route</code>: It represents the activated route.</li>
                <li><code>snapshot</code>: It represents the state of the <code>route</code> at that given moment in time.</li>
                <li><code>paramMap</code>: It is the map of all the <code>route</code> parameters.</li>
                <li><code>id</code>: It is the provided ID as a parameter. And, this is based on the configuration that we have setup for our route in <code>category/:<b>id</b></code>. This is how we actually access the parameter ID that's being passed over.</li>
            </ul>
            <p>The parameter value is returned as a <code>String</code>, so we can actually use the <code>+</code> symbol to convert the string to a <code>number</code>. <b>This is a TypeScript trick where we can add a <code>+</code> symbol at the beginning of the string which would convert the <code>String</code> into a <code>number</code></b>.</p>
        </li>
        <li>
            <b>Modify Spring Boot Application REST Repository to handle the new category ID</b>:
            <p>Currently, the Spring Boot App returns the <code>product</code>(s) regardless of the <code>category</code>. We need to modify this to only return the products for a given category ID. Now, Spring Data REST and Spring Data JPA supports "query methods", so behind the scene, Spring Boot method will construct a query based on method naming conventions. For example, in the <code>ProductRepository</code> interface, we will add the following code:</p>
            <pre><code>
                public interface ProductRepository extends JpaRepository<Product, Long>{
                    Page< Product > findByCategoryId(@Param("id") Long id, Pageable pageable);
                }
            </code></pre>
            <p>Since the above method (<code>findByCategoryId()</code>) starts with <code>findBy</code>, hence this method is a <b>Query Method</b>, hence Spring will do special processing for this method. In this method, we have the following:</p>
            <ul>
                <li><b>A Query Method</b>: <code>findBy</code></li>
                <li><b>Match by Parameter</b>: <code>CategoryId</code></li>
                <li><b>Parameter Value</b>: <code>Long id</code></li>
            </ul>
            <p>So, behind the scenes, Spring will execute a query similar to this:</p>
            <pre><code>
                SELECT * 
                FROM product
                WHERE category_id=?;
            </code></pre>
            <p>So, Spring will actually look at that method name, parse that method name and then execute a query similar to the one above.</p>
            <p>The <code>Page</code> and <code>Pageable</code> provides support for pagination. In the method above, <code>Page</code> is a sublist of a list of objects and <code>Pageable</code> represents pagination information, so it has the information such as which page number to go to, page size, the previous reference, the next reference and so on. And, all of these objects are created automatically behind the scenes, by the Spring Framework.</p>
            <p>Spring Data REST will automatically expose the endpoints for the query methods. So, any method starts with <code>findBy</code>, <code>readBy</code>, <code>queryBy</code>, etc. would be available under the <code>/search</code> or the query name.</p>
            <p>Now, we also need to pass some data using the given REST API. For this, we will simply use, <code>?id=< ID_NUMBER ></code>.</p>
        </li>
        <li>
            <b>Update the Angular Service to call new URL on Spring Boot Application</b>:
            <p>Now, we have the <code>ProductService</code> as:</p>
            <pre><code>
                export class ProductService{
                    private baseUrl = 'http://localhost:8080/api/products';
                    constructor(private httpClient: HttpClient){   }
                    getProductList(theCategoryId: number): Observable< Product[] >{
                        const url = '${this.baseUrl}/search/findByCategoryId?=${theCategoryId}';
                        return this.httpClient.get< GetResponse >(url).pipe(
                            map(response => response._embedded.products)
                        );
                    }
                }
            </code></pre>
            <p>In the above method, we have a base URL, we have the method <code>getProductList()</code> to which we add this new parameter (the category ID) and then we simply set a reference URL (<code>/search/findByCategoryId</code>) and we simply associate or append the category ID that was passed into this given method based on the parameter that we pass to this given angular method in our product service.</p>
        </li>
    </ol>
</div>

## More on Query Methods
<div>
    <p>We can also provide our own custom query using <code>@Query</code> annotation and provide our own query, for example, </p>
    <pre><code>
        @Query(
        "
            SELECT p 
            FROM Product p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchText, '%'))
        "
        +
        "
            OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchText, '%'))
        "
        )
        Page< Product > performCustomFunction(@Param("searchText") String searchText, Pageable pageable);
    </code></pre>
    <p>The Query Methods also have support for conditional: <code>AND</code>, <code>OR</code>, <code>LIKE</code>, <code>SORT</code>, etc.</p>
</div>

## Search By Category
<div>Until now, we had kept the Names and IDs of our Categories as static by hardcoding them. We can enhance the application to read the Categories from the database via a REST API.</div>
<div>
    <p>So, we have the development process as:</p>
    <ol>
        <li>
            <p><b>Modify Spring Boot Application - Expose Entity IDs</b>: By Default, Spring Data REST does not expose Entity IDs. We need the Entity IDs for a number of use cases, for example, obtaining a list of Product Categories by ID, create a Master/detailed View to get a Product by ID.</p>
            <p>Now, if we look at the response from the REST API, then we will see that there is no Entity ID at the <code>ProductCategory</code> level. But if we were to look at the <b>HATEOS Level</b>, then we can see that there is an Entity ID. But this comes with a problem which is that there is no easy access as it requires parsing the URL String which is not an ideal approach. An ideal approach for this is that we need to have the response from the REST API to actually include the Entity ID at the <code>ProductCategory</code> level. So, we will have the Category ID and also the Category Name which is what we need for Easy Access.</p>
            <p>So, we need to update the Spring Data REST config to expose the Entity IDs. We can use the following procedure for this:</p>
            <ul>
                <li>Get a List of all Entity classes from the Entity Manager.</li>
                <li>Create an array of Entity Types</li>
                <li>Get the Entity Types for each of the Entities</li>
                <li>Expose the entity IDs for the Array of Entity/Domain Types.</li>
            </ul>
            <p>We can update the Spring Data REST Config to expose Entity IDs as:</p>
            <pre><code>
                @Configuration
                public class MyDataRestConfig implements RepositoryRestConfigurer{
                    private EntityManager entityManager;
                    @Autowired
                    public MyDataRestConfig(EntityManager theEntityManager){
                        entityManager = theEntityManager;
                    }
                    //code
                }
            </code></pre>
            <p>So, in <code>MyDataRestConfig</code>, we need to auto-wire the JPA Entity Manager, effectively inject the Entity Manager. In the above code, we can see that we are using the constructor injection to inject the JPA Entity Manager.</p>
            <pre><code>
                @Override
                public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config){
                    //code 
                    // call an internal helper method
                    exposeIds(config);
                }
                private void exposeIds(RepositoryRestConfiguration config){
                    // expose Entity IDs
                    // code
                    // 1. Gets a list of all entity classes from the entity manager.
                    Set< EntityType< ? > > entities = entityManager.getMetamodel().getEntities();
                    // 2. Create an array of Entity Types
                    List< Class > entityClasses = new ArrayList<>();
                    // 3. Get the Entity types for the entities
                    for(EntityType tempEntityType: entities){
                        entityClasses.add(tempEntityType.getJavaType());
                    }
                    // 4. Expose the Entity IDs for the array of Entity/Domain Types
                    Class[] domainTypes = entityClasses.toArray(new Class[0]);
                    config.exposeIdsFor(domainTypes);
                }
            </code></pre>
            <p>Now, in our configuration, the above method (<code>configureRepositoryRestConfiguration</code>), we are going to call an internal helper method called <code>exposeIds()</code>, and we will pass in the <code>config</code>. In this, we will get a collection of all Entity Classes from the Entity Manager and then we will create an array list of those entity types. Next, we will get the Entity Types for the Entities. Then, for each of the <code>EntityType</code>, we will obtain the Java Type (using <code>getJavaType()</code>), and then add that to our Entity Classes. Finally, we will expose the Entity IDs for the collection of Entity Domain Types. So, we will take that collection of Entity Classes and convert it to Array (giving us an array of classes or domain types), then we will use <code>config.exposeIdsFor(domainTypes)</code>, to obtain the desired output.</p>
            <p>So, once we run the application, we will have the Entity ID at the <code>ProductCategory</code> level.</p>
        </li>
        <li>
            <p><b>Create a class <code>ProductCategory</code></b>: We will create this class in the Angular Application using the following command:</p>
            <pre><code>ng generate class common/product-category</code></pre>
            <p>This will give us an empty file to which we will add the following properties (<code>id</code> and <code>categoryName</code>) as:</p>
            <pre><code>
                export class ProductCategory{
                    constructor(public id: number, public categoryName: string){
                        //code
                    }
                }
            </code></pre>
        </li>
        <li>
            <p><b>Create a new component for our menu</b>: In this, we will encapsulate the categories we have in the menu as a Menu Component. So, we can generate this component using the following command: </p>
            <pre><code>ng generate component components/product-category-menu</code></pre>
        </li>
        <li>
            <p><b>Enhance our menu component to read data from product service</b>: In order to achieve this, we will create the property <code>productCategories</code> in the <code>ProductCategoryMenuComponent</code> as:</p>
            <pre><code>
                export class ProductCategoryMenuComponent implements OnInit{
                    productCategories: ProductCategories[] = [];
                    constructor(private productService: ProductService){  }
                    ngOnInit(){
                        this.listProductCategories();
                    }
                    listProductCategories(){
                        this.productService.getProductCategories().subscribe(
                            data => {
                                console.log('Product Categories: ' + JSON.stringify(data));
                                this.productCategories = data;
                            }
                        )
                    }
                }
            </code></pre>
            <p>In the above code, <code>productCategories</code> is an array of Product Category Items. We inject our <code>productService</code> into this component and we <code>subscribe()</code> to our <code>listProductCategories()</code> obtained from <code>productCategories</code>. Here, we are simply logging the data returned from the service and then assigning the data to our property. So, we are obtaining the information from our service and we are assigning it.</p>
        </li>
        <li>
            <p><b>Update Product Service to call URL on Spring Boot App</b>: We can achieve this with the following code:</p>
            <pre><code>
                export class ProductService{
                    private categoryUrl = 'http://localhost:8080/api/product-category';
                    // code
                    getProductCategories(): Observable< ProductCategory[] >{
                        return this.httpClient.get< GetResponseProductCategory >(this.categoryUrl).pipe(
                            map(response => response._embedded.productCategory)
                        );
                    }
                }
                interface GetResponseProductCategory{
                    _embedded: {
                        productCategory: ProductCategory[];
                    }
                }
            </code></pre>
            <p>In the above code, we can see that we have the <code>categoryUrl</code> for the REST API. We call that REST API using the <code>get()</code> method which returns an Observable and we simply map the JSON Data from the Spring Data REST to our <code>productCategory</code> array. Then, we will use the <code>GetResponseProductCategory</code> interface where we unwrap the JSON from the Spring Data REST <code>_embedded</code> entry.</p>
        </li>
        <li>
            <p><b>In HTML, replace the hard-coded links with the new menu component</b>: We will remove the hard-coded part and use our <code>app-product-category-menu</code> component. So, we will use our selector here for our new component.We will just loop over the <code>productCategories</code> and build the links dynamically to which we will add the Category ID and display the Category Name.</p>
        </li>
    </ol>
</div>

## Search for Products by Keyword
<div>
    <p>We would search for the required Product in the Search Bar with the help of some keywords. The Development Process for this Search is:</p>
    <ol>
        <li>
            <b>Modify Spring Boot App to add a new Search Method</b>: 
            <p>The Spring Data REST and Spring Data JPA supports "Query Methods", so Spring will construct a Query based on method-naming conventions. So, we have the <code>ProductRepository</code> as:</p>
            <pre><code>
                public interface ProductRepository extends JpaRepository< Product, Long >{
                    Page< Product > findByNameContaining(@Param("name") String name, Pageable pageable);
                    // Logic
                }
            </code></pre>
            <p>So, we will add the new method named <code>findByNameContaining()</code> to which we will pass the actual name.</p>
            <p>Now, we need to find the Products based on name, so we would need to use a special Query Method, in this case, the method contains the keyword <b>"Containing"</b> which is similar to <b>LIKE</b> (in SQL). So, behind the scenes, Spring would actually execute a query as:</p>
            <pre><code>
                SELECT * 
                FROM Product p
                WHERE p.name LIKE CONCAT('%', :name, '%');
            </code></pre> 
            <p>Here, <code>name</code> is the actual name which is being passed as a parameter.</p>
            <p>This search would happen under the following URL:</p>
            <center>http://localhost:8080/api/products/search/findByNameContaining?name=< NAME_OF_THE_PRODUCT ></center>
            <p>This is a method of passing the name to the REST API.</p>
        </li>
        <li>
            <b>Create a new Component for Search</b>: 
            <p>For this, we will create a new Component using the command:</p>
            <pre><code>ng generate component components/search</code></pre>
        </li>
        <li>
            <b>Add new Angular Route for Searching</b>: 
            <p>We would also need to add a new route for searching as:</p>
            <pre><code>
                ...
                {path: 'search/:keyword', component: ProductListComponent},
                ...
            </code></pre>
            <p>This path would be set in the <code>app.module.ts</code> file.</p>
        </li>
        <li>
            <b>Update Search Component to send data to Search Route</b>: 
            <p>We will need to send the data to the search route so that,</p>
            <ol>
                <li>Users can enter Search Text</li>
                <li>Click the Search Button</li>
                <li><code>SearchComponent</code> has a click handler method</li>
                <li>Read the Search Text</li>
                <li>Route the data to the "<b>search</b>" route</li>
                <li>Handled by the <code>ProductListComponent</code></li>
            </ol>
            <p>Now, this is being handled by the <code>ProductListComponent</code> because we want to reuse the logic and view for listing products (which would prevent us from reinventing the wheel).</p>
            <p>We have the HTML component as:</p>
            <pre><code>
                < div >
                    < input #myInput 
                            type="text"
                            placeholder="Search for products..."
                            class="au-iinput au-input-xl"
                            {keyup.enter}="doSearch(myInput.value)"
                    />
                    < button 
                             {click}="doSearch(myInput.value)"
                             class="au-btn-submit" >
                        Search
                    < /button >
                < /div >
            </code></pre>
            <p>The Template Reference Variable (<code>#myInput</code>) provides access to the element and the button click triggers the execution of the method: </p>
            <pre><code>
                doSearch(value: string){
                    console.log(`value=${value}`);
                    this.router.navigateByUrl(`/search/$(value)`);
                }
            </code></pre>
            <p>This element maps to the HTML Page to which we pass the value. This method navigates the required URL using the route and would be handled by the <code>ProductListComponent</code> to which we will pass the search data.</p>
        </li>
        <li>
            <b>Enhance <code>ProductListComponent</code> to search for products with <code>ProductService</code></b>: 
            <p>We have the following code in the <code>product-list.component.ts</code> file:</p>
            <pre><code>
                ...
                const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
                // now search for the products using keyword
                this.productService.searchProducts(theKeyword).subscribe(
                    data => {
                        this.products = data;
                    }
                )
                ...
            </code></pre>
            <p>Here, we actually read the keyword (which comes in as a parameter) based on our route configuration which is passed in from the <code>SearchComponent</code>. Using this, we will call the <code>searchProducts()</code> method using the keyword(s).</p>
        </li>
        <li>
            <b>Update <code>ProductService</code> to call URL on Spring Boot App</b>: 
            <p>So, we have the <code>product.service.ts</code> file as:</p>
            <pre><code>
                ...
                searchProducts(theKeyword: string): Observable< Product[] >{
                    // need to build URL based on the keyword
                    const searchUrl = `&{this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
                    return this.httpClient.get< GetResponseProducts >(searchUrl).pipe(map(response => response._embedded.products))
                }
                ...
                interface GetResponseProducts{
                    _embedded: {
                        products: Products[];
                    }
                }
            </code></pre>
            <p>Using the above code, we create the URL to search for products by plugging in the parameters passed. Then, we will call the REST API which would return an Observable using which we will map the JSON Data from the Spring Data REST to <code>Product[]</code> Array and then we simply unwrap the JSON Data from Spring Data REST using the <code>_embedded</code> entry.</p>
        </li>
    </ol>
</div>

## Event Binding
<div>
    <p>In our application, in order to search for a Product, the user will enter the information in the search field and then click on the "Search" button. So, when the user clicks the button, we should be able to read the provided input and perform operations on it or use it. So, we will take that Text Data and pass it to the REST API for performing the search and this can be done with the help of Event Binding.</p>
    <p>In Angular, we can listen to the events with the help of Event Binding (which is also known as Event Handling), for example,</p>
    <pre><code>
        < button {click}="doMyCustomWork()" >Search< /button >
    </code></pre>
    <p>So, from the above button, we want to listen for a <b>"click"</b> event so that we can trigger an Event Handler. This is basically a method in our Angular Component Code and it can be any method name that we define. So, we can have the custom method as:</p>
    <pre><code>
        doMyCustomWork(){
            console.log("Custom Work");
        }
    </code></pre>
</div>

## Reading User Input
<div>
    <p>Suppose we have the following button:</p>
    <pre><code>
        < input #myInput type="text" {keyup.enter}="doMyCustomWork(myInput.value)" />
    </code></pre>
    <p>Now, in this input text field, we will listen for the "<b>enter</b>" key, so when the user hits the enter key, then we will call the <code>doMyCustomWork()</code> method. Along with this, we will use the <code>#</code> symbol which acts as a Template Reference Variable for <code>myInput</code> which would give access to the element and then we have the method within the Component perform the Custom Operation. In this, <code>myInput.value</code> gives the actual value that the user typed which would be passed to the custom method as a String.</p>
    <p>Extending this, we can add a Search button as:</p>
    <pre><code>
        < input #myInput type="text" {keyup.enter}="doMyCustomWork(myInput.value)" />
        < button {click}="doMyCustomWork(myInput.value)" >Search< /button >
    </code></pre>
    <p>Using the button, we will listen for a click event, and then we will call the method to perform the custom operation as:</p>
    <pre><code>
        doMyCustomWork(providedInput: string){
            console.log("Custom Work");
        }
    </code></pre>
    <p>With this, whether the user hits the search button or the enter key, the same method would be triggered.</p>
</div>

## Other Events
<div>
    <p>Some of the other events which we can use are:</p>
    <ul>
        <li>
            <b><code>focus</code></b>: An element has received focus.
        </li>
        <li>
            <b><code>blur</code></b>: An element has lost focus.
        </li>
        <li>
            <b><code>keyup</code></b>: Any key is released. For a specifc key, the enter key, use: <code>keyup.<b>enter</b></code>.
        </li>
        <li>
            <b><code>keydown</code></b>: Any key is pressed.
        </li>
        <li>
            <b><code>dblclick</code></b>: The mouse is clicked twice on an element.
        </li>
    </ul>
    <p>More Events: <a href="https://developer.mozilla.org/en-US/docs/Web/Events">https://developer.mozilla.org/en-US/docs/Web/Events</a>.</p>
</div>

# Product Master-Detail View
<div>
    <p>We need to create a View using which the Products Details should be presented to the user. The Development Process for this is:</p>
    <ol>
        <li>
            <b>Create a new Component for Product Details</b>: 
            <p>We will create the new Component using the following command:</p>
            <pre><code>ng generate component components/ProductDetails</code></pre>
        </li>
        <li>
            <b>Add new Angular Route for Product Details</b>: 
            <p>We can add the new Angular Route as:</p>
            <pre><code>
                ...
                {path: 'products/:id', component: ProductDetailsComponent},
                ...
            </code></pre>
            <p>Here, <code>:id</code> is the Parameter and the Component is the <code>ProductDetailsComponent</code>.</p>
        </li>
        <li>
            <b>Add Router Links to the <code>product-list-grid.component.html</code> HTML Page</b>: 
            <p>So, when the user clicks on the Product, then we should be able to show the details for which we will add a link to the Product Image and the Product Name. We can program this as:</p>
            <pre><code>
                < div *ngFor="let tempProduct of products" class="col-md-3" >
                    < div class="product-box" >
                        < a routerLink="/products/{{ tempProduct.id }}">
                            < img src="{{ tempProduct.imageUrl }}" class="img-responsive" />
                        < /a >
                        < a routerLink="/products/{{ tempProduct.id }}">
                            < h1 >{{ tempProduct.name }}< /h1 >
                        < /a >
                        ...
                    < /div >
                < /div >
            </code></pre>
            <p>In this, we will pass the parameter value which is stored in <code>:id</code>.</p>
        </li>
        <li>
            <b>Enhance <code>ProductDetailsComponent</code> to retrieve from <code>ProductService</code></b>: 
            <p>In this, we will first get the <code>id</code> from the <code>param</code> string as set in the route (using <code>id</code>) and convert a String to a Number. Then, we will retrieve the product from the <code>ProductService</code> using the <code>getProduct()</code> method as:</p>
            <pre><code>
                ...
                // Get the "id" param string. Convert the string to a number using the "+" symbol
                const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
                this.productService.getProduct(theProductId).subscribe(
                    data => {
                        this.product = data;
                    }
                )
                ...
            </code></pre>
        </li>
        <li>
            <b>Update <code>ProductService</code> to call URL on Spring Boot App</b>: 
            <p>We have the <code>ProductService</code> as:</p>
            <pre><code>
                getProduct(theProductId: number): Observable< Product >{
                    // need to build URL based-on Product ID
                    const productUrl = `${this.baseUrl}/${theProductId}`;
                    return this.httpClient.get< Product >(productUrl);
                }
            </code></pre>
            <p>Here, we make a call of the REST API using the <code>productUrl</code> which returns an <code>Observable</code> using which we will directly convert the returned JSON Data to <code>Product</code> object. So, there is no need to unwrap the JSON Data from Spring Data REST because there is no <code>_embedded</code> entry. The JSON Properties map directly to properties in <code>Product</code> class.</p>
        </li>
        <li>
            <b>Update the HTML Page for <code>ProductDetailsComponent</code> to display Product Details</b>: 
            <p>In the details page, we will provide:</p>
            <ul>
                <li>Image of the Product</li>
                <li>Name of the Product</li>
                <li>Price of the Product</li>
                <li>Description of the Product</li>
                <li>Cart Button</li>
                <li>Navigation Link to go back to the Main Product List</li>
            </ul>
            <p>We can program this as:</p>
            <pre><code>
                < div class="detail-section" >
                    < div class="container-fluid" >
                        < img src="{{ product.imageUrl }}" class="detail-img" />
                        < h3 >{{ product.name }}< /h3 >
                        < div class="price" >{{ product.unitPrice | currency:'USD' }}< /div >
                        < a href="#" class="primary-btn" >Add to Cart< /a >
                        < hr >
                        < h4 >Description< /h4 >
                        < p >{{ product.description }}< /p >
                        < a routerLink="/products" class="mt-5" >Back to Product List< /a >
                    < /div >
                < /div >
            </code></pre>
        </li>
    </ol>
</div>

# Pagination
<p>Pagination is useful for handling large amounts of data as it will show the user a small subset of data. The user would be provided with a link for use to view the other pages.</p>

## Pagination Concepts
<p>So, we query the database for a list of products and we will show the user for a page of data. So, we don't show the user everything but only a part of the data at a time. We might have a huge number of records but we will return only a small subset of it.</p>
<p>We will create the Pagination support using Spring Boot (from back-end) and Angular (for front-end). In Spring Boot, we will be using the concept of Spring Data REST which provides the support for it.</p>

### Spring Data REST - Parameters
<p>
    <p>By default, Spring Data REST return 20 elements but we can customize it by passing parameters as:</p>
    <ul>
        <li><b><code>page</code></b>: It provides the page number to access. It is 0-based (which means it defaults to 0).</li>
        <li><b><code>size</code></b>: It returns the size of the page or, basically, the number of items per page.</li>
    </ul>
</p>

## Pagination Example
<p>
    <p>We can understand the Pagination using the following example:</p>
    <p>Page 1 URL: <code>http://localhost:8080/api/products?page=<b>0</b>&size=10</code></p>
    <p>Page 2 URL: <code>http://localhost:8080/api/products?page=<b>1</b>&size=10</code></p>
    <p>In the above URLs, we can see that the first URL is the first page and the second URL is the second page. Since everything is 0-based, the page numbers start from 0.</p>
</p>

## Spring Data REST - Response Metadata
<p>
    <p>While using Spring Data REST, the Response Metadata has valuable information, for example, in the JSON Response, we have the array of product and we have a section which has information about the page, for example:</p>
    <pre><code>
        << array of products >>
        "page": {
            "size": 10,
            "totalElements": 200,
            "totalPages": 20,
            "number": 0
        }
    </code></pre>
    <p>In the above response, we have:</p>
    <ul>
        <li><b><code>size</code></b>: It represents the size of the page.</li>
        <li><b><code>totalElements</code></b>: It represents the grand total of all the elements in the database for this query but we are not returning all the elements and just the count for informational purposes only.</li>
        <li><b><code>totalPages</code></b>: It represents the total pages that are available.</li>
        <li><b><code>number</code></b>: It represents the current page number that we are viewing in this JSON Response.</li>
    </ul>
</p>

## Pagination with Angular
<p>
    <p>For Pagination in Angular, we will make use of the <code>ng-bootstrap</code> Framework. It provides certain bootstrap widgets which can be used in an Angular way to take advantage of the framework.</p>
</p>

### Pagination Component in <code>ng-bootstrap</code>
<p>
    <p>The Pagination Component has a number of different components:</p>
    <ul>
        <li><b><code>page</code></b>: It represents the page number of access. It is 1-based which means that it defaults to 1.</li>
        <li><b><code>pageSize</code></b>: It represents the size of the page, which defaults to 10.</li>
        <li><b><code>collectionSize</code></b>: It represents the total number of items.</li>
        <li><b><code>pageChange</code></b>: It is the Event Handler for the page change events.</li>
    </ul>
    <p>We can use the Pagination component as:</p>
    <pre><code>
        < ngb-pagination [(page)]="thePageNumber"
                         [pageSize]="thePageSize"
                         [collectionSize]="theTotalElements"
                         (pageChange)="listProducts()"
        >
        < /ngb-pagination >
    </code></pre>
    <p>This component will generate links for pagination.</p>
</p>

## Pagination - Development Process
<p>
    <p>The steps to be followed for this process are:</p>
    <ol>
        <li>
            <b>Install <code>ng-bootstrap</code></b>:
            <p>For this, we will run the following commands in the Angular project directory:</p>
            <ul>
                <li>
                    <code>> ng add @angular/localize</code>
                    <p>This is a dependency for Angular v9+.</p>
                </li>
                <li>
                    <code>> npm install @ng-bootstrap/ng-bootstrap@13.0.0</code>
                    <p>This will intall the <code>ng-bootstrap</code> component framework.</p>
                </li>
            </ul>
            <p>We will also need to import the module for pagination in the <code>app.module.ts</code> file and add an entry for imports as</p>
            <pre><code>
                import { NgModule } from '@ng-bootstrap/ng-bootstrap';
                @NgModule({
                    ...
                    imports: [
                        RouterModule.forRoot(routes),
                        BrowserModule,
                        HttpClientModule,
                        <b>NgbModule</b>
                    ],
                    ...
                })
                export class AppModule{}
            </code></pre>
        </li>
        <li>
            <b>Refactor the interface for <code>GetResponseProducts</code></b>:
            <p>We currently use the interface <code>GetResponseProducts</code> to map the JSON Data from the REST API to the TypeScript objects as:</p>
            <b>JSON:</b>
            <pre><code>
                {
                    "_embedded": {
                        "products": [{
                            "id": 1,
                            "sku": "BOOK-TECH-1000",
                            "name": "Crash Course in Python"
                            ...
                        }, {
                            "id": 2,
                            "sku": "BOOK-TECH-1001",
                            "name": "Become a Guru in JavaScript"
                            ...
                        }]
                    }
                }
            </code></pre>
            <b>TypeScript:</b>
            <pre><code>
                interface GetResponseProducts{
                    _embedded: {
                        products: Products[];
                    }
                }
            </code></pre>
            <p>We have the <code>_embedded</code> which contains the <code>products</code>.</p>
            <p>We know that the Response Metadata has some valuable information for pagination as:</p>
            <pre><code>
                << array of products >>
                "page": {
                    "size": 10,
                    "totalElements": 200,
                    "totalPages": 20,
                    "number": 0
                }
            </code></pre>
            <p>We need to grab this data and map this data to the TypeScript code. We can refactor the interface to support pagination as:</p>
            <b>JSON:</b>
            <pre><code>
                {
                    "_embedded": {
                        "products": [{
                            "id": 1,
                            "sku": "BOOK-TECH-1000",
                            "name": "Crash Course in Python"
                            ...
                        }, {
                            "id": 2,
                            "sku": "BOOK-TECH-1001",
                            "name": "Become a Guru in JavaScript"
                            ...
                        }]
                    },
                    "page": {
                        "size": 10,
                        "totalElements": 200,
                        "totalPages": 20,
                        "number": 0
                    }
                }
            </code></pre>
            <b>TypeScript:</b>
            <pre><code>
                interface GetResponseProducts{
                    _embedded: {
                        products: Products[];
                    },
                    page: {
                        size: number,
                        totalElements: number,
                        totalPages: number,
                        number: number
                    }
                }
            </code></pre>
            <p>This will help us capture and use that information.</p>
        </li>
        <li>
            <b>Add Pagination support to <code>ProductService</code></b>: 
            <p>To the <code>product.service.ts</code> file, we will add a new method:</p>
            <pre><code>
                getProductListPaginate( thePage: number,
                                        thePageSize: number,
                                        theCategoryId: number): Observable< GetResponseProducts >{
                    const url = `${this.baseUrl}/search/findByCategoryId` + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
                    return this.httpClient.get< GetResponseProducts >(url);
                }
            </code></pre>
            <p>In the above method, we pass the parameters for pagination and we send the parameters using the URL.</p>
        </li>
        <li>
            <b>Update <code>ProductListComponent</code> to handle Pagination</b>: 
            <p>We will update the <code>product-list.component.ts</code> file as:</p>
            <pre><code>
                export class ProductListComponent implements OnInit{
                    // New Properties for Pagination
                    thePageNumber: number = 1;
                    thePageSize: number = 10;
                    theTotalElements: number = 0;
                    ...
                    handleListProducts(){
                        ...
                        // Get the products for the given Category ID
                        // by calling the Service and passing the parameters
                        this.productService.getProductListPaginate(
                            this.thePageNumber - 1,
                            this.thePageSize,
                            this.currentCategoryId
                        ).subscribe(
                            // Processing the result coming from backend
                            data => {
                                this.products = data._embedded.products;
                                this.thePageNumber = data.page.number + 1;
                                this.thePageSize = data.page.size;
                                this.theTotalElements = data.page.totalElements;
                            } // end of data
                            /**
                                Here, when the data arrives from the product
                                service, we will set the properties based on
                                the data.
                                Here, everything on the RHS of the assignment
                                is data from Spring Data REST JSON.
                            */
                        ); // end of subscribe()
                    } // end of handleListProducts() method
                    /**
                        In the above method, we have used this.thePageNumber-1 
                        because in Angular, Pagination is 1-based where in Spring 
                        Data REST, Pagination is 0-based.
                    */
                }
            </code></pre>
            <p>So, we define some new properties for pagination.</p>
        </li>
        <li>
            <b>Enhance the HTML Template to use <code>ng-bootstrap</code> pagination component</b>: 
            <p>Here, we will add support to the Template File to support Pagination. We can include the template in the pagination file as:</p>
            <pre><code>
                < div class="footer-pagination" >
                    ...
                    < ngb-pagination [(page)]="thePageNumber"
                                     [pageSize]="thePageSize"
                                     [collectionSize]="theTotalElements"
                                     (pageChange)="listProducts()" >
                    < /ngb-pagination >
                    ...
                < /div >
            </code></pre>
            <p>We can see that we are passing the parameters. Here, the component will generate the links for Pagination the part of each parameter is:</p>
            <ol>
                <li>
                    <b><code>[(page)]="thePageNumber"</code></b>: 
                    <p>It is a two-way data-binding between HTML Template and the <code>ProductListComponent</code>. </p>
                    <p>On the LHS, the parameter <code>[(page)]</code> is a parameter of the <code>ngb-pagination</code> Component whereas on the RHS, we have the <code>thePageNumber</code> which is a property of the <code>ProductListComponent</code>. When the user clicks the "page" navigation link, then in the background, the TypeScript component, <code>thePageNumber</code> property is updated based on the user action. So, for example, if the user clicks on 4, then <code>thePageNumber</code> is set to 4.</p>
                    <p>But, on the other hand, if the TypeScript code updates the <code>thePageNumber</code>, then the UI Component is updated automatically using two-way binding. So, this is a binding from the TypeScript Code to the HTML Template.</p>
                </li>
                <li>
                    <b><code>[pageSize]="thePageSize"</code></b>: 
                    <p>This is a one-way binding.</p>
                    <p>On the LHS, <code>pageSize</code> is the parameter for the <code>ngb-pagination</code> component whereas in the RHS, <code>thePageSize</code> is a property of the <code>ProductListComponent</code>.</p>
                    <p>If our TypeScript code updates <code>thePageSize</code>, then the UI Component is updated automatically and so, based on this, they'll change how many pages are listed based on <code>thePageSize</code>.</p>
                </li>
                <li>
                    <b><code>[collectionSize]="theTotalElements"</code></b>: 
                    <p>This is a one-way binding.</p>
                    <p>If our TypeScript code updates the <code>theTotalElements</code>, then the UI Component is updated automatically. So, this will determine how the pagination controller's displayed based on the <code>collectionSize</code> or how many items are there.</p>
                </li>
                <li>
                    <b><code>(pageChange)="listProducts()"</code></b>: 
                    <p>This is an Event Binding.</p>
                    <p>So, for a <code>pageChange</code> Event, when the user clicks the a page navigation link, then it'll call the method <code>listProducts()</code>. This will allow us to access information from the database based on <code>thePageNumber</code>, <code>thePageSize</code>, etc. and return those items and update the actual template as:</p>
                    <pre><code>
                        export class ProductListComponent implements OnInit{
                            ...
                            listProducts(){
                                this.searchMode = ...;
                                if(this.searchMode){
                                    this.handleSearchProducts();
                                }
                                else{
                                    this.handleListProducts();
                                }
                            }
                        }
                    </code></pre>
                    <p>This is how we show a new page of products based on user actions.</p>
                </li>
            </ol>
        </li>
    </ol>
</p>

## Shopping Cart Status Component
<div>
    <p>For adding products to the Shopping Cart, we will use the "Add to Cart" button. Upon clicking the button, it should update the Shopping Cart Status which is keeping track of the total price and the total number of items in the shopping cart.</p>
</div>

### Overview of Entire Shopping Cart Process
<div>
    <ol>
        <li>Cart Status Component: On main page, display total price and quantity.</li>
        <li>Cart Details Page: List the items in the cart.</li>
        <li>Cart Details Page: add/remove items</li>
        <li>Checkout button</li>
        <li>Checkout Form</li>
    </ol>
</div>

### Add Products to Shopping Cart - Development Process
<div>
    <ol>
        <li><b>Create new Component - CartStatusComponent</b>: This CartStatusComponent will keep track of the total price and the number of items (quantity) for the shopping cart. We will create the component using the command: <code>ng generate component components/cart-status</code></li>
        <li>
            <b>Add the HTML Template for CartStatusComponent</b>: We will add HTML Content to this CartStatusComponent as:
            <pre><code>
                < div class="cart-area d-n" >
                    < a href="shopping-detail.html" >
                        < div class="total" >$36.98
                            <span>2</span>
                        < /div >
                        < i class="fa fa-shopping-cart" >< /i >
                    < /a >
                < /div >
            </code></pre>
            <p>This code contains status values at this point, and we will make them dynamic later.</p>
        </li>
        <li>
            <b>Add click handler for "Add to cart" button</b>: For the buttons on the <code>product-list-grid</code>, we will have this button for adding the item to the cart as:
            <pre><code>
                < !-- loop over the collection of products -- >
                < div *ngFor="let tempProduct of products" class="col-md-3" >
                    ...
                    < button (click)="addToCart(tempProduct)" class="btn btn-primary btn-sm" >Add to cart< /button >
                < /div >
            </code></pre>
            <p>In this code, we have <code>(click)="addToCart(tempProduct)"</code>, and then we will add the Click Handler here. So, on click event, we are going to call this method, <code>addToCart()</code>, and then we will pass in the product.</p>
        </li>
        <li><b>Update ProductListComponent with click handler method</b>: 
            <pre><code>
                addToCart(theProduct: Product){
                    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
                }
            </code></pre>
            <p>We will add the logic for processing to this method.</p>
        </li>
    </ol>
    <p></p>
</div>