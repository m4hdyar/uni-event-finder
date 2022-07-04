import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const reqbody= {
      user:{
        "username":"user11",
        "email":email,
        "password":password
      }
    }
    return this.http.post<User>('http://localhost:3600/api/users/login', reqbody).pipe(
      tap(res => this.setSession(res)),
      // this is just the HTTP call, 
      // we still need to handle the reception of the token
      shareReplay());
  }

  private setSession(authResult:User) {
    console.log(authResult +"HI");
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    const expiresAt = moment().add(1, 'days');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = expiration ? JSON.parse(expiration) : moment().subtract(1,"days");
    return moment(expiresAt);
  }
}

