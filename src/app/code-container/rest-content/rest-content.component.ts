import { Component, input } from '@angular/core';

import { CopyToClipboardComponent } from '../../shared/ui/tools/copy-to-clipboard/copy-to-clipboard.component';
import { CodeAndResultComponent } from '../share/code-and-result/code-and-result.component';

@Component({
  standalone: true,
  selector: 'app-rest-content',
  templateUrl: './rest-content.component.html',
  styleUrls: ['./rest-content.component.scss'],
  imports: [CopyToClipboardComponent, CodeAndResultComponent],
})
export class RestContentComponent {
  restUrl = input.required<string>();
  token = input.required<string>();

  protected encodedGoogleUrl() {
    return encodeURIComponent('https://google.com/');
  }
}
