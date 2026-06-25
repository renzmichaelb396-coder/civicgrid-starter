import { createBrowserClient } from '@supabase/ssr'

// Web Locks deadlock fix — required on all CivicGrid systems.
// Without this, auth state can deadlock on concurrent requests.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<void>) => fn(),
      },
    }
  )
}
