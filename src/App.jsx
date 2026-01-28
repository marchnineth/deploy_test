import { useState } from 'react'
import Intro from './components/Intro'
import WorldMap from './components/WorldMap'
import PuzzleGame from './components/PuzzleGame'

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro')
  const [selectedPuzzle, setSelectedPuzzle] = useState(null)

  const handleStart = () => {
    setCurrentScreen('worldMap')
  }

  const handlePuzzleSelect = (puzzleId) => {
    setSelectedPuzzle(puzzleId)
    setCurrentScreen('puzzle')
  }

  const handleBackToMap = () => {
    setCurrentScreen('worldMap')
    setSelectedPuzzle(null)
  }

  return (
    <div className="w-full h-full">
      {currentScreen === 'intro' && <Intro onStart={handleStart} />}
      {currentScreen === 'worldMap' && (
        <WorldMap onPuzzleSelect={handlePuzzleSelect} />
      )}
      {currentScreen === 'puzzle' && (
        <PuzzleGame
          puzzleId={selectedPuzzle}
          onBack={handleBackToMap}
        />
      )}
    </div>
  )
}

export default App
