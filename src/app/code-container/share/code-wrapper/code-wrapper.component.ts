import { Component, input } from '@angular/core';

import { CopyToClipboardComponent } from '../../../share/tools/copy-to-clipboard/copy-to-clipboard.component';

@Component({
  standalone: true,
  selector: 'app-code-wrapper',
  templateUrl: './code-wrapper.component.html',
  imports: [CopyToClipboardComponent],
})
export class CodeWrapperComponent {
  title = input.required<string>();
  showCopyButton = input<boolean>(true);
  codeValue = input<string | null>(null);
}
