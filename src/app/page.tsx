import { redirect } from 'next/navigation'

// Root page redirects to login.
// After auth, login redirects to /dashboard.
export default function Home() {
  redirect('/login')
}
