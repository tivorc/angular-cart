import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product!: Observable<Product>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    const productId$ = this.activatedRoute.params.pipe(
      map<Params, number>((params) => params.id)
    );

    this.product = productId$.pipe(
      mergeMap((productId) => this.getProduct(productId))
    );
  }

  ngOnInit(): void {}

  getProduct(productId: number) {
    return this.productService.getProduct(productId).pipe(
      mergeMap((product) => {
        return this.cartService.cart$.pipe(
          map((products) => {
            const productCart = products.find((p) => p.id === product.id);
            return productCart || product;
          })
        );
      })
    );
  }
}
