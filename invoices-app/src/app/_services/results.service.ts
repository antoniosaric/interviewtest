

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

constructor( private http: HttpClient ) { }

  searchInvoices( parameters: any ){
    const params = {...parameters };
    return this.http.get( environment.apiUrl + 'api/invoices', params )
  }

}
