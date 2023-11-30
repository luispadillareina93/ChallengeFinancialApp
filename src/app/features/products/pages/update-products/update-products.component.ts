import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss']
})
export class UpdateProductsComponent {
  
 
  title: string = "Formulario de Registro"
  form!: FormGroup;


  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {


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

  ngOnInit(): void {
    this.generateForm();
    this.loadData();
  }
  loadData() {

    this.route.queryParams.subscribe(
      params => {
        let product = this.productServices.getProduct(params['id']);
        this.form.patchValue(product ?? []);
        this.form.get('date_release')?.setValue(this.formatDate(product?.date_release));
        this.form.get('date_revision')?.setValue(this.formatDate(product?.date_revision));
      }
    )
  }
  update() {
    let data = this.form.value;
    this.productServices.update(data).subscribe(() =>
      this.router.navigate(['./'])
    );
  }

  formatDate(date: Date | undefined ): string {
    return moment(date).format("YYYY-MM-DD");
  }
}
