import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthModel} from './models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authURL = 'http://dourlens-monchy.fr:8091/';  // URL to web api
  private token?: string;

  constructor(private http: HttpClient) { }

  login(login: string, pass: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(
      this.authURL + 'v1/authentication/login',
      {username: login, password: pass }
    ).pipe(tap(res => this.token = res.token));
  }

  createUser(login: string, pass: string): Observable<any> {
    return this.http.post(
      this.authURL + 'v1/users',
      { name: login, password: pass}
      );
  }

  ping(): Observable<any> {
    return this.http.get(this.authURL + 'ping', {responseType: 'text'}).pipe(
      tap(res => this.token = res)
    );
  }

  isLogged(): boolean {
    if (this.token) {
      return true;
    }
    return false;
  }

  disconnect(): Observable<any> {
    this.token = '';
    return this.http.post(this.authURL + 'v1/authentication/logout', { token: this.token});
  }

  getToken(): string {
    return this.token;
  }
}
