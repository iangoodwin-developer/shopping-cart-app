import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ItemsRoutingModule } from './items-routing.module';
import { ListOfCartsPageComponent } from 'src/app/pages/list-of-carts-page/list-of-carts-page.component';
import { CartPageComponent } from 'src/app/pages/cart-page/cart-page.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { AddItemComponent } from 'src/app/components/add-item/add-item.component';
import { RemoveSelectedItemsComponent } from 'src/app/components/item-remove/item-remove.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MyFilterPipe } from 'src/app/filters/filter.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AddItemComponent,
    MyFilterPipe,
    CartPageComponent,
    ListOfCartsPageComponent,
    CartComponent,
    RemoveSelectedItemsComponent,
  ],
  imports: [
    MatTooltipModule,
    MatChipsModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    ItemsRoutingModule,
    StoreModule.forFeature('items', reducers),
  ],
})
export class ItemsModule {}
