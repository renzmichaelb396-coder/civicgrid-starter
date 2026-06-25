// ============================================================
// CivicGrid — Core Types
// ALL discriminated unions live here. Never split across files.
// Every switch on a union must use assertNever as default.
// ============================================================

// ⚠️ FILL IN: Replace with this system's actual states before writing feature code.

// --- Exhaustiveness check ---
export function assertNever(x: never): never {
  throw new Error('Unhandled discriminated union member: ' + JSON.stringify(x))
}

// --- User roles (customize per system) ---
export type UserRole =
  | 'ADMIN'
  | 'MANAGER'
  | 'VIEWER'

// --- Async state wrapper (use for all data fetching) ---
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

// --- Example: replace with this system's domain states ---
// export type IncidentStatus =
//   | 'REPORTED'
//   | 'ACTIVE'
//   | 'RESOLVED'
//   | 'VOID'  // terminal — all switches must handle this

// export type IncidentState =
//   | { status: 'REPORTED'; createdAt: string }
//   | { status: 'ACTIVE'; assignedTo: string }
//   | { status: 'RESOLVED'; resolvedAt: string }
//   | { status: 'VOID'; reason: string }

// Usage pattern — copy this wherever you switch on a union:
// switch (state.status) {
//   case 'REPORTED': return ...
//   case 'ACTIVE': return ...
//   case 'RESOLVED': return ...
//   case 'VOID': return ...
//   default: return assertNever(state)
// }
