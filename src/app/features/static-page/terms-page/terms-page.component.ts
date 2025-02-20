import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['../static-page.component.scss'],
})
export class TermsPageComponent {
  protected readonly today = new Date().toISOString().slice(0, 10);
}
