import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: Http) {}

public getJSON(): Observable<any> {
    return this.http.get('./assets/Bringg-json-generator.json');
}


}
