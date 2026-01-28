# dinopuzzle 프로젝트를 GitHub에 push하기 위한 스크립트

$repoPath = $PSScriptRoot
Set-Location $repoPath

Write-Host "현재 경로: $repoPath" -ForegroundColor Green

# .git 폴더가 있으면 제거
if (Test-Path ".git") {
    Write-Host ".git 폴더를 삭제합니다..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .git
}

# git 초기화
Write-Host "Git 저장소를 초기화합니다..." -ForegroundColor Green
git init

# 모든 파일 추가
Write-Host "파일을 스테이징합니다..." -ForegroundColor Green
git add .

# 첫 커밋
Write-Host "첫 커밋을 생성합니다..." -ForegroundColor Green
git commit -m "Initial commit: dinopuzzle project"

# GitHub 저장소 연결 (사용자명: MARCHNINETH)
Write-Host "GitHub 저장소를 연결합니다..." -ForegroundColor Green
git remote add origin https://github.com/MARCHNINETH/deploy_test.git

# 원격 저장소 확인
Write-Host "원격 저장소 확인:" -ForegroundColor Green
git remote -v

Write-Host "`n다음 명령으로 push하세요:" -ForegroundColor Cyan
Write-Host "git push -u origin main" -ForegroundColor Yellow
Write-Host "또는" -ForegroundColor Cyan
Write-Host "git push -u origin master" -ForegroundColor Yellow
