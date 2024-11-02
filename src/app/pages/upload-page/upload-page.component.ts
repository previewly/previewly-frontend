import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeatureFlagComponent } from '../../feature-flag/feature-flag.component';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, FeatureFlagComponent],
  templateUrl: './upload-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {}
