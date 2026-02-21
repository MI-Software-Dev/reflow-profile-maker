export interface TableColumn<T, K extends keyof T = keyof T> {
  key: K;
  header: string;
  render?: (value: T[K], row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}
export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T, keyof T>[];
  itemsPerPage?: number;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
}
