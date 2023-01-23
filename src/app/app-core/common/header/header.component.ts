import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartProducts;

  constructor(private cartService: CartServiceService) {
    this.cartProducts = cartService.myData$;
  }

  ngOnInit() {
    this.cartService.getCartProducts();
  }

  cartIsNotEmpty() {
    return !this.cartService.isCartEmpty();
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
