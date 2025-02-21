import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';

@Component({
  standalone: true,
  selector: 'app-shared-top-nav',
  templateUrl: './top-nav.component.html',
  imports: [LogoComponent],
})
export class SharedTopNavComponent {}
