import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: '[product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  product!: Product;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addCart(this.product);
  }

  removeToCart() {
    if (!this.product.quantity) return;
    this.cartService.removeCart(this.product.id);
  }
}
