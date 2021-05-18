export class PaginationResponseDTO {
  current: number;
  pageSize: number;
  total: number;

  constructor(partial: Partial<PaginationResponseDTO>) {
    Object.assign(this, partial);
  }
}
