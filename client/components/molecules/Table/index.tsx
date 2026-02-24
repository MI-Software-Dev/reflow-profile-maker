"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { TableColumn, TableProps } from "./type";

export const Table = <T,>({
  data = [],
  columns = [],
  itemsPerPage: initialItemsPerPage = 10,
  className = "",
  striped = true,
  hoverable = true,
  compact = false,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  /* =============================
     Sorting
  ============================== */
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
      if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

      const aStr = String(aValue);
      const bStr = String(bValue);

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortConfig]);

  /* =============================
     Pagination (safe clamp)
  ============================== */
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageSizeChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  /* =============================
     Sorting handler
  ============================== */
  const handleSort = (key: keyof T) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  /* =============================
     Pagination handlers
  ============================== */
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1));
  const goToPage = (page: number) => setCurrentPage(page);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(1, safeCurrentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }

    return pages;
  };

  /* =============================
     Helpers
  ============================== */
  const renderCellContent = <K extends keyof T>(
    column: TableColumn<T, K>,
    row: T,
    index: number,
  ) => {
    if (column.render) {
      return column.render(row[column.key], row, index);
    }
    return row[column.key] as React.ReactNode;
  };

  const getSortIcon = (columnKey: keyof T) => {
    if (sortConfig?.key === columnKey) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  /* =============================
     Loading
  ============================== */
  if (loading) {
    return (
      <div className="w-full overflow-x-auto">
        <table
          className={`table ${striped ? "table-zebra" : ""} ${
            compact ? "table-compact" : ""
          } ${className}`}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)}>
                  <div className="skeleton h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <tr key={i}>
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    <div className="skeleton h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* =============================
     Render
  ============================== */
  return (
    <div className="w-full space-y-4">
      <div className="overflow-x-auto">
        <table
          className={`table ${striped ? "table-zebra" : ""} ${
            hoverable ? "table-hover" : ""
          } ${compact ? "table-compact" : ""} ${className}`}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`${
                    column.sortable
                      ? "hover:bg-base-200 cursor-pointer select-none"
                      : ""
                  }`}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <span className="text-xs opacity-60">
                        {getSortIcon(column.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-base-content/60 py-8 text-center"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  key={index}
                  className={onRowClick ? "cursor-pointer" : ""}
                  onClick={() => onRowClick?.(row, startIndex + index)}
                >
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {renderCellContent(column, row, startIndex + index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + Page Size */}
      {sortedData.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Info + Page Size (always visible if data exists) */}
          <div className="text-base-content/70 flex items-center gap-4 text-sm">
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, sortedData.length)} of {sortedData.length}{" "}
              entries
            </span>

            <div className="flex items-center gap-2 text-nowrap">
              <span>Rows per page:</span>
              <select
                className="select select-sm select-bordered"
                value={itemsPerPage}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                {[5, 10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div className="join">
              <button
                className="join-item btn btn-sm"
                onClick={goToFirstPage}
                disabled={safeCurrentPage === 1}
              >
                <ChevronsLeft size={16} />
              </button>

              <button
                className="join-item btn btn-sm"
                onClick={goToPreviousPage}
                disabled={safeCurrentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  className={`join-item btn btn-sm ${
                    safeCurrentPage === page ? "btn-active" : ""
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="join-item btn btn-sm"
                onClick={goToNextPage}
                disabled={safeCurrentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>

              <button
                className="join-item btn btn-sm"
                onClick={goToLastPage}
                disabled={safeCurrentPage === totalPages}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
