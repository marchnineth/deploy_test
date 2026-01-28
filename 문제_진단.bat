@echo off
chcp 65001
title Git 문제 진단
color 0E

echo ====================================
echo Git 설치 및 환경 진단
echo ====================================
echo.

echo [1] 현재 위치 확인
cd /d "%~dp0"
echo 현재 디렉토리: %CD%
echo.

echo [2] Git 설치 확인
where git
if %errorlevel% neq 0 (
    echo [오류] Git을 찾을 수 없습니다.
    echo Git이 설치되어 있지 않거나 PATH에 등록되지 않았습니다.
) else (
    echo ✅ Git 설치 확인됨
    git --version
)
echo.

echo [3] Git 저장소 확인
if exist ".git" (
    echo ✅ Git 저장소입니다
    echo.
    echo 현재 브랜치:
    git branch
    echo.
    echo 원격 저장소:
    git remote -v
    echo.
    echo 상태:
    git status --short
) else (
    echo [정보] Git 저장소가 아닙니다.
)
echo.

echo [4] 파일 목록 확인
echo 현재 디렉토리의 파일:
dir /b | findstr /v "node_modules .next"
echo.

echo [5] 네트워크 연결 확인
ping -n 1 github.com >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ GitHub 연결 가능
) else (
    echo [경고] GitHub 연결 실패
)
echo.

echo ====================================
echo 진단 완료
echo ====================================
echo.
pause
