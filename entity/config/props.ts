export interface PaginationProps<T> {
  status: "NO_MORE" | "WAIT" | "LOAD" | "END" | "ERROR";
  total: number;
  pagination: T;
}
