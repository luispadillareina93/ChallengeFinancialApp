import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsComponent } from './add-products.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/views/layout/components/header/header.component';
import { ProductsModule } from '../../products.module';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FormBuilder } from '@angular/forms';
import { Router, RouterLinkWithHref, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsRoutingModule } from '../../products-routing.module';
import { ListProductsComponent } from '../list-products/list-products.component';
import { UpdateProductsComponent } from '../update-products/update-products.component';

describe('AddProductsComponent', () => {
  let component: AddProductsComponent;
  let fixture: ComponentFixture<AddProductsComponent>;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
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
      declarations: [AddProductsComponent, HeaderComponent],
      imports: [HttpClientModule, ProductsModule, RouterTestingModule.withRoutes(routes)],

    });
    fixture = TestBed.createComponent(AddProductsComponent);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    let productService = new ProductService(httpClientSpy as any);
    let formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);

    component = new AddProductsComponent(formBuilder, productService, router);

    fixture.detectChanges();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should created form', () => {
    component.generateForm();
    expect(component.form.contains('id')).toBeTruthy();
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
    expect(component.form.contains('logo')).toBeTruthy();
    expect(component.form.contains('date_release')).toBeTruthy();
    expect(component.form.contains('date_revision')).toBeTruthy();
  });

  it('should verify Id', () => {
    let product: Product = {
      id: 'trj-01',
      date_release: new Date(),
      date_revision: new Date(),
      description: 'Visa Premium Consumo',
      logo: 'http://visa.com/logo.jpg',
      name: 'Visa'
    };
    component.generateForm();
    httpClientSpy.get.and.returnValue(of(true));
    component.verify(product);
    let error = component.form.controls['id'].errors;
    expect(error).toEqual({ duplicate: true });

  });

  it('should add Product', () => {
    let product: Product = {
      id: 'trj-01',
      date_release: new Date(),
      date_revision: new Date(),
      description: 'Visa Premium Consumo',
      logo: 'http://visa.com/logo.jpg',
      name: 'Visa'
    };
    component.generateForm();
    httpClientSpy.get.and.returnValue(of(false));
    httpClientSpy.post.and.returnValue(of(product));
    component.verify(product);
    expect(router.navigate).toHaveBeenCalledWith(['./']);
  });

  it('Required Fields', () => {
    const product = {
      id: '',
      description: '',
      logo: '',
      name: ''
    };

    component.generateForm();
    component.form.patchValue(product);
    component.form.markAllAsTouched();
    expect(component.form.controls['id'].getError('required')).toBeTruthy()
    expect(component.form.controls['name'].getError('required')).toBeTruthy();
    expect(component.form.controls['description'].getError('required')).toBeTruthy();
    expect(component.form.controls['date_release'].getError('required')).toBeTruthy();
    expect(component.form.controls['date_revision'].getError('required')).toBeTruthy();

  });

  it('Valid Min Length Fields', () => {
    const product = {
      id: 'co',
      description: 'desc',
      name: 'vis'
    };
    component.generateForm();
    component.form.patchValue(product);
    component.form.markAllAsTouched();
    expect(component.form.controls['id'].getError('minlength')).toBeTruthy();
    expect(component.form.controls['name'].getError('minlength')).toBeTruthy();
    expect(component.form.controls['description'].getError('minlength')).toBeTruthy();
  });

    
  it('Valid Max Length Fields', () => {
    const product = {
      id: 'TRJ-01-02-04-02',
      description: 'Una descripcion con demasiados caracteres para la verificación de la validación del formuarlio Una descripcion con demasiados caracteres para la verificación de la validación del formuarlio Una descripcion con demasiados caracteres para la verificación de la validación del formuarlio',
      name: 'VISA TARJETA DE CREDITO PARA CLIENTES CON ALTO HISTORIAL CREDITICIO VISA TARJETA DE CREDITO PARA CLIENTES CON ALTO HISTORIAL CREDITICIO' 
    };
    component.generateForm();
    component.form.patchValue(product);
    component.form.markAllAsTouched();
    expect(component.form.controls['id'].getError('maxlength')).toBeTruthy();
    expect(component.form.controls['name'].getError('maxlength')).toBeTruthy();
    expect(component.form.controls['description'].getError('maxlength')).toBeTruthy();
  });

  it('Valid Form', () => {
    component.generateForm();
    component.form.patchValue(productValid);
    fixture.detectChanges();
    expect(component.form.valid).toBeTrue();
  });
});


let productValid: Product = {
  id: 'TRJ-02',
  date_release: new Date(),
  date_revision: new Date(),
  description: 'Visa Premium Consumo',
  logo: 'http://visa.com/logo.jpg',
  name: 'TARJETA VISA PREMIUM'
};