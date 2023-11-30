import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {

  @Input() id: string = "";

  @Output() edit = new EventEmitter<string>();

  @Output() delete = new EventEmitter<string>();

  editEvent() {
    this.edit.emit(this.id);
  }
  deleteEvent() {
    this.delete.emit(this.id);
  }
}
