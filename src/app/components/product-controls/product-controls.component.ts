import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[product-controls]',
  templateUrl: './product-controls.component.html',
  styleUrls: ['./product-controls.component.css'],
})
export class ProductControlsComponent implements OnInit {
  @Input()
  quantity: number = 0;

  @Output()
  remove = new EventEmitter();

  @Output()
  add = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addToCart() {
    this.add.emit();
  }

  removeToCart() {
    this.remove.emit();
  }
}
