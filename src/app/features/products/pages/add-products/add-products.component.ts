import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {
  title: string = "Formulario de Registro"
  form!: FormGroup;
  duplicateId: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private productServices: ProductService,
    private router:Router
  ) {

  }
  ngOnInit(): void {
    this.generateForm();
  }
  
  generateForm() {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', [Validators.required]),
      date_revision: new FormControl('', Validators.required),
    });
  }

  addProduct(data: Product) {
    this.productServices.add(data).subscribe(()=>this.router.navigate(['./'])
    )
  }

  verify(data: Product) {
    this.productServices.verify(data.id).subscribe((response) => {
      if (!response) {
        this.addProduct(data);
      } else {
        this.form.controls['id'].setErrors({ 'duplicate': true });

      }
    })
  }


}
