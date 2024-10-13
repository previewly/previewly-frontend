import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDialog]',
  standalone: true,
})
export class AppDialogDirective {
  private modal: ElementRef<HTMLDialogElement>;
  constructor(modal: ElementRef) {
    this.modal = modal;
  }
  show() {
    this.modal.nativeElement.showModal();
  }
  close() {
    this.modal.nativeElement.close();
  }

  addCloseListener(listener: (this: HTMLDialogElement) => void) {
    this.modal.nativeElement.addEventListener('close', listener);
  }

  removeCloseListener(listener: (this: HTMLDialogElement) => void) {
    this.modal.nativeElement.removeEventListener('close', listener);
  }
}
