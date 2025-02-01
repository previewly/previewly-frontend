import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorArrowFatLineDown,
  phosphorArrowFatLineRight,
} from '@ng-icons/phosphor-icons/regular';

import { CodeWrapperComponent } from '../code-wrapper/code-wrapper.component';

@Component({
  standalone: true,
  selector: 'app-code-and-result',
  templateUrl: './code-and-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, CodeWrapperComponent],
  viewProviders: [
    provideIcons({ phosphorArrowFatLineRight, phosphorArrowFatLineDown }),
  ],
})
export class CodeAndResultComponent {
  codeValue = input<string | null>(null);
}
