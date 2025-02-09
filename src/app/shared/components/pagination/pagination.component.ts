import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent {

  @Input()
  totalItems: number;
  @Input()
  itemsPerPage: number;
  @Input()
  currentPage: number;
  @Input()
  totalPages: number;
  @Output()
  pageChange: EventEmitter<number>;

  constructor() {
    this.totalItems = 0;
    this.itemsPerPage = 0;
    this.currentPage = 1;
    this.totalPages = 0;
    this.pageChange = new EventEmitter();
  }


  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

}
