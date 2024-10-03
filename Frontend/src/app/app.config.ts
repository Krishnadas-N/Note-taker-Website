import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { routes } from './app.routes';
import { environment } from '../environments/environment.development';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { bearerTokenInterceptor } from './interceptors/bearer-token.interceptor';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { JwtModule } from '@auth0/angular-jwt';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export function tokenGetter() {
  return localStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers: [
  provideHttpClient(
      withFetch(),
      withInterceptors([bearerTokenInterceptor,errorHandlerInterceptor])
  ),
  importProvidersFrom(
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/auth/']
      }
    }),
),
  { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideRouter(routes), provideAnimationsAsync(),

]
};


