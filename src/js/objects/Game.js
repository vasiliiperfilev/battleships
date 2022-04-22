import { cloneDeep } from 'lodash';
import UI from '../UI/UI';
import Gameboard from './Gameboard';
import Player from './Player';

function Game(gb1 = Gameboard(), gb2 = Gameboard()) {
  const ui = UI();
  const player = Player();
  const AI = Player(true);
  let playerGb = cloneDeep(gb1);
  let AiGb = cloneDeep(gb2);
  ui.renderPage(playerGb, AiGb);

  function getGameResult(gameBoard1, gameBoard2) {
    let result;
    if (gameBoard2.ifAllSunk()) result = 'You won!';
    if (gameBoard1.ifAllSunk()) result = 'Computer won!';
    if (gameBoard2.ifAllSunk() && gameBoard1.ifAllSunk()) result = 'Draw!';
    return result;
  }

  document.querySelector('.player2.gameboard').addEventListener('click', (e) => {
    if (e.target.classList.length === 0) {
      AiGb = player.takeTurn(AiGb, ui.getTurnInput(e));
      playerGb = AI.takeTurn(playerGb);
      ui.updateBoards(playerGb, AiGb);
      const result = getGameResult(playerGb, AiGb);
      if (result !== undefined) ui.showResult(result);
    }
  });
  // TODO: create separate AI factory function
}

export default Game;
