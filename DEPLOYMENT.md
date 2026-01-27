# 배포 가이드

## 🚀 Vercel 배포 (가장 추천)

### 방법 1: Vercel 웹사이트에서 배포
1. [vercel.com](https://vercel.com) 접속
2. GitHub/GitLab/Bitbucket 계정으로 로그인
3. "Add New Project" 클릭
4. 프로젝트 저장소 선택
5. 자동으로 설정 감지 (Next.js)
6. "Deploy" 클릭

### 방법 2: Vercel CLI로 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
cd Projects/sehong_jima
vercel

# 처음 배포 시
vercel --prod
```

### 환경 변수 설정 (필요한 경우)
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

### 커스텀 도메인 연결
- Vercel 대시보드 → 프로젝트 → Settings → Domains
- 도메인 추가 후 DNS 설정 안내 따르기

---

## 🌐 Netlify 배포

### 방법 1: Netlify 웹사이트에서 배포
1. [netlify.com](https://netlify.com) 접속
2. GitHub 계정으로 로그인
3. "Add new site" → "Import an existing project"
4. 저장소 선택
5. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. "Deploy site" 클릭

### 방법 2: Netlify CLI
```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 로그인
netlify login

# 배포
netlify deploy --prod
```

---

## ☁️ Cloudflare Pages 배포

1. [pages.cloudflare.com](https://pages.cloudflare.com) 접속
2. GitHub 계정 연결
3. 프로젝트 선택
4. 빌드 설정:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
5. "Save and Deploy" 클릭

---

## 🚂 Railway 배포

1. [railway.app](https://railway.app) 접속
2. GitHub 계정 연결
3. "New Project" → "Deploy from GitHub repo"
4. 프로젝트 선택
5. 자동으로 빌드 및 배포

---

## 📦 Render 배포

1. [render.com](https://render.com) 접속
2. GitHub 계정 연결
3. "New" → "Web Service"
4. 저장소 선택
5. 설정:
   - Build Command: `npm run build`
   - Start Command: `npm start`
6. "Create Web Service" 클릭

---

## ⚙️ 배포 전 체크리스트

### 1. 환경 변수 확인
- `.env.local` 파일이 있다면 Vercel/배포 플랫폼에 환경 변수 추가 필요

### 2. 빌드 테스트
```bash
npm run build
npm start
```

### 3. .gitignore 확인
- `node_modules`, `.next`, `.env*` 등이 제외되어 있는지 확인

### 4. README 업데이트 (선택사항)
- 배포 URL 추가
- 환경 변수 설명 추가

---

## 🎯 추천 순서

1. **Vercel** - Next.js 최적화, 가장 쉬움, 이미 Analytics 사용 중
2. **Netlify** - 좋은 대안, 쉬운 설정
3. **Cloudflare Pages** - 빠른 CDN, 무료 플랜 넉넉함
4. **Railway/Render** - 서버 사이드 기능이 더 필요할 때

---

## 💡 팁

- **자동 배포**: GitHub에 push하면 자동으로 재배포됨
- **프리뷰 배포**: Pull Request마다 프리뷰 URL 자동 생성
- **롤백**: 이전 버전으로 쉽게 롤백 가능
- **성능 모니터링**: Vercel Analytics 이미 설치되어 있음
