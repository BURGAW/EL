# Wire Clover Hosted iFrame keys into MIRASOL (public key -> site; private -> server/.env only).
param(
  [string]$PublicKey,
  [string]$PrivateKey,
  [string]$PlatformToken,
  [string]$DeviceId,
  [string]$BackendUrl
)

$ErrorActionPreference = 'Stop'

$root = Split-Path $PSScriptRoot -Parent
$siteConfig = Join-Path $root 'js\site-config.js'
$envFile = Join-Path $root 'server\.env'
$envExample = Join-Path $root 'server\.env.example'

Write-Host ''
Write-Host 'MIRASOL - Clover iFrame setup' -ForegroundColor Cyan
Write-Host 'Public key  -> js/site-config.js (OK on GitHub Pages)' -ForegroundColor Gray
Write-Host 'Private key -> server/.env only (never in the website repo)' -ForegroundColor Gray
Write-Host ''

if (-not $PublicKey) {
  $PublicKey = Read-Host 'Paste PUBLIC key from Clover (Hosted iFrame + API/SDK)'
}
$PublicKey = $PublicKey.Trim()
if (-not $PublicKey) {
  Write-Error 'Public key is required.'
}

if (-not $PrivateKey) {
  $securePrivate = Read-Host 'Paste PRIVATE key (server only)' -AsSecureString
  $PrivateKey = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePrivate)
  )
}
$PrivateKey = $PrivateKey.Trim()
if (-not $PrivateKey) {
  Write-Error 'Private key is required for server/.env.'
}

if (-not $PlatformToken) {
  $PlatformToken = Read-Host 'Platform API token (orders + kitchen print) - Enter to skip'
}
$PlatformToken = $PlatformToken.Trim()

if (-not $DeviceId) {
  $DeviceId = Read-Host 'Kitchen device UUID (Station Duo) - Enter to skip'
}
$DeviceId = $DeviceId.Trim()

if (-not $BackendUrl) {
  $BackendUrl = Read-Host 'Backend URL after deploy (e.g. https://mirasol-clover.onrender.com) - Enter to skip'
}
$BackendUrl = $BackendUrl.Trim().TrimEnd('/')

# --- Update site-config.js ---
$config = Get-Content $siteConfig -Raw
$config = $config -replace "publicKey:\s*'[^']*'", "publicKey: '$PublicKey'"
$config = $config -replace 'enabled:\s*false,\s*\r?\n\s*mode:\s*''iframe''', "enabled: true,`n        mode: 'iframe'"

if ($DeviceId) {
  $config = $config -replace "deviceId:\s*'[^']*'", "deviceId: '$DeviceId'"
}

if ($BackendUrl) {
  $config = $config -replace "baseUrl:\s*'[^']*'", "baseUrl: '$BackendUrl'"
  $config = $config -replace "apiBaseUrl:\s*'[^']*'", "apiBaseUrl: '$BackendUrl'"
}

Set-Content -Path $siteConfig -Value $config -Encoding utf8
Write-Host 'Updated js/site-config.js' -ForegroundColor Green

# --- Write server/.env ---
if (-not (Test-Path $envExample)) {
  Write-Error "Missing $envExample"
}

$envContent = Get-Content $envExample -Raw
$envContent = $envContent -replace 'CLOVER_ECOMM_PRIVATE_TOKEN=.*', "CLOVER_ECOMM_PRIVATE_TOKEN=$PrivateKey"
if ($PlatformToken) {
  $envContent = $envContent -replace 'CLOVER_PLATFORM_TOKEN=.*', "CLOVER_PLATFORM_TOKEN=$PlatformToken"
}
if ($DeviceId) {
  $envContent = $envContent -replace 'CLOVER_KITCHEN_DEVICE_ID=.*', "CLOVER_KITCHEN_DEVICE_ID=$DeviceId"
}

Set-Content -Path $envFile -Value $envContent -Encoding utf8
Write-Host 'Wrote server/.env (git-ignored)' -ForegroundColor Green

Write-Host ''
Write-Host 'Next steps:' -ForegroundColor Cyan
Write-Host '  1. Deploy server: push to GitHub, connect Render.com with server/render.yaml'
Write-Host '  2. Copy the same secrets into Render env vars'
Write-Host '  3. Set backend URL in site-config if you skipped it above'
Write-Host '  4. Publish site:  .\publish-to-github.ps1'
Write-Host ''