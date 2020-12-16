import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

interface Monto {
  total: number;
  amount: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products!: Observable<Product[]>;
  itemss!: Observable<Monto>;

  constructor(private cartService: CartService) {
    this.products = this.cartService.cart$;
    this.itemss = this.cartService.cart$.pipe(
      map((i) => {
        const amount = i.reduce((a, b) => a + (b.quantity || 0) * b.price, 0);
        return { total: i.length, amount };
      })
    );
  }

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addCart(product);
  }

  removeToCart(product: Product) {
    if (!product.quantity) return;
    this.cartService.removeCart(product.id);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }
}
