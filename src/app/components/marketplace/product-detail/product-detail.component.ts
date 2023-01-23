import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartServiceService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  private productDoc: AngularFirestoreDocument<Product>;
  product: Observable<Product | undefined>;

  constructor(
    private router: ActivatedRoute,
    private afs: AngularFirestore,
    private cartService: CartServiceService
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    this.productDoc = this.afs.doc<Product>(`prende_store/${id}`);
    this.product = this.productDoc.valueChanges({idField: 'id'});
  }
 

  addProduct() {
    this.product.subscribe(x => {
       this.cartService.addProductToCart(Object.assign({ quantity: 1 }, x))});
  }
}
