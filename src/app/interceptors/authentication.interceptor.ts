import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '@services/core/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      // Cuando la aplicación o una ruta está en mantenimiento
      if (error.status === 503) {
        this.authService.removeLogin();
        this.router.navigate(['/common/under-maintenance']);
      }

      // Cuando el usuario no tiene permisos para acceder a la ruta solicitada y se encuentra logueado
      if ((error.status === 401 || error.status === 403 || error.status === 423) && this.authService.token) {
        this.authService.removeLogin();
        this.router.navigate(['/common/access-denied']);
      }

      // Cuando el usuario no tiene permisos para acceder a la ruta solicitada y no está logueado
      if ((error.status === 401 || error.status === 403 || error.status === 423) && !this.authService.token) {
        this.authService.removeLogin();
        this.router.navigate(['/authentication/login']);
      }

      return throwError(error);
    }));
  }
}
