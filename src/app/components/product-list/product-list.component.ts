import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: '[product-list]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  // @Input()
  // products!: Observable<Product[]>;

  @Input()
  products2!: Product[];

  constructor() {}

  ngOnInit(): void {}
}
