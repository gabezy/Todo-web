export interface Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
  sorts: SortOrder[];
  totalElements: number;
  totalPages: number;
}

export interface SortOrder {
  prop: string;
  dir: 'asc' | 'desc';
}

export class EmptyPage implements Page<any> {
  content: any[] = [];
  empty: boolean = true;
  first: boolean = true;
  last: boolean = true;
  number: number = 0;
  size: number = 10;
  sorts: SortOrder[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
}
