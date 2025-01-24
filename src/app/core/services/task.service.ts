import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateTaskDTO, TaskCompletedDTO, TaskDTO, TaskFilterDTO, UpdateTaskDTO} from "../dtos/task.dto";
import {Observable} from "rxjs";
import {toHttpParams} from "../utils/params.utils";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.baseUrl = environment.todoApiUrl + '/tasks';
  }

  createTask(task: CreateTaskDTO): Observable<void> {
    return this.http.post<void>(this.baseUrl, task);
  }

  getAllTask(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.baseUrl)
  }

  getByFilter(filter: TaskFilterDTO): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(`${this.baseUrl}/filter`, { params: toHttpParams(filter) });
  }

  getById(id: number): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(`${this.baseUrl}/${id}`);
  }

  changeCompletedStatus(id: number, completedStatus: TaskCompletedDTO): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, completedStatus);
  }

  updateTask(id: number, data: UpdateTaskDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
