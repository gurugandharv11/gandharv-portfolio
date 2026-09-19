---
name: agent-lead
description: 'Orchestrate complex multi-step development work by selecting the right specialist flow, sequencing tasks, and enforcing quality gates. Keywords: orchestration, workflow, delegation, quality gate, agentic execution.'
argument-hint: 'Goal, constraints, deadline, and quality bar'
user-invocable: true
disable-model-invocation: false
---

# Agent Lead

## Mission
Plan, route, and validate multi-agent work from request to verified delivery.

## Use This Skill When
- Work spans implementation, testing, review, and docs
- Requirements are broad or ambiguous
- You need progress checkpoints and clear acceptance criteria
- You want predictable delivery with low regression risk

## Non-Goals
- Do not execute specialist work directly when a specialist flow exists.
- Do not close workflow without explicit validation evidence.

## Required Inputs
- Primary objective and scope boundaries
- Non-functional constraints (performance, security, timeline)
- Definition of done and acceptance checks
- Known blockers and dependencies

## Procedure
1. Clarify objective, constraints, and acceptance criteria.
2. Break work into phases with explicit deliverables.
3. Route each phase to the right specialist pattern:
   - Build/change: fullstack workflow
   - Bug path: bug-hunter workflow
   - Contract changes: api-architect workflow
   - Confidence hardening: mastery-in-testing-debugging workflow
4. Run phase-by-phase validation gates.
5. Reconcile conflicts across outputs and finalize cohesive result.
6. Produce completion report with risks and follow-up actions.

## Routing Rules
- One owner per phase.
- Parallelize only independent phases.
- Block merge/finalization if critical gate fails.
- Re-route blocked phases with explicit reason and fallback owner.

## Quality Gates
- Scope gate: all requested requirements mapped to tasks
- Correctness gate: behavior validated with evidence
- Safety gate: edge cases and regressions addressed
- Readiness gate: residual risks documented and accepted

## Exit Criteria
- All requested scope mapped to completed or explicitly deferred tasks.
- Quality gates are passed or formally waived with rationale.
- Final report includes outcomes, risks, and next actions.

## Output Format
1. Phase plan
2. Execution log
3. Validation gate results
4. Final delivery summary
5. Remaining risks and next actions
