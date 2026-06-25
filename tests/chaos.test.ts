import { describe, it, expect } from 'vitest'
import { assertNever } from '@/core/types'

// ============================================================
// CivicGrid Chaos Agent
// Replace the state machine below with this system's actual states.
// Minimum 1,000 cycles. Zero violations = PASS.
// ============================================================

// ⚠️ FILL IN: Replace with this system's discriminated union
type ExampleStatus = 'DRAFT' | 'ACTIVE' | 'RESOLVED' | 'VOID'

interface ExampleState {
  status: ExampleStatus
  count: number
}

function transition(state: ExampleState): ExampleState {
  // Simulate valid state transitions only
  switch (state.status) {
    case 'DRAFT':
      return Math.random() > 0.5
        ? { status: 'ACTIVE', count: state.count + 1 }
        : state
    case 'ACTIVE':
      if (Math.random() > 0.8) return { status: 'RESOLVED', count: state.count + 1 }
      if (Math.random() > 0.95) return { status: 'VOID', count: state.count + 1 }
      return { status: 'ACTIVE', count: state.count + 1 }
    case 'RESOLVED':
      return state // terminal
    case 'VOID':
      return state // terminal
    default:
      return assertNever(state.status)
  }
}

const VALID_STATUSES: ExampleStatus[] = ['DRAFT', 'ACTIVE', 'RESOLVED', 'VOID']
const CYCLES = 1000

describe('Chaos Agent', () => {
  it(`runs ${CYCLES} state transitions with zero violations`, () => {
    let violations = 0

    for (let i = 0; i < CYCLES; i++) {
      let state: ExampleState = { status: 'DRAFT', count: 0 }

      // Run up to 20 transitions per cycle
      for (let step = 0; step < 20; step++) {
        state = transition(state)

        if (!VALID_STATUSES.includes(state.status)) {
          violations++
          console.error(`Violation at cycle ${i}, step ${step}: invalid status "${state.status}"`)
        }

        if (state.count < 0) {
          violations++
          console.error(`Violation at cycle ${i}, step ${step}: negative count`)
        }

        // Terminal states — stop transitioning
        if (state.status === 'RESOLVED' || state.status === 'VOID') break
      }
    }

    console.log(`Chaos complete: ${CYCLES} cycles | ${violations} violations`)
    expect(violations).toBe(0)
  })
})
