import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { Undefined } from '../../../../app.types';
import { TitleComponent } from '../../../../shared/ui/content/title/title.component';
import { SharedLoaderComponent } from '../../../../shared/ui/tools/loader/loader.component';
import { ApiUrlService } from '../../api-url.service';
import { GqlContentComponent } from '../../gql-content/gql-content.component';
import { RestContentComponent } from '../../rest-content/rest-content.component';

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
    SharedLoaderComponent,
  ],
})
export class CodeContainerComponent {
  private readonly apiUrlService = inject(ApiUrlService);
  protected readonly activeTab = signal(0);

  token = input.required<string>();
  isLoading = input<boolean>(false);
  error = input<string | Undefined>(null);

  refreshToken = output();

  imgUrl = computed(() => {
    const token = this.token();
    return token ? this.apiUrlService.createApiImageUrl(token) : undefined;
  });
  restUrl = computed(() => this.apiUrlService.createApiJsonUrl());
  gqlUrl = computed(() => this.apiUrlService.createApiGqlUrl());
}
