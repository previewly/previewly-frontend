import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorDotsNine,
  phosphorList,
} from '@ng-icons/phosphor-icons/regular';
import { LogoComponent } from './logo/logo.component';

@Component({
  standalone: true,
  selector: 'app-shared-top-nav',
  templateUrl: './top-nav.component.html',
  imports: [LogoComponent, NgIconComponent],
  viewProviders: [provideIcons({ phosphorDotsNine, phosphorList })],
})
export class SharedTopNavComponent {}
