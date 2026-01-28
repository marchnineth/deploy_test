@echo off
chcp 65001 >nul
echo ========================================
echo 불필요한 파일 및 폴더 삭제
echo ========================================
echo.

cd /d "%~dp0"
echo 현재 경로: %CD%
echo.

echo [1/6] Next.js 관련 폴더 삭제 중...
if exist "app" (
    echo app 폴더 삭제 중...
    rmdir /s /q "app"
    echo ✅ app 폴더 삭제 완료
) else (
    echo app 폴더 없음
)

if exist "components" (
    echo components 폴더 삭제 중...
    rmdir /s /q "components"
    echo ✅ components 폴더 삭제 완료
) else (
    echo components 폴더 없음
)

if exist "lib" (
    echo lib 폴더 삭제 중...
    rmdir /s /q "lib"
    echo ✅ lib 폴더 삭제 완료
) else (
    echo lib 폴더 없음
)

echo.
echo [2/6] public 폴더 삭제 중...
if exist "public" (
    echo public 폴더 삭제 중...
    rmdir /s /q "public"
    echo ✅ public 폴더 삭제 완료
) else (
    echo public 폴더 없음
)

echo.
echo [3/6] 불필요한 배치 파일 삭제 중...
if exist "cleanup.bat" (
    del /q "cleanup.bat"
    echo ✅ cleanup.bat 삭제 완료
)

echo.
echo [4/6] 정리 완료!
echo.
echo 남은 파일들:
dir /b
echo.
pause
