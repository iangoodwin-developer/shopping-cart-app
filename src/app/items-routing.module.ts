import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPageComponent } from 'src/app/pages/cart-page/cart-page.component';
import { ListOfCartsPageComponent } from 'src/app/pages/list-of-carts-page/list-of-carts-page.component';

export const routes: Routes = [
  { path: '', component: ListOfCartsPageComponent },
  { path: ':id', component: CartPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
