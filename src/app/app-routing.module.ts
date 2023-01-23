import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/marketplace/product-detail/product-detail.component';
import { ProductListingComponent } from './components/marketplace/product-listing/product-listing.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {path: '', component: HomeComponent },


  
  {path: 'home', component: HomeComponent },
  {path: 'shop', component: ShopComponent },
  {path: 'products/:id', component: ProductDetailComponent },
  {path: 'shop-detail', component: ProductDetailComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
