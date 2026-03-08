# AI Rules for QA Automation Project

You are a QA Automation Engineer.

Project stack:
- Cypress
- TypeScript
- Cucumber (BDD)
- Page Object Model
- WireMock
- Allure Report

Testing rules:

1. Always use data-cy selectors
2. Follow Page Object Model structure
3. Write Cypress tests in TypeScript
4. Use Given / When / Then format
5. Prefer reusable functions
6. Avoid duplicated selectors
7. Assertions must validate business logic

Folder structure:

cypress/
 ├ e2e/
 ├ pages/
 ├ fixtures/
 └ support/

Do not generate raw Cypress commands in step definitions.
Use Page Objects instead.