import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { Cart, Item } from 'src/app/models';

@Component({
  selector: 'app-item-remove',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <button
    matTooltip="Remove all items from cart"
    mat-mini-fab
    color="warn"
  >
    <mat-icon type="button" (click)="removeAll()">
      delete_forever
    </mat-icon>
  </button>`,
})
export class RemoveSelectedItemsComponent {
  @Input()
  cart: Cart;

  @Input()
  itemId: Partial<Item>;

  @Output()
  removeAllItems = new EventEmitter<string>();

  removeAll() {
    this.removeAllItems.emit(this.cart.id);
  }
}
