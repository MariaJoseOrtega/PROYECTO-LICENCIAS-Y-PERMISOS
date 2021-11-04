import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginatorModel, ServerResponse} from '@models/core';
import {
  ApplicationModel,
  StateModel,
  ReasonModel,
  EmployerModel,
  FormModel,
  HolidayModel,
  /*DependenceModel,*/
  
//  DependenceModel
} from '@models/license-work';
import {catchError, map} from 'rxjs/operators';
import {Handler} from '../../exceptions/handler';
import { MessageService } from '@services/core';
import { DependenceModel } from '@models/license-work/dependence.model';

@Injectable({
  providedIn: 'root'
})

export class LicenseWorkHttpService {

  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  //*************        APPLICATIONS         *******************//
  getApplications(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/applications`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    if (filter !== '') {
      filter = `?name=${filter}&description=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getApplication(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/applications/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeApplication(application: ApplicationModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/applications`;
    return this.httpClient.post<ServerResponse>(url, application)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateApplication(id: number, application: ApplicationModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/applications/${id}`;
    return this.httpClient.put<ServerResponse>(url, application)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteApplication(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/application/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteApplications(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/application/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  //*************        DEPENDENCE         *******************//
  getDependences(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependences`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getDependence(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependences/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeDependence(dependence: DependenceModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependences`;
    return this.httpClient.post<ServerResponse>(url, dependence)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateDependence(id: number, dependence: DependenceModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependences/${id}`;
    return this.httpClient.put<ServerResponse>(url, dependence)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteDependence(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependences/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteDependences(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/dependence/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  //*************        EMPLOYER         *******************//

  getEmployers(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/employers`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getCatalogueEmployers(){
    const url = `${this.API_URL}/employer/catalogue`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  getEmployer(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/employers/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeEmployer(employer: EmployerModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/employers`;
    return this.httpClient.post<ServerResponse>(url, employer)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateEmployer(id: number, employer: EmployerModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/employers/${id}`;
    return this.httpClient.put<ServerResponse>(url, employer)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteEmployer(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/employers/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteEmployers(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/employer/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  //*************        FORM          *******************//

  getForms(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/forms`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  getCatalogueForms(){
    const url = `${this.API_URL}/form/catalogue`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getForm(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/forms/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeForm(form: FormModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/forms`;
    return this.httpClient.post<ServerResponse>(url, form)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateForm(id: number, form: FormModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/forms/${id}`;
    return this.httpClient.put<ServerResponse>(url, form)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteForm(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/forms/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteForms(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/form/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  //*************        HOLIDAY          *******************//
  getHolidays(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/holidays`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getHoliday(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/holidays/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeHoliday(holiday: HolidayModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/holidays`;
    return this.httpClient.post<ServerResponse>(url, holiday)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateHoliday(id: number, holiday: HolidayModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/holidays/${id}`;
    return this.httpClient.put<ServerResponse>(url, holiday)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteHoliday(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/holidays/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteHolidays(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/holiday/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  //*************        REASON          *******************//
  getReasons(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getCatalogueReasons(){
    const url = `${this.API_URL}/reason/catalogue`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  getReason(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeReason(reason: ReasonModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons`;
    return this.httpClient.post<ServerResponse>(url, reason)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateReason(id: number, reason: ReasonModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons/${id}`;
    return this.httpClient.put<ServerResponse>(url, reason)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteReason(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteReasons(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/reason/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
  //*************        STATE          *******************//
  getStates(paginator: PaginatorModel, filter: string = ''): Observable<ServerResponse> {
    const url = `${this.API_URL}/states`;
    const params = new HttpParams()
      .set('page', paginator.current_page)
      .set('per_page', paginator.per_page);
    // El filtro depende de los campos propios que sean cadenas de texto
    if (filter !== '') {
      filter = `?senescytCode=${filter}`;
    }
    return this.httpClient.get<ServerResponse>(url + filter, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getState(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/states/${id}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  storeState(state: StateModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons`;
    return this.httpClient.post<ServerResponse>(url, state)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  updateState(id: number, state: StateModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reasons/${id}`;
    return this.httpClient.put<ServerResponse>(url, state)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteState(id: number): Observable<ServerResponse> {
    const url = `${this.API_URL}/states/${id}`;
    return this.httpClient.delete<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteStates(ids: (number | undefined)[]): Observable<ServerResponse> {
    const url = `${this.API_URL}/state/destroys`;
    return this.httpClient.patch<ServerResponse>(url, {ids})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
}