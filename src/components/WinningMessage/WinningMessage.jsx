import React from 'react'
import './WinningMessage.css'

const WinningMessage = ({winner, onRestart}) => {
    return (
        <div className='winning-message'>
            <p>{winner}</p>
            <button onClick={onRestart}>Reiniciar</button>
        </div>
    )
}

export default WinningMessage
