import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  // products: Observable<Product[]>;
  products2!: Product[];
  categories: Observable<Category[]>;
  category: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService
  ) {
    // this.products = this.productService.getProducts(this.category);
    this.addQuantityFromCart();
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit(): void {}

  changeCategory(categoryId: number) {
    this.category = categoryId;
    // this.products = this.productService.getProducts(this.category);
    this.addQuantityFromCart();
  }

  private addQuantityFromCart() {
    this.productService.getProducts(this.category).subscribe((resp) => {
      this.cartService.cart.subscribe((r) => {
        this.products2 = resp.map((p) => {
          const prod = r.find((el) => el.id === p.id);
          return { ...p, quantity: prod ? prod.quantity : 0 };
        });
      });
    });
  }
}
