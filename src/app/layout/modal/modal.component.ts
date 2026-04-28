import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
})
export class ModalComponent {
  @Input() title: string = "";
  @Input() message: string = "";
  @Input() confirmText: string = "";
  @Input() cancelText: string = "";
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  confirm() {
    this.closeModal.emit(true);
    this.showModal = false;
  }

  cancel() {
    this.closeModal.emit(false);
    this.showModal = false;
  }
}
