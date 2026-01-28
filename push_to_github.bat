@echo off
chcp 65001 >nul
echo ========================================
echo dinopuzzle 프로젝트 GitHub Push
echo ========================================
echo.

cd /d "%~dp0"
echo 현재 경로: %CD%
echo.

REM git 저장소 확인 및 초기화
if not exist ".git" (
    echo [1/5] Git 저장소를 초기화합니다...
    git init
    git branch -M main
    echo ✅ Git 저장소 초기화 완료
    echo.
) else (
    echo ✅ 이미 Git 저장소입니다
    echo.
)

REM 원격 저장소 설정
echo [2/5] GitHub 저장소를 연결합니다...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/marchnineth/deploy_test.git
if %errorlevel% neq 0 (
    git remote set-url origin https://github.com/marchnineth/deploy_test.git
)
echo ✅ 원격 저장소 연결 완료
echo.
echo 원격 저장소 확인:
git remote -v
echo.

REM 모든 파일 추가
echo [3/5] 변경사항을 스테이징합니다...
git add .
echo ✅ 파일 추가 완료
echo.

REM 커밋
echo [4/5] 커밋을 생성합니다...
echo.
echo 커밋 메시지를 입력하세요 (Enter 시 기본 메시지 사용):
set /p commit_msg="커밋 메시지: "
if "%commit_msg%"=="" set commit_msg=Update dinopuzzle project

git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  커밋할 변경사항이 없거나 이미 커밋되었습니다.
    echo.
) else (
    echo ✅ 커밋 완료
    echo.
)

REM push
echo [5/5] GitHub에 push합니다...
echo.
echo ⚠️  인증이 필요할 수 있습니다.
echo    - 사용자명: marchnineth
echo    - 비밀번호: Personal Access Token 사용 필요
echo.

git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo Push 실패. 원격 변경사항을 확인합니다...
    echo ========================================
    echo.
    
    git fetch origin main >nul 2>&1
    
    echo 원격 저장소에 이미 내용이 있습니다.
    echo 병합을 시도합니다...
    echo.
    
    git pull origin main --allow-unrelated-histories --no-edit
    
    if %errorlevel% neq 0 (
        echo.
        echo 병합 중 충돌이 발생했습니다.
        echo.
        echo 옵션을 선택하세요:
        echo [1] 강제 push (원격 내용 덮어쓰기)
        echo [2] 취소
        echo.
        set /p choice="선택 (1 또는 2): "
        
        if "%choice%"=="1" (
            echo.
            echo 강제 push를 실행합니다...
            git push -u origin main --force
            if %errorlevel% equ 0 (
                echo.
                echo ✅ 강제 push 완료!
            ) else (
                echo.
                echo ❌ 강제 push 실패
            )
        ) else (
            echo.
            echo Push가 취소되었습니다.
            echo 수동으로 충돌을 해결한 후 다시 시도해주세요.
        )
    ) else (
        echo.
        echo ✅ 병합 완료! 다시 push합니다...
        git push -u origin main
        if %errorlevel% equ 0 (
            echo.
            echo ✅ Push 완료!
        )
    )
) else (
    echo.
    echo ✅ Push 성공!
)

echo.
echo ========================================
echo 완료!
echo ========================================
echo.
echo 저장소 주소: https://github.com/marchnineth/deploy_test
echo.
pause
