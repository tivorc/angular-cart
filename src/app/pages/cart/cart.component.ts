import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products!: Observable<Product[]>;

  constructor(private cartService: CartService) {
    this.products = this.cartService.cart;
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
