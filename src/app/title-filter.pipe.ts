import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(items: any[], query?: string): any {
    if(!query){
      return items
    }
    return items.filter(item => item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

}
