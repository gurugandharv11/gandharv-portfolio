# Agent Library

This folder is a local development agent library for common software workflows.

## Core Agents
- `Agentic Workflow Lead` -> `agentic-workflow-lead.agent.md`
- `Outpace Project Teacher` -> `project-teacher.agent.md`
- `Fullstack Implementer` -> `fullstack-implementer.agent.md`
- `Code Reviewer` -> `code-reviewer.agent.md`
- `Bug Investigator` -> `bug-investigator.agent.md`
- `Test Engineer` -> `test-engineer.agent.md`
- `Refactor Architect` -> `refactor-architect.agent.md`
- `Security Reviewer` -> `security-reviewer.agent.md`
- `Performance Optimizer` -> `performance-optimizer.agent.md`
- `API Designer` -> `api-designer.agent.md`
- `Docs Writer` -> `docs-writer.agent.md`
- `DevOps Assistant` -> `devops-assistant.agent.md`

## Quick Picks
- Complex multi-step automation: `Agentic Workflow Lead`
- Building features: `Fullstack Implementer`
- Finding bugs: `Bug Investigator`
- Reviewing PRs: `Code Reviewer`
- Writing tests: `Test Engineer`
- Hardening security: `Security Reviewer`
- Speeding up code: `Performance Optimizer`
- Designing APIs: `API Designer`
- Explaining codebase: `Outpace Project Teacher`

## Skills
- Bug-Hunter -> `/bug-hunter` -> `.github/skills/bug-hunter/SKILL.md`
- API-architect -> `/api-architect` -> `.github/skills/api-architect/SKILL.md`
- mastery-in-testing&debugging -> `/mastery-in-testing-debugging` -> `.github/skills/mastery-in-testing-debugging/SKILL.md`
- agent_lead -> `/agent-lead` -> `.github/skills/agent-lead/SKILL.md`

## Skill Naming Note
- Skill command names must use lowercase letters, numbers, and hyphens.
- Symbols like `&` and `_` are converted to valid command names.

## Notes
- Keep each agent single-purpose.
- Keep tool sets minimal to reduce noise.
- Add new agents by cloning the closest existing template and changing role, constraints, and output format.

## Model Strategy
- All agents use `GPT-5.3-Codex` because it is the currently configured and recognized local model ID.
- If you later enable more models, use exact IDs (not display names) in `model` fields.
- Keep one valid model per agent unless you have verified fallback IDs on this machine.

## Prompt Robustness Standard
- Every agent should include:
- Explicit ambiguity handling rule.
- Edge-case checklist relevant to the domain.
- Definition of done with validation criteria.
