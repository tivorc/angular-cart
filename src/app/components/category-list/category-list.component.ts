import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: '[category-list]',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Input()
  categories!: Observable<Category[]>;

  @Input()
  selectedCategory!: number;

  @Output()
  category = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  handlerClick(categoryId: number) {
    this.category.emit(categoryId);
  }
}
