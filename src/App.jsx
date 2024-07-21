import JogoDaVelha from './components/JogoDaVelha/JogoDaVelha'
import './index.css'
import WinningMessage from './components/WinningMessage/WinningMessage'
import { useState, } from 'react'

function App() {

  const [winner, setWinner] = useState('')
  const [reset, setReset] = useState(false)

  const handleWin = (winner) => {
    setWinner(winner)
  }

  const handleRestart = () => {
    setWinner(''); 
    setReset(true);
  }

  return (
    <div className='app'>
      {winner && (
        <WinningMessage winner={winner} onRestart={handleRestart}/>
      )}
      <JogoDaVelha onWin={handleWin} resetGame={reset}/>
    </div>
  )
}

export default App
