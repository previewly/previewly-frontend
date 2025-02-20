import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorClipboardTextDuotone } from '@ng-icons/phosphor-icons/duotone';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ phosphorClipboardTextDuotone })],
})
export class CopyToClipboardComponent {
  private readonly clipboard = inject(Clipboard);

  tooltipText = signal('copy');
  value = input.required<string>();
  position = input<string>('left');

  copy() {
    this.clipboard.copy(this.value());
    this.tooltipText.set('copied!');
  }
}
