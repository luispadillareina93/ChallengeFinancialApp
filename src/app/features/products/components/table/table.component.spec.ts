import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TableComponent } from "./table.component";
import { Product } from '../../interfaces/product';
import { ProductsModule } from '../../products.module';

describe("TableComponent", () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ useValue: {} }],
      imports: [ProductsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Table Component', () => {
    it('change items per page', () => {
      const value = 5;
      component.data=productListFiler;
      fixture.detectChanges();
      component.ngOnChanges();
      component.changeItemsPerPage({ target: { value } })
      expect(component.listData.length).toBe(value);
    });
    it('should emit Edit', () => {
      let id ="";
      const idSend="TRJ-0204";
      component.edit.subscribe(data=>(id=data));
      component.editEvent(idSend);
      expect(id).toEqual(idSend);
    });

    it('should emit delete', () => {
      let id ="";
      const idSend="TRJ-0204";
      component.delete.subscribe(data=>(id=data));
      component.deleteEvent(idSend);
      expect(id).toEqual(idSend);
    });
  });

  
})

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
  ,
  {
    id: 'trj-05',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Diners Premium Black',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Diners'
  }
  ,
  {
    id: 'trj-06',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Diners Premium Max',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Diners'
  }
  ,
  {
    id: 'trj-07',
    date_release: new Date(),
    date_revision: new Date(),
    description: 'Diners Premium Travel',
    logo: 'http://visa.com/logo2.jpg',
    name: 'Diners'
  }
];
