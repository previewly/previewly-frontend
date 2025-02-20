import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { ApiUrlService } from '../service/api-url.service';
import { TitleComponent } from '../shared/ui/content/title/title.component';
import { GqlContentComponent } from './gql-content/gql-content.component';
import { RestContentComponent } from './rest-content/rest-content.component';

@Component({
  selector: 'app-code-container',
  standalone: true,
  templateUrl: './code-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TitleComponent,
    GqlContentComponent,
    RestContentComponent,
  ],
})
export class CodeContainerComponent {
  private readonly apiUrlService = inject(ApiUrlService);
  protected readonly activeTab = signal(0);

  token = input.required<string | undefined>();
  isLoading = input<boolean>(false);

  imgUrl = computed(() => {
    const token = this.token();
    return token ? this.apiUrlService.createApiImageUrl(token) : undefined;
  });

  restUrl = computed(() => this.apiUrlService.createApiJsonUrl());

  gqlUrl = computed(() => {
    return this.apiUrlService.createApiGqlUrl();
  });
}
