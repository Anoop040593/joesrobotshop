import { Component, input } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { IProduct } from '../product.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'bot-quantity-selector',
  imports: [],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.css',
})
export class QuantitySelectorComponent {
  constructor(
    private cartService: CartService,
    public inventoryService: InventoryService,
  ) {}
  product = input.required<IProduct>();
  count: number = 0;
  incQuan(product: IProduct) {
    this.cartService.addToCart(product);
    this.count++;
  }

  decreaseQuan(product: IProduct) {
    this.cartService.removeFromCart(product);
    this.count--;
  }
}
