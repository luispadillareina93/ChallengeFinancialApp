import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

  headers: string[] = ['Logo', 'Nombre del producto', 'Descripción', 'Fecha de liberación', 'Fecha de restructuración'];
  searchText: string = "";
  productList: Product[] = [];
  paginator: number[] = [5, 10, 20];
  showModal: boolean = false;
  selectedItem: Product | undefined;

  constructor(
    private productServices: ProductService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.productServices.load().subscribe((data) => {
      this.productList = data;
      this.productServices.setData(data);
    })
  }
  confirmDelete(id: string) {
    this.selectedItem = this.productList.find(c => c.id == id);
    this.showModal = true;
  }

  closeModal(){
    this.showModal=false;
  }
  deleteEvent() {
    const id = this.selectedItem?.id;
    if (id) {
      this.productServices.delete(id).subscribe(
        data => {
          this.closeModal();
          this.loadData();
        }
      )
    }
  }
  editEvent(id: string) {
    this.router.navigate(['/update'], { queryParams: { id: id } });
  }
}
