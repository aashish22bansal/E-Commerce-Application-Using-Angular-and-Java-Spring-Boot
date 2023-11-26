# Services
<p>Here, we will create the Base URL for the Spring Boot REST API. Then, we will create the Injector in the Constructor using the <code>HttpClient</code>.</p> Further, we will create the <code>getProductList()</code> method which would return an <code>Observable</code> of <code>Product</code> Array. This method is basically going to map the JSON data from the Spring Data REST Service to a <code>Product</code> Array. We will also add a supporting interface <code>GetResponse</code> which would help us unwrap the JSON data from the Spring Data REST API and make use of <code>_embedded</code> entry that comes back from the Spring Data REST API. Here, we will access the <code>products[]</code>.

<p>By default, the Spring Data REST Service would return only the first page of 20 items, so even if we have a 100 products in the database, it will return only first 20. We can do a quick work around here to modify and tell the service to return <code>x</code> number of items for us. For this, we will modify the product.service.ts file by changing the <code>baseUrl</code> from <code>http://localhost:8080/api/products</code> to <code>http://localhost:8080/api/products?size=100</code>. This will simply change the page size to 100 items.</p>

<p>The <code>getProductCategories()</code> method is used to obtain the Product Categories and this method would return an <code>Observable<></code> of type <code>ProductCategory</code> Array because we are returning a list of Product Categories.</p>

<p>Within the Product Service, we will also create a new interface named, <code>GetResponseProductCategory</code>, which will have an array of <code>productCategory</code>. This would be used to call the REST API.</p>

## Pagination - Keyword Search
<div>
    <p>We can add the Pagination Process for the Keyword Search using the following Development Process:</p>
    <ol>
        <li><b>Add Pagination Support to ProductService:</b> In this, we will create a new method <code>searchProductsPaginate()</code> to build the Search URL. Also, the Spring Data REST supports Pagination, so all we have to do is send the parameters for Page and Size.</li>
        <li><b>Update ProductListComponent to handle Pagination:</b> In this, inside the <code>handleSearchProducts()</code> method, we call the service and we pass the Page Number, Page Size and Keyword as parameters. Also, we will have to decrement the Page Number by 1 because the Pagination Component pages are 1-based and in Spring Data REST, the pages are 0-based. Then, we will <code>subscribe()</code> to this method.</li>
    </ol>
    <p>So, we take a JSON Response and map it to the fields in the Angular Component.</p>
</div>