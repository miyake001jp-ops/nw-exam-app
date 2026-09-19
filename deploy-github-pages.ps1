# GitHub Pages 自動デプロイスクリプト
$ErrorActionPreference = "Stop"

$GitPath = "C:\Users\miyak\.gemini\antigravity\scratch\mingit\cmd\git.exe"
$GhPath = "C:\Users\miyak\.gemini\antigravity\scratch\gh\bin\gh.exe"
$AppDir = "C:\Users\miyak\.gemini\antigravity\scratch\nw-exam-app"

Set-Location $AppDir

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  GitHub Pages 自動セットアップ & デプロイ" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. ログイン確認
$AuthCheck = & $GhPath auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[手順 1/3] GitHub にログインします..." -ForegroundColor Yellow
    Write-Host "ブラウザが自動的に開きます。画面の指示に従ってログイン・認証（Authorize）を完了してください。`n" -ForegroundColor Gray
    & $GhPath auth login -w -p https -h github.com
}

# ユーザー名取得
$Username = (& $GhPath api user --jq .login).Trim()
if (-not $Username) {
    Write-Host "GitHub ユーザー情報の取得に失敗しました。" -ForegroundColor Red
    exit 1
}

Write-Host "`n[手順 2/3] リポジトリを作成してプッシュしています (User: $Username)..." -ForegroundColor Yellow
$RepoName = "nw-exam-app"

# リポジトリ存在確認
$RepoExists = $false
try {
    & $GhPath repo view "$Username/$RepoName" 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) { $RepoExists = $true }
} catch {
    $RepoExists = $false
}

if (-not $RepoExists) {
    Write-Host "GitHub上に新規パブリックリポジトリ '$RepoName' を作成します..." -ForegroundColor Cyan
    & $GhPath repo create $RepoName --public --source=. --remote=origin --push
} else {
    Write-Host "既存のリポジトリ '$RepoName' を更新します..." -ForegroundColor Cyan
    & $GitPath remote set-url origin "https://github.com/$Username/$RepoName.git" 2>$null
    if ($LASTEXITCODE -ne 0) {
        & $GitPath remote add origin "https://github.com/$Username/$RepoName.git"
    }
    & $GitPath push -u origin main --force
}

# 3. GitHub Pages 設定
Write-Host "`n[手順 3/3] GitHub Pages を有効化しています..." -ForegroundColor Yellow
try {
    # Pages API を呼び出して main ブランチからの配信を有効化
    & $GhPath api --method POST -H "Accept: application/vnd.github+json" "repos/$Username/$RepoName/pages" -f "source[branch]=main" -f "source[path]=/" 2>&1 | Out-Null
} catch {
    # すでに有効化されている場合などはスキップ
}

$PagesUrl = "https://${Username}.github.io/${RepoName}/"

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  GitHub Pages の設定が完了しました！" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host " [スマホ・PC共通URL]: $PagesUrl" -ForegroundColor Cyan
Write-Host "※ 初回反映まで1〜2分程度かかる場合があります。" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green

# ブラウザで開く
Start-Process $PagesUrl
