import React, { useEffect } from 'react'
import './JogoDaVelha.css'

const JogoDaVelha = ({ onWin, resetGame }) => {


  // UseEffect usado para inicializar o jogo da velha e lidar com o estado do jogo
  useEffect(() => {
    const cellElements = document.querySelectorAll("[data-cell]");
    const board = document.querySelector('[data-board]');

    let isXTurn;

    // Combinações para possíveis vitórias
    const winningCombinations = [
      // horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal 
      [0, 4, 8],
      [2, 4, 6]
    ];

    const startGame = () => {
      // Adiciona um evento de clique a cada cell e chama a função handleClick
      for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, { once: true })
      };

      // Adiciona no board a classe x, para ter o efeito de hover
      board.classList.add('x')

      // Começa com o turno do x
      isXTurn = true;
    };

    // Função do fim de jogo
    // Se isDraw for verdadeiro o jogo termina empatado, se não, 
    // pega em qual turno estava quando alguma classe esteve em alguma das combinações de vitória 
    const endGame = (isDraw) => {
      if (isDraw) {
        onWin('empate!')
      } else {
        onWin(isXTurn ? 'x venceu!' : 'o venceu!')
      }
    }

    // Esta função verifica se o jogador atual (X ou O) tem uma combinação vencedora.
    // Ela usa o método some para verificar se alguma das winningCombinations é verdadeira para o jogador atual. 
    // Para cada combinação, o método every verifica se todas as cell na combinação contêm a classe do jogador atual (currentPlayer).
    const checkForWin = (currentPlayer) => {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentPlayer);
        })
      });
    };

    // Se todos os cell estiverem com a classe X ou O, e não estavam nas combinações de vitória
    // checkForDraw retorna true
    const checkForDraw = () => {
      return [...cellElements].every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
      });
    };


    // Função para trocar turnos
    const swapTurns = () => {
      // se isXTurn for verdadeiro vira falso, vice versa
      isXTurn = !isXTurn;

      board.classList.remove('circle');
      board.classList.remove('x')

      if (isXTurn) {
        // Se isXTurn for true, ou seja, está no turno do X adiciona a classe x ao cell
        board.classList.add('x')
      } else {
        // Se não estiver no turno do x, é adicionado a classe circle para o cell
        board.classList.add('circle')
      };
    };

    const handleClick = (e) => {

      // cell será igual ao cell em qual foi ativado o evento (e) de clique
      const cell = e.target;
      // Se isXTurn for verdadeiro, classToAdd será igual x, se não, será igual circle
      const classToAdd = isXTurn ? 'x' : 'circle';

      // Determinando a classe do turno que estiver para o cell
      cell.classList.add(classToAdd);

      // Se houver vitória, o jogo acaba, e é passado como props a mensagem de vitória acompanhado se foi X ou O para o winningMessage
      const isWin = checkForWin(classToAdd);
      if (isWin) {
        endGame(false);
        return;
      }

      // Se houver empate, o jogo acaba, e é passado como props a mensagem de empate para o winningMessage
      const isDraw = checkForDraw();
      if (isDraw) {
        endGame(true);
        return;
      }

      swapTurns();

    };

    // Função para resetar o jogo quando acaba
    const reset = () => {
      for (const cell of cellElements) {
        // Remove todas as classes x e circle dos cell e remove o evento de clique
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click', handleClick);
      }
      board.classList.remove('circle');
      board.classList.remove('x')
    };

    // Se a props passada do app, que é acionada quando o botão resetar do winningMessage é clicado for true, o jogo reinicia
    if (resetGame) {
      reset();
      startGame();
    } else {
      startGame();
    }

    // Função de limpeza para limpar eventos
    return () => {
      reset();
    };


  }, [onWin, resetGame]);

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
