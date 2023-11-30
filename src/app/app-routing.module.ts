import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './views/layout/components/base/base.component';

const routes: Routes = [
  {
    path:'',
    component:BaseComponent,
    children:[
      {
        path:'',
        loadChildren: ()=>import('./features/products/products-routing.module').then(m=>m.ProductsRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
