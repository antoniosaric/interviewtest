

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

constructor( private http: HttpClient ) { }

  searchInvoices( parameters: any ){
    console.log({...parameters})
    const  params = new  HttpParams().set('search', parameters["search"]);
    return this.http.get( environment.apiUrl + 'api/invoices', {params} )
  }

}
