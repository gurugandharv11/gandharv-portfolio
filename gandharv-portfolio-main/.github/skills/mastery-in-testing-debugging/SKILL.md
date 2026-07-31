---
name: mastery-in-testing-debugging
description: 'End-to-end testing and debugging workflow for high-confidence delivery. Use for targeted tests, failure analysis, and robust verification across edge cases. Keywords: test strategy, regression prevention, root cause, reliability.'
argument-hint: 'Feature/module name, risk areas, and current failing behavior or test gaps'
user-invocable: true
disable-model-invocation: false
---

# Mastery In Testing Debugging

## Mission
Increase delivery confidence by coupling defect diagnosis with durable test coverage.

## Use This Skill When
- You need deep confidence before release
- Existing tests pass but production bugs still appear
- Failures are intermittent or hard to diagnose
- You want to convert bugs into lasting regression tests

## Non-Goals
- Do not optimize for coverage percentage alone.
- Do not keep flaky tests unlabelled.

## Required Inputs
- Target module or flow
- Known risks and user-critical scenarios
- Existing tests and current failures
- Runtime constraints (timeouts, external dependencies)

## Procedure
1. Build a risk map of critical paths and failure modes.
2. Audit current tests for missing behavior coverage.
3. Add high-value tests for key happy paths and edge paths.
4. Reproduce known failures and capture evidence.
5. Debug to root cause with minimal instrumentation.
6. Patch the defect at the causal layer.
7. Add or harden regression tests around the fix.
8. Validate performance and reliability implications.
9. Document confidence level and remaining risk.

## Quality Gates
- Gate 1: Critical paths are mapped to concrete tests.
- Gate 2: Root cause is evidenced for known failures.
- Gate 3: Regression tests prevent repeated failure class.
- Gate 4: Residual risks are explicit and prioritized.

## Edge Cases To Check
- Boundary values and invalid states
- Concurrency and timing-sensitive paths
- Dependency failures and fallback logic
- Auth and permission matrix behavior
- Data consistency across retries and partial writes

## Exit Criteria
- Risk matrix and coverage deltas are provided.
- Fix verification is evidence-based.
- Remaining reliability gaps are explicit.

## Output Format
1. Risk and coverage matrix
2. Tests added or improved
3. Root-cause findings
4. Fix and verification evidence
5. Residual risk and next hardening steps
