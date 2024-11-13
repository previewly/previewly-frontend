import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
})
export class PrivacyPageComponent {
  protected readonly today = new Date().toISOString().slice(0, 10);
}
