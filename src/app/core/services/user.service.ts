import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateUserDTO} from "../dtos/user.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.todoApiUrl + '/users';
  }

  createUser(data: CreateUserDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, data);
  }

}
