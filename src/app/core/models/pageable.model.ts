export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

export class PageParams implements Pageable {
  page: number;
  size: number;
  sort: string[];

  constructor(sort: string[], size: number = 5, page: number = 0) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

}
