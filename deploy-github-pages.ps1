$ErrorActionPreference = "Stop"

$GitPath = "C:\Users\miyak\.gemini\antigravity\scratch\mingit\cmd\git.exe"
$GhPath = "C:\Users\miyak\.gemini\antigravity\scratch\gh\bin\gh.exe"
$AppDir = "C:\Users\miyak\.gemini\antigravity\scratch\nw-exam-app"

Set-Location $AppDir

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  GitHub Pages Automated Deployment" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Auth check
$AuthCheck = & $GhPath auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[STEP 1/3] Logging in to GitHub..." -ForegroundColor Yellow
    Write-Host "Browser will open. Enter one-time code and click 'Authorize github'." -ForegroundColor Gray
    Write-Host ""
    & $GhPath auth login -w -p https -h github.com
}

# Get username
$Username = (& $GhPath api user --jq .login).Trim()
if (-not $Username) {
    Write-Host "Failed to get GitHub username." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[STEP 2/3] Creating repository & pushing code (User: $Username)..." -ForegroundColor Yellow
$RepoName = "nw-exam-app"

$RepoExists = $false
try {
    & $GhPath repo view "$Username/$RepoName" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $RepoExists = $true }
} catch {
    $RepoExists = $false
}

if (-not $RepoExists) {
    Write-Host "Creating new public repository '$RepoName' on GitHub..." -ForegroundColor Cyan
    & $GhPath repo create $RepoName --public --source=. --remote=origin --push
} else {
    Write-Host "Updating existing repository '$RepoName'..." -ForegroundColor Cyan
    & $GitPath remote set-url origin "https://github.com/$Username/$RepoName.git" 2>$null
    if ($LASTEXITCODE -ne 0) {
        & $GitPath remote add origin "https://github.com/$Username/$RepoName.git"
    }
    & $GitPath push -u origin main --force
}

# 3. Enable GitHub Pages
Write-Host ""
Write-Host "[STEP 3/3] Enabling GitHub Pages..." -ForegroundColor Yellow
try {
    & $GhPath api --method POST -H "Accept: application/vnd.github+json" "repos/$Username/$RepoName/pages" -f "source[branch]=main" -f "source[path]=/" 2>&1 | Out-Null
} catch {
    # Ignored if already enabled
}

$PagesUrl = "https://${Username}.github.io/${RepoName}/"

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  GitHub Pages Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " [Public URL]: $PagesUrl" -ForegroundColor Cyan
Write-Host " (Note: Initial deployment may take 1-2 minutes to activate)" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

Start-Process $PagesUrl