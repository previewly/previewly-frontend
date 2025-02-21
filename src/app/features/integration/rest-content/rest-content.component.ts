import { Component, input, output } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorArrowsClockwiseLight } from '@ng-icons/phosphor-icons/light';
import { phosphorXCircle } from '@ng-icons/phosphor-icons/regular';
import { Undefined } from '../../../app.types';
import { CopyToClipboardComponent } from '../../../shared/ui/tools/copy-to-clipboard/copy-to-clipboard.component';
import { CodeAndResultComponent } from '../code-and-result/code-and-result.component';

@Component({
  standalone: true,
  selector: 'app-rest-content',
  templateUrl: './rest-content.component.html',
  styleUrls: ['./rest-content.component.scss'],
  imports: [CopyToClipboardComponent, CodeAndResultComponent, NgIconComponent],
  viewProviders: [
    provideIcons({ phosphorArrowsClockwiseLight, phosphorXCircle }),
  ],
})
export class RestContentComponent {
  restUrl = input.required<string>();
  token = input.required<string>();

  error = input<string | Undefined>(null);

  refreshToken = output();

  protected encodedGoogleUrl() {
    return encodeURIComponent('https://google.com/');
  }
}
