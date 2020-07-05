import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false,
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  getOccurrences = (array, value) => {
    return array.filter((v) => v === value).length;
  };
  transform(value: any, args?: any): any {
    const result = [];
    const resultIds = value.map((resultItem) => resultItem.itemId);
    value.forEach((item) => {
      item.calculatedQuantity = this.getOccurrences(resultIds, item.itemId);
      item.quantity = item.calculatedQuantity;
      item.calculatedPrice = (parseFloat(item.price) * item.calculatedQuantity)
        .toFixed(2)
        .toString()
        .replace('.', ',');
      result.push(item);
    });

    const uniqueResult = Array.from(new Set(result.map((a) => a.itemId))).map(
      (itemId) => {
        return result.find((a) => a.itemId === itemId);
      }
    );
    return uniqueResult;
  }
}
