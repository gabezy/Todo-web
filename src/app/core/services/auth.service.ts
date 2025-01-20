import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LoginDTO, TokenDTO} from "../dtos/login.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.todoApiUrl + '/auth'
  }

  login(data: LoginDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(this.baseUrl, data);
  }
}
