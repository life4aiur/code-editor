# Release & Publishing Process

This project uses [semantic-release](https://semantic-release.gitbook.io/) to automate versioning, changelog generation, and publishing to npm and GitHub.

## How Releases Work

- **Versioning**: The version is automatically determined based on commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification.
- **Changelog**: A changelog is generated and updated in `CHANGELOG.md`.
- **Publishing**: Publishing only occurs when `main` is merged into `develop`. The GitHub Actions workflow will:
  - Run semantic-release on the `develop` branch
  - Update the changelog and version in `main`
  - Merge the release changes from `main` back into `develop` so the changelog and version are synced
  - Publish a new release to npm (if needed)
  - Create a GitHub release

## Commit Message Format

All commits must follow Conventional Commits. Example formats:

- `feat: add new code editor component`
- `fix: resolve crash on file upload`
- `docs: update README`
- `chore: update dependencies`

## Setting Up NPM Publishing

1. Generate an npm access token (automation type recommended) from your npm account settings.
2. In your GitHub repo, go to **Settings > Secrets and variables > Actions**.
3. Add a new secret named `NPM_TOKEN` and paste your npm token value.

## Manual Release Trigger

Releases are triggered automatically by merging `main` into `develop` with valid commit messages. No manual steps are required. After a publish, the workflow will push the updated changelog and version from `main` back to `develop`.

## Troubleshooting

- If a release fails, check the GitHub Actions workflow logs for details.
- Ensure your commit messages follow the Conventional Commits format.
- Make sure `NPM_TOKEN` is set and valid in GitHub secrets.

## Useful Links

- [semantic-release documentation](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
