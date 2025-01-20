import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.sass'
})
export class AlertComponent implements OnInit, OnDestroy{

  @Input()
  message: string = '';

  @Input()
  type: string = '';

  @Input()
  duration: number = 5000;

  private timer: any;

  ngOnInit(): void {
    this.timer = setTimeout(() => {
      this.message = '';
    }, this.duration);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

}
