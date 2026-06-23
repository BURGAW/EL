# Sync MIRASOL site files and push to GitHub Pages (burgaw.github.io/EL/MIRASOL/)
$ErrorActionPreference = 'Stop'
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

$src = 'C:\Users\gregs\MIRASOL'
$repo = $PSScriptRoot
$dst = Join-Path $repo 'MIRASOL'

if (-not (Test-Path $src)) {
  Write-Error "Source not found: $src"
}

robocopy $src $dst /MIR /XD .git /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with exit code $LASTEXITCODE" }

Set-Location $repo
$status = git status --porcelain MIRASOL
if (-not $status) {
  Write-Host "No MIRASOL changes to deploy."
} else {
  git add MIRASOL
  git commit -m "Update MIRASOL site"
  Write-Host "Committed MIRASOL updates."
}

$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "GitHub login required. Run: gh auth login"
  Write-Host "Then run this script again."
  gh auth login
}

git push origin main
Write-Host ""
Write-Host "Deployed. Live in 1-2 minutes:"
Write-Host "  https://burgaw.github.io/EL/MIRASOL/"