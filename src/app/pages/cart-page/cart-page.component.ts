import { Title } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ItemViewModel, Cart, Item } from 'src/app/models';
import { removeCartItems } from 'src/app/reducers/cart.reducer';
import {
  getActiveCart,
  getCartItems,
} from 'src/app/selectors/cart-page.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-page.html',
})
export class CartPageComponent implements OnInit {
  cart: Observable<Cart>;
  items: Observable<ItemViewModel[]>;
  completedItemVisibility: Observable<{}>;

  constructor(private store: Store<{}>, private titleService: Title) {}

  ngOnInit() {
    this.cart = this.store.pipe(select(getActiveCart));
    this.items = this.store.pipe(select(getCartItems));
  }

  removeAllCartItems(cartId) {
    this.store.dispatch(removeCartItems({ cartId }));
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
