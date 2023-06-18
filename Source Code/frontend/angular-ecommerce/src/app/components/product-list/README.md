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