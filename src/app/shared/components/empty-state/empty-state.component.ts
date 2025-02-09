import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.sass'
})
export class EmptyStateComponent {

  @Input()
  resource: string = '';

}
