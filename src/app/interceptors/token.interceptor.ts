import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@services/core/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let flag = false;
    let headers = new HttpHeaders();

    request.headers.getAll('Content-Type')?.forEach(header => {
      if (header == 'multipart/form-data') {
        flag = true;
      }
    });

    if (flag) {
      headers = headers
        .append('Accept', 'application/json')
        .append('Authorization', 'Bearer ' + this.authService.token);
    } else {
      headers = headers
        .append('Accept', 'application/json')
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + this.authService.token);
    }

    return next.handle(request.clone({headers}));
  }
}
