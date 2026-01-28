@echo off
chcp 65001 >nul
echo ========================================
echo 불필요한 파일 및 폴더 삭제
echo ========================================
echo.
echo 이 스크립트는 다음을 삭제합니다:
echo - app/ (Next.js용, 사용 안함)
echo - components/ (Next.js용, src/components/ 사용)
echo - lib/ (사용 안함)
echo - public/ (사용 안함)
echo - cleanup.bat, cleanup_unused_files.bat
echo.
pause

cd /d "%~dp0"

echo.
echo [1/5] Next.js 관련 폴더 삭제...
if exist "app" (
    echo app 폴더 삭제 중...
    rmdir /s /q "app" 2>nul
    if exist "app" (
        echo ⚠️  app 폴더 삭제 실패 (파일이 사용 중일 수 있음)
    ) else (
        echo ✅ app 폴더 삭제 완료
    )
)

if exist "components" (
    echo components 폴더 삭제 중...
    rmdir /s /q "components" 2>nul
    if exist "components" (
        echo ⚠️  components 폴더 삭제 실패
    ) else (
        echo ✅ components 폴더 삭제 완료
    )
)

if exist "lib" (
    echo lib 폴더 삭제 중...
    rmdir /s /q "lib" 2>nul
    if exist "lib" (
        echo ⚠️  lib 폴더 삭제 실패
    ) else (
        echo ✅ lib 폴더 삭제 완료
    )
)

echo.
echo [2/5] public 폴더 삭제...
if exist "public" (
    echo public 폴더 삭제 중...
    rmdir /s /q "public" 2>nul
    if exist "public" (
        echo ⚠️  public 폴더 삭제 실패
    ) else (
        echo ✅ public 폴더 삭제 완료
    )
)

echo.
echo [3/5] 불필요한 배치 파일 삭제...
if exist "cleanup.bat" del /q "cleanup.bat" 2>nul && echo ✅ cleanup.bat 삭제
if exist "cleanup_unused_files.bat" del /q "cleanup_unused_files.bat" 2>nul && echo ✅ cleanup_unused_files.bat 삭제

echo.
echo [4/5] 정리 완료!
echo.
echo [5/5] 남은 파일 목록:
dir /b
echo.
echo ========================================
echo 삭제 작업 완료
echo ========================================
pause
