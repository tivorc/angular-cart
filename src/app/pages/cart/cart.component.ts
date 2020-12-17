import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products!: Observable<Product[]>;
  items!: Observable<{ total: number; amount: number }>;

  constructor(private cartService: CartService) {
    this.products = this.cartService.cart$;
    this.items = this.cartService.cart$.pipe(
      map((i) => {
        const amount = i.reduce((a, b) => a + (b.quantity || 0) * b.price, 0);
        return { total: i.length, amount };
      })
    );
  }

  ngOnInit(): void {}
}
