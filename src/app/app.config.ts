import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi, HttpClientModule} from "@angular/common/http";
import { ka_GE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ka from '@angular/common/locales/ka';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(ka);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), provideNzI18n(ka_GE), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule),
    provideAnimations()
]
};
