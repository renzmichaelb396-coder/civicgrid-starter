// Pure Tailwind empty state — no shadcn/ui dependency.
// shadcn/ui is added after cloning via: npx shadcn@latest init
// Once added, upgrade the button below to <Button /> from @/components/ui/button

interface EmptyStateProps {
  message?: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({
  message = 'No records yet.',
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="rounded-full bg-gray-100 p-4">
        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
