import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBodyComponent } from "./form-body.component";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsModule } from '../../products.module';
import { Product } from '../../interfaces/product';

describe("FormBodyComponent", () => {
  let component: FormBodyComponent;
  let fixture: ComponentFixture<FormBodyComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBodyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ProductsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBodyComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    let form = formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', [Validators.required]),
      date_revision: new FormControl('', Validators.required),
    });
    component.form = form;
    fixture.detectChanges();

  });

  describe('Form Body Component', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Form Body Component', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
    it('should emit Edit', () => {
      let productInit: Product = {
        id: 'TRJ-02',
        date_release: new Date("10/01/2023"),
        date_revision: new Date("10/01/2023"),
        description: 'Visa Premium Consumo',
        logo: 'http://visa.com/logo.jpg',
        name: 'TARJETA VISA PREMIUM'
      };
      component.send();
      component.getData.subscribe(data => (productInit = data));
      expect(productInit).toEqual(product);
    });
    it('should reset Form', () => {
   
      let productInit: Product = {
        id: 'TRJ-02',
        date_release: new Date("10/01/2023"),
        date_revision: new Date("10/01/2023"),
        description: 'Visa Premium Consumo',
        logo: 'http://visa.com/logo.jpg',
        name: 'TARJETA VISA PREMIUM'
      };
      component.isEdit = false;
      component.form.patchValue(productInit);
      fixture.detectChanges();
      component.reset();
      expect(component.form.get("id")?.value).toEqual(null);
    });
    it('should reset Form isEdit', () => {
      let form = formBuilder.group({
        id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
        logo: new FormControl('', Validators.required),
        date_release: new FormControl('', [Validators.required]),
        date_revision: new FormControl('', Validators.required),
      });

     
      component.isEdit = true;
      component.form = form;
      component.product=product;
      fixture.detectChanges();
      component.reset();
      fixture.detectChanges();

      expect(component.form.value).toEqual(product)
    });
    it('should be UpdateRevisionDate', () => {
      let productInit: Product = {
        id: 'TRJ-02',
        date_release: new Date("10/01/2023"),
        date_revision: new Date("10/01/2023"),
        description: 'Visa Premium Consumo',
        logo: 'http://visa.com/logo.jpg',
        name: 'TARJETA VISA PREMIUM'
      };
      component.form.patchValue(productInit);
      fixture.detectChanges();
      component.updateRevisionDate();
      fixture.detectChanges();
      let dateInit=component.form.get('date_revision')?.value;
      let date ="2024-10-01"
      expect(dateInit).toEqual(date);
    });
  });

})

let product: Product = {
  id: 'TRJ-02',
  date_release: new Date("10/01/2023"),
  date_revision: new Date("10/01/2023"),
  description: 'Visa Premium Consumo',
  logo: 'http://visa.com/logo.jpg',
  name: 'TARJETA VISA PREMIUM'
};