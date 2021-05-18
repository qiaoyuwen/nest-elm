export class PaginationRequestDTO {
  current: number;
  pageSize: number;

  constructor(partial: Partial<PaginationRequestDTO>) {
    Object.assign(this, partial);
  }
}
