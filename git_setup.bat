@echo off
chcp 65001 >nul
echo ========================================
echo dinopuzzle 프로젝트 GitHub Push 설정
echo ========================================
echo.

cd /d "%~dp0"
echo 현재 경로: %CD%
echo.

REM .git 폴더가 있으면 제거
if exist ".git" (
    echo .git 폴더를 삭제합니다...
    rmdir /s /q .git
)

REM git 초기화
echo Git 저장소를 초기화합니다...
git init

REM 기본 브랜치를 main으로 설정
git branch -M main

REM 모든 파일 추가
echo 파일을 스테이징합니다...
git add .

REM 첫 커밋
echo 첫 커밋을 생성합니다...
git commit -m "Initial commit: dinopuzzle project"

REM GitHub 저장소 연결
echo GitHub 저장소를 연결합니다...
git remote remove origin 2>nul
git remote add origin https://github.com/MARCHNINETH/deploy_test.git

REM 원격 저장소 확인
echo.
echo 원격 저장소 확인:
git remote -v

echo.
echo ========================================
echo 설정 완료!
echo.
echo 다음 명령으로 push하세요:
echo   git push -u origin main
echo ========================================
pause
