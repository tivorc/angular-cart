import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url: string = environment.apiUrl + environment.endpoints.products;
  constructor(private http: HttpClient) {}

  getProducts(categoryId: number) {
    let url = this.url;
    if (categoryId !== 0) url += '?category.id=' + categoryId;
    return this.http.get<Product[]>(url);
  }

  getProduct(productId: number) {
    const url = this.url + '/' + productId;
    return this.http.get<Product>(url);
  }
}
