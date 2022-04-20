export interface PaginationProps {
  status: "NO_MORE" | "WAIT" | "LOAD" | "END" | "ERROR";
  total: number;
  page: number;
  size: number;
}
