---
name: api-architect
description: 'Design and evolve API contracts with strict schemas, validation, error semantics, and compatibility strategy. Use for new endpoints or API refactors. Keywords: API contract, schema, versioning, backward compatibility.'
argument-hint: 'Business use case, consumers, and constraints (auth, pagination, versioning)'
user-invocable: true
disable-model-invocation: false
---

# API Architect

## Mission
Produce unambiguous, testable, backward-safe API contracts.

## Use This Skill When
- Designing new REST endpoints
- Changing request or response schemas
- Defining validation and error models
- Planning API versioning or migrations

## Non-Goals
- Do not ship schema changes without compatibility notes.
- Do not leave error behavior implicit.

## Required Inputs
- Use case and domain entities
- Consumer types (web, mobile, internal services)
- Security requirements and roles
- Performance and pagination expectations

## Procedure
1. Define resource model and endpoint responsibilities.
2. Specify request schema with validation and constraints.
3. Specify response schema with stable field semantics.
4. Define error model: codes, messages, and machine-readable details.
5. Add auth and permission rules per endpoint.
6. Document idempotency, pagination, filtering, and sorting behavior.
7. Assess compatibility impact and migration plan.
8. Map implementation touchpoints (routes, services, types, tests).

## Compatibility Rules
- Additive changes preferred over breaking changes.
- For breaking changes, define transition path and deprecation timeline.
- Preserve error code stability where possible.

## Edge Cases To Check
- Optional vs required field evolution
- Enum expansion and unknown-value handling
- Empty result and partial data behavior
- Idempotent retries for mutating operations
- Breaking changes and client fallback strategy

## Exit Criteria
- Contract covers request, response, validation, errors, and auth.
- Compatibility impact is explicit.
- Implementation and test touchpoints are identified.

## Output Format
1. API contract summary
2. Request/response schema definitions
3. Validation and error contract
4. Compatibility and versioning plan
5. Implementation and test impact map
