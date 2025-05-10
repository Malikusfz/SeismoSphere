# Rules and Instructions for GitHub Copilot

This file provides guidelines for GitHub Copilot to follow when generating code suggestions for this project.

## Coding Style

- **Indentation:** Use 4 spaces for indentation.
- **Braces:** Always use curly braces for conditionals and loops, even for single-line statements.
- **Naming Conventions:** Use camelCase for variable and function names, PascalCase for class names.

## Security

- **SQL Injection:** Always use parameterized queries or ORM methods to prevent SQL injection.
- **Input Validation:** Ensure all user input is properly sanitized and validated.

## Libraries

- **Standard Library:** Prefer using the standard library over third-party libraries when possible.
- **Preferred Libraries:** [Specify any preferred libraries for specific tasks, e.g., use `requests` for HTTP requests.]

## Documentation

- **Docstrings:** Include docstrings for all functions and classes.
- **Variable Names:** Use descriptive and meaningful variable names.
