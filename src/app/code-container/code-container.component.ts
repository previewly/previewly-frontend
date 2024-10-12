import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { ApiUrlService } from '../service/api-url.service';
import { TitleComponent } from '../share/content/title/title.component';

@Component({
  selector: 'app-code-container',
  standalone: true,
  templateUrl: './code-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TitleComponent],
})
export class CodeContainerComponent {
  private readonly apiUrlService = inject(ApiUrlService);
  token = input.required<string | undefined>();
  isLoading = input<boolean>(false);

  imgUrl = computed(() => {
    const token = this.token();
    return token ? this.apiUrlService.createApiImageUrl(token) : undefined;
  });

  jsonUrl = computed(() => {
    const token = this.token();
    return token ? this.apiUrlService.createApiJsonUrl(token) : undefined;
  });

  gqlUrl = computed(() => {
    return this.apiUrlService.createApiGqlUrl();
  });
}
