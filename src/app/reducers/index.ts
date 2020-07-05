import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as carts from './list-of-carts.reducer';
import * as items from './cart.reducer';

export interface State {
  carts: carts.State;
  router: RouterReducerState;
  items: items.State;
}

export const reducers: ActionReducerMap<State> = {
  carts: carts.reducer,
  router: routerReducer,
  items: items.reducer,
};

export { carts, RouterReducerState, items };
