import { cn } from '@/utils/cn'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('min-w-full', className)} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('', className)} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={cn('divide-y divide-white/5', className)} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        'hover:bg-white/[0.03] transition-colors duration-200 group',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/8',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td
      className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-300', className)}
      {...props}
    >
      {children}
    </td>
  )
}
