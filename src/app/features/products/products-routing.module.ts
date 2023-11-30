import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { UpdateProductsComponent } from './pages/update-products/update-products.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';

const routes: Routes = [
  {
    path:'',
    component:ListProductsComponent
  },
  {
    path:'add',
    component:AddProductsComponent
  },
  {
    path:'update',
    component:UpdateProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
