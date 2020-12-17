import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  categories: Observable<Category[]>;
  category: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {
    this.productService.getProducts(this.category);
    this.categories = this.categoryService.getCategories();
    this.products = this.productService.products$.pipe(
      mergeMap((list) => this.addQuantityFromCart(list))
    );
  }

  ngOnInit(): void {}

  changeCategory(categoryId: number) {
    this.category = categoryId;
    this.productService.getProducts(this.category);
  }

  private addQuantityFromCart(list: Product[]) {
    return this.cartService.cart$.pipe(
      map((cartProducts) =>
        list.map((p) => {
          const prod = cartProducts.find((el) => el.id === p.id);
          return { ...p, quantity: prod ? prod.quantity : 0 };
        })
      )
    );
  }
}
