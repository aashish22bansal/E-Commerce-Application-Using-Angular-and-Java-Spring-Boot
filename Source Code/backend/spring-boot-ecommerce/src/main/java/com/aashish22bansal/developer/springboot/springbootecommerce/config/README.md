# Configuration
<p>In this, we want to configure our REST API and make it read-only because Spring Data REST will expose all the endpoints. So, we get support for GET, POST, PUT and DELETE (which happen to be all the CRUD Operations). This is not what we want. This is because we do not want anyone on the outside to add new products or delete products. For this, we can disable the POST Method, allow the GET Methods, disable the PUT Methods and also disable the DELETE Methods.</p>
<p>We will also need to add the <code>@Configuration</code> Annotation which would basically allow this to scan any given item.</p>
<p>We can do this in the following ways:</p>
<ul>
    <li>
        <b>Options 1:</b> Do not use Spring Data REST. So, in this, we would:
        <ul>
            <li>Manually create our own <code>@RestController</code>.</li>
            <li>Manually define methods for access using <code>@GetMapping</code>.</li>
            <li>But we lose the Spring Data REST support for paging, sorting, etc.</li>
        </ul>
    </li>
    <li>
        <b>Option 2:</b> Use Spring Data REST
        <ul>
            <li>Configure to disable certain HTTP methods: POST, DELETE, etc.</li>
        </ul>
    </li>
</ul>

<p>For implementing these configurations, we will extend the <code>RepositoryRestConfigurer</code> interface. This interface is from the Spring Data REST API. We will simply override this method or implement this method for <code>ConfigureRepositoryRestConfiguration</code> where we will setup a list to disable HTTP methods for PUT, POST and DELETE. Then, the configuration would say that for this particular domain type, we will setup the configuration for single item and also collection. The API would make use of the Java Lambdas Annotation so we have params for metadata, httpMethods, the Array Method using which we create a Lambda method to disable and we pass the array to disable.</p>