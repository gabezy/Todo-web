import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskCompletedDTO, TaskDTO} from "../../../core/dtos/task.dto";
import {NgClass, NgIf} from "@angular/common";
import {TaskService} from "../../../core/services/task.service";

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgClass, NgIf
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.sass'
})
export class TodoCardComponent {

  @Input()
  task!: TaskDTO;

  @Output()
  completedStatusChanged = new EventEmitter<void>();

  @Output()
  deletedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly taskService: TaskService) { }

  toggleCompleted() {
    const completedDTO: TaskCompletedDTO = {
      completed: !this.task.completed
    }

    this.taskService.changeCompletedStatus(this.task.id, completedDTO).subscribe({
      complete: () => this.completedStatusChanged.emit(),
      error: err => console.log({ err })
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe({
      complete: () => this.deletedEvent.emit(),
      error: err => console.log({ err })
    });
  }

}
