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
        <li>Configure the Router based on the routes.</li>
        <li>Define the Router Outlet.</li>
        <li>Set up Router Links to pass category ID Parameter.</li>
        <li>Enhance <code>ProductListComponent</code> to read category ID Parameter.</li>
        <li>Modify Spring Boot Application REST Repository to handle the new category ID.</li>
        <li>Update the Angular Service to call new URL on Spring Boot Application.</li>
    </ol>
</div>
