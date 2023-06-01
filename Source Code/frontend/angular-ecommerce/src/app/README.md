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
            <p>To this import, we will give the routes. These routes are defined earlier as a constant (in the above code, using <pre><code>routes</code></pre>). Using this, the application will know about the routes which we have setup.</p>
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
        <li>Modify Spring Boot Application REST Repository to handle the new category ID.</li>
        <li>Update the Angular Service to call new URL on Spring Boot Application.</li>
    </ol>
</div>
