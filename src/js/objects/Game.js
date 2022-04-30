import UI from '../UI/UI';
import Gameboard from './Gameboard';
import Player from './Player';

function Game(options) {
  const ui = UI();
  const player1 = options.plr1 || Player('player1');
  const player2 = options.plr2 || Player('player2', true);
  const player1Gb = options.gb1 || Gameboard();
  const player2Gb = options.gb2 || Gameboard();
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

  ui.renderPage(player1Gb, player2Gb, player1.getName(), player2.getName());

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

  function startTurnsPhase(event, placeShipsHandler) {
    player2Gb.placeShipsRandomly();
    activePlayer = player1;
    ui.hideRotateBtn();
    event.currentTarget.removeEventListener('click', placeShipsHandler);
  }

  if (player1Gb.shipsToPlaceLeft() > 0) {
    activePlayer = null;
    document
      .querySelector('.player1.gameboard')
      .addEventListener('click', function prepPhaseHandler(event) {
        placeShip(player1Gb, event);
        if (player1Gb.shipsToPlaceLeft() === 0) startTurnsPhase(event, prepPhaseHandler);
      });
    document.querySelector('.player1.gameboard').addEventListener('mouseover', (event) => {
      ui.mouseMoveHandler(event.target, player1Gb);
    });
    document.querySelector('.player1.gameboard').addEventListener('mouseout', (event) => {
      ui.mouseMoveHandler(event.target, player1Gb);
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
      if (player2.isAI) ui.hideShips(event.currentTarget);
      if (player2.isAI) document.querySelector('.player1.gameboard').click();
    }
  });

  document.querySelector('.restart').addEventListener('click', () => {
    Game({});
  });
}

export default Game;
