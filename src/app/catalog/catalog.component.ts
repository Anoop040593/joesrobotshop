import { Component } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { IProduct } from '../product.model';
import allProducts from '../products.json';
import { FilterByCategoryPipe } from '../filter-by-category-pipe';

@Component({
  selector: 'bot-catalog',
  imports: [ProductDetailsComponent, FilterByCategoryPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {
  products: IProduct[] = allProducts;
  categoryFilter: string | null = null;

  addProduct() {
    this.products = [
      //this changes array ref, so now pipe will render upon change in UI, this is immutability
      ...this.products,
      {
        id: 6,
        description: 'Something new.',
        name: 'New arm',
        imageName: 'arm-propeller.png',
        category: 'arms',
        price: 100,
        discount: 0,
      },
    ];
  }
}
