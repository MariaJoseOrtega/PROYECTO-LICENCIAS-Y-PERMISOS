import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Handler} from '../../exceptions/handler';
import {environment} from '@env/environment';
import {LoginModel, ServerResponse} from '@models/core';
import {LoginResponse} from '@models/core/login.response';

@Injectable({
  providedIn: 'root'
})

export class MenuHttpService {
  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient) {

  }

  getMenus(): Observable<ServerResponse> {
    const url = `${this.API_URL}/menus`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

}
