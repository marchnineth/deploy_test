@echo off
chcp 65001 >nul
echo ====================================
echo GitHub 업로드 자동화 스크립트
echo ====================================
echo.

cd /d "%~dp0"

echo [1/6] Git 설치 확인 중...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo [해결] https://git-scm.com/download/win 에서 Git을 설치하세요.
    pause
    exit /b 1
)
echo ✅ Git 설치 확인됨
echo.

echo [2/6] Git 저장소 초기화 중...
if not exist ".git" (
    git init
    echo ✅ Git 저장소 초기화 완료
) else (
    echo ✅ 이미 Git 저장소입니다
)
echo.

echo [3/6] GitHub 저장소 연결 중...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/marchnineth/deploy_test.git
if %errorlevel% neq 0 (
    echo [경고] 원격 저장소 연결 실패 (이미 연결되어 있을 수 있음)
) else (
    echo ✅ GitHub 저장소 연결 완료
)
echo.

echo [4/6] 파일 추가 중...
git add .
if %errorlevel% neq 0 (
    echo [오류] 파일 추가 실패
    pause
    exit /b 1
)
echo ✅ 파일 추가 완료
echo.

echo [5/6] 커밋 생성 중...
git commit -m "Initial commit - ÉLEVE 프로젝트" >nul 2>&1
if %errorlevel% neq 0 (
    echo [경고] 커밋 실패 (이미 커밋되어 있을 수 있음)
) else (
    echo ✅ 커밋 완료
)
echo.

echo [6/6] GitHub에 업로드 중...
echo.
echo ⚠️  인증이 필요할 수 있습니다.
echo    - 사용자명: marchnineth
echo    - 비밀번호: Personal Access Token 사용 필요
echo    (GitHub → Settings → Developer settings → Personal access tokens)
echo.
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [오류] 업로드 실패
    echo.
    echo 가능한 원인:
    echo 1. GitHub 인증 실패
    echo 2. Personal Access Token 필요
    echo 3. 저장소 권한 없음
    echo.
    echo 해결 방법:
    echo - GitHub Desktop 사용 (가장 쉬움)
    echo - Personal Access Token 생성 후 사용
    pause
    exit /b 1
)

echo.
echo ====================================
echo ✅ 업로드 완료!
echo ====================================
echo.
echo 저장소 주소: https://github.com/marchnineth/deploy_test
echo.
echo 다음 단계: Vercel에서 이 저장소를 연결하세요!
echo.
pause
