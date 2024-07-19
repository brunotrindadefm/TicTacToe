import React, { useEffect } from 'react'
import './JogoDaVelha.css'

const JogoDaVelha = ({onWin, resetGame}) => {

  useEffect(() => {
    const cellElements = document.querySelectorAll("[data-cell]");
    const board = document.querySelector('[data-board]');

    let isXTurn;
    let isGameOver = false;

    const winningCombinations = [
      // horizontal
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // vertical
      [0,3,6],
      [1,4,7],
      [2,5,8],
      // diagonal 
      [0,4,8],
      [2,4,6]
    ];

    const startGame = () => {
      for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, { once: true })
      };

      isXTurn = true;
      isGameOver = false;

      board.classList.add('x')
    };

    const endGame = (isDraw) => {
        if(isDraw) {
          onWin('empate!')
        } else {
          onWin(isXTurn ? 'x venceu!' : 'o venceu!')
        }
        isGameOver = true;
    } 

    const checkForWin = (currentPlayer) => {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentPlayer);
        })
      });
   };

   const checkForDraw = () => {
    return [...cellElements].every((cell) => {
      return cell.classList.contains('x') || cell.classList.contains('circle');
    });
  };

    const placeMark = (cell, classToAdd) => {
      cell.classList.add(classToAdd);
    };

    const swapTurns = () => {
      isXTurn = !isXTurn;

      board.classList.remove('circle');
      board.classList.remove('x')

      if (isXTurn) {
        board.classList.add('x')
      } else {
        board.classList.add('circle')
      };
    };

    const handleClick = (e) => {
      if (isGameOver) return;

      const cell = e.target;
      const classToAdd = isXTurn ? 'x' : 'circle';

      placeMark(cell, classToAdd);

      const isWin = checkForWin(classToAdd);
      if (isWin) {
        endGame(false);
        return;
      }

      const isDraw = checkForDraw();
      if (isDraw) {
        endGame(true);
        return;
      }

      swapTurns();

    };

    startGame();

    return () => {
      for (const cell of cellElements) {
        cell.removeEventListener('click', handleClick);
      }
    };

  }, [onWin, resetGame]);

  useEffect(() => {
    if (resetGame) {
      const cellElements = document.querySelectorAll('[data-cell]');
      const board = document.querySelector('[data-board]');

      for (const cell of cellElements) {
        cell.classList.remove('x', 'circle');
      }

      startGame();
    }
  }, [resetGame]);

  return (

    <div className='board' data-board>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
      <div className="cell" data-cell></div>
    </div>

  )
}

export default JogoDaVelha
