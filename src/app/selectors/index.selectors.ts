import { createFeatureSelector, createSelector } from '@ngrx/store';

import { carts, RouterReducerState, State } from '../reducers';

export const routerState = createFeatureSelector<State, RouterReducerState>(
  'router'
);

// grab the `Carts` piece of state from the state tree
export const CartsState = createFeatureSelector<State, carts.State>('carts');

// select the `Carts` property from `Carts`
export const getCartGroup = createSelector(
  CartsState,
  (state) => state.entities
);
