import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any[] = [];
  totalAmount: number = 0; 
  vartotalAmount :number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.initializeCart();
    this.calculateTotal();
  }

  initializeCart() {
    this.items.forEach(item => {
      item.quantity = item.quantity || 1;
      item.total = item.price * item.quantity;
      item.totalAmount = 0; 
    });
  }

  incrementQuantity(item: any) {
    item.quantity++;
    item.total = item.price * item.quantity;
    this.cartService.updateLocalStorage();
    this.calculateTotal();
  }

  decrementQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
      if (item.quantity === 0) { this.removeItem(item); }
      item.total = item.price * item.quantity;
      this.cartService.updateLocalStorage();
      this.calculateTotal();
    }
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = 0;
    this.items.forEach(item => {
      item.total = item.price * item.quantity;
      this.totalAmount += item.total;
    });
  }
  
}