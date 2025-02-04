import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {TaskService} from "../../core/services/task.service";
import {CreateTaskDTO, TaskDTO, TaskFilterDTO, UpdateTaskDTO} from "../../core/dtos/task.dto";
import {EmptyStateComponent} from "../../shared/components/empty-state/empty-state.component";
import {NgForOf, NgIf} from "@angular/common";
import {AlertComponent} from "../../shared/components/alert/alert.component";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PaginationComponent} from "../../shared/components/pagination/pagination.component";
import {EmptyPage, Page} from "../../core/models/page.model";
import {Pageable, PageParams} from "../../core/models/pageable.model";
import {Observable, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-todo',
  standalone: true,
    imports: [
        FormsModule, EmptyStateComponent, NgIf,
        AlertComponent, TodoCardComponent, NgForOf, PaginationComponent
    ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.sass'
})
export class TodoComponent implements OnInit {

  tasksCreatedCounter: number;
  tasksCompletedCounter: number;
  newTask: CreateTaskDTO;
  errorMessage: string;
  tasks: Page<TaskDTO>;
  pageable: Pageable;
  tasksPerPage: number;
  invalidContent: boolean;
  selectedTask!: TaskDTO;

  constructor(private readonly taskService: TaskService, private readonly modalService: NgbModal) {
    this.tasksCreatedCounter = 0;
    this.tasksCompletedCounter = 0;
    this.newTask = { content: '', completed: false};
    this.errorMessage = '';
    this.tasks = new EmptyPage();
    this.tasksPerPage = 5;
    this.pageable = new PageParams(["id"], this.tasksPerPage);
    this.invalidContent = false;
  }

  ngOnInit(): void {
    this.loadTasks().subscribe();
  }

  openModel(content: TemplateRef<any>, taskId: number) {
    this.fetchTaskAndOpenModal(taskId, content);
  }

  createNewTask(form: NgForm): void {
    if (this.isFormInvalid(form, this.newTask.content)) {
      this.invalidContent = true;
      return;
    }

    this.invalidContent = false;

    this.taskService.createTask(this.newTask)
      .pipe(switchMap(() => this.loadTasks()))
      .subscribe({
        complete: () => this.resetForm(form),
        error: (err) => this.handlerError(err)
      });
  }

  onTaskCompletedStatusChange(): void {
    this.loadTasks().subscribe();
  }

  onDeleteEvent(): void {
    this.loadTasks().subscribe(() => {
      // change to the previous page when delete all the task for the current page
      if (this.tasks.empty && this.pageable.page > 0) {
        this.onPageChange(this.pageable.page);
      }
    });
  }

  onPageChange(newPage: number): void {
    this.pageable.page = newPage - 1;
    this.loadTasks().subscribe();
  }

  private loadTasks(): Observable<Page<TaskDTO>> {
    return this.taskService.getAllTask(this.pageable).pipe(
      tap({
        next: value => {
          this.tasks = value
          this.tasksCreatedCounter = value.totalElements;
          this.setCompletedTaskCounter();
        },
        error: (err) => this.handlerError(err)
    }));
  }

  private setCompletedTaskCounter(): void {
    const taskFilter: TaskFilterDTO = { completed: true };

    this.taskService.getByFilter(taskFilter).subscribe({
      next: (completedTasks) => this.tasksCompletedCounter = completedTasks.length,
      error: (err) => this.handlerError(err)
    })
  }

  private fetchTaskAndOpenModal(taskId: number, content: TemplateRef<any>): void {
    this.taskService.getById(taskId).subscribe({
      next: (task) => {
        this.selectedTask = task;
        this.openEditModal(taskId, content);
      }
    })
  }

  private openEditModal(taskId: number, content: TemplateRef<any>): void {
    this.modalService.open(content, { ariaDescribedBy: 'modal-edit-title' }).result.then(
      () => this.updateTask(taskId, this.selectedTask)
    )
  }

  private updateTask(taskId: number, task: TaskDTO): void {
    const updateTaskDTO: UpdateTaskDTO = {
      content: task.content,
      completed: task.completed
    };

    this.taskService.updateTask(taskId, updateTaskDTO)
      .pipe(switchMap(() => this.loadTasks()))
      .subscribe({
        complete: () => this.loadTasks(),
        error: (err) => this.handlerError(err)
      })
  }

  private handlerError(error: any) {
    console.error('error: ', error);
    this.errorMessage = error.error?.description || 'An unexpected error occurred';
  }

  private resetForm(form: NgForm): void {
    this.newTask.content = '';
    form.resetForm();
  }

  private isFormInvalid(form: NgForm, taskContent: string): boolean {
    return form.invalid || !taskContent.trim();
  }

}
