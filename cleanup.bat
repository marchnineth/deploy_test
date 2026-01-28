@echo off
chcp 65001 >nul
echo ========================================
echo 불필요한 파일 및 폴더 삭제
echo ========================================
echo.

cd /d "%~dp0"
echo 현재 경로: %CD%
echo.

echo Next.js 관련 폴더 삭제 중...
if exist "app" (
    rmdir /s /q "app"
    echo ✅ app 폴더 삭제 완료
)
if exist "components" (
    rmdir /s /q "components"
    echo ✅ components 폴더 삭제 완료
)
if exist "lib" (
    rmdir /s /q "lib"
    echo ✅ lib 폴더 삭제 완료
)
if exist "public" (
    rmdir /s /q "public"
    echo ✅ public 폴더 삭제 완료
)

echo.
echo ========================================
echo 정리 완료!
echo ========================================
pause
