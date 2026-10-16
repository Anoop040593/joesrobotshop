import { Component, signal, input, output, computed } from '@angular/core';
import { IProduct } from '../product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { CategoryToPartTypePipe } from '../category-to-part-type-pipe';
import { SliderComponent } from '../slider/slider.component';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'bot-product-details',
  imports: [CommonModule, CategoryToPartTypePipe, SliderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  constructor(private inventoryService: InventoryService) {}
  //input property, making it accessible to parent components.
  // Also, input.required makes it compulsory for the parent comp to use the product object, It also solves the "possibly undefined" error
  mode = input<'shop' | 'cart'>('shop');
  product = input.required<IProduct, IProduct>({
    transform: this.normalizeDiscount,
  });
  addToCart = output<IProduct>();
  removeFromCart = output<IProduct>();
  availableInventory = computed(() =>
    this.inventoryService.get(this.product().id),
  );
  favorite = signal(3);
  inventoryMap = {
    '=0': 'Out of Stock!',
    '=1': 'Only one left!',
    '=2': 'Few left!',
    '=3': 'Few left!',
    '=4': 'Few left!',
    other: 'Get yours today!',
  };

  getImageUrl(product: IProduct) {
    return '/images/robot-parts/' + product.imageName;
  }

  add() {
    this.addToCart.emit(this.product());
  }

  remove() {
    this.removeFromCart.emit(this.product());
  }
  handleSliderChange(newValue: number) {
    console.log('New Slider Value: ', newValue);
  }

  getPriceClasses() {
    return { strikethrough: this.product().discount > 0 };
  }

  normalizeDiscount(product: IProduct): IProduct {
    if (product.discount < 1) return product;
    else {
      return { ...product, discount: product.discount / 100 };
    }
  }
}
