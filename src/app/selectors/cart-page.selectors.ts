import { createSelector } from '@ngrx/store';
import * as root from './index.selectors';
import { getItemsByCart, getItems } from './base.selectors';
import { ItemViewModel } from '../models';

export const getActiveCartId = createSelector(
  root.routerState,
  (state) =>
    state &&
    state.state &&
    state.state.root.firstChild.firstChild &&
    state.state.root.firstChild.firstChild.params.id
);

export const getActiveCart = createSelector(
  root.getCartGroup,
  getActiveCartId,
  (Carts, id) => Carts[id]
);

export const getActiveCartItems = createSelector(
  getItemsByCart,
  getActiveCartId,
  (items, cartId) => items[cartId] || []
);

export const getCartItems = createSelector(
  getActiveCartItems,
  (items): ItemViewModel[] => {
    return items;
  }
);

export const getAllCartItems = createSelector(
  getItems,
  (items): ItemViewModel[] => {
    return items;
  }
);
