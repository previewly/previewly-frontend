import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorLinkSimpleBold } from '@ng-icons/phosphor-icons/bold';

import { TitleComponent } from '../share/content/title/title.component';

@Component({
  selector: 'app-input-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, TitleComponent],
  templateUrl: './input-url.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      phosphorLinkSimpleBold,
    }),
  ],
})
export class InputUrlComponent implements AfterViewInit {
  token = input.required<string | undefined>();
  isLoading = input<boolean>(false);

  urlInput = new FormControl('', [Validators.required]);
  url = output<string>();

  @ViewChild('url') urlInputRef: ElementRef | undefined;

  constructor() {
    effect(() => {
      if (!this.token()) {
        this.urlInput.disable();
      } else {
        this.urlInput.enable();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.urlInputRef) {
      this.urlInputRef.nativeElement.focus();
    }
  }

  createPreview() {
    if (
      !this.isLoading() &&
      this.token() &&
      this.urlInput.valid &&
      this.urlInput.value
    )
      this.url.emit(
        this.urlInput.value.indexOf('://') === -1
          ? 'https://' + this.urlInput.value
          : this.urlInput.value
      );
    this.urlInput.setValue('');
    return false;
  }
}
