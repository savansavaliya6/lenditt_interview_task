// Angular Modules 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
const API_URL = environment.apiurl

@Injectable()
export class ApiService {

    constructor(
        // Angular Modules 
        private http: HttpClient
    ) { }
    public getdata() {
        return this.http.get<any>(API_URL);
    }

}