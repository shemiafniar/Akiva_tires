# Run this script from the project root to initialize git (if needed) and commit all changes.
# Requires Git to be installed and available in PATH.

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git not found. Install Git (https://git-scm.com) and re-run this script."
  exit 1
}

if (-not (Test-Path .git)) {
  git init
  Write-Output "Initialized empty Git repository."
}

$gitEmail = git config --get user.email
$gitName = git config --get user.name
if (-not $gitEmail) {
  git config --local user.email "shemiafniar@gmail.com"
  Write-Output "Set local Git user.email to shemiafniar@gmail.com"
}
if (-not $gitName) {
  git config --local user.name "shemiafniar"
  Write-Output "Set local Git user.name to shemiafniar"
}

git add -A

$commitMessage = 'Redesign: premium landing — dark premium UI, improved SEO/OG, accessibility, optimized assets'
$commitStatus = git commit -m $commitMessage 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Error "Git commit failed."
  Write-Output $commitStatus
  exit $LASTEXITCODE
}

if ($args.Count -eq 0) {
  Write-Output 'No remote URL provided. Run this script with a repository URL, for example:'
  Write-Output 'powershell -ExecutionPolicy Bypass -File .\commit_changes.ps1 https://github.com/shemiafniar/Akiva_tires.git'
  exit 0
}

$remoteUrl = $args[0]

git remote remove origin 2>$null
git remote add origin $remoteUrl

git branch -M main

Write-Output 'Fetching remote main branch...'
git fetch origin main 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Error 'Git fetch failed. Please verify the remote URL and your network connection.'
  exit $LASTEXITCODE
}

$remoteMain = git rev-parse --verify origin/main 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Output 'Remote main branch exists. Rebasing local changes on top of origin/main...'
  git pull --rebase origin main --allow-unrelated-histories 2>&1
  if ($LASTEXITCODE -ne 0) {
    Write-Error 'Git pull --rebase failed. Resolve conflicts manually, then rerun the script.'
    exit $LASTEXITCODE
  }
}

$pushStatus = git push -u origin main 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Error "Git push failed."
  Write-Output $pushStatus
  exit $LASTEXITCODE
}

Write-Output 'Committed changes and pushed to origin/main.'