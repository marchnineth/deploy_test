# 🚀 Vercel 배포 완전 초보자 가이드

## 📋 배포 전 준비사항

Vercel로 배포하려면 **GitHub에 프로젝트를 올려야 합니다**. 
왜냐하면 Vercel은 GitHub 저장소를 연결해서 자동으로 배포하기 때문입니다.

---

## 1단계: GitHub 계정 만들기 (없는 경우)

1. [github.com](https://github.com) 접속
2. 오른쪽 위 "Sign up" 클릭
3. 이메일, 비밀번호 입력하고 계정 생성
4. 이메일 인증 완료

---

## 2단계: GitHub에 프로젝트 올리기

### 2-1. Git 설치 확인

Windows PowerShell이나 명령 프롬프트를 열고:
```bash
git --version
```

만약 "git이 인식되지 않습니다"라는 오류가 나면:
- [git-scm.com](https://git-scm.com/download/win) 접속
- Windows용 Git 다운로드 및 설치
- 설치 후 컴퓨터 재시작

### 2-2. 프로젝트를 Git 저장소로 만들기

**방법 A: GitHub Desktop 사용 (가장 쉬움, 추천!)**

1. [desktop.github.com](https://desktop.github.com) 접속
2. GitHub Desktop 다운로드 및 설치
3. GitHub Desktop 실행
4. GitHub 계정으로 로그인
5. File → Add Local Repository 클릭
6. 프로젝트 폴더 선택 (`Projects/sehong_jima`)
7. "Publish repository" 버튼 클릭
8. 저장소 이름 입력 (예: `sehong-jima` 또는 `eleve-fashion`)
9. "Publish repository" 클릭
10. 완료! 🎉

**방법 B: 명령어 사용 (터미널 사용 가능한 경우)**

프로젝트 폴더에서 PowerShell이나 명령 프롬프트를 열고:

```bash
# 1. Git 저장소 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋 만들기
git commit -m "Initial commit"

# 4. GitHub에서 새 저장소 만들기
# (github.com → 오른쪽 위 + 버튼 → New repository)
# 저장소 이름 입력하고 "Create repository" 클릭

# 5. GitHub 저장소 연결 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. GitHub에 올리기
git branch -M main
git push -u origin main
```

---

## 3단계: Vercel 계정 만들기

1. [vercel.com](https://vercel.com) 접속
2. 오른쪽 위 "Sign Up" 클릭
3. "Continue with GitHub" 클릭 (GitHub 계정으로 로그인)
4. GitHub 권한 승인

---

## 4단계: Vercel에 프로젝트 배포하기

### 4-1. 새 프로젝트 추가

1. Vercel 대시보드에서 "Add New..." 버튼 클릭
2. "Project" 선택
3. "Import Git Repository" 클릭

### 4-2. GitHub 저장소 선택

1. GitHub 저장소 목록이 보입니다
2. 방금 올린 프로젝트 (예: `sehong-jima`) 찾기
3. "Import" 클릭

### 4-3. 프로젝트 설정 (자동으로 감지됨!)

Vercel이 자동으로 Next.js를 감지합니다. 확인할 항목:

- **Framework Preset**: Next.js (자동 선택됨)
- **Root Directory**: `./` (그대로 두기)
- **Build Command**: `npm run build` (자동 입력됨)
- **Output Directory**: `.next` (자동 입력됨)
- **Install Command**: `npm install` (자동 입력됨)

**아무것도 바꿀 필요 없습니다!** 그대로 두고 "Deploy" 버튼 클릭

### 4-4. 배포 대기

1. 배포가 시작됩니다 (약 2-3분 소요)
2. 진행 상황을 실시간으로 볼 수 있습니다
3. "Building..." → "Deploying..." → "Ready!" 순서로 진행

### 4-5. 배포 완료! 🎉

배포가 완료되면:
- **배포 URL**이 표시됩니다 (예: `https://sehong-jima.vercel.app`)
- "Visit" 버튼을 클릭하면 사이트를 볼 수 있습니다!

---

## 5단계: 자동 배포 설정 확인

이제부터는:
- GitHub에 코드를 push하면
- Vercel이 자동으로 감지해서
- 자동으로 다시 배포합니다!

**테스트해보기:**
1. 코드를 조금 수정
2. GitHub에 push
3. Vercel 대시보드에서 자동 배포 확인

---

## 🔧 문제 해결

### 빌드 에러가 발생하는 경우

1. Vercel 대시보드에서 "Deployments" 탭 클릭
2. 실패한 배포 클릭
3. "Build Logs" 확인
4. 에러 메시지 확인

**자주 발생하는 문제:**

**문제 1: "Module not found"**
- 해결: `package.json`에 모든 의존성이 있는지 확인
- 로컬에서 `npm install` 후 `npm run build` 테스트

**문제 2: "Build failed"**
- 해결: 로컬에서 먼저 테스트
  ```bash
  npm run build
  ```
- 에러가 나면 수정 후 다시 배포

**문제 3: "Environment variables"**
- 해결: 환경 변수가 필요하면
  - Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
  - 변수 추가

---

## 📝 다음 단계 (선택사항)

### 커스텀 도메인 연결

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 도메인 입력 (예: `www.yourdomain.com`)
3. DNS 설정 안내 따르기

### 환경 변수 추가

1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 변수 이름과 값 입력
3. "Save" 클릭
4. 재배포 (자동 또는 수동)

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] GitHub 계정 있음
- [ ] 프로젝트가 GitHub에 올라가 있음
- [ ] 로컬에서 `npm run build` 성공
- [ ] Vercel 계정 있음
- [ ] Vercel에 프로젝트 연결 완료
- [ ] 배포 성공 확인

---

## 💡 팁

1. **프리뷰 배포**: Pull Request를 만들면 자동으로 프리뷰 URL 생성
2. **롤백**: 이전 버전으로 쉽게 되돌리기 가능
3. **성능**: Vercel Analytics가 이미 설치되어 있어서 성능 모니터링 가능
4. **무료 플랜**: 개인 프로젝트는 충분히 무료로 사용 가능

---

## 🆘 도움이 필요하면

- Vercel 문서: [vercel.com/docs](https://vercel.com/docs)
- Vercel 커뮤니티: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**축하합니다! 이제 여러분의 웹사이트가 전 세계 어디서나 접속 가능합니다! 🌍**
