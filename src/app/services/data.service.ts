import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getData() {
    return this.httpClient
      .get('https://rcapi.azurewebsites.net/api/sample/1')
      .pipe(catchError((error) => of(error)));
  }
}
