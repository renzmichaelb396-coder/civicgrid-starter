import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

// Use this on every data page when fetch fails.
// Pattern: if (error) return <ErrorState message="..." onRetry={refetch} />
// NEVER show raw error objects or stack traces to the user.
export function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="rounded-full bg-red-50 p-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">Unable to load data</p>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
