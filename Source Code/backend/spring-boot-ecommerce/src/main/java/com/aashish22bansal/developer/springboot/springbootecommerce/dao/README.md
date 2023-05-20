# Data Access Object (DAO)
<p>In this Package, we will create the required interfaces.</p>

## <code>ProductRepository</code> Interface
<p>In this Interface, we will make use of the Spring Data JPA and extend the interface with it. For this, we will specify two entity types:</p>
<ol>
    <li>Entity Type (which happens to be <code>Product</code> in this case)</li>
    <li>Primary Key Data Type (which happens to be <code>Long</code> in this)</li>
</ol>

## <code>ProductCategoryRepository</code> Interface
<p>In this Interface, we will make use of the Spring Data JPA and extend the interface with it. For this, we will specify two entity types:</p>
<ol>
    <li>Entity Type (which happens to be <code>ProductCategory</code> in this case)</li>
    <li>Primary Key Data Type (which happens to be <code>Long</code> in this)</li>
</ol>
Here, we will add another customization using the <code>RepositoryRestResource</code> Annotation and providing the <code>collectionResourceRel</code> as <code>productCategory</code> and also by specifying the actual path using <code>path</code> as <code>product-category</code>.
Here, <code>collectionResourceRel</code> is the name of the actual JSON Entry and the <code>path</code> specifies the actual reference for the path.


## Integrating Spring Boot with Angular Application
<p>We will add the <code>@CrossOrigin</code> Annotation to all the Repositories (<code>ProductRepository</code> and <code>ProductCategoryRepository</code>). With this annotation, we will specify the Origin of the server where our Angular Application is running our JavaScript Application. With this, we can accept calls from Web Browser Scripts for this origin.</p>
<p>The Origin is more than just the hostname. It is the Protocol, hostname and the port number. And, all of these have to match for it to the same origin.</p> 