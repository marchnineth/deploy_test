# dinopuzzle 프로젝트 GitHub Push 가이드

## 방법 1: 배치 파일 실행 (권장)

1. `dinopuzzle` 폴더로 이동
2. `git_setup.bat` 파일을 더블클릭하여 실행
3. 스크립트가 자동으로 다음 작업을 수행합니다:
   - Git 저장소 초기화
   - 파일 스테이징
   - 첫 커밋 생성
   - GitHub 저장소 연결

4. 스크립트 실행 후, 다음 명령으로 push:
   ```bash
   git push -u origin main
   ```

## 방법 2: 수동 실행

`dinopuzzle` 폴더에서 다음 명령을 순서대로 실행하세요:

```bash
# Git 저장소 초기화
git init

# 기본 브랜치를 main으로 설정
git branch -M main

# 모든 파일 추가
git add .

# 첫 커밋 생성
git commit -m "Initial commit: dinopuzzle project"

# GitHub 저장소 연결
git remote add origin https://github.com/MARCHNINETH/deploy_test.git

# 원격 저장소 확인
git remote -v

# GitHub에 push
git push -u origin main
```

## 주의사항

- GitHub 인증이 필요할 수 있습니다 (Personal Access Token 또는 SSH 키)
- 저장소가 이미 존재하는 경우, `git push -u origin main --force`를 사용할 수 있지만 주의가 필요합니다
- 첫 push이므로 `-u` 옵션으로 upstream을 설정합니다

## 문제 해결

### 인증 오류가 발생하는 경우
- GitHub Personal Access Token을 생성하여 사용하세요
- 또는 SSH 키를 설정하여 사용하세요

### 브랜치 이름이 다른 경우
- `git branch` 명령으로 현재 브랜치 확인
- `git push -u origin <브랜치명>` 형식으로 push
