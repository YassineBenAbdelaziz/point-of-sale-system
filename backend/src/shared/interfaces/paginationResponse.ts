export interface PaginationResponse<T> {
  data: T[];
  count: number;
  totalPages: number;
  currentPage: number;
}
