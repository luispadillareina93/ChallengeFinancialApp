import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { UpdateProductsComponent } from './pages/update-products/update-products.component';
import { FormBodyComponent } from './components/form-body/form-body.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { Filterpipe } from './pipes/filter-pipe';
import { TableComponent } from './components/table/table.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { AddProductsComponent } from './pages/add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    TableComponent,
    Filterpipe,
    ContextMenuComponent,
    AddProductsComponent,
    FormHeaderComponent,
    FormBodyComponent,
    UpdateProductsComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    ProductsRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
