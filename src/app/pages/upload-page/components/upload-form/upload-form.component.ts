import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircleDuotone,
  phosphorImagesDuotone,
} from '@ng-icons/phosphor-icons/duotone';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({ phosphorImagesDuotone, phosphorCheckCircleDuotone }),
  ],
})
export class UploadFormComponent {
  selectedFiles = output<File[]>();

  protected readonly isDropActive = signal(false);

  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    if (input.files) {
      this.selectedFiles.emit(Array.from(input.files));
    }
  }

  handleDragLeave($event: DragEvent) {
    this.isDropActive.set(false);
    $event.preventDefault();
  }

  handleDragOver($event: DragEvent) {
    this.isDropActive.set(true);
    $event.preventDefault();
  }

  handleDrop($event: DragEvent) {
    this.isDropActive.set(false);
    this.selectedFiles.emit(
      $event.dataTransfer?.files ? Array.from($event.dataTransfer?.files) : []
    );
    $event.preventDefault();
  }
}
