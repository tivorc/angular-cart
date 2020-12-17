import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: '[cart-details]',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  @Input()
  products!: Observable<Product[]>;
  @Input()
  items!: Observable<{ total: number; amount: number }>;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addCart(product);
  }

  removeToCart(product: Product) {
    if (!product.quantity) return;
    this.cartService.removeCart(product.id);
  }

  emptyCart() {
    Swal.fire({
      title: '¡Un momento!',
      text: '¿Seguro que desea limpiar el carrito?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.cartService.emptyCart();
      }
    });
  }

  confirm() {
    Swal.fire({
      title: 'Confirmar',
      text: '',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'question',
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.cartService.emptyCart();
        Swal.fire('', 'Se registró correctamente', 'success').then(() => {
          this.router.navigateByUrl('/');
        });
      }
    });
  }
}
