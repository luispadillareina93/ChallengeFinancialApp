import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsComponent } from './list-products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from '../../products.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { AddProductsComponent } from '../add-products/add-products.component';
import { UpdateProductsComponent } from '../update-products/update-products.component';
import { ProductService } from '../../services/product.service';
import { EMPTY, of } from 'rxjs';
import { Product } from '../../interfaces/product';
import { Filterpipe } from '../../pipes/filter-pipe';

describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let httpClientSpy: { get: jasmine.Spy, delete: jasmine.Spy,post:jasmine.Spy };
  let fixture: ComponentFixture<ListProductsComponent>;
  let router: Router;
  let pipe:Filterpipe;
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
      declarations: [ListProductsComponent],
      imports: [HttpClientModule, ProductsModule, RouterTestingModule.withRoutes(routes)],
      providers:[Filterpipe]
    });
    fixture = TestBed.createComponent(ListProductsComponent);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete','post']);

    let productService = new ProductService(httpClientSpy as any);
    router = TestBed.inject(Router);
    pipe = TestBed.inject(Filterpipe);

    component = new ListProductsComponent(productService, router);
    fixture.detectChanges();
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate edit', () => {
    const id: string = "trj-cd";
    component.editEvent(id);
    expect(router.navigate).toHaveBeenCalledWith(['/update'], { queryParams: { id: id } });

  });

  it('should delete product', () => {
    const id: string = "trj-01";
    component.productList=productList;
    httpClientSpy.delete.and.returnValue(of(true));
    httpClientSpy.get.and.returnValue(of(productList));
    component.confirmDelete(id);
    component.deleteEvent();
    expect(component.productList.length).toBe(2);

  });

 it('data Filtered', () => {
    const filter = {name:"VISA"};
    const filterEmpty = {name:""};

    let filtereMetadata={count:0};
    let data = pipe.transform(productListFiler,filter,filtereMetadata);
    expect(data.length).toBe(2);
       data = pipe.transform(productListFiler,filterEmpty,filtereMetadata);
    expect(data.length).toBe(4);
    data = pipe.transform(productListFiler,null,filtereMetadata);
    expect(data.length).toBe(productListFiler.length);
  });
});

let productListFiler: Product[] = [
  {
    id: 'trj-01',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Visa Premium Consumo',
    logo: 'http://visa.com/logo.jpg',
    name: 'Visa'
  },
  {
    id: 'trj-02',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Visa Premium Gold',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Visa'
  },
  {
    id: 'trj-03',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Mastercard Premium Gold',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Mastercard'
  },
  {
    id: 'trj-04',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Diners Premium Gold',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Diners'
  }
];

let productList: Product[] = [
  {
    id: 'trj-01',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Visa Premium Consumo',
    logo: 'http://visa.com/logo.jpg',
    name: 'Visa'
  },
  {
    id: 'trj-02',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Visa Premium Gold',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Visa'
  }
];