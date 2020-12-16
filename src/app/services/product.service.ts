import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = environment.apiUrl + environment.endpoints.products;
  private products = new BehaviorSubject<Product[]>([]);

  products$ = this.products.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(categoryId: number) {
    let url = this.url;
    if (categoryId !== 0) url += '?category.id=' + categoryId;
    this.http
      .get<Product[]>(url)
      .toPromise()
      .then((response) => this.products.next(response));
  }

  getProduct(productId: number) {
    const url = this.url + '/' + productId;
    return this.http.get<Product>(url);
  }
}
