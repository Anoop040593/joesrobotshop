import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToPartType',
})
export class CategoryToPartTypePipe implements PipeTransform {
  transform(category: string, uppercase: boolean): string {
    if (uppercase) return category[0].toUpperCase() + category.slice(1, -1);
    else return category.slice(0, -1);
  }
}
