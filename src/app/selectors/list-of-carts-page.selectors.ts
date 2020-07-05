import { createSelector } from '@ngrx/store';

import * as root from './index.selectors';
import { getItemsByCart } from './base.selectors';
import { ListOfCartsViewModel } from '../models';

export const getListOfCarts = createSelector(
  root.getCartGroup,
  getItemsByCart,
  (carts, items): ListOfCartsViewModel[] =>
    Object.keys(carts).map((cartId) => {
      const cart = carts[cartId];
      const cartItems = items[cartId] || [];
      return {
        cart,
        items: cartItems,
      };
    })
);
