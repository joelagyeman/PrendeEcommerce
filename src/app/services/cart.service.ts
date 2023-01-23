import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { PRODUCTS_LOCAL_STORAGE_KEY } from '../utils/constants';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private _myData$ = new BehaviorSubject<Product[]>([]);
  private _totalPrice$ = new BehaviorSubject<number>(0);
  public myData$ = this._myData$.asObservable()
  public totalPrice$ = this._totalPrice$.asObservable();
  
  constructor(private localStorageServie: LocalStorageService) { }

  getCartProducts() {
    const products = JSON.parse(this.localStorageServie.getLocalStorageItem(PRODUCTS_LOCAL_STORAGE_KEY) || '[]');
    this._myData$.next(products);
    this._totalPrice$.next(products.reduce((acc: number, val: Product) => acc + (val.price * val.quantity) , 0));
    return products;
  }

  addProductToCart(product: Product | undefined) {
    if (!product) { return }

    const products = this.getCartProducts();
    let newProducts = [...products];
    const existing = newProducts.find((x: Product) => x.id == product.id);
    existing ? existing.quantity += 1 : newProducts.push(product);    
    this.saveCartProducts(newProducts);
    this._myData$.next(newProducts);
    this._totalPrice$.next(newProducts.reduce((acc: number, val: Product) => acc + (val.price * val.quantity), 0));
  }


  decreaseProductQuantity(product: Product) {
    const products = this.getCartProducts();
    let newProducts = [...products];
    const existing = newProducts.find((x: Product) => x.id == product.id);
    if (!existing) return;

    existing.quantity -= 1;
    if (existing.quantity < 0) return;

    this.saveCartProducts(newProducts);
    this._myData$.next(newProducts);
    this._totalPrice$.next(newProducts.reduce((acc: number, val: Product) => acc + val.price , 0));
  }

  removeProductFromCart(product: Product) {
    const products = this.getCartProducts();
    const existingIndex = products.findIndex((x: Product) => x.id == product.id);
    if (existingIndex < 0) return;

    products.splice(existingIndex, 1)
    const newProducts = [...products];
    this.saveCartProducts(newProducts);
    this._myData$.next(newProducts);
    this._totalPrice$.next(newProducts.reduce((acc: number, val: Product) => acc + (val.price * val.quantity) , 0));
  }

  saveCartProducts(products: Product[]) {
    const stringifiedProduct = JSON.stringify(products);
    this.localStorageServie.storeItemOnLocalStorage(PRODUCTS_LOCAL_STORAGE_KEY, stringifiedProduct);
  }

  isCartEmpty() {
    return (this.localStorageServie.getLocalStorageItem(PRODUCTS_LOCAL_STORAGE_KEY) || []).length <= 0;
  }

  clearCart() {
    this.localStorageServie.storeItemOnLocalStorage(PRODUCTS_LOCAL_STORAGE_KEY, []);
    this._myData$.next([]);
    this._totalPrice$.next(0);
  }
}