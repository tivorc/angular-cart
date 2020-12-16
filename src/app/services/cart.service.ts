import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Product[] = [];
  private _cart = new BehaviorSubject<Product[]>([]);

  cart = this._cart.asObservable();

  constructor() {}

  addCart(product: Product) {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index < 0) {
      this.products = [...this.products, { ...product, quantity: 1 }];
    } else {
      this.products[index].quantity = (this.products[index].quantity || 0) + 1;
    }
    this._cart.next(this.products);
  }

  removeCart(productId: number) {
    const index = this.products.findIndex((p) => p.id === productId);
    const quantity = (this.products[index].quantity || 0) - 1;

    if (quantity === 0) {
      this.products.splice(index, 1);
    } else {
      this.products[index].quantity = quantity;
    }

    this._cart.next(this.products);
  }

  emptyCart() {
    this.products = [];
    this._cart.next(this.products);
  }
}
