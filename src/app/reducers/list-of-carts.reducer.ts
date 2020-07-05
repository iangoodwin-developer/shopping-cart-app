import { ActionReducer, Action } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Dictionary,
} from '@ngrx/entity';
import uuid from 'uuid';
import { Cart } from 'src/app/models';

export type ListsActions =
  | ReturnType<typeof addList>
  | ReturnType<typeof addListStorage>
  | ReturnType<typeof removeCart>
  | ReturnType<typeof removeCartStorage>;

export interface State extends EntityState<Cart> {}

export const ADD_LIST = '[Carts Page] Add cart to carts';
export const addList = ({ id = uuid(), name = '' }) => {
  return {
    type: ADD_LIST as typeof ADD_LIST,
    payload: {
      id,
      name,
    },
  };
};

export const ADD_LIST_STORAGE =
  '[Carts Page Storage] Add cart to carts storage';

export const addListStorage = ({ id = uuid(), name = '' }) => {
  return {
    type: ADD_LIST_STORAGE as typeof ADD_LIST_STORAGE,
    payload: {
      id,
      name,
    },
  };
};

export const REMOVE_CART = '[List Page] Remove list';
export const removeCart = ({ cartId }) => ({
  type: REMOVE_CART as typeof REMOVE_CART,
  payload: { cartId },
});

export const REMOVE_CART_STORAGE = '[List Storage] Remove list';
export const removeCartStorage = ({ cartId }) => ({
  type: REMOVE_CART_STORAGE as typeof REMOVE_CART_STORAGE,
  payload: { cartId },
});

export const adapter: EntityAdapter<Cart> = createEntityAdapter<Cart>({});

export const initialState: State = adapter.getInitialState();

export function stateReducer(
  state = initialState,
  action: ListsActions
): State {
  switch (action.type) {
    case ADD_LIST:
    case ADD_LIST_STORAGE:
      return adapter.addOne(action.payload, state);

    case REMOVE_CART:
    case REMOVE_CART_STORAGE:
      const cartEntities = state.entities as Dictionary<Cart>;
      const itemToDelete = cartEntities[action.payload.cartId];
      return adapter.removeOne(itemToDelete.id, state);
    default:
      return state;
  }
}

export function persistStateReducer(myReducer: ActionReducer<State>) {
  const localStorageKey = '__lists';
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
    if (action.type === 'UPDATE_LISTS_STATE') {
      return (action as any).payload.newState;
    }

    return myReducer(state, action);
  };
}

export function reducer(state: State | undefined, action: Action) {
  return updateStateReducer(persistStateReducer(stateReducer))(state, action);
}
