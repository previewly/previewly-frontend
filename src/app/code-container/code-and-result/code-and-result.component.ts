import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorArrowFatLineDown,
  phosphorArrowFatLineRight,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  standalone: true,
  selector: 'app-code-and-result',
  templateUrl: './code-and-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({ phosphorArrowFatLineRight, phosphorArrowFatLineDown }),
  ],
})
export class CodeAndResultComponent {}
