import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  

  @Input() headers: string[] = [];

  @Input() paginator: number[] = [5, 10,20];

  @Input() data: Product[] = [];

  @Input() searchText: string = "";

  @Output() delete = new EventEmitter<string>();
  
  @Output() edit = new EventEmitter<string>();


  filterMetaData = { count: 0 };
  itemsPerPage: number = 20;
  listData: Product[] = [];

  ngOnChanges() {
    this.listData = this.data.slice(0, this.itemsPerPage);
  }
  deleteEvent(id: string) {
    this.delete.emit(id);
  }

  editEvent(id: string) {
    this.edit.emit(id);
  }

  changeItemsPerPage(event: any) {
    let count = event.target.value;
    this.itemsPerPage = count;
    this.listData = this.data.slice(0, this.itemsPerPage);
  }
}
