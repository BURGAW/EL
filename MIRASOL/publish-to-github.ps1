# Sync MIRASOL site files and push to GitHub Pages (burgaw.github.io/EL/MIRASOL/)
$ErrorActionPreference = 'Stop'
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

$src = 'C:\Users\gregs\MIRASOL'
$repo = 'C:\Users\gregs\EL'
$dst = Join-Path $repo 'MIRASOL'

if (-not (Test-Path $src)) {
  Write-Error "Source not found: $src"
}
if (-not (Test-Path $repo)) {
  Write-Error "Deploy repo not found: $repo"
}

Write-Host 'MIRASOL publish - BURGAW/EL' -ForegroundColor Cyan
Write-Host 'Copying site files...' -ForegroundColor Gray

robocopy $src $dst /MIR /XD .git /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit code $LASTEXITCODE" }

$rootRedirects = Join-Path $src 'github-pages-root'
if (Test-Path $rootRedirects) {
  Write-Host 'Copying EL root redirects...' -ForegroundColor Gray
  robocopy $rootRedirects $repo index.html menu.html .nojekyll /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy root redirects failed with exit code $LASTEXITCODE" }
}

Set-Location $repo
$status = git status --porcelain MIRASOL index.html menu.html
if ($status) {
  git add MIRASOL
  if (Test-Path (Join-Path $repo 'index.html')) { git add index.html }
  if (Test-Path (Join-Path $repo 'menu.html')) { git add menu.html }
  if (Test-Path (Join-Path $repo '.nojekyll')) { git add .nojekyll }
  git commit -m 'Update MIRASOL site'
  Write-Host 'Committed MIRASOL updates.' -ForegroundColor Green
} else {
  Write-Host 'No MIRASOL file changes to commit.' -ForegroundColor Gray
}

Write-Host 'Pushing to GitHub...' -ForegroundColor Cyan
git push origin main

Write-Host ''
Write-Host 'Done. Live in 1-2 minutes:' -ForegroundColor Green
Write-Host '  https://burgaw.github.io/EL/MIRASOL/'
Write-Host ''