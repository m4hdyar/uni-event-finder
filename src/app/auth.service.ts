import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {

    if (localStorage.getItem("id_token") && localStorage.getItem("expires_at")) {
      return true
    } 

    return false;
  }
}