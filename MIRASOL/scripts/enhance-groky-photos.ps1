# Batch-enhance groky-import food photos (ImageMagick)
$ErrorActionPreference = 'Stop'

$srcDir = 'C:\Users\gregs\MIRASOL\assets\images\groky-import\jpg'
$backupDir = 'C:\Users\gregs\MIRASOL\assets\images\groky-import\jpg-original'
$menuGroky = 'C:\Users\gregs\MIRASOL\assets\images\menu\groky'

if (-not (Test-Path $srcDir)) { throw "Source not found: $srcDir" }
New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
New-Item -ItemType Directory -Force -Path $menuGroky | Out-Null

function Get-Slug([string]$name) {
  $base = [System.IO.Path]::GetFileNameWithoutExtension($name) -replace '\s*\(\d+\)\s*$', ''
  return ($base.ToLower() -replace '[^a-z0-9]+', '-').Trim('-')
}

$used = @{}
$files = Get-ChildItem $srcDir -Filter *.jpg | Where-Object { $_.Name -notlike '_test*' }
$total = $files.Count
$i = 0

Write-Host "Enhancing $total photos..." -ForegroundColor Cyan

foreach ($file in $files) {
  $i++
  $backupPath = Join-Path $backupDir $file.Name
  if (-not (Test-Path $backupPath)) {
    Copy-Item $file.FullName $backupPath -Force
  }

  $tmp = Join-Path $srcDir ("_enhance-" + $file.Name)
  & magick $file.FullName `
    -colorspace sRGB `
    -auto-level `
    -modulate 103,112,100.4 `
    -brightness-contrast 3x6 `
    -sigmoidal-contrast 2.5,45% `
    -unsharp 0x0.9+0.9+0.015 `
    -strip `
    -quality 90 `
    $tmp

  if ($LASTEXITCODE -ne 0) { throw "magick failed on $($file.Name)" }
  Move-Item $tmp $file.FullName -Force

  $slug = Get-Slug $file.Name
  if ($used.ContainsKey($slug)) {
    $used[$slug]++
    $slug = "$slug-$($used[$slug])"
  } else {
    $used[$slug] = 1
  }
  Copy-Item $file.FullName (Join-Path $menuGroky "$slug.jpg") -Force

  if ($i % 20 -eq 0 -or $i -eq $total) {
    Write-Host "  $i / $total"
  }
}

Write-Host "Done. Originals backed up to jpg-original/" -ForegroundColor Green
Write-Host "Enhanced copies synced to assets/images/menu/groky/" -ForegroundColor Green