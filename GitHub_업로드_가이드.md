# 📤 GitHub에 프로젝트 업로드하기

## 저장소 정보
- GitHub 주소: `https://github.com/marchnineth/deploy_test.git`
- 사용자명: `marchnineth`
- 저장소명: `deploy_test`

---

## 방법 1: GitHub Desktop 사용 (가장 쉬움! 추천! ⭐)

### 1단계: GitHub Desktop 설치
1. [desktop.github.com](https://desktop.github.com) 접속
2. "Download for Windows" 클릭
3. 설치 파일 실행 후 설치 완료

### 2단계: GitHub Desktop에서 프로젝트 열기
1. GitHub Desktop 실행
2. GitHub 계정으로 로그인 (marchnineth 계정)
3. **File** → **Add Local Repository** 클릭
4. 프로젝트 폴더 선택: `Projects/sehong_jima` 폴더 선택
5. "Add repository" 클릭

### 3단계: GitHub에 업로드
1. 왼쪽 하단에 변경사항이 보입니다
2. "Summary"에 커밋 메시지 입력 (예: "Initial commit - ÉLEVE 프로젝트")
3. "Commit to main" 버튼 클릭
4. 상단 메뉴에서 **Repository** → **Push origin** 클릭
   - 또는 **Repository** → **Push** 클릭
5. 완료! 🎉

**만약 "Publish repository"가 보이면:**
- "Publish repository" 클릭
- 저장소 이름: `deploy_test` (이미 있는 저장소이므로 자동 연결됨)
- "Publish repository" 클릭

---

## 방법 2: 명령어 사용 (PowerShell 또는 명령 프롬프트)

### 1단계: Git 설치 확인
PowerShell을 열고:
```bash
git --version
```

**Git이 없으면:**
1. [git-scm.com/download/win](https://git-scm.com/download/win) 접속
2. 다운로드 및 설치
3. 컴퓨터 재시작

### 2단계: 프로젝트 폴더로 이동
```bash
cd "C:\Users\sehong39\OneDrive - NCSOFT\문서\sehong_private\cursorstudy\Projects\sehong_jima"
```

### 3단계: Git 저장소 초기화 (처음 한 번만)
```bash
git init
```

### 4단계: GitHub 저장소 연결
```bash
git remote add origin https://github.com/marchnineth/deploy_test.git
```

**이미 연결되어 있다면:**
```bash
git remote set-url origin https://github.com/marchnineth/deploy_test.git
```

### 5단계: 모든 파일 추가
```bash
git add .
```

### 6단계: 첫 커밋 만들기
```bash
git commit -m "Initial commit - ÉLEVE 프로젝트"
```

### 7단계: GitHub에 업로드
```bash
git branch -M main
git push -u origin main
```

**인증이 필요하면:**
- GitHub 사용자명: `marchnineth`
- 비밀번호 대신 **Personal Access Token** 필요
  - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - "Generate new token" 클릭
  - `repo` 권한 체크
  - 토큰 생성 후 복사해서 비밀번호 대신 입력

---

## 방법 3: 자동화 스크립트 사용

아래 스크립트를 실행하면 자동으로 업로드됩니다!

---

## ✅ 업로드 확인

1. [github.com/marchnineth/deploy_test](https://github.com/marchnineth/deploy_test) 접속
2. 파일들이 보이면 성공! ✅

---

## 🔄 이후 업데이트 방법

### GitHub Desktop 사용 시:
1. 파일 수정
2. GitHub Desktop에서 변경사항 확인
3. 커밋 메시지 입력
4. "Commit to main" 클릭
5. "Push origin" 클릭

### 명령어 사용 시:
```bash
git add .
git commit -m "변경사항 설명"
git push
```

---

## ⚠️ 주의사항

1. **node_modules는 업로드하지 않습니다** (이미 .gitignore에 포함됨)
2. **.env 파일은 업로드하지 않습니다** (보안상 중요!)
3. **.next 폴더도 업로드하지 않습니다** (빌드 결과물)

---

## 🆘 문제 해결

### 문제 1: "fatal: not a git repository"
**해결:** `git init` 실행

### 문제 2: "remote origin already exists"
**해결:** 
```bash
git remote remove origin
git remote add origin https://github.com/marchnineth/deploy_test.git
```

### 문제 3: "Permission denied"
**해결:** 
- GitHub 인증 확인
- Personal Access Token 사용

### 문제 4: "Updates were rejected"
**해결:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📝 다음 단계

업로드가 완료되면:
1. Vercel에서 GitHub 저장소 연결
2. 자동 배포 시작!

자세한 내용은 `VERCEL_배포_가이드_초보자용.md` 참고하세요!
