import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorArrowFatLineDown,
  phosphorArrowFatLineRight,
} from '@ng-icons/phosphor-icons/regular';

import { CodeContainerComponent } from '../code-container/code-container.component';

@Component({
  standalone: true,
  selector: 'app-code-and-result',
  templateUrl: './code-and-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, CodeContainerComponent],
  viewProviders: [
    provideIcons({ phosphorArrowFatLineRight, phosphorArrowFatLineDown }),
  ],
})
export class CodeAndResultComponent {}
