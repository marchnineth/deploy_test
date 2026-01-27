@echo off
chcp 65001
title Git Lock 파일 삭제
color 0C

echo ====================================
echo Git Lock 파일 삭제
echo ====================================
echo.

cd /d "%~dp0"

if exist ".git\index.lock" (
    echo Lock 파일 발견: .git\index.lock
    echo.
    echo Lock 파일 삭제 중...
    del /f /q ".git\index.lock"
    if %errorlevel% equ 0 (
        echo ✅ Lock 파일 삭제 완료!
    ) else (
        echo [오류] Lock 파일 삭제 실패
        echo 파일이 사용 중일 수 있습니다.
        echo.
        echo 해결 방법:
        echo 1. 모든 Git 관련 프로그램 종료
        echo 2. GitHub Desktop, VS Code 등 종료
        echo 3. 이 스크립트를 관리자 권한으로 실행
        pause
        exit /b 1
    )
) else (
    echo Lock 파일이 없습니다.
    echo 정상 상태입니다.
)

echo.
echo ====================================
echo 완료
echo ====================================
echo.
echo 이제 git_push_improved.bat를 다시 실행하세요!
echo.
pause
