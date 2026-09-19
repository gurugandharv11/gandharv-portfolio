---
name: bug-hunter
description: 'Investigate and fix software defects with reproducible evidence and minimal-risk patches. Use for crashes, regressions, flaky behavior, and logic faults in frontend or backend. Keywords: debug, root cause, repro, regression.'
argument-hint: 'Observed behavior, expected behavior, reproduction steps, and recent changes'
user-invocable: true
disable-model-invocation: false
---

# Bug Hunter

## Mission
Find the true fault, apply the smallest durable fix, and prove it will not regress.

## Use This Skill When
- A feature is broken and the failure reason is unclear
- A regression appeared after recent changes
- The same issue is hard to reproduce consistently
- You need a minimal fix with regression protection

## Non-Goals
- Do not perform broad refactors while debugging.
- Do not mark root cause as confirmed without evidence.

## Required Inputs
- Expected behavior
- Actual behavior
- Reproduction steps and environment details
- Logs, stack traces, or failing test output if available

## Procedure
1. Define failure contract: expected vs actual, scope, impact.
2. Reproduce minimally; if not reproducible, list variability factors and rank likely causes.
3. Trace code path and state transitions around the fault boundary.
4. Build 1-3 hypotheses and eliminate alternatives using direct evidence.
5. Implement smallest durable fix at the causal layer.
6. Add or update regression test for the failed behavior.
7. Re-run targeted validations and nearby critical flows.

## Edge Cases To Check
- Null, empty, malformed, and extreme input values
- Race conditions and async ordering
- Permission and role-dependent paths
- Retry/timeout behavior and partial failures
- Environment-specific config drift

## Exit Criteria
- Reproduction is documented or uncertainty is explicitly bounded.
- Root cause is evidenced and fix is applied/proposed.
- Validation evidence is provided for fix and adjacent flow safety.

## Output Format
1. Reproduction summary
2. Confirmed root cause
3. Applied or proposed fix
4. Validation evidence
5. Regression-prevention checklist
