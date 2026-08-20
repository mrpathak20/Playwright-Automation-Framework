# AI Safety Rules

The AI must follow these rules when working with the framework.

## Read First

Before modifying code:

- Inspect the relevant files.
- Understand existing architecture.
- Identify reusable components.

## Do Not Modify Automatically

The AI must not automatically modify:

- Production environment files
- Credentials
- Secrets
- CI/CD configuration
- Authentication tokens
- Existing framework utilities
- Playwright configuration

unless explicitly instructed.

## Code Generation

Generated code must:

- Follow TypeScript conventions.
- Follow existing architecture.
- Reuse existing utilities.
- Reuse fixtures.
- Reuse Page Objects.
- Avoid duplication.

## Human Approval

AI-generated modifications should be reviewed before being committed.

## Security

Never expose:

- Passwords
- API keys
- Tokens
- Environment secrets
- Authentication state