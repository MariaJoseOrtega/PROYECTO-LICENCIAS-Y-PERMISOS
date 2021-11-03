import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {LoginModel, ServerResponse} from '@models/core';
import {LoginResponse} from '@models/core/login.response';
import {AuthService} from './auth.service';
import {LicenseWorkService} from '@services/license-work/license-work.service';
import {Handler} from "../../exceptions/handler";

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {
  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient, private authService: AuthService, private jobBoardService: LicenseWorkService) {

  }

  login(credentials: LoginModel): Observable<LoginResponse> {
    const url = `${this.API_URL}/auth/login`;
    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => response),
        tap(
          response => {
            this.authService.token = response.token;
            this.authService.user = response.data.user;
            this.authService.roles = response.data.roles;
            this.authService.permissions = response.data.permissions;
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }

  logout(): Observable<LoginResponse> {
    const url = `${this.API_URL}/auth/logout`;
    return this.httpClient.get<LoginResponse>(url)
      .pipe(
        map(response => response),
        tap(
          response => {
            console.log(response);
            this.authService.removeLogin();
          }
        ),
        catchError(error => {
          this.authService.removeLogin();
          return throwError(error);
        })
      );
  }

  requestPasswordReset(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/auth/request-password-reset`;
    return this.httpClient.post<ServerResponse>(url, {username})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

}
