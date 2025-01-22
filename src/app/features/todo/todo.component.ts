import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TaskService} from "../../core/services/task.service";
import {CreateTaskDTO, TaskDTO} from "../../core/dtos/task.dto";
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

  newTask: CreateTaskDTO = {
    content: '',
    completed: false
  };

  errorMessage = '';

  tasks: TaskDTO[] = [];

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  createNewTask(): void {
    this.taskService.createTask(this.newTask).subscribe({
      complete: () => {
        this.newTask.content = '';
        this.getAllTask();
      },
      error: err => {
        const { status } = err;
        if (status == 400) {
          this.errorMessage = err.error.description
        }
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
      next: value => this.tasks = value
    });
  }

}
