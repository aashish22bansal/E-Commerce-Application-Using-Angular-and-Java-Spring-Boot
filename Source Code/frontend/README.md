# Angular Front End Development Procedure

<p>We will create the Angular Front end Components to retrieve data from Spring Boot REST APIs as we have already worked on the development of the backend and exposing the APIs. So, we have the Development Process as:</p>
<ol>
    <li>
        <b>Create Angular Project: </b>Here, we will create a new Angular Project using the Angular CLI with the following command: 
        <br>
        <center>
            <code>ng new angular-ecommerce</code>
        </center>
    </li>
    <li>
        <b>Create Angular Component for showing Product List: </b>Here, we will create a new component using the command: 
        <br>
        <center>
            <code>ng generate component components/product-list</code>
        </center>
        From this command, the generated files would be placed within the sub-directory <code>components/product-list</code>.
    </li>
    <li>
        <b>Develop TypeScript Class for Product: </b>Here, we will develop the TypeScript class for our <code>Product</code>. This is a basic TypeScript class which will hold the data for us. So, we will use the following command: 
        <br>
        <center>
            <code>ng generate class common/product</code>
        </center>
        This will create a very basic class as: <br>
        <code>
            export class Product {}
        </code>
        It will also add this class in the Properties for our given product. We can enhance this class by adding some or our own code to it as:
        <pre><code>
            export class Product {
                constructor(
                    public sku: string,
                    public name: string,
                    public description: string,
                    public unitPrice: number,
                    public imageUrl: string,
                    public active: boolean,
                    public unitsInStock: number,
                    public dateCreated: Date,
                    public lastUpdated: Date
                ){
                    // code
                }
            }
        </code></pre>
        Here, we will make use of the <b>Parameter Properties</b> which have been exposed by the REST API. We know that these are Parameter Properties because they have been declared by prefixing the constructor argument with an access modifier. So, the access modifiers which we can use are <code>public</code>, <code>protected</code>, <code>private</code> and <.code>read-only</code>. So, the key here is that if we have a constructor with arguments and we prefix it with these items, then it's automatically a Parameter Property.<br>
        With Parameter Properties, it actually declared the properties and assigns the properties automatically as it minimizes the boilerplate code for setting up a constructor.
    </li>
    <li>
        <b>Create Angular Service to call the REST APIs: </b>Here, we will create an Angular Service to call the REST APIs. So, an Angular Service is a code developed in TypeScript and Service is a helper class that provides the desired functionality and is part of the Angular Application which runs in the Web Browser Client-side. So, we have a Spring Boot Back-end exposing the REST APIs and we have a Front-end code using Angular (which has all the GUI Components) which will also have (multiple) Services.<br>
        Now, Angular provides a REST Client, known as the <code>HttpClient</code>. We will need to add support for this in the <b>Application Module</b>. So, in the <code>imports</code> section of our <code>@NgModule</code>, we will add a reference for the <code>HttpClientModule</code>. 
        The service would be injected into our components. Angular has built-in support for Dependency Injection Framework, so we will simply annotate this class with <code>@Injectable</code> provided in <code>root</code> which allows us to inject it as a dependency into another component or a class, so, if provided in <code>root</code> means that this class could be injected globally. In this, for now, we have the URL harded-coded which we will change.<br>
        From the constructor, we can see that our class has a dependency on the <code>HttpClient</code>. So, we can inject this client by making use of a constructor here where we will give a private reference and then Angular will handle injecting the given <code>HttpClient</code> into our given service.<br>
        We have the method <code>getProductList()</code> which will return an <code>Observable</code> of the <code>Product</code> array in which we will map our data to our response through which we have the JSON which would be coming back from that Spring Data REST API.<br>
        Further, we have the interface <code>GetResponse</code> which takes the <code>_embedded</code> and then takes those products inside of <code>_embedded</code> and then map those to a given product. So, this interface basically grabs the JSON Data, unwraps it and places the data into an array of products.
    </li>
    <li>
        <b>Update Angular Component to subscribe to data from Angular Service: </b> Here, we have the following code:
        <pre><code>
        import { Component, OnInit } from '@angular/core';
        import { ProductService} from 'src/app/services/product.service';
        import { Product } from 'src/app/common/product';
        @Component({
            selector: 'app-product-list',
            tempplateUrl: './product-list.component.html',
            styleUrls: ['./product-list.component.css']
        })
        export class ProductListComponent implements OnInit{
            products: Product[] = [];
            constructor(private productService: ProductService){}
            ngOnInit(){
                this.listProducts();
            }
            listProducts(){
                this.productService.getProductList().subscribe(
                    data => {
                        this.products = data;
                    }
                )
            }
        }</code></pre>
        In the above code, we have:
        <ul>
            <li>We can see that we have our class <code>ProductListComponent</code>.</li>
            <li>We have a field for products as an array (<code>Product[]</code>).</li>
            <li>We also have a constructor which has a dependency on <code>ProductService</code>, so that is injected by making use of <code>private productService</code>. This constructor allows us to inject that given component.</li>
            <li>Then, we will make use of the <code>ngOnInit()</code> (which is like a post-constructor method) which is called once the given component has been initialised.</li>
            <li>In the <code>listProducts()</code> method, where we call the <code>subscribe()</code> method in an asynchronous fashion which will run it in the background. So, once all the data has been retrieved or returned, we will assign that <code>data</code> to <code>Product[]</code>.</li>
        </ul>
    </li>
    <li>
        <b>Display the data in an HTML Page: </b>Now, that we have the data, we can display it in the HTML Page. We can display the data using the following code:
        <pre>
            <code>{{tempProduct.name}}: {{tempProduct.unitPrice | currency:'USD'}}</code>
        </pre>
        Here, we have the front-end Angular code making a call to the back-end Spring Boot code.
    </li>
    <li>
        <b>Add CrossOrigin Support to Spring Boot Application: </b>The code will not work until and unless we add the CrossOrigin Support to Spring Boot. This is because Web Browsers will not allow script code to call APIs that are not on the same origin. This is known as the <b>Same-origin Policy</b>. So, basically, the browser will have a Security Issue with any calls that we attempt to make that are not on the <b>Same Origin</b> (<b>Same Origin</b> is composed of the scheme or protocol or hostname and port number). So, even if we are on the same machine and we have two apps running on two different ports, then they are not considered the same origin. So, we will have to make some additional configurations to allow this communication to go back and forth. Now, this Same-origin Policy only applies to scripts running in a web browser. The restriction here is running the JavaScript code in the browser. We can relax this security by adding the <b>Cross-Origin Resource Sharing Support (CORS)</b>. So, we can make this modification on our server-side application. We can add the support as:
        <pre>
            <code>
                @CrossOrigin("http://localhost:4200")
                public interface ProductRepository extends JpaRepository<Product, Long>{
                    //code
                }
            </code>
        </pre>
        This is only for JavaScript code that is running in a browser and this will allow JavaScript code running on localhost:4200 to make a call to our given rest API. If we have multiple servers, then we can add them as:
        <pre>
            <code>
                @CrossOrigin({"http://localhost:4200", "http://www.mycoolapp.com"})
            </code>
        </pre>
        And, if we don't know the number of servers or who is executing the code, then we can just use the Annotation directly as:
        <pre>
            <code>
                @CrossOrigin
            </code>
        </pre>
    </li>
</ol>