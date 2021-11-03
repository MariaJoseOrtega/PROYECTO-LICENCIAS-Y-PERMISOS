import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ServerResponse} from '@models/core/server.response';
import {Handler} from '../../exceptions/handler';
import {environment} from '@env/environment';
import {UserModel} from '@models/core';

@Injectable({
  providedIn: 'root'
})

export class UserAdministrationHttpService {
  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient) {

  }

  getUsers(): Observable<ServerResponse> {
    const url = this.API_URL + '/users';
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getUser(id: number): Observable<ServerResponse> {
    const url = this.API_URL + '/users/' + id;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeUser(project: UserModel): Observable<ServerResponse> {
    const url = this.API_URL + '/users';
    return this.httpClient.post<ServerResponse>(url, project)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateUser(id: number | undefined, project: UserModel): Observable<ServerResponse> {
    const url = this.API_URL + '/users/' + id;
    return this.httpClient.put<ServerResponse>(url, project)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteUser(id: number | undefined): Observable<ServerResponse> {
    const url = this.API_URL + '/users/' + id;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteUsers(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = this.API_URL + '/user/destroys';
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
}

