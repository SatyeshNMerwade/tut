import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creative } from '../interface/creative';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private httpClient: HttpClient) { }

    serverUrl = 'http://localhost:8081/';

    get(url: string): Observable<any> {
        return this.httpClient.get(this.serverUrl + url);
    }

    post(url: string, data: any): Observable<any> {
        return this.httpClient.post(this.serverUrl + url, data);
    }

    put(url: string, id: string, data: any): Observable<any> {
        return this.httpClient.put(this.serverUrl + url + id, data);
    }

    delete(url: string, data: Creative): Observable<any> {
        return this.httpClient.delete(this.serverUrl + url + data.id);
    }

}
