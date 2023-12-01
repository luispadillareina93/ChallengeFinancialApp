import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-form-body',
  templateUrl: './form-body.component.html',
  styleUrls: ['./form-body.component.scss']
})
export class FormBodyComponent  implements OnInit  {
 
 
  @Input()
  form!: FormGroup;
  
  @Input()
  isEdit: boolean = false;

  @Output() getData = new EventEmitter<Product>();


  todate = new Date()
  product!: Product;

  ngOnInit() {
    this.product = this.form?.value;
  }

  get control(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  send() {
    this.getData.emit(this.form.value);
  }
  
  reset() {

    if (this.isEdit) {
      this.form.patchValue(this.product);
    }
    else {
      this.form.reset();
    }

  }

  updateRevisionDate() {
    const fecha = new Date(this.form.get('date_release')?.value);
    this.form.get('date_release')?.setValue(fecha.toISOString().substring(0, 10));
    fecha.setFullYear(fecha.getFullYear() + 1);
    this.form.get('date_revision')?.setValue(fecha.toISOString().substring(0, 10));
  }

}
