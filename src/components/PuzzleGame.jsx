import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function PuzzleGame({ puzzleId, onBack }) {
  const [pieces, setPieces] = useState([])
  const [isFinished, setIsFinished] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 600, height: 500 })
  const [imageBounds, setImageBounds] = useState({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
  const [imageCanvas, setImageCanvas] = useState(null) // 이미지 데이터를 저장할 Canvas

  // 퍼즐 보드 크기 (정답 실루엣 크기)
  const PUZZLE_BOARD_WIDTH = 600
  const PUZZLE_BOARD_HEIGHT = 500
  const PUZZLE_BOARD_LEFT = 100 // (800 - 600) / 2
  const PUZZLE_BOARD_TOP = 50 // (600 - 500) / 2
  
  // 삼각형 퍼즐용 보드 크기 (더 작게)
  const TRIANGLE_BOARD_WIDTH = 400
  const TRIANGLE_BOARD_HEIGHT = 400
  const TRIANGLE_BOARD_LEFT = 200 // (800 - 400) / 2
  const TRIANGLE_BOARD_TOP = 100 // (600 - 400) / 2

  // 공룡별 파츠 정의 (PNG 이미지와 정답 위치) - 6조각으로 단순화
  // backgroundPosition을 사용하여 각 조각이 이미지의 올바른 부분을 보여주도록 함
  // 각 공룡 이미지의 실제 영역 정보 (공백 제거된 영역)
  const dinosaurPuzzles = {
    tyrannosaurus: {
      name: '티라노사우루스',
      image: '/images/1.png',
      // 실제 공룡 영역: 이미지 전체에서 공룡이 차지하는 영역
      // offsetX, offsetY: 이미지 내에서 공룡이 시작하는 위치
      // cropWidth, cropHeight: 실제 공룡 영역의 크기
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 }, // 기본값 (이미지 전체 사용)
      parts: [
        {
          id: 'head',
          // 머리: 가로 25%~75%, 세로 0%~35%
          bgX: -PUZZLE_BOARD_WIDTH * 0.25,
          bgY: 0,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.25,
          correctY: PUZZLE_BOARD_TOP,
          initialX: 50,
          initialY: 50,
          width: PUZZLE_BOARD_WIDTH * 0.5,
          height: PUZZLE_BOARD_HEIGHT * 0.35,
        },
        {
          id: 'body',
          // 몸통: 가로 15%~85%, 세로 35%~75%
          bgX: -PUZZLE_BOARD_WIDTH * 0.15,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.35,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.15,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.35,
          initialX: 50,
          initialY: 200,
          width: PUZZLE_BOARD_WIDTH * 0.7,
          height: PUZZLE_BOARD_HEIGHT * 0.4,
        },
        {
          id: 'arm1',
          // 왼팔: 가로 0%~25%, 세로 25%~65%
          bgX: 0,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.25,
          correctX: PUZZLE_BOARD_LEFT,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.25,
          initialX: 50,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.25,
          height: PUZZLE_BOARD_HEIGHT * 0.4,
        },
        {
          id: 'arm2',
          // 오른팔: 가로 75%~100%, 세로 25%~65%
          bgX: -PUZZLE_BOARD_WIDTH * 0.75,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.25,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.75,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.25,
          initialX: 200,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.25,
          height: PUZZLE_BOARD_HEIGHT * 0.4,
        },
        {
          id: 'leg1',
          // 왼다리: 가로 10%~40%, 세로 75%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.1,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.75,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.1,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.75,
          initialX: 350,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.25,
        },
        {
          id: 'leg2',
          // 오른다리: 가로 60%~90%, 세로 75%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.6,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.75,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.6,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.75,
          initialX: 500,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.25,
        },
      ],
    },
    triceratops: {
      name: '트리케라톱스',
      image: '/images/2.png',
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      parts: [
        {
          id: 'head',
          // 머리: 가로 20%~80%, 세로 0%~40%
          bgX: -PUZZLE_BOARD_WIDTH * 0.2,
          bgY: 0,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.2,
          correctY: PUZZLE_BOARD_TOP,
          initialX: 50,
          initialY: 50,
          width: PUZZLE_BOARD_WIDTH * 0.6,
          height: PUZZLE_BOARD_HEIGHT * 0.4,
        },
        {
          id: 'body',
          // 몸통: 가로 15%~85%, 세로 40%~80%
          bgX: -PUZZLE_BOARD_WIDTH * 0.15,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.4,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.15,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.4,
          initialX: 50,
          initialY: 200,
          width: PUZZLE_BOARD_WIDTH * 0.7,
          height: PUZZLE_BOARD_HEIGHT * 0.4,
        },
        {
          id: 'leg1',
          // 왼다리: 가로 10%~40%, 세로 80%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.1,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.8,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.1,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.8,
          initialX: 350,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.2,
        },
        {
          id: 'leg2',
          // 오른다리: 가로 60%~90%, 세로 80%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.6,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.8,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.6,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.8,
          initialX: 500,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.2,
        },
        {
          id: 'tail',
          // 꼬리: 가로 75%~100%, 세로 55%~80%
          bgX: -PUZZLE_BOARD_WIDTH * 0.75,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.55,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.75,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.55,
          initialX: 550,
          initialY: 50,
          width: PUZZLE_BOARD_WIDTH * 0.25,
          height: PUZZLE_BOARD_HEIGHT * 0.25,
        },
        {
          id: 'horn',
          // 뿔: 가로 30%~70%, 세로 0%~15%
          bgX: -PUZZLE_BOARD_WIDTH * 0.3,
          bgY: 0,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.3,
          correctY: PUZZLE_BOARD_TOP,
          initialX: 200,
          initialY: 150,
          width: PUZZLE_BOARD_WIDTH * 0.4,
          height: PUZZLE_BOARD_HEIGHT * 0.15,
        },
      ],
    },
    brachiosaurus: {
      name: '브라키오사우루스',
      image: '/images/3.png',
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      parts: [
        {
          id: 'head',
          // 머리: 가로 30%~70%, 세로 0%~20%
          bgX: -PUZZLE_BOARD_WIDTH * 0.3,
          bgY: 0,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.3,
          correctY: PUZZLE_BOARD_TOP,
          initialX: 50,
          initialY: 50,
          width: PUZZLE_BOARD_WIDTH * 0.4,
          height: PUZZLE_BOARD_HEIGHT * 0.2,
        },
        {
          id: 'neck',
          // 목: 가로 35%~65%, 세로 20%~50%
          bgX: -PUZZLE_BOARD_WIDTH * 0.35,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.2,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.35,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.2,
          initialX: 50,
          initialY: 150,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.3,
        },
        {
          id: 'body',
          // 몸통: 가로 10%~90%, 세로 50%~80%
          bgX: -PUZZLE_BOARD_WIDTH * 0.1,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.5,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.1,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.5,
          initialX: 50,
          initialY: 300,
          width: PUZZLE_BOARD_WIDTH * 0.8,
          height: PUZZLE_BOARD_HEIGHT * 0.3,
        },
        {
          id: 'leg1',
          // 왼다리: 가로 5%~35%, 세로 80%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.05,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.8,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.05,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.8,
          initialX: 250,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.2,
        },
        {
          id: 'leg2',
          // 오른다리: 가로 65%~95%, 세로 80%~100%
          bgX: -PUZZLE_BOARD_WIDTH * 0.65,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.8,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.65,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.8,
          initialX: 500,
          initialY: 350,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.2,
        },
        {
          id: 'tail',
          // 꼬리: 가로 70%~100%, 세로 65%~80%
          bgX: -PUZZLE_BOARD_WIDTH * 0.7,
          bgY: -PUZZLE_BOARD_HEIGHT * 0.65,
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH * 0.7,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT * 0.65,
          initialX: 550,
          initialY: 50,
          width: PUZZLE_BOARD_WIDTH * 0.3,
          height: PUZZLE_BOARD_HEIGHT * 0.15,
        },
      ],
    },
    'test-triangle': {
      name: '테스트 삼각형',
      // 삼각형 SVG를 data URL로 생성 (정삼각형: 꼭짓점이 위, 아래 두 꼭짓점)
      // 원본 삼각형: points="200,50 50,350 350,350" (400x400)
      // 실루엣 위치: TRIANGLE_BOARD_LEFT (200), TRIANGLE_BOARD_TOP (100)
      // 실루엣 크기: TRIANGLE_BOARD_WIDTH (400), TRIANGLE_BOARD_HEIGHT (400)
      image: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
            </linearGradient>
          </defs>
          <polygon points="200,50 50,350 350,350" fill="url(#triangleGrad)" stroke="#1e3a8a" stroke-width="4"/>
        </svg>
      `),
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      parts: [
        {
          id: 'top',
          // 상단 조각: 위쪽 삼각형 부분
          // 원본 이미지에서 (100, 50) ~ (300, 200) 영역을 보여줌
          // bgX, bgY는 원본 이미지에서의 오프셋 (음수로 설정하여 이미지를 왼쪽/위로 이동)
          bgX: -100, // 원본 이미지의 x=100 위치를 조각의 x=0에 맞춤
          bgY: -50,  // 원본 이미지의 y=50 위치를 조각의 y=0에 맞춤
          // correctX, correctY는 실루엣 위에서의 정확한 위치
          // 실루엣이 (200, 100)에 있고, 조각이 실루엣의 (100, 50) 위치에 있어야 함
          correctX: TRIANGLE_BOARD_LEFT + 100, // 200 + 100 = 300
          correctY: TRIANGLE_BOARD_TOP + 50,   // 100 + 50 = 150
          initialX: 50,
          initialY: 50,
          width: 200, // 조각의 실제 너비
          height: 150, // 조각의 실제 높이
        },
        {
          id: 'left',
          // 좌하단 조각: 왼쪽 아래 부분
          // 원본 이미지에서 (50, 200) ~ (200, 350) 영역을 보여줌
          bgX: -50,  // 원본 이미지의 x=50 위치를 조각의 x=0에 맞춤
          bgY: -200, // 원본 이미지의 y=200 위치를 조각의 y=0에 맞춤
          correctX: TRIANGLE_BOARD_LEFT + 50,  // 200 + 50 = 250
          correctY: TRIANGLE_BOARD_TOP + 200,  // 100 + 200 = 300
          initialX: 50,
          initialY: 450,
          width: 150,
          height: 150,
        },
        {
          id: 'right',
          // 우하단 조각: 오른쪽 아래 부분
          // 원본 이미지에서 (200, 200) ~ (350, 350) 영역을 보여줌
          bgX: -200, // 원본 이미지의 x=200 위치를 조각의 x=0에 맞춤
          bgY: -200, // 원본 이미지의 y=200 위치를 조각의 y=0에 맞춤
          correctX: TRIANGLE_BOARD_LEFT + 200, // 200 + 200 = 400
          correctY: TRIANGLE_BOARD_TOP + 200,   // 100 + 200 = 300
          initialX: 650,
          initialY: 450,
          width: 150,
          height: 150,
        },
        {
          id: 'center',
          // 중앙 조각: 가운데 부분
          // 원본 이미지에서 (125, 125) ~ (275, 275) 영역을 보여줌
          bgX: -125, // 원본 이미지의 x=125 위치를 조각의 x=0에 맞춤
          bgY: -125, // 원본 이미지의 y=125 위치를 조각의 y=0에 맞춤
          correctX: TRIANGLE_BOARD_LEFT + 125, // 200 + 125 = 325
          correctY: TRIANGLE_BOARD_TOP + 125,  // 100 + 125 = 225
          initialX: 600,
          initialY: 100,
          width: 150,
          height: 150,
        },
      ],
    },
  }

  // 이미지 크기 로드 및 실제 공룡 영역 계산 (공백 제거)
  useEffect(() => {
    if (puzzleId && dinosaurPuzzles[puzzleId]) {
      const img = new Image()
      img.src = dinosaurPuzzles[puzzleId].image
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
        
        // 실제 공룡 영역 계산 (공백 제거)
        // Canvas를 사용하여 투명도가 아닌 픽셀 영역 찾기
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)
        
        // 이미지 데이터를 저장하여 나중에 픽셀 확인에 사용
        setImageCanvas({ canvas, ctx, imageData: ctx.getImageData(0, 0, canvas.width, canvas.height) })
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // 공룡이 실제로 존재하는 영역 찾기
        let minX = canvas.width
        let minY = canvas.height
        let maxX = 0
        let maxY = 0
        
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4
            const alpha = data[idx + 3]
            if (alpha > 0) {
              minX = Math.min(minX, x)
              minY = Math.min(minY, y)
              maxX = Math.max(maxX, x)
              maxY = Math.max(maxY, y)
            }
          }
        }
        
        // 공룡 영역이 발견된 경우
        if (minX < maxX && minY < maxY) {
          const offsetX = minX / img.naturalWidth
          const offsetY = minY / img.naturalHeight
          const scaleX = (maxX - minX) / img.naturalWidth
          const scaleY = (maxY - minY) / img.naturalHeight
          
          setImageBounds({ offsetX, offsetY, scaleX, scaleY })
        } else {
          // 공룡 영역을 찾지 못한 경우 전체 이미지 사용
          setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
        }
      }
      img.onerror = () => {
        // 이미지 로드 실패 시 기본값 사용
        setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
      }
    }
  }, [puzzleId])
  
  // 클릭한 위치가 실제 콘텐츠 영역인지 확인하는 함수
  const isClickOnContent = (event, piece) => {
    if (!imageCanvas || !imageCanvas.imageData) return true
    
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top
    
    const boardWidth = puzzleId === 'test-triangle' ? TRIANGLE_BOARD_WIDTH : PUZZLE_BOARD_WIDTH
    const boardHeight = puzzleId === 'test-triangle' ? TRIANGLE_BOARD_HEIGHT : PUZZLE_BOARD_HEIGHT
    const imgWidth = boardWidth / imageBounds.scaleX
    const imgHeight = boardHeight / imageBounds.scaleY
    
    // 이미지 내에서의 상대 위치 계산
    const bgX = piece.bgX - imageBounds.offsetX * imgWidth
    const bgY = piece.bgY - imageBounds.offsetY * imgHeight
    
    // 클릭한 위치가 이미지 영역 내에 있는지 확인
    if (clickX < -bgX || clickX > piece.width - bgX || clickY < -bgY || clickY > piece.height - bgY) {
      return false
    }
    
    // 이미지 좌표로 변환
    const imageX = clickX + bgX
    const imageY = clickY + bgY
    
    // 원본 이미지 좌표로 변환
    const scaleX = imageSize.width / imgWidth
    const scaleY = imageSize.height / imgHeight
    const originalX = Math.floor(imageX * scaleX)
    const originalY = Math.floor(imageY * scaleY)
    
    // 이미지 범위 확인
    if (originalX < 0 || originalX >= imageSize.width || originalY < 0 || originalY >= imageSize.height) {
      return false
    }
    
    // 해당 픽셀의 투명도 확인
    const idx = (originalY * imageSize.width + originalX) * 4
    const alpha = imageCanvas.imageData.data[idx + 3]
    
    return alpha > 0
  }

  // 퍼즐 초기화
  useEffect(() => {
    if (puzzleId && dinosaurPuzzles[puzzleId]) {
      const puzzle = dinosaurPuzzles[puzzleId]
      const initialPieces = puzzle.parts.map((part) => ({
        ...part,
        x: part.initialX,
        y: part.initialY,
        isPlaced: false,
        zIndex: 20,
      }))
      setPieces(initialPieces)
      setIsFinished(false)
    }
  }, [puzzleId])

  // 드래그 핸들러 - 드래그 중에는 위치만 업데이트
  const handleDrag = (pieceId, event, info) => {
    const piece = pieces.find((p) => p.id === pieceId)
    if (!piece || piece.isPlaced) return

    // Framer Motion의 drag는 상대 좌표를 사용하므로, 드래그 시작 위치를 기준으로 계산
    const newX = piece.x + info.delta.x
    const newY = piece.y + info.delta.y

    // 정답 위치와의 거리 계산
    const distance = Math.sqrt(
      Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
    )

    // 50px 이내면 자석 효과로 고정
    if (distance < 50) {
      setPieces((prevPieces) =>
        prevPieces.map((p) =>
          p.id === pieceId
            ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
            : p
        )
      )
    } else {
      // 위치 업데이트
      setPieces((prevPieces) =>
        prevPieces.map((p) =>
          p.id === pieceId ? { ...p, x: newX, y: newY } : p
        )
      )
    }
  }

  // 드래그 종료 핸들러
  const handleDragEnd = (pieceId, event, info) => {
    const piece = pieces.find((p) => p.id === pieceId)
    if (!piece || piece.isPlaced) return

    const finalX = piece.x + info.delta.x
    const finalY = piece.y + info.delta.y

    const distance = Math.sqrt(
      Math.pow(finalX - piece.correctX, 2) + Math.pow(finalY - piece.correctY, 2)
    )

    if (distance < 50) {
      setPieces((prevPieces) =>
        prevPieces.map((p) =>
          p.id === pieceId
            ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
            : p
        )
      )
    } else {
      // 최종 위치 업데이트
      setPieces((prevPieces) =>
        prevPieces.map((p) =>
          p.id === pieceId ? { ...p, x: finalX, y: finalY } : p
        )
      )
    }
  }

  // 완료 상태 체크
  useEffect(() => {
    if (pieces.length > 0 && pieces.every((p) => p.isPlaced)) {
      setIsFinished(true)
    }
  }, [pieces])

  if (!puzzleId || !dinosaurPuzzles[puzzleId]) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-purple-200 to-pink-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-800 mb-4">퍼즐을 선택해주세요!</p>
          <button
            onClick={onBack}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold px-8 py-4 rounded-lg"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    )
  }

  const puzzle = dinosaurPuzzles[puzzleId]

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-100 to-purple-100 relative overflow-hidden">
      {/* 헤더 */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-lg">
          {puzzle.name} 퍼즐
        </h1>
      </div>

      {/* 뒤로 가기 버튼 */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg"
      >
        ← 뒤로
      </button>

      {/* 퍼즐 영역 */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative" style={{ width: '800px', height: '600px' }}>
          {/* 정답 실루엣 (투명하게) - 공백 제거된 영역만 표시 */}
          <div
            className="absolute opacity-30"
            style={{
              pointerEvents: 'none',
              width: `${puzzleId === 'test-triangle' ? TRIANGLE_BOARD_WIDTH : PUZZLE_BOARD_WIDTH}px`,
              height: `${puzzleId === 'test-triangle' ? TRIANGLE_BOARD_HEIGHT : PUZZLE_BOARD_HEIGHT}px`,
              left: `${puzzleId === 'test-triangle' ? TRIANGLE_BOARD_LEFT : PUZZLE_BOARD_LEFT}px`,
              top: `${puzzleId === 'test-triangle' ? TRIANGLE_BOARD_TOP : PUZZLE_BOARD_TOP}px`,
              overflow: 'hidden',
            }}
          >
            <img
              src={puzzle.image}
              alt="silhouette"
              style={{
                width: `${(puzzleId === 'test-triangle' ? TRIANGLE_BOARD_WIDTH : PUZZLE_BOARD_WIDTH) / imageBounds.scaleX}px`,
                height: `${(puzzleId === 'test-triangle' ? TRIANGLE_BOARD_HEIGHT : PUZZLE_BOARD_HEIGHT) / imageBounds.scaleY}px`,
                objectFit: 'none',
                objectPosition: `${-imageBounds.offsetX * ((puzzleId === 'test-triangle' ? TRIANGLE_BOARD_WIDTH : PUZZLE_BOARD_WIDTH) / imageBounds.scaleX)}px ${-imageBounds.offsetY * ((puzzleId === 'test-triangle' ? TRIANGLE_BOARD_HEIGHT : PUZZLE_BOARD_HEIGHT) / imageBounds.scaleY)}px`,
                display: 'block',
              }}
            />
          </div>

          {/* 드래그 가능한 조각들 */}
          {pieces.map((piece) => {
            const boardWidth = puzzleId === 'test-triangle' ? TRIANGLE_BOARD_WIDTH : PUZZLE_BOARD_WIDTH
            const boardHeight = puzzleId === 'test-triangle' ? TRIANGLE_BOARD_HEIGHT : PUZZLE_BOARD_HEIGHT
            const imgWidth = boardWidth / imageBounds.scaleX
            const imgHeight = boardHeight / imageBounds.scaleY
            
            return (
              <motion.div
                key={piece.id}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: `${piece.x}px`,
                  top: `${piece.y}px`,
                  zIndex: piece.zIndex || (piece.isPlaced ? 10 : 20),
                  width: `${piece.width}px`,
                  height: `${piece.height}px`,
                }}
                drag={!piece.isPlaced}
                dragMomentum={false}
                dragElastic={0}
                dragPropagation={false}
                dragConstraints={false}
                onDragStart={(event, info) => {
                  // 드래그 시작 시 z-index를 높여서 위에 표시
                  setPieces((prevPieces) =>
                    prevPieces.map((p) =>
                      p.id === piece.id ? { ...p, zIndex: 100 } : p
                    )
                  )
                }}
                onDrag={(event, info) => {
                  // 드래그 중 위치 업데이트
                  const newX = piece.x + info.delta.x
                  const newY = piece.y + info.delta.y
                  
                  // 정답 위치와의 거리 계산
                  const distance = Math.sqrt(
                    Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
                  )

                  // 50px 이내면 자석 효과로 고정
                  if (distance < 50) {
                    setPieces((prevPieces) =>
                      prevPieces.map((p) =>
                        p.id === piece.id
                          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true, zIndex: 10 }
                          : p
                      )
                    )
                  } else {
                    // 위치 업데이트
                    setPieces((prevPieces) =>
                      prevPieces.map((p) =>
                        p.id === piece.id ? { ...p, x: newX, y: newY } : p
                      )
                    )
                  }
                }}
                onDragEnd={(event, info) => {
                  const finalX = piece.x + info.delta.x
                  const finalY = piece.y + info.delta.y

                  const distance = Math.sqrt(
                    Math.pow(finalX - piece.correctX, 2) + Math.pow(finalY - piece.correctY, 2)
                  )

                  if (distance < 50) {
                    setPieces((prevPieces) =>
                      prevPieces.map((p) =>
                        p.id === piece.id
                          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true, zIndex: 10 }
                          : p
                      )
                    )
                  } else {
                    // 최종 위치 업데이트
                    setPieces((prevPieces) =>
                      prevPieces.map((p) =>
                        p.id === piece.id ? { ...p, x: finalX, y: finalY, zIndex: 20 } : p
                      )
                    )
                  }
                }}
                animate={{
                  scale: piece.isPlaced ? 1 : 1,
                  opacity: piece.isPlaced ? 0.8 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                whileHover={{ scale: piece.isPlaced ? 1 : 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    border: piece.isPlaced ? '4px solid #10b981' : '4px solid transparent',
                    borderRadius: '8px',
                    position: 'relative',
                    backgroundColor: 'transparent',
                    cursor: piece.isPlaced ? 'default' : 'grab',
                  }}
                >
                  <img
                    src={puzzle.image}
                    alt={piece.id}
                    draggable={false}
                    style={{
                      width: `${imgWidth}px`,
                      height: `${imgHeight}px`,
                      objectFit: 'none',
                      objectPosition: `${piece.bgX - imageBounds.offsetX * imgWidth}px ${piece.bgY - imageBounds.offsetY * imgHeight}px`,
                      display: 'block',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      filter: piece.isPlaced
                        ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))'
                        : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* 완료 메시지 */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
        >
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              완벽해요!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {puzzle.name}를 완성했어요!
            </p>
            <button
              onClick={onBack}
              className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-8 py-4 rounded-lg shadow-lg"
            >
              지도로 돌아가기
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PuzzleGame
