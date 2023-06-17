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
            <p>We would also need to add a new route for searching as:</p>
            <pre><code>
                ...
                {path: 'search/:keyword', component: ProductListComponent},
                ...
            </code></pre>
            <p>This path would be set in the <code>app.module.ts</code> file.</p>
        </li>
        <li>
            <b>Add new Angular Route for Searching</b>: 
        </li>
        <li>
            <b>Update Search Component to send data to Search Route</b>: 
        </li>
        <li>
            <b>Enhance <code>ProductListComponent</code> to search for products with <code>ProductService</code></b>: 
        </li>
        <li>
            <b>Update <code>ProductService</code> to call URL on Spring Boot App</b>: 
        </li>
    </ol>
</div>