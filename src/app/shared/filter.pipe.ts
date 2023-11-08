import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchValue: string, propName: string): any[] {
    if (!items || !searchValue) {
      return items;
    }

    return items.filter(item => item[propName].toLowerCase().includes(searchValue.toLowerCase()));
  }
}