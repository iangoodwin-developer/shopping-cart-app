import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State, items as fromItems } from '../reducers';
import { CartItemsDict } from '../models';

export const itemsState = createFeatureSelector<State>('items');

export const getItemsState = createSelector(itemsState, (state) => state.items);

export const getItems = createSelector(getItemsState, fromItems.selectAll);

export const getItemsByCart = createSelector(getItems, (items) =>
  items.reduce<CartItemsDict>((itemsByCart, item) => {
    itemsByCart[item.cartId] = (itemsByCart[item.cartId] || []).concat(item);
    return itemsByCart;
  }, {})
);
