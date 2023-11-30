import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsComponent } from './update-products.component';
import { ProductsModule } from '../../products.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ListProductsComponent } from '../list-products/list-products.component';
import { AddProductsComponent } from '../add-products/add-products.component';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { of } from 'rxjs';

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;
  let httpClientSpy: { put: jasmine.Spy };
  let router: Router;
  const routes: Routes = [
    {
      path: '',
      component: ListProductsComponent
    },
    {
      path: 'add',
      component: AddProductsComponent
    },
    {
      path: 'update',
      component: UpdateProductsComponent
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductsComponent],
      imports: [ProductsModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(UpdateProductsComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    let productService = new ProductService(httpClientSpy as any);
    let formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    let route = TestBed.inject(ActivatedRoute);
    component = new UpdateProductsComponent(productService, route, formBuilder, router);
    fixture.detectChanges();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should gereate form', () => {
    component.generateForm();
    expect(component.form.contains('id')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
    expect(component.form.contains('logo')).toBeTruthy();
    expect(component.form.contains('date_release')).toBeTruthy();
    expect(component.form.contains('date_revision')).toBeTruthy();
  });

  it('Format Date', () => {
    const date = new Date("2022/12/31");
    const dateFormat = "2022-12-31"
    let tranformDate = component.formatDate(date);
    expect(tranformDate).toEqual(dateFormat);
  });

  it('update Product', () => {
    component.generateForm();
    component.form.patchValue(product);
    httpClientSpy.put.and.returnValue(of(product));
    component.update();
    expect(router.navigate).toHaveBeenCalledWith(['./']);
  });

});

let product: Product = {
  id: 'TRJ-02',
  date_release: new Date(),
  date_revision: new Date(),
  description: 'Visa Premium Consumo',
  logo: 'http://visa.com/logo.jpg',
  name: 'TARJETA VISA PREMIUM'
};