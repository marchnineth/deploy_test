@echo off
chcp 65001
title GitHub 업로드 및 Push
color 0A

echo ====================================
echo GitHub 업로드 및 Push
echo ====================================
echo.

REM 현재 스크립트 위치로 이동
cd /d "%~dp0"
echo 현재 위치: %CD%
echo.

REM Git 설치 확인
echo [1/7] Git 설치 확인 중...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [오류] Git이 설치되어 있지 않거나 PATH에 등록되지 않았습니다.
    echo.
    echo 해결 방법:
    echo 1. https://git-scm.com/download/win 에서 Git 다운로드
    echo 2. 설치 시 "Git from the command line and also from 3rd-party software" 선택
    echo 3. 설치 후 컴퓨터 재시작
    echo.
    pause
    exit /b 1
)

git --version
echo ✅ Git 설치 확인됨
echo.

REM Git 저장소 초기화
echo [2/7] Git 저장소 초기화 확인 중...
if not exist ".git" (
    echo Git 저장소 초기화 중...
    git init
    if %errorlevel% neq 0 (
        echo [오류] Git 저장소 초기화 실패
        pause
        exit /b 1
    )
    echo ✅ Git 저장소 초기화 완료
) else (
    echo ✅ 이미 Git 저장소입니다
)
echo.

REM GitHub 저장소 연결
echo [3/7] GitHub 저장소 연결 중...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/marchnineth/deploy_test.git
if %errorlevel% neq 0 (
    git remote set-url origin https://github.com/marchnineth/deploy_test.git
    if %errorlevel% neq 0 (
        echo [경고] 원격 저장소 연결 실패
    )
)
git remote -v
echo ✅ GitHub 저장소 연결 완료
echo.

REM Lock 파일 확인 및 삭제
echo [4/7] Lock 파일 확인 중...
if exist ".git\index.lock" (
    echo Lock 파일 발견, 삭제 중...
    del /f /q ".git\index.lock" >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Lock 파일 삭제 완료
    ) else (
        echo [경고] Lock 파일 삭제 실패 (계속 진행)
    )
    echo.
)

REM 파일 추가
echo [4/7] 모든 파일 추가 중...
git add .
if %errorlevel% neq 0 (
    echo [오류] 파일 추가 실패
    echo.
    echo Lock 파일 문제일 수 있습니다.
    echo lock_파일_삭제.bat를 실행하거나 수동으로 삭제하세요:
    echo   del /f /q ".git\index.lock"
    pause
    exit /b 1
)
echo ✅ 파일 추가 완료
echo.

REM 커밋 생성
echo [5/7] 커밋 생성 중...
git commit -m "Initial commit - ÉLEVE 프로젝트 업로드"
if %errorlevel% neq 0 (
    echo [경고] 커밋 실패 또는 변경사항 없음
    echo 기존 커밋이 있는지 확인 중...
    git log --oneline -1
) else (
    echo ✅ 커밋 완료
)
echo.

REM 브랜치 변경
echo [6/7] 브랜치를 main으로 변경 중...
git branch -M main
echo ✅ 브랜치 변경 완료
echo.

REM GitHub에 업로드
echo [7/7] GitHub에 업로드 중...
echo.
echo ⚠️  인증이 필요할 수 있습니다.
echo    - 사용자명: marchnineth
echo    - 비밀번호: Personal Access Token 사용 필요
echo.
echo Personal Access Token 생성 방법:
echo 1. GitHub.com 접속
echo 2. Settings → Developer settings
echo 3. Personal access tokens → Tokens (classic)
echo 4. Generate new token (classic)
echo 5. repo 권한 체크
echo 6. 토큰 생성 후 복사해서 비밀번호 대신 입력
echo.
echo.

git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ====================================
    echo [오류] 업로드 실패
    echo ====================================
    echo.
    echo 가능한 원인:
    echo 1. GitHub 인증 실패
    echo 2. Personal Access Token 필요
    echo 3. 저장소 권한 없음
    echo 4. 네트워크 문제
    echo.
    echo 해결 방법:
    echo 1. GitHub Desktop 사용 (가장 쉬움)
    echo    - https://desktop.github.com 에서 다운로드
    echo.
    echo 2. Personal Access Token 생성 후 재시도
    echo.
    echo 3. 수동으로 명령어 실행:
    echo    git push -u origin main
    echo.
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
timeout /t 5
pause
