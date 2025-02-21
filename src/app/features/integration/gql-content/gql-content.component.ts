import { Component, computed, input, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorArrowsClockwiseLight } from '@ng-icons/phosphor-icons/light';
import { phosphorXCircle } from '@ng-icons/phosphor-icons/regular';
import { Undefined } from '../../../app.types';
import { CopyToClipboardComponent } from '../../../shared/ui/tools/copy-to-clipboard/copy-to-clipboard.component';
import { CodeAndResultComponent } from '../code-and-result/code-and-result.component';

@Component({
  standalone: true,
  selector: 'app-gql-content',
  templateUrl: './gql-content.component.html',
  styleUrls: ['./gql-content.component.scss'],
  imports: [CopyToClipboardComponent, CodeAndResultComponent, NgIconComponent],
  viewProviders: [
    provideIcons({ phosphorArrowsClockwiseLight, phosphorXCircle }),
  ],
})
export class GqlContentComponent {
  gqlUrl = input.required<string>();
  token = input.required<string>();

  error = input<string | Undefined>(null);

  refreshToken = output();

  getAddUrlCode = computed(
    () =>
      `mutation { addUrl(token: "${this.token()}", url: "https://google.com/") { id image status url }}`
  );
}
