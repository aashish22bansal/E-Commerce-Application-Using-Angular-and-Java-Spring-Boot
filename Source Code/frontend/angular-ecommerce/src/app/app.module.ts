import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { Product } from './common/product';

/**
 * Defining the Routes.
 */
const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: 'category', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // Providing the defined routes
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
