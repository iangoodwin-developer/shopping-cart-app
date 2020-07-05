import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemViewModel, Item } from 'src/app/models';
import { addItem, removeItem } from 'src/app/reducers/cart.reducer';

@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  @Input()
  items: ItemViewModel[];

  @Input()
  simpleLayout = false;

  @Output()
  toggleItem = new EventEmitter<{}>();

  @Output()
  changeItemAmount = new EventEmitter<{}>();

  constructor(public store: Store<{}>) {}
  ngOnInit(): void {}

  addItem(item: Partial<Item>) {
    this.store.dispatch(addItem(item));
  }

  removeItem(item: Partial<Item>) {
    this.store.dispatch(removeItem(item));
  }

  onCartItemChanged(item: any, event: any) {
    const newQuantity = event.target.value;
    const parsedNewQuantity = parseInt(newQuantity, 10);

    this.changeAmount(item, parsedNewQuantity);
  }

  changeAmount(item: any, newQuantity: number) {
    const repeat = (func: any, times: number) => {
      func();

      return times && --times && repeat(func, times);
    };

    if (item.quantity < newQuantity) {
      if (newQuantity > 100) {
        newQuantity = 100;
      }
      const difference = newQuantity - item.quantity;
      repeat(() => {
        this.changeAmountByOne(item, true);
      }, difference);
    } else {
      const difference = item.quantity - newQuantity;
      const allOfType = this.items.filter((i) => {
        return i.itemId === item.itemId;
      });
      repeat(() => {
        const itemToRemove = allOfType.pop();
        this.changeAmountByOne(itemToRemove, false);
      }, difference);
    }
  }

  changeAmountByOne(item: ItemViewModel, increase: boolean) {
    const price = item.price;
    const cartId = item.cartId;
    const itemId = item.itemId;
    const id = item.id;
    const icon = item.icon;
    const description = item.description;
    if (increase) {
      this.addItem({ price, cartId, itemId, icon, description });
    } else {
      this.removeItem({ id, cartId });
    }
  }
}
