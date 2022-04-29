import { cloneDeep } from 'lodash';
import UI from '../UI/UI';
import Gameboard from './Gameboard';
import Player from './Player';

function Game(
  shipsToPlace = [],
  gb1 = Gameboard(),
  gb2 = Gameboard(),
  plr1 = Player(),
  plr2 = Player(true)
) {
  const ui = UI();
  const player1 = cloneDeep(plr1);
  const player2 = cloneDeep(plr2);
  let player1Gb = cloneDeep(gb1);
  let player2Gb = cloneDeep(gb2);
  let activePlayer = null;

  function switchPlayerTurn() {
    activePlayer = activePlayer === player1 ? player2 : player1;
  }

  // function tryPlace(gb, coords) {
  //   try {
  //     gb.addShip(shipsInGame[0], coords);
  //     shipsInGame.shift();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  // function placeShip(event, gb) {
  //   if (gb.getShips().length < shipsInGame.length) {
  //     tryPlace(gb, ui.getTurnInput(event));
  //   } else {
  //     activePlayer = player1;
  //     event.currentTarget.removeEventListener('click', placeShip);
  //   }
  // }

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

  ui.renderPage(player1Gb, player2Gb);
  document.querySelector('.rotate').addEventListener('click', () => {
    player1Gb.changeNextShipDirection();
  });

  function placeShip(event) {
    try {
      player1Gb = player1Gb.addShip(shipsToPlace[0], ui.getTurnInput(event));
      shipsToPlace.shift();
      if (shipsToPlace.length === 0) {
        activePlayer = player1;
        ui.hideRotateBtn();
        event.currentTarget.removeEventListener('click', placeShip);
      }
    } catch (err) {
      console.log(err.message);
    }
    ui.updateBoard(player1Gb, event.currentTarget);
  }

  document.querySelector('.player1.gameboard').addEventListener('click', placeShip);

  if (shipsToPlace.length === 0) {
    activePlayer = player1;
    ui.hideRotateBtn();
    document.querySelector('.player1.gameboard').removeEventListener('click', placeShip);
  }

  document.querySelector('.player1.gameboard').addEventListener('click', (event) => {
    if (
      !event.target.classList.contains('hit') &&
      !event.target.classList.contains('miss') &&
      activePlayer === player2
    ) {
      player1Gb = playRound(player2, player1Gb, event);
      const result = getGameResult(player1Gb.ifAllSunk(), player2Gb.ifAllSunk());
      if (result !== undefined) ui.showResult(result);
    }
  });

  document.querySelector('.player2.gameboard').addEventListener('click', (event) => {
    if (
      !event.target.classList.contains('hit') &&
      !event.target.classList.contains('miss') &&
      activePlayer === player1
    ) {
      player2Gb = playRound(player1, player2Gb, event);
      if (player2.isAI) document.querySelector('.player1.gameboard').click();
    }
  });

  document.querySelector('.restart').addEventListener('click', () => {
    Game();
  });
}

export default Game;
