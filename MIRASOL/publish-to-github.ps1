# Push MIRASOL to GitHub and enable Pages.
# Run after: gh auth login
$ErrorActionPreference = 'Stop'
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path
Set-Location $PSScriptRoot

$repoName = 'EL'
$status = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "First run: gh auth login"
  gh auth login
}

$user = gh api user -q .login
$exists = gh repo view "$user/$repoName" 2>$null
if (-not $exists) {
  gh repo create $repoName --public --source . --remote origin --push
} else {
  if (-not (git remote get-url origin 2>$null)) {
    git remote add origin "https://github.com/$user/$repoName.git"
  }
  git push -u origin main
}

gh api -X POST "repos/$user/$repoName/pages" `
  -f "build_type=legacy" `
  -f "source[branch]=main" `
  -f "source[path]=/" 2>$null

Write-Host ""
Write-Host "Done. Enable Pages if needed:"
Write-Host "  https://github.com/$(gh api user -q .login)/$repoName/settings/pages"
Write-Host "  Branch: main, folder: / (root)"
Write-Host ""
Write-Host "Site URL (after 1-2 min):"
Write-Host "  https://$(gh api user -q .login).github.io/$repoName/"