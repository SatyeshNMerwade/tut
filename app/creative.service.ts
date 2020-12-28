import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Creative } from './interface/creative';

@Injectable({
  providedIn: 'root'
})
export class CreativeService {

  serverUrl = 'http://localhost/creatives/';

constructor(private http: HttpClient) { }

getCreatives() {
  return this.http.get<Creative>(this.serverUrl).pipe(
    catchError(this.handleError)
  );
}

getCreative(id: number) {
  return this.http.get<Creative>(this.serverUrl + id).pipe(
    catchError(this.handleError)
  );
}

createCreative(creative) {
  return this.http.post<any>(this.serverUrl , creative)
  .pipe(
    catchError(this.handleError)
  );
}

updateCreative(creative, id: number) {
  return this.http.post<any>(this.serverUrl + id, creative)
  .pipe(
    catchError(this.handleError)
  );
}

deleteCreative(id: number) {
  return this.http.delete(this.serverUrl  + id).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {

    // A client-side or network error occurred. Handle it accordingly.

    console.error('An error occurred:', error.error.message);
  } else {

    // The backend returned an unsuccessful response code.

    // The response body may contain clues as to what went wrong.

    console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  }

  // return an observable with a user-facing error message

  return throwError('Something bad happened. Please try again later.');
}
}
