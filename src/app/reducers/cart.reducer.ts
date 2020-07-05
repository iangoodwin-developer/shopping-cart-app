import { ActionReducer, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import uuid from 'uuid';
import { Item } from 'src/app/models';

export interface State extends EntityState<Item> {}

export const ADD_ITEM = '[Item List Of Items Page] Add item to list';
export const addItem = ({
  id = uuid(),
  itemId = '',
  description = '',
  cartId = '',
  createdOn = Date.now(),
  icon = '',
  price = '',
}) => {
  return {
    type: ADD_ITEM as typeof ADD_ITEM,
    payload: {
      id,
      itemId,
      description,
      cartId,
      createdOn,
      icon,
      price,
    },
  };
};

export const ADD_ITEM_STORAGE = '[Item Storage] Add item to list';
export const addItemStorage = ({
  id = uuid(),
  itemId = '',
  description = '',
  cartId = '',
  price = '',
  createdOn = Date.now(),
  icon = '',
}) => {
  return {
    type: ADD_ITEM_STORAGE as typeof ADD_ITEM_STORAGE,
    payload: {
      id,
      itemId,
      description,
      cartId,
      createdOn,
      icon,
      price,
    },
  };
};

export const REMOVE_ITEM = '[Item List Of Items Page] Remove item from list';
export const removeItem = ({ id = '', cartId = '' }) => {
  return {
    type: REMOVE_ITEM as typeof REMOVE_ITEM,
    payload: {
      id,
      cartId,
    },
  };
};

export const REMOVE_ITEM_STORAGE = '[Item Storage] Remove item from list';

export const removeItemStorage = ({ id = '', cartId = '' }) => {
  return {
    type: REMOVE_ITEM_STORAGE as typeof REMOVE_ITEM_STORAGE,
    payload: {
      id,
      cartId,
    },
  };
};

export const REMOVE_CART_ITEMS =
  '[Item List Of Items Page] Remove completed items from list';
export const removeCartItems = ({ cartId = '' }) => ({
  type: REMOVE_CART_ITEMS as typeof REMOVE_CART_ITEMS,
  payload: { cartId },
});

export const REMOVE_CART_ITEMS_STORAGE =
  '[Item Storage] Remove completed items from list';
export const removeCartItemsStorage = ({ cartId = '' }) => ({
  type: REMOVE_CART_ITEMS_STORAGE as typeof REMOVE_CART_ITEMS_STORAGE,
  payload: { cartId },
});

export type ItemsActions =
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof removeCartItems>
  | ReturnType<typeof addItemStorage>
  | ReturnType<typeof removeItemStorage>
  | ReturnType<typeof removeCartItemsStorage>;

/* export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  sortComparer: (a, b) => {
    const delta = b.createdOn - a.createdOn;
    if (delta !== 0) {
      return delta;
    }
    return a.createdOn - b.createdOn;
  },
}); */

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({});

export const initialState: State = adapter.getInitialState();

export function stateReducer(
  state = initialState,
  action: ItemsActions
): State {
  switch (action.type) {
    case ADD_ITEM:
    case ADD_ITEM_STORAGE:
      return adapter.addOne(action.payload, state);
    case REMOVE_ITEM:
    case REMOVE_ITEM_STORAGE:
      const idToDelete = (state.ids as string[])
        .map((id) => state.entities[id])
        .filter(
          (item) =>
            item.cartId === action.payload.cartId &&
            item.id === action.payload.id
        )
        .map((item) => item.id);
      return adapter.removeMany(idToDelete, state);
    case REMOVE_CART_ITEMS:
    case REMOVE_CART_ITEMS_STORAGE:
      const idsToDelete = (state.ids as string[])
        .map((id) => state.entities[id])
        .filter((item) => item.cartId === action.payload.cartId)
        .map((item) => item.id);
      return adapter.removeMany(idsToDelete, state);

    default:
      return state;
  }
}

export function persistStateReducer(myReducer: ActionReducer<State>) {
  const localStorageKey = '__items';
  return (state: State | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : myReducer(state, action);
    }
    const nextState = myReducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

export function updateStateReducer(myReducer: ActionReducer<State>) {
  return (state: State | undefined, action: Action) => {
    if (action.type === 'UPDATE_ITEMS_STATE') {
      return (action as any).payload.newState;
    }

    return myReducer(state, action);
  };
}

export function reducer(state: State | undefined, action: Action) {
  return updateStateReducer(persistStateReducer(stateReducer))(state, action);
}

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
