import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function PuzzleGame({ puzzleId, onBack }) {
  const [pieces, setPieces] = useState([])
  const [isFinished, setIsFinished] = useState(false)
  const [showCompletionPopup, setShowCompletionPopup] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 600, height: 500 })
  const [imageBounds, setImageBounds] = useState({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
  const [imageCanvas, setImageCanvas] = useState(null)

  // 퍼즐 보드 크기
  const PUZZLE_BOARD_WIDTH = 600
  const PUZZLE_BOARD_HEIGHT = 500
  const PUZZLE_BOARD_LEFT = 100
  const PUZZLE_BOARD_TOP = 50
  
  const TRIANGLE_BOARD_WIDTH = 400
  const TRIANGLE_BOARD_HEIGHT = 400
  const TRIANGLE_BOARD_LEFT = 200
  const TRIANGLE_BOARD_TOP = 100

  const dinosaurPuzzles = {
    tyrannosaurus: {
      name: '티라노사우루스',
      image: null,
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      iconSize: { width: 400, height: 400 },
      iconCenter: {
        x: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2,
        y: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2,
      },
      parts: [
        {
          id: 'body',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128,
          initialX: 50,
          initialY: 50,
          width: 256,
          height: 256,
        },
        {
          id: 'face',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 80,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 - 32 - 80,
          initialX: 200,
          initialY: 50,
          width: 160,
          height: 160,
        },
        {
          id: 'arm1',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128 + 16,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 64,
          initialX: 50,
          initialY: 200,
          width: 48,
          height: 96,
        },
        {
          id: 'arm2',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128 + 192,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 64,
          initialX: 200,
          initialY: 200,
          width: 48,
          height: 96,
        },
        {
          id: 'leg1',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128 + 48,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 128,
          initialX: 350,
          initialY: 200,
          width: 80,
          height: 128,
        },
        {
          id: 'leg2',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128 + 164,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 128,
          initialX: 500,
          initialY: 200,
          width: 80,
          height: 128,
        },
        {
          id: 'tail',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 128 + 112,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 128 - 32,
          initialX: 550,
          initialY: 200,
          width: 128,
          height: 64,
        },
      ],
    },
    triceratops: {
      name: '트리케라톱스',
      image: null,
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      iconSize: { width: 400, height: 400 },
      iconCenter: {
        x: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2,
        y: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2,
      },
      parts: [
        {
          id: 'body',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 112,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 64,
          initialX: 50,
          initialY: 50,
          width: 224,
          height: 256,
        },
        {
          id: 'face',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 96,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 - 32 - 80,
          initialX: 200,
          initialY: 50,
          width: 192,
          height: 160,
        },
        {
          id: 'leg1',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 112 + 48,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 256,
          initialX: 350,
          initialY: 350,
          width: 80,
          height: 128,
        },
        {
          id: 'leg2',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 112 + 192,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 256,
          initialX: 500,
          initialY: 350,
          width: 80,
          height: 128,
        },
        {
          id: 'tail',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 112 + 112,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 128 + 256 - 32,
          initialX: 550,
          initialY: 200,
          width: 128,
          height: 64,
        },
      ],
    },
    brachiosaurus: {
      name: '브라키오사우루스',
      image: null,
      imageOffset: { x: 0, y: 0, width: 1.0, height: 1.0 },
      iconSize: { width: 400, height: 640 },
      iconCenter: {
        x: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2,
        y: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2,
      },
      parts: [
        {
          id: 'body',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 96,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 + 128,
          initialX: 50,
          initialY: 50,
          width: 192,
          height: 256,
        },
        {
          id: 'neck',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 64,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 - 128,
          initialX: 200,
          initialY: 50,
          width: 128,
          height: 256,
        },
        {
          id: 'face',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 80,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 - 256 - 64,
          initialX: 350,
          initialY: 50,
          width: 160,
          height: 128,
        },
        {
          id: 'leg1',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 96 + 16,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 + 256,
          initialX: 250,
          initialY: 350,
          width: 64,
          height: 160,
        },
        {
          id: 'leg2',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 96 + 192 - 80,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 + 256,
          initialX: 500,
          initialY: 350,
          width: 64,
          height: 160,
        },
        {
          id: 'tail',
          correctX: PUZZLE_BOARD_LEFT + PUZZLE_BOARD_WIDTH / 2 - 96 + 96,
          correctY: PUZZLE_BOARD_TOP + PUZZLE_BOARD_HEIGHT / 2 - 160 + 256 - 32,
          initialX: 550,
          initialY: 200,
          width: 96,
          height: 48,
        },
      ],
    },
    'test-triangle': {
      name: '테스트 삼각형',
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
          bgX: -100,
          bgY: -50,
          correctX: TRIANGLE_BOARD_LEFT + 100,
          correctY: TRIANGLE_BOARD_TOP + 50,
          initialX: 50,
          initialY: 50,
          width: 200,
          height: 150,
        },
        {
          id: 'left',
          bgX: -50,
          bgY: -200,
          correctX: TRIANGLE_BOARD_LEFT + 50,
          correctY: TRIANGLE_BOARD_TOP + 200,
          initialX: 50,
          initialY: 450,
          width: 150,
          height: 150,
        },
        {
          id: 'right',
          bgX: -200,
          bgY: -200,
          correctX: TRIANGLE_BOARD_LEFT + 200,
          correctY: TRIANGLE_BOARD_TOP + 200,
          initialX: 650,
          initialY: 450,
          width: 150,
          height: 150,
        },
        {
          id: 'center',
          bgX: -125,
          bgY: -125,
          correctX: TRIANGLE_BOARD_LEFT + 125,
          correctY: TRIANGLE_BOARD_TOP + 125,
          initialX: 600,
          initialY: 100,
          width: 150,
          height: 150,
        },
      ],
    },
  }

  useEffect(() => {
    if (puzzleId && dinosaurPuzzles[puzzleId]) {
      if (puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') {
        setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
        return
      }
      
      const puzzle = dinosaurPuzzles[puzzleId]
      if (!puzzle.image) {
        setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
        return
      }
      
      const img = new Image()
      img.src = puzzle.image
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
        
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)
        
        setImageCanvas({ canvas, ctx, imageData: ctx.getImageData(0, 0, canvas.width, canvas.height) })
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
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
        
        if (minX < maxX && minY < maxY) {
          const offsetX = minX / img.naturalWidth
          const offsetY = minY / img.naturalHeight
          const scaleX = (maxX - minX) / img.naturalWidth
          const scaleY = (maxY - minY) / img.naturalHeight
          
          setImageBounds({ offsetX, offsetY, scaleX, scaleY })
        } else {
          setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
        }
      }
      img.onerror = () => {
        setImageBounds({ offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 })
      }
    }
  }, [puzzleId])
  
  useEffect(() => {
    if (puzzleId && dinosaurPuzzles[puzzleId]) {
      const puzzle = dinosaurPuzzles[puzzleId]
      if (puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') {
        const initialPieces = puzzle.parts.map((part) => ({
          ...part,
          x: part.correctX,
          y: part.correctY,
          isPlaced: false,
          zIndex: 20,
        }))
        setPieces(initialPieces)
        setIsStarted(false)
      } else {
        const initialPieces = puzzle.parts.map((part) => ({
          ...part,
          x: part.initialX,
          y: part.initialY,
          isPlaced: false,
          zIndex: 20,
        }))
        setPieces(initialPieces)
        setIsStarted(true)
      }
      setIsFinished(false)
      setShowCompletionPopup(false)
      setIsAnimating(false)
    }
  }, [puzzleId])

  const handleStartPuzzle = () => {
    if ((puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') && !isStarted) {
      setIsStarted(true)
      setPieces((prevPieces) =>
        prevPieces.map((piece) => ({
          ...piece,
          x: piece.initialX,
          y: piece.initialY,
          isPlaced: false,
        }))
      )
    }
  }

  useEffect(() => {
    if (pieces.length > 0 && pieces.every((p) => p.isPlaced) && !isFinished && !isAnimating && isStarted) {
      setIsFinished(true)
      setTimeout(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setIsAnimating(false)
          setShowCompletionPopup(true)
        }, 3000)
      }, 2000)
    }
  }, [pieces, isFinished, isAnimating, isStarted])

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
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-lg">
          {puzzle.name} 퍼즐
        </h1>
      </div>

      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold px-6 py-3 rounded-lg shadow-lg"
      >
        ← 뒤로
      </button>

      <div className="w-full h-full flex items-center justify-center">
        <div className="relative" style={{ width: '800px', height: '600px' }}>
          {((puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') && isStarted) && (
            <div
              className="absolute opacity-20"
              style={{
                pointerEvents: 'none',
                left: '0',
                top: '0',
                width: '800px',
                height: '600px',
                zIndex: 1,
              }}
            >
              {puzzle.parts.map((part) => (
                <div
                  key={part.id}
                  className="absolute"
                  style={{
                    left: `${part.correctX}px`,
                    top: `${part.correctY}px`,
                    width: `${part.width}px`,
                    height: `${part.height}px`,
                  }}
                >
                  <div className="w-full h-full relative">
                    {part.id === 'body' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-400 rounded-full"></div>
                    )}
                    {part.id === 'body' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-400 rounded-full"></div>
                    )}
                    {part.id === 'body' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-400 rounded-full"></div>
                    )}
                    {part.id === 'face' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-red-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-red-600 rounded-b-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                            <div className="w-2 h-6 bg-white"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {part.id === 'face' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-yellow-500 rounded-full relative">
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                            <div className="w-6 h-24 bg-yellow-600 rounded-full transform rotate-12"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-24 bg-yellow-600 rounded-full"></div>
                            <div className="absolute top-0 right-0 w-6 h-24 bg-yellow-600 rounded-full transform -rotate-12"></div>
                          </div>
                          <div className="absolute top-12 left-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-12 right-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {part.id === 'face' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-green-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-green-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {part.id === 'arm1' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-45"></div>
                    )}
                    {part.id === 'arm2' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform -rotate-45"></div>
                    )}
                    {part.id === 'leg1' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {part.id === 'leg1' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {part.id === 'leg1' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {part.id === 'leg2' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {part.id === 'leg2' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {part.id === 'leg2' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {part.id === 'tail' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-12"></div>
                    )}
                    {part.id === 'tail' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full transform rotate-12"></div>
                    )}
                    {part.id === 'tail' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full transform rotate-12"></div>
                    )}
                    {part.id === 'neck' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {((puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') && !isStarted) && (
            <>
              {pieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  className="absolute"
                  initial={{
                    x: 0,
                    y: 0,
                  }}
                  animate={isStarted ? {
                    x: piece.initialX - piece.correctX,
                    y: piece.initialY - piece.correctY,
                  } : {
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  style={{
                    left: `${piece.correctX}px`,
                    top: `${piece.correctY}px`,
                    width: `${piece.width}px`,
                    height: `${piece.height}px`,
                    zIndex: 30,
                  }}
                >
                  <div className="w-full h-full relative">
                    {piece.id === 'body' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-400 rounded-full"></div>
                    )}
                    {piece.id === 'body' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-400 rounded-full"></div>
                    )}
                    {piece.id === 'body' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-400 rounded-full"></div>
                    )}
                    {piece.id === 'face' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-red-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-red-600 rounded-b-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                            <div className="w-2 h-6 bg-white"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'face' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-yellow-500 rounded-full relative">
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                            <div className="w-6 h-24 bg-yellow-600 rounded-full transform rotate-12"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-24 bg-yellow-600 rounded-full"></div>
                            <div className="absolute top-0 right-0 w-6 h-24 bg-yellow-600 rounded-full transform -rotate-12"></div>
                          </div>
                          <div className="absolute top-12 left-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-12 right-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'face' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-green-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-green-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'arm1' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-45"></div>
                    )}
                    {piece.id === 'arm2' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform -rotate-45"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'neck' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div
                className="absolute cursor-pointer"
                style={{
                  left: '0',
                  top: '0',
                  width: '800px',
                  height: '600px',
                  zIndex: 31,
                }}
                onClick={handleStartPuzzle}
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-xl font-bold text-gray-800 bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-lg">
                    클릭하여 퍼즐 시작!
                  </p>
                </div>
              </div>
            </>
          )}
          
          {puzzleId !== 'tyrannosaurus' && puzzleId !== 'triceratops' && puzzleId !== 'brachiosaurus' && (
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
          )}

          {isStarted && pieces.map((piece) => {
            if (puzzleId === 'tyrannosaurus' || puzzleId === 'triceratops' || puzzleId === 'brachiosaurus') {
              let animateProps = {}
              let transitionProps = { type: 'spring', stiffness: 300, damping: 30 }
              
              if (isAnimating && piece.isPlaced) {
                if (piece.id === 'arm1') {
                  animateProps = { rotate: [45, 60, 45, 30, 45] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'arm2') {
                  animateProps = { rotate: [-45, -60, -45, -30, -45] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'leg1') {
                  animateProps = { rotate: [0, 10, 0, -10, 0] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'leg2') {
                  animateProps = { rotate: [0, -10, 0, 10, 0] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'tail') {
                  animateProps = { rotate: [12, 25, 12, 0, 12] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'face') {
                  animateProps = { rotate: [0, 5, 0, -5, 0], scale: [1, 1.05, 1, 1.05, 1] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                } else if (piece.id === 'neck' && puzzleId === 'brachiosaurus') {
                  animateProps = { rotate: [0, 5, 0, -5, 0] }
                  transitionProps = { duration: 3, repeat: 0, ease: "easeInOut" }
                }
              } else {
                animateProps = {
                  scale: piece.isPlaced ? 1 : 1,
                  opacity: piece.isPlaced ? 0.8 : 1,
                }
              }

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
                    transformOrigin: piece.id === 'arm1' || piece.id === 'arm2' ? 'top center' :
                                   piece.id === 'leg1' || piece.id === 'leg2' ? 'top center' :
                                   piece.id === 'tail' ? 'left center' :
                                   piece.id === 'neck' ? 'bottom center' : 'center center',
                  }}
                  drag={!piece.isPlaced && !isAnimating}
                  dragMomentum={false}
                  dragElastic={0}
                  dragPropagation={false}
                  dragConstraints={false}
                  animate={animateProps}
                  transition={transitionProps}
                  onDragStart={(event, info) => {
                    setPieces((prevPieces) =>
                      prevPieces.map((p) =>
                        p.id === piece.id ? { ...p, zIndex: 100 } : p
                      )
                    )
                  }}
                  onDrag={(event, info) => {
                    const newX = piece.x + info.delta.x
                    const newY = piece.y + info.delta.y
                    const distance = Math.sqrt(
                      Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
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
                      setPieces((prevPieces) =>
                        prevPieces.map((p) =>
                          p.id === piece.id ? { ...p, x: finalX, y: finalY, zIndex: 20 } : p
                        )
                      )
                    }
                  }}
                  whileHover={{ scale: piece.isPlaced || isAnimating ? 1 : 1.1 }}
                  whileTap={{ scale: piece.isPlaced || isAnimating ? 1 : 0.95 }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      border: piece.isPlaced ? '4px solid #10b981' : '4px solid transparent',
                      borderRadius: '8px',
                      position: 'relative',
                      cursor: piece.isPlaced ? 'default' : 'grab',
                    }}
                  >
                    {piece.id === 'body' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-400 rounded-full"></div>
                    )}
                    {piece.id === 'body' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-400 rounded-full"></div>
                    )}
                    {piece.id === 'body' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-400 rounded-full"></div>
                    )}
                    {piece.id === 'face' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-red-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-red-600 rounded-b-full"></div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                            <div className="w-2 h-6 bg-white"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'face' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-yellow-500 rounded-full relative">
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                            <div className="w-6 h-24 bg-yellow-600 rounded-full transform rotate-12"></div>
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-24 bg-yellow-600 rounded-full"></div>
                            <div className="absolute top-0 right-0 w-6 h-24 bg-yellow-600 rounded-full transform -rotate-12"></div>
                          </div>
                          <div className="absolute top-12 left-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-12 right-12 w-8 h-8 bg-white rounded-full">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-yellow-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'face' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full relative">
                        <div className="w-full h-full bg-green-500 rounded-full relative">
                          <div className="absolute top-8 left-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute top-8 right-8 w-6 h-6 bg-white rounded-full">
                            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-green-600 rounded-b-full"></div>
                        </div>
                      </div>
                    )}
                    {piece.id === 'arm1' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-45"></div>
                    )}
                    {piece.id === 'arm2' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform -rotate-45"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg1' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full"></div>
                    )}
                    {piece.id === 'leg2' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'tyrannosaurus' && (
                      <div className="w-full h-full bg-red-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'triceratops' && (
                      <div className="w-full h-full bg-yellow-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'tail' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full transform rotate-12"></div>
                    )}
                    {piece.id === 'neck' && puzzleId === 'brachiosaurus' && (
                      <div className="w-full h-full bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              )
            }
            
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
                  setPieces((prevPieces) =>
                    prevPieces.map((p) =>
                      p.id === piece.id ? { ...p, zIndex: 100 } : p
                    )
                  )
                }}
                onDrag={(event, info) => {
                  const newX = piece.x + info.delta.x
                  const newY = piece.y + info.delta.y
                  const distance = Math.sqrt(
                    Math.pow(newX - piece.correctX, 2) + Math.pow(newY - piece.correctY, 2)
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

      {showCompletionPopup && (
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
