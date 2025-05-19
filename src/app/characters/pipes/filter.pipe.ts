import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterAttribute: string,filterValue: string): any[] {

    return items.filter(item => item[filterAttribute].toLowerCase().includes(filterValue.toLowerCase()));
  }

}
