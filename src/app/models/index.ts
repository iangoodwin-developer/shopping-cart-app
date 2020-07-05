export interface Cart {
  id: string;
  name: string;
}

export interface CartGroupDict {
  [id: string]: Cart;
}

export interface Item {
  id: string;
  itemId: string;
  description: string;
  cartId: string;
  createdOn: number;
  icon: string;
  price: string;
}

export interface CartItemsDict {
  [id: string]: Item[];
}

export interface ItemViewModel {
  id: string;
  itemId: string;
  description: string;
  cartId: string;
  createdOn: number;
  icon: string;
  price: string;
}

export interface ListOfCartsViewModel {
  cart: Cart;
  items: ItemViewModel[];
}

export interface CompletedItemVisibility {
  visible: boolean;
}
