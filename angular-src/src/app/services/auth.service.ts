import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import "rxjs/add/operator/map";
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: String;
  constructor(private http:Http) { }

  registerUser(newUser) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    return this.http.post("http://localhost:5000/users/register", newUser, {headers})
      .map(res => res.json())
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    return this.http.post("http://localhost:5000/users/login", user, {headers})
      .map(res => res.json())
  }
  storeUserData(token) {
    localStorage.setItem("id_token", token);
    this.authToken = token;
  }
  loadProfile() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
    const headers = new Headers();
    headers.append("Authorization", token)
    headers.append("Content-Type", "application/json")
    return this.http.get("http://localhost:5000/users/profile", {headers})
      .map(res => res.json())
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logOut() {
    localStorage.clear();
    this.authToken = null;
  }
}
