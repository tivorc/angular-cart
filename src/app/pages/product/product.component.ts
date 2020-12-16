import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    quantity: 0,
    category: { id: 0 },
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.activatedRoute.params.subscribe((response) => {
      this.productService.getProduct(response.id).subscribe((prod) => {
        this.cartService.cart$.subscribe((resp) => {
          const p = resp.find((l) => l.id === prod.id);
          this.product = p || prod;
        });
      });
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addCart(this.product);
  }

  removeToCart() {
    if (!this.product.quantity) return;
    this.cartService.removeCart(this.product.id);
  }
}
