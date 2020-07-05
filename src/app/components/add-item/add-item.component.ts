import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { shopItems } from 'src/app/assets/shop-items';
import { Item, Cart, ListOfCartsViewModel } from 'src/app/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getListOfCarts } from 'src/app/selectors/list-of-carts-page.selectors';
import { addItem } from 'src/app/reducers/cart.reducer';

@Component({
  selector: 'app-add-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-item.html',
})
export class AddItemComponent implements OnInit {
  @Input()
  currentCart: Cart;
  carts: Observable<ListOfCartsViewModel[]>;
  shopItems: {};

  constructor(public store: Store<{}>) {}

  ngOnInit(): void {
    this.carts = this.store.pipe(select(getListOfCarts));
    this.shopItems = shopItems;
  }

  onAddNewItem(item: Item, cartId: string) {
    this.addItem({
      cartId,
      description: item.description,
      itemId: `${item.itemId}-${cartId}`,
      icon: item.icon,
      price: item.price,
    });
  }

  addItem(item: Partial<Item>) {
    this.store.dispatch(addItem(item));
  }
}
