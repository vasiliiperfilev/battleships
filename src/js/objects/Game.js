import { cloneDeep } from 'lodash';
import UI from '../UI/UI';
import Gameboard from './Gameboard';
import Player from './Player';

function Game(gb1 = Gameboard(), gb2 = Gameboard(), plr1 = Player(), plr2 = Player(true)) {
  const ui = UI();
  const player1 = cloneDeep(plr1);
  const player2 = cloneDeep(plr2);
  let player1Gb = cloneDeep(gb1);
  let player2Gb = cloneDeep(gb2);
  let activePlayer = player1;
  ui.renderPage(player1Gb, player2Gb);

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => activePlayer;

  function playRound(player, enemyGb, event) {
    const newGb = player.takeTurn(enemyGb, ui.getTurnInput(event));
    switchPlayerTurn();
    ui.updateBoard(newGb, event.currentTarget);
    return newGb;
  }

  function getGameResult(isAllSunkPlayer1, isAllSunkPlayer2) {
    let result;
    if (isAllSunkPlayer1) result = 'Player 2 won!';
    if (isAllSunkPlayer2) result = 'Player 1 won!';
    if (isAllSunkPlayer2 && isAllSunkPlayer1) result = 'Draw!';
    return result;
  }

  document.querySelector('.player1.gameboard').addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('hit') &&
      !e.target.classList.contains('miss') &&
      getActivePlayer() === player2
    ) {
      player1Gb = playRound(player2, player1Gb, e);
      const result = getGameResult(player1Gb.ifAllSunk(), player2Gb.ifAllSunk());
      if (result !== undefined) ui.showResult(result);
    }
  });

  document.querySelector('.player2.gameboard').addEventListener('click', (e) => {
    if (
      !e.target.classList.contains('hit') &&
      !e.target.classList.contains('miss') &&
      getActivePlayer() === player1
    ) {
      player2Gb = playRound(player1, player2Gb, e);
      if (player2.isAI) document.querySelector('.player1.gameboard').click();
    }
  });

  document.querySelector('.restart').addEventListener('click', () => {
    Game(gb1, gb2, plr1, plr2);
  });
}

export default Game;
