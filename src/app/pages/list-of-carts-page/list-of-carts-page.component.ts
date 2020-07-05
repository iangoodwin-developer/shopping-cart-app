import { Title } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ListOfCartsViewModel } from 'src/app/models';
import { addList, removeCart } from 'src/app/reducers/list-of-carts.reducer';
import { getListOfCarts } from 'src/app/selectors/list-of-carts-page.selectors';
import { removeCartItems } from 'src/app/reducers/cart.reducer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-of-carts-page.html',
})
export class ListOfCartsPageComponent implements OnInit {
  deleteMouseEnter: boolean;
  carts: Observable<ListOfCartsViewModel[]>;

  constructor(public store: Store<{}>, private titleService: Title) {}

  ngOnInit() {
    this.carts = this.store.pipe(select(getListOfCarts));
  }

  addCart(cartsLength: number) {
    this.store.dispatch(addList({ name: `Cart ${cartsLength}` }));
  }

  deleteCart(cartId: any) {
    this.store.dispatch(removeCart({ cartId }));
    this.store.dispatch(removeCartItems({ cartId }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
