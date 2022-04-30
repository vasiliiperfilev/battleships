import { cloneDeep } from 'lodash';
import UI from '../UI/UI';
import Gameboard from './Gameboard';
import Player from './Player';

function Game(gb1 = Gameboard(), gb2 = Gameboard(), plr1 = Player(), plr2 = Player(true)) {
  const ui = UI();
  const player1 = cloneDeep(plr1);
  const player2 = cloneDeep(plr2);
  const player1Gb = cloneDeep(gb1);
  const player2Gb = cloneDeep(gb2);
  let activePlayer = player1;

  function switchPlayerTurn() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  function playRound(player, enemyGb, event) {
    try {
      player.takeTurn(enemyGb, ui.getTurnInput(event));
      switchPlayerTurn();
      ui.updateBoard(enemyGb, event.currentTarget);
    } catch (err) {
      console.log(err.message);
    }
  }

  function getGameResult(isAllSunkPlayer1, isAllSunkPlayer2) {
    let result;
    if (isAllSunkPlayer1) result = 'Player 2 won!';
    if (isAllSunkPlayer2) result = 'Player 1 won!';
    if (isAllSunkPlayer2 && isAllSunkPlayer1) result = 'Draw!';
    return result;
  }

  ui.renderPage(player1Gb, player2Gb);

  document
    .querySelector('.rotate')
    .addEventListener('click', () => player1Gb.changeNextShipDirection());

  function placeShip(gb, event) {
    try {
      gb.addShip(null, ui.getTurnInput(event));
    } catch (err) {
      console.log(err.message);
    }
    ui.updateBoard(gb, event.currentTarget);
  }

  function startTurnsPhase(event, oldHandler) {
    activePlayer = player1;
    ui.hideRotateBtn();
    event.currentTarget.removeEventListener('click', oldHandler);
  }

  if (player1Gb.getShipsToPlaceLengths().length > 0) {
    activePlayer = null;
    document
      .querySelector('.player1.gameboard')
      .addEventListener('click', function prepPhaseHandler(event) {
        placeShip(player1Gb, event);
        if (player1Gb.getShipsToPlaceLengths().length === 0)
          startTurnsPhase(event, prepPhaseHandler);
      });
  }

  document.querySelector('.player1.gameboard').addEventListener('click', (event) => {
    if (activePlayer === player2) {
      playRound(player2, player1Gb, event);
      const result = getGameResult(player1Gb.ifAllSunk(), player2Gb.ifAllSunk());
      if (result !== undefined) ui.showResult(result);
    }
  });

  document.querySelector('.player2.gameboard').addEventListener('click', (event) => {
    if (activePlayer === player1) {
      playRound(player1, player2Gb, event);
      if (player2.isAI) document.querySelector('.player1.gameboard').click();
    }
  });

  document.querySelector('.restart').addEventListener('click', () => {
    Game();
  });
}

export default Game;
