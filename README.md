# 공룡 퍼즐 게임 (Dino Puzzle)

React와 Vite를 사용하여 만든 공룡 퍼즐 게임입니다.

## 기능

- 🦖 3종류의 공룡 퍼즐 (티라노사우르스, 트리케라톱스, 브라키오사우르스)
- 🎮 드래그 앤 드롭으로 퍼즐 조각 이동
- ✨ 완성 애니메이션 효과
- 🎨 Tailwind CSS를 사용한 현대적인 UI

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 기술 스택

- React 18.2.0
- Vite 5.0.8
- Framer Motion 10.16.16 (애니메이션)
- Tailwind CSS 3.4.0 (스타일링)

## 프로젝트 구조

```
dinopuzzle/
├── src/
│   ├── components/
│   │   ├── Intro.jsx          # 인트로 화면
│   │   ├── WorldMap.jsx       # 공룡 세계 지도
│   │   └── PuzzleGame.jsx     # 퍼즐 게임
│   ├── App.jsx                # 메인 앱 컴포넌트
│   ├── main.jsx               # 진입점
│   └── index.css              # 전역 스타일
├── images/                     # 퍼즐 이미지
├── index.html                  # HTML 템플릿
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 게임 방법

1. 인트로 화면에서 시작 버튼 클릭
2. 공룡 세계 지도에서 원하는 공룡 선택
3. 퍼즐 조각을 드래그하여 올바른 위치에 배치
4. 모든 조각을 맞추면 완성 애니메이션 확인!

## GitHub 저장소

https://github.com/marchnineth/deploy_test
