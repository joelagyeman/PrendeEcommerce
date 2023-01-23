import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { CartServiceService } from 'src/app/services/cart.service';
import { ORDER_PLACEMENT_SUCCESS } from 'src/app/utils/constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts$;
  totalPrice;
  orderCollection;
  email = '';
  full_name = '';
  phone_number = '';
  address = '';


  constructor(
    private cartService: CartServiceService,
    private afs: AngularFirestore,
    //private toastr: ToastrService
  ) {
    this.cartProducts$ = cartService.myData$;
    this.totalPrice = cartService.totalPrice$;
    this.orderCollection = afs.collection<Order>('orders');
  }

  private clearForm() {
    this.email = '';
    this.full_name = '';
    this.phone_number = '';
    this.address = '';
  }

  placeOrder() {
    const products = this.cartService.getCartProducts();
    if (products.length <= 0) { return; }

    this.orderCollection.add({ 
      fullName: this.full_name,
      address: this.address,
      orderProducts: products,
      phone_number: this.phone_number,
      email: this.email
    });
    this.cartService.clearCart();
    this.clearForm();
  }

  incrementCartProductQty(product: Product) {
    this.cartService.addProductToCart(product);
  }

  decrementCartProductQty(product: Product) {
    this.cartService.decreaseProductQuantity(product);
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }

  ngOnInit() {
    this.cartService.getCartProducts();
  }
}
