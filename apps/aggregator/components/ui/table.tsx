import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

type TableProps = Omit<TableHTMLAttributes<HTMLTableElement>, "className">;
type TableSectionProps = Omit<
  HTMLAttributes<HTMLTableSectionElement>,
  "className"
>;
type TableRowProps = Omit<HTMLAttributes<HTMLTableRowElement>, "className">;
type TableHeadProps = Omit<ThHTMLAttributes<HTMLTableCellElement>, "className">;
type TableCellProps = Omit<TdHTMLAttributes<HTMLTableCellElement>, "className">;

export default function Table(props: TableProps) {
  return <table className="reference-table" {...props} />;
}

export function TableHeader(props: TableSectionProps) {
  return <thead className="reference-table-header" {...props} />;
}

export function TableBody(props: TableSectionProps) {
  return <tbody className="reference-table-body" {...props} />;
}

export function TableRow({ onClick, ...props }: TableRowProps) {
  return (
    <tr
      className="reference-table-row"
      data-interactive={onClick ? "true" : undefined}
      onClick={onClick}
      {...props}
    />
  );
}

export function TableHead(props: TableHeadProps) {
  return (
    <th
      scope="col"
      className="reference-table-head"
      {...props}
    />
  );
}

export function TableCell(props: TableCellProps) {
  return (
    <td
      className="reference-table-cell"
      data-empty={props.colSpan !== undefined ? "true" : undefined}
      {...props}
    />
  );
}
