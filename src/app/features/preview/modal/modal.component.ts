import {
  Component,
  computed,
  effect,
  input,
  OnDestroy,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';

import { AppDialogDirective } from './app-dialog.directive';
export enum ModalEventOutput {
  onClose,
  onPrimaryClick,
}
export enum ModalEventInput {
  open,
  close,
  disablePrimary,
  enablePrimary,
  disableLoading,
  enableLoading,
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [AppDialogDirective],
})
export class ModalComponent implements OnInit, OnDestroy {
  title = input<string>('');
  emitEvent = input<ModalEventInput>();

  modalOutputEvent = output<ModalEventOutput>();

  @ViewChild(AppDialogDirective, { static: true })
  dialog!: AppDialogDirective;

  private closeListener = () => {
    this.modalOutputEvent.emit(ModalEventOutput.onClose);
  };

  isLoading = computed(() => {
    return this.emitEvent() == ModalEventInput.enableLoading;
  });

  isPrimaryDisabled = computed(() => {
    return this.emitEvent() == ModalEventInput.enablePrimary;
  });

  constructor() {
    effect(() => {
      if (this.emitEvent() == ModalEventInput.open) {
        this.dialog.show();
      }
      if (this.emitEvent() == ModalEventInput.close) {
        this.dialog.close();
      }
    });
  }

  ngOnInit(): void {
    this.dialog.addCloseListener(this.closeListener);
  }

  ngOnDestroy(): void {
    this.dialog.removeCloseListener(this.closeListener);
  }

  primaryClick() {
    this.modalOutputEvent.emit(ModalEventOutput.onPrimaryClick);
  }
}
