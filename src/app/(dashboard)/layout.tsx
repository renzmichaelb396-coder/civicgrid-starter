// ⚠️ FILL IN: Add auth guard here — redirect to /login if no session.
// Dashboard layout: sidebar + main content area.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar — replace with your <Sidebar /> component */}
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <div className="p-6 border-b">
          <span className="text-lg font-bold text-blue-700">CivicGrid</span>
        </div>
        {/* Add <nav> items here */}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
