import { Injectable, signal } from '@angular/core';
import { IProduct } from './product.model';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<IProduct[]>([]);

  constructor(private inventoryService: InventoryService) {}

  addToCart(product: IProduct) {
    this.inventoryService.decrement(product.id);
    if (this.cart().some((x) => x.id === product.id)) {
      this.inventoryService.incQuantity(product.id);
    } else {
      this.cart.update((cart) => [...cart, product]);
      this.inventoryService.incQuantity(product.id);
    }
  }

  removeFromCart(product: IProduct) {
    if (this.cart().find((x) => x.id === product.id)) {
      this.inventoryService.decQuantity(product.id);
      this.inventoryService.increment(product.id);
      if (this.inventoryService.getQ(product.id) === 0)
        this.cart.update((cart) => cart.filter((p) => p.id != product.id));
    }
  }
}
