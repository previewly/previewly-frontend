import { Component, computed, input } from '@angular/core';

import { CopyToClipboardComponent } from '../../share/tools/copy-to-clipboard/copy-to-clipboard.component';
import { CodeAndResultComponent } from '../code-and-result/code-and-result.component';

@Component({
  standalone: true,
  selector: 'app-gql-content',
  templateUrl: './gql-content.component.html',
  styleUrls: ['./gql-content.component.scss'],
  imports: [CopyToClipboardComponent, CodeAndResultComponent],
})
export class GqlContentComponent {
  gqlUrl = input.required<string>();
  token = input.required<string>();

  getAddUrlCode = computed(
    () =>
      `mutation { addUrl(token: "${this.token()}", url: "https://google.com/") { id image status url }}`
  );
}
