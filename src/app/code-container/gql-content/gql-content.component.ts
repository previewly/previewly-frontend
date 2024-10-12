import { Component, input } from '@angular/core';

import { CopyToClipboardComponent } from '../../share/tools/copy-to-clipboard/copy-to-clipboard.component';
import { CodeAndResultComponent } from '../code-and-result/code-and-result.component';

@Component({
  standalone: true,
  selector: 'app-gql-content',
  templateUrl: './gql-content.component.html',
  imports: [CopyToClipboardComponent, CodeAndResultComponent],
})
export class GqlContentComponent {
  gqlUrl = input.required<string>();
}