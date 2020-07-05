import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromEvent, EMPTY } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  ItemsActions,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_ITEM_STORAGE,
  REMOVE_ITEM_STORAGE,
  REMOVE_CART_ITEMS,
  REMOVE_CART_ITEMS_STORAGE,
} from '../reducers/cart.reducer';
import {
  ListsActions,
  ADD_LIST,
  ADD_LIST_STORAGE,
} from '../reducers/list-of-carts.reducer';

@Injectable()
export class LocalStorageEffects {
  // change this to `dispatch: true` to sync state with actions
  @Effect({ dispatch: false })
  onChange = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((evt) => evt.key === '__bus'),
    filter((evt) => evt.newValue !== null),
    map((evt) => {
      const [{ type, payload }] = JSON.parse(evt.newValue);
      switch (type) {
        case ADD_ITEM:
          return { type: ADD_ITEM_STORAGE, payload };
        case ADD_LIST:
          return { type: ADD_LIST_STORAGE, payload };
        case REMOVE_ITEM:
          return { type: REMOVE_ITEM_STORAGE, payload };
        case REMOVE_CART_ITEMS:
          return { type: REMOVE_CART_ITEMS_STORAGE, payload };
      }
    })
  );

  @Effect({ dispatch: false })
  storeItemActions = this.itemActions.pipe(
    ofType(ADD_ITEM, REMOVE_ITEM, REMOVE_CART_ITEMS),
    tap((action) => {
      const storedActions = window.localStorage.getItem('__bus');
      const actions = storedActions ? JSON.parse(storedActions) : [];
      const newActions = [action, ...actions];
      window.localStorage.setItem('__bus', JSON.stringify(newActions));
    })
  );

  @Effect({ dispatch: false })
  storeListActions = this.listActions.pipe(
    ofType(ADD_LIST),
    tap((action) => {
      const storedActions = window.localStorage.getItem('__bus');
      const actions = storedActions ? JSON.parse(storedActions) : [];
      const newActions = [action, ...actions];
      window.localStorage.setItem('__bus', JSON.stringify(newActions));
    })
  );

  // change this to `dispatch: true` to sync state with state
  @Effect({ dispatch: true })
  updateItemsState = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((evt) => evt.key === '__items'),
    filter((evt) => evt.newValue !== null),
    map((evt) => {
      const newState = JSON.parse(evt.newValue);
      return { type: 'UPDATE_ITEMS_STATE', payload: { newState } };
    })
  );

  // change this to `dispatch: true` to sync state with state
  @Effect({ dispatch: true })
  updateListsState = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter((evt) => evt.key === '__lists'),
    filter((evt) => evt.newValue !== null),
    map((evt) => {
      const newState = JSON.parse(evt.newValue);
      return { type: 'UPDATE_LISTS_STATE', payload: { newState } };
    })
  );

  constructor(
    private itemActions: Actions<ItemsActions>,
    private listActions: Actions<ListsActions>
  ) {}
}
