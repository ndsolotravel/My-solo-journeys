# Post-Change Workflow Rules

After implementing and verifying any code or styling changes requested by the user:

1. **Commit and Push to Git**:
   - Stage modified files (`git add <files>`).
   - Create a clear, concise commit message following conventional commits format (e.g. `style(language): ...`, `fix(hero): ...`, `feat(...): ...`).
   - Push commits to the remote repository (`git push origin main` and `git push backup main`).

2. **Ensure Localhost Server is Running**:
   - Verify the development server is active on localhost (`npm run dev` running as a background daemon process).
   - Ensure local build and dev state reflect the latest code changes.
