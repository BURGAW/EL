# One-click publish for burgaw.github.io/EL/MIRASOL/
$ErrorActionPreference = 'Stop'
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path
Set-Location $PSScriptRoot

Write-Host "MIRASOL deploy — BURGAW/EL" -ForegroundColor Cyan
Write-Host ""

$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "GitHub login required (browser opens next)..." -ForegroundColor Yellow
  gh auth login --hostname github.com --git-protocol https --web
}

Write-Host ""
Write-Host "Pushing commits..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "Done. Site updates in 1-2 minutes:" -ForegroundColor Green
Write-Host "  https://burgaw.github.io/EL/MIRASOL/"
Write-Host ""
Read-Host "Press Enter to close"