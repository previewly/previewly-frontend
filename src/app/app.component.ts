import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { LogoComponent } from './shared/ui/logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LogoComponent, FooterComponent, RouterOutlet],
})
export class AppComponent {}
