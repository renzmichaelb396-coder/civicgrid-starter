import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  message?: string
  description?: string
  action?: { label: string; onClick: () => void }
}

// Use this on every data page when the list is empty.
// Pattern: if (!data || data.length === 0) return <EmptyState message="..." />
// NEVER show an empty table body or blank screen.
export function EmptyState({
  message = 'No records yet.',
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="rounded-full bg-gray-100 p-4">
        <Inbox className="h-8 w-8 text-gray-400" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
