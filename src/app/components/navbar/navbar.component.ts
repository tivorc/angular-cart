import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  total: Observable<number>;

  constructor(private cartService: CartService) {
    this.total = this.cartService.cart$.pipe(
      map((i) => i.reduce((a, b) => a + (b.quantity || 0), 0))
    );
  }

  ngOnInit(): void {}
}
