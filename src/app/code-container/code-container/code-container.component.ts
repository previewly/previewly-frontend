import { Component, input } from '@angular/core';

import { CopyToClipboardComponent } from '../../share/tools/copy-to-clipboard/copy-to-clipboard.component';

@Component({
  standalone: true,
  selector: 'app-code-container',
  templateUrl: './code-container.component.html',
  imports: [CopyToClipboardComponent],
})
export class CodeContainerComponent {
  title = input.required<string>();
  codeValue = input.required<string>();
  showCopyButton = input<boolean>(true);
}
