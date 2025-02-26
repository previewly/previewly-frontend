import {
  Component,
  ElementRef,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { TitleComponent } from '../../../shared/ui/content/title/title.component';
import { SwipeBrowserComponent } from './swipe-browser/swipe-browser.component';
import { SwipePreviewComponent } from './swipe-preview/swipe-preview.component';

@Component({
  standalone: true,
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
  imports: [
    TitleComponent,
    FormsModule,
    SwipeBrowserComponent,
    SwipePreviewComponent,
  ],
})
export class FeaturesComponent {
  protected activeSlide = signal(0);

  @ViewChildren('slideContent') slideContentElements!: QueryList<ElementRef>;

  constructor() {
    interval(5000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.tick());
  }

  private tick(): void {
    this.activeSlide.update(v => {
      this.restartAnimations();
      return v >= 2 ? 0 : v + 1;
    });
  }

  //magic
  restartAnimations() {
    this.slideContentElements.toArray().forEach(slide => {
      const imgElement = slide.nativeElement as HTMLElement;
      imgElement.style.animation = 'none';
      // eslint-disable-next-line sonarjs/void-use
      void imgElement.offsetWidth;
      // Restore animations
      imgElement.style.animation = '';
    });
  }
}
