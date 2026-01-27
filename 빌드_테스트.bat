@echo off
chcp 65001 >nul
echo ====================================
echo 빌드 테스트 시작
echo ====================================
echo.

cd /d "%~dp0"

echo 1. 의존성 설치 중...
call npm install
if %errorlevel% neq 0 (
    echo [오류] npm install 실패
    pause
    exit /b 1
)

echo.
echo 2. 빌드 테스트 중...
call npm run build
if %errorlevel% neq 0 (
    echo [오류] 빌드 실패
    pause
    exit /b 1
)

echo.
echo ====================================
echo ✅ 빌드 성공! 배포 준비 완료!
echo ====================================
echo.
pause
