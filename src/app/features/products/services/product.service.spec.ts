import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Product } from '../interfaces/product';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('Get Product', () => {
    const id ="trj-01";
    service.setData(productList);
    let product = service.getProduct(id);
    expect(product).toEqual(productList.find(c=>c.id=id));
  });

  
});

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