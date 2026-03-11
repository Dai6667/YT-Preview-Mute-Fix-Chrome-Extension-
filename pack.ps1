param(
  [string]$OutDir = "dist"
)

$ErrorActionPreference = "Stop"

$manifestPath = Join-Path $PSScriptRoot "manifest.json"
$manifest = Get-Content -Raw $manifestPath | ConvertFrom-Json
$name = ($manifest.name -replace "[^A-Za-z0-9._-]", "-")
$ver = $manifest.version

$zipDir = Join-Path $PSScriptRoot $OutDir
New-Item -ItemType Directory -Force -Path $zipDir | Out-Null

$zipName = ("{0}-{1}.zip" -f $name, $ver)
$zipPath = Join-Path $zipDir $zipName

if (Test-Path $zipPath) { Remove-Item -Force $zipPath }

$include = @(
  "manifest.json",
  "contentScript.js",
  "README.md",
  "LICENSE",
  "PRIVACY.md",
  "icons\\icon16.png",
  "icons\\icon48.png",
  "icons\\icon128.png"
)

$files = $include | ForEach-Object { Join-Path $PSScriptRoot $_ }
Compress-Archive -Path $files -DestinationPath $zipPath -CompressionLevel Optimal

Write-Host ("Built: {0}" -f $zipPath)
