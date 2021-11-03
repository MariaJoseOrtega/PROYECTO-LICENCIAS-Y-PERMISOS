import {Injectable} from '@angular/core';
import themes from '../../../assets/themes/themes.json';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {ServerResponse, FileModel} from '@models/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Handler} from '../../exceptions/handler';
import {environment} from '@env/environment';
import {MessageService} from "@services/core/message.service";

@Injectable({
  providedIn: 'root'
})

export class CoreHttpService {
  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  getCatalogues(type: string | undefined): Observable<ServerResponse> {
    const params = new HttpParams().append('type', String(type));
    const url = this.API_URL + '/catalogue/all';
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getLocations(type: string | undefined): Observable<ServerResponse> {
    const params = new HttpParams().set('type', String(type));
    const url = this.API_URL + '/locations';
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  uploadFiles(url: string, data: FormData, params = new HttpParams()): Observable<ServerResponse> {
    url = this.API_URL + url;
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ServerResponse>(url, data, {params, headers})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  downloadFile(file: FileModel) {
    console.log(file);
    this.getFile(file.id!).subscribe(response => {
      const binaryData = [] as BlobPart[];
      binaryData.push(response as BlobPart);
      const filePath = URL.createObjectURL(new Blob(binaryData, {type: 'pdf'}));
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.setAttribute('download', file.fullName!);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.messageService.error(error);
    });
  }

  getFiles(url: string, params = new HttpParams()): Observable<ServerResponse> {
    url = this.API_URL + url;
    return this.httpClient.get<ServerResponse>(url, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  getFile(fileId: number, params = new HttpParams()) {
    const url = `${this.API_URL}/file/${fileId}/download`;
    return this.httpClient.get(url, {params, responseType: 'blob' as 'json'});
  }

  updateFile(file: FileModel, params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL + '/file/update/' + file.id;
    return this.httpClient.put<ServerResponse>(url, file, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }

  deleteFiles(ids: number[], params = new HttpParams()): Observable<ServerResponse> {
    const url = this.API_URL + '/file/destroys';
    return this.httpClient.patch<ServerResponse>(url, {ids}, {params})
      .pipe(
        map(response => response),
        catchError(Handler.render)
      );
  }
}
