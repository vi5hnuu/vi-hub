import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BaseUrlInterceptor } from './interceptors/base-url/base-url.interceptor';
import { SessionInterceptor } from './interceptors/session/session.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([BaseUrlInterceptor, SessionInterceptor])
    ),
    provideRouter(appRoutes, withHashLocation()),
  ],
};
