import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {TaskService} from "../../core/services/task.service";
import {CreateTaskDTO, TaskDTO, TaskFilterDTO} from "../../core/dtos/task.dto";
import {EmptyStateComponent} from "../../shared/components/empty-state/empty-state.component";
import {NgForOf, NgIf} from "@angular/common";
import {AlertComponent} from "../../shared/components/alert/alert.component";
import {TodoCardComponent} from "./todo-card/todo-card.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule, EmptyStateComponent, NgIf,
    AlertComponent, TodoCardComponent, NgForOf
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.sass'
})
export class TodoComponent implements OnInit {

  tasksCreatedCounter!: number;

  tasksCompletedCounter!: number;

  newTask: CreateTaskDTO = {
    content: '',
    completed: false
  };

  errorMessage = '';

  tasks: TaskDTO[] = [];

  invalidContent = false;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  createNewTask(form: NgForm): void {
    console.log(form);

    if (!this.newTask.content.length) {
      this.invalidContent = true;
      return;
    }

    this.invalidContent = false;

    this.taskService.createTask(this.newTask).subscribe({
      complete: () => {
        this.newTask.content = '';
        this.getAllTask();
      },
      error: err => {
        console.log({ err })
        this.errorMessage = err.error.description
      }
    });
  }

  onTaskCompletedStatusChange(): void {
    this.getAllTask();
  }

  onDeleteEvent(): void {
    this.getAllTask();
  }

  private getAllTask(): void {
    this.taskService.getAllTask().subscribe({
      next: value => {
        this.tasks = value
        this.tasksCreatedCounter = value.length;
      }
    });

    this.setCompletedTaskCounter();
  }

  private setCompletedTaskCounter(): void {
    const taskFilter: TaskFilterDTO = {
      completed: true
    }

    this.taskService.getByFilter(taskFilter).subscribe({
      next: value => this.tasksCompletedCounter = value.length,
      error: err => this.errorMessage = err.error.description
    })
  }

}
