import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SharedCookieConsentComponent } from './shared/ui/cookie-consent/cookie-consent.component';
import { SharedFooterComponent } from './shared/ui/footer/footer.component';
import { SharedTopNavComponent } from './shared/ui/top-nav/top-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    SharedFooterComponent,
    RouterOutlet,
    SharedCookieConsentComponent,
    SharedTopNavComponent,
  ],
})
export class AppComponent {}
