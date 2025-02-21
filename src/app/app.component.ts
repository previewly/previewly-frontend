import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SharedCookieConsentComponent } from './shared/ui/cookie-consent/cookie-consent.component';
import { SharedFooterComponent } from './shared/ui/footer/footer.component';
import { SharedLogoComponent } from './shared/ui/logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    SharedLogoComponent,
    SharedFooterComponent,
    RouterOutlet,
    SharedCookieConsentComponent,
  ],
})
export class AppComponent { }
