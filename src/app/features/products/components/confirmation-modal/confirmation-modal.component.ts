import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  
  @Input() showModal: boolean = false;
  @Input() description: string = "";

  @Output() onConfirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal() {
    this.showModal = false;
    this.onCancel.emit();
  }

  deleteRecord() {
    this.onConfirm.emit();
    this.closeModal();
  }
}
