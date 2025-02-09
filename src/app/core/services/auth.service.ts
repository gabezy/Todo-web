import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LoginDTO, TokenDTO} from "../dtos/login.dto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string;
  private readonly AUTH_TOKEN = 'AUTH_TOKEN'

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.baseUrl = environment.todoApiUrl + '/auth'
  }

  login(data: LoginDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(this.baseUrl, data);
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  storeToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  clearToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN);
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['login']);
  }

}
