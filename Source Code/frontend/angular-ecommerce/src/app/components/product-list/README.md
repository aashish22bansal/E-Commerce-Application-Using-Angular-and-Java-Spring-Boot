# Component - Product List
<p>Here, we will inject our dependency for <code>ProductService</code> in the <code>constructor()</code> into <code>ProductListComponent</code>. We will also setup a Property here for an array of products (using <code>Product[]</code>). Once the Angular component is initialized, we will call the <code>ngOnInit()</code> method which is similar to the <code>PostConstruct</code> which is where we will add the hook to call the <code>listProducts()</code> method. We will manually implement this method where we will call the <code>productService</code> and subscribe to the data. This method will execute asynchronously and when the data is returned, we will assign it to our own property (which is the <code>product[]</code>). This integrates our service with the Angular Component. Now, we will display this data through the HTML File.</p>

<p>We can display the data in a Tabular format.</p>

## Search Component
<div>
    <p>In this method, we will call the search methods according to the Search Mode. So, we will first check if this Route has a Parameter for <code>keyword</code> because if it does have a <code>keyword</code> parameter, then it means we are performing a search (the <code>keyword</code> parameter comes from the <code>route</code> configuration that we had setup earlier and also from the <code>SearchComponent</code> when the user enters the search data to navigate to the URL). </p>
</div>

## If Incorrect Input is provided
<div>
    <p>We will use the <code>role</code> attribute within the <code>div</code> element which is used to provide <b>Accessibility</b>. It provides extra information to assistive technologies such as Screen Readers (for visually impared). Within this <code>div</code> element, we would provide the message which we want to display.</p>
    <p>In this, while using the <code>*ngIf</code>, we used the <code>?</code> within the condition for <b>Safe Navigation</b> and this operator here is known as the <b>Safe Navigation Operator (?)</b>. It guards against null and undefined values in Property Paths (and provides a way to avoid null pointer issues). So, we can write the Algorithm as:</p>
    <pre><code>
        if(products is null/undefined) or (products.length == 0)
            display: "No products found."
    </code></pre>
</div>

## Pagination Component (User's Choice)
<div>
    <p>Now, we will let the user decide the number of Products which should be visible on the screen.</p>
    <p>For this, we can follow the following Development Process:</p>
    <ol>
        <li>
            <b>Add drop-down list for page size to HTML Template</b>: For this, we will simply use a <code>select</code> tag as:
            <div>
                <pre><code>
                    ...
                    < span class="mr-2">Page Size< /span >
                    < select #myPageSelect (change)="updatePageSize(myPageSelect.value)">
                        < option selected="true" >5< /option >
                        < option >10< /option >
                        < option >20< /option >
                        < option >50< /option >
                    < /select >
                    ...
                </code></pre>
            </div>
            <div>
                <p>We will define the name of the HTML Element and then we will add an Event Binding for the OnChange() Event. So, basically, when the user selects a page and we are going to call a method, <code>updatePageSize(...)</code>, defined in the <code>.component.ts</code> file, and pass the value selected by the User.</p>
            </div>
        </li>
        <li>
            <b>Update <code>ProductListComponent</code> for setting the Page Size</b>: Now, we had a call to the method <code>updatePageSize(...)</code> which can be defined as:
            <div>
                <pre><code>
                    updatePageSize(pageSize: string){
                        this.thePageSize = +pageSize;
                        this.thePageNumber = 1;
                        this.listProducts();
                    }
                </code></pre>
            </div>
            <div>So, this method will simply take the parameter of page size and will simply set the Page Size based on that parameter value.</div>
        </li>
    </ol>
</div>

## Pagination - Max Size
<div>
    <p>Now, if we have too many pages or too less products, then it is possible that the UI might start giving us a glitch. Now, if we happen to have a large number of products, then it is possible that the Selector will start running off the Screen. To prevent this, we can show only the maximum number of pages. Now, if we have very less number of products, then we will also need to manage that. For this, we will set a new parameter on the <code>ngb-pagination</code> component known as <code>[maxSize]</code> which will show the provided number of pages, and then it will display the max number of pages based on number of products per page.</p>
</div>


## Pagination - Boundary Links
<div>
    <p>This will allow the User to jump to the beginning or the end of the pages instantly. This will prevent the User from scrolling through every page. We can allow this by using the <code>[boundaryLinks]</code> parameter and setting it to <code>true</code>.</p>
</div>