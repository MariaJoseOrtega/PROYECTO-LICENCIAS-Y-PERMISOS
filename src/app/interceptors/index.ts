/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { TokenInterceptor } from './token.interceptor';

/** Http interceptor providers in outside-in order */
export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];
