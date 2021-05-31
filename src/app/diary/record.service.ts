import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs';
import {Record} from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private baseUrl = 'http://dourlens-monchy.fr:8091/';

  constructor(private http: HttpClient, private authService: AuthenticationService) {}


  getRecord(): Observable<Record[]> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    return this.http.get<Record[]>(this.baseUrl + 'v1/records', {headers: params});
  }

  createRecord(topicName: string): Observable<any> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    const body = {name: topicName};
    return this.http.post(this.baseUrl + 'v1/records', body, {headers: params});
  }

  getRecordById(idRecord: number): Observable<Record> {
    const params = new HttpHeaders();
    params.append('token', this.authService.getToken());
    return this.http.get<Record>(this.baseUrl + 'v1/records/' + idRecord, {headers: params});
  }
}
