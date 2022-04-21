export interface PaginationProps {
  status: "NO_MORE" | "LOAD" | "END" | "ERROR";
  total: number;
  page: number;
  size: number;
}
