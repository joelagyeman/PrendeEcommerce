import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products$: Observable<Product[]>;
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(afs: AngularFirestore) {
    this.productsCollection = afs.collection<Product>('prende_store');
    this.products$ = this.productsCollection.valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
  }

  clickProduct(product: Product) {
    console.log('Clicked Product');
  }
}
