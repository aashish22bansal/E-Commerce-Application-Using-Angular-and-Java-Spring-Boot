<h1>Data Access Object</h1>
<h2>Creating the Repositories</h2>
<p>
    In this, we will create a new Java Interface called <code>ProductRepository</code> which will be extending <code>Spring Data JPA</code>. Here, we will specify the following:
    <ul>
        <li><b>Entity Type</b>: This is <code>Product</code>.</li>
        <li><b>Primary Key Type</b>: This is <code>Long</code>.</li>
    </ul>
</p>
<p>
    <p>Now, we will need to create another repository for the Product Categories. This is the <code>ProductCategoryRepository</code> Interface. This would also be extending the Java JPA Repository. Here, we will specify the following:</p>
    <ul>
        <li><b>Entity Type</b>: This is <code>Product</code>.</li>
        <li><b>Primary Key Type</b>: This is <code>Long</code>.</li>
    </ul>
</p>

<h2>Adding Customization to Repositories</h2>
<p>
    <p>We will add some customization to the <code>ProductCategoryRepository</code> using the <code>@RepositoryRestResource()</code> Annotation. For this, we will provide:</p>
    <ul>
        <li><b>Collection Resource Relationship</b> (<code>collectionResourceRel</code>): We will provide this value as <code>productCategory</code>. This is the name of the actual JSON Entry.</li>
        <li><b>Actual Path</b> (path): We will provide this value as <code>product-category</code>. This is the actual reference of the path.</li>
    </ul>
    <p>Using these, we are specifying the given data.</p>
</p>