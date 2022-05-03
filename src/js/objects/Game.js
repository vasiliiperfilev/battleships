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
  let activePlayerGb = player1Gb;
  // returns if both boards has their ships placed
  const canStart = () =>
    player1Gb.getShipsToPlaceLeft() === 0 && player2Gb.getShipsToPlaceLeft() === 0;

  // switches active player, updates UI and triggers AI action if required
  function switchActivePlayer(AIlistenerElement) {
    // hide current active player ships
    ui.hideShips(ui.getPlayerGb(activePlayer.getName()));
    activePlayer = activePlayer === player1 ? player2 : player1;
    activePlayerGb = activePlayerGb === player1Gb ? player2Gb : player1Gb;
    // show new active player ships
    ui.updateBoard(activePlayerGb, ui.getPlayerGb(activePlayer.getName()));
    // triggers AI action if any
    if (activePlayer === player2 && player2.isAI) AIlistenerElement.click();
  }
  // returns game result if any or undefined otherwise
  function getGameResult(isAllSunkPlayer1, isAllSunkPlayer2) {
    let result;
    if (isAllSunkPlayer1) result = 'Player 2 won!';
    if (isAllSunkPlayer2) result = 'Player 1 won!';
    if (isAllSunkPlayer2 && isAllSunkPlayer1) result = 'Draw!';
    return result;
  }
  // attacks clicked square, updates UI, switches active player and repeat AI attack if AI hit before
  function attackHandler(event, opponentGb, player) {
    if (player === activePlayer) {
      const wasShipHit = player.takeTurn(opponentGb, ui.getTurnInput(event));
      ui.updateBoard(opponentGb, event.currentTarget);
      // hide opponent gb ships after update
      ui.hideShips(event.currentTarget);
      if (!wasShipHit || opponentGb.ifAllSunk())
        switchActivePlayer(ui.getPlayerGb(player1.getName()));
      if (player.isAI && wasShipHit) attackHandler(event, opponentGb, player);
    }
  }

  // hide preparation phase UI, setup attack event listeners and restart button
  function setupAttackPhase() {
    ui.hideRotateBtn();
    // check for game results after player 2 turn
    ui.getPlayerGb(player1.getName()).addEventListener('click', (event) => {
      attackHandler(event, player1Gb, player2);
      const result = getGameResult(player1Gb.ifAllSunk(), player2Gb.ifAllSunk());
      if (result !== undefined) ui.showResult(result);
    });
    ui.getPlayerGb(player2.getName()).addEventListener('click', (event) => {
      attackHandler(event, player2Gb, player1);
    });
    document.querySelector('.restart').addEventListener('click', () => {
      Game({});
    });
  }
  // hides player ships, remove preparation phase event listeners and switch active player
  function finishPlayerPreparation(event) {
    ui.hideShips(event.currentTarget);
    ui.copyWithoutEventListeners(event.currentTarget);
    switchActivePlayer(ui.getPlayerGb(player2.getName()));
  }
  // places ship on click coords and updates UI
  function preparationHandler(event, gb, player) {
    if (gb.getShipsToPlaceLeft() > 0 && player === activePlayer) {
      player.placeShip(gb, ui.getTurnInput(event));
      ui.updateBoard(gb, event.currentTarget);
      // if can start the game finish this player preparation and setup attack phase
      if (canStart()) {
        finishPlayerPreparation(event);
        setupAttackPhase();
        // else if all ships were placed but can't start yet finish this player preparation
      } else if (gb.getShipsToPlaceLeft() === 0) {
        finishPlayerPreparation(event);
      }
    }
  }

  // setup preparation event listeners - ship placements and a potential ship shadow on mouseover
  function setupPreparationPhase() {
    ui.getPlayerGb(player1.getName()).addEventListener('mouseover', (event) => {
      ui.mouseMoveHandler(event.target, player1Gb);
    });
    ui.getPlayerGb(player1.getName()).addEventListener('mouseout', (event) => {
      ui.mouseMoveHandler(event.target, player1Gb);
    });
    ui.getPlayerGb(player1.getName()).addEventListener('click', (event) => {
      preparationHandler(event, player1Gb, player1);
    });
    ui.getPlayerGb(player2.getName()).addEventListener('click', (event) => {
      preparationHandler(event, player2Gb, player2);
    });
  }

  // start game
  ui.renderPage(player1Gb, player2Gb, player1.getName(), player2.getName());
  setupPreparationPhase();
}

export default Game;
