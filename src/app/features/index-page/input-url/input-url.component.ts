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
import { phosphorXCircle } from '@ng-icons/phosphor-icons/regular';
import { Undefined } from '../../../app.types';
import { TitleComponent } from '../../../shared/ui/content/title/title.component';

@Component({
  selector: 'app-input-url',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, TitleComponent],
  templateUrl: './input-url.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      phosphorLinkSimpleBold,
      phosphorXCircle,
    }),
  ],
})
export class InputUrlComponent implements AfterViewInit {
  token = input.required<string | undefined>();
  isLoading = input<boolean>(false);
  error = input<string | Undefined>(null);

  url = output<string>();
  retryExposeToken = output();

  urlInput = new FormControl('', [Validators.required]);
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
