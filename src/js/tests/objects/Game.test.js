/**
 * @jest-environment jsdom
 */
import Game from '../../objects/Game';
import Gameboard from '../../objects/Gameboard';
import Player from '../../objects/Player';

describe('Player 1 turns vs AI and wins', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    let playerGb = Gameboard();
    let AiGb = Gameboard();
    playerGb = playerGb.addShip(3, 0, [0, 0]);
    AiGb = AiGb.addShip(2, 0, [0, 0]);
    Game(playerGb, AiGb);
  });

  test('One turn Player vs AI', () => {
    document.querySelector('.player2.gameboard').children[0].click();
    // hit class added to the clicked square of player2(AI) board
    expect(document.querySelector('.player2.gameboard').children[0].classList[0]).toBe('hit');
    // AI made 1 turn too
    expect(
      [...document.querySelector('.player1.gameboard').children].reduce((prev, child) => {
        if (child.classList.contains('hit') || child.classList.contains('miss')) return prev + 1;
        return prev;
      }, 0)
    ).toBe(1);
  });

  test('Player wins', () => {
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(true);
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[10].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 1 won!');
  });
});

describe('Player 2 wins or draw', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    let player1Gb = Gameboard();
    let player2Gb = Gameboard();
    player1Gb = player1Gb.addShip(2, 0, [0, 0]);
    player2Gb = player2Gb.addShip(2, 0, [0, 0]);
    Game(player1Gb, player2Gb, Player(), Player());
  });

  test('Player 2 wins', () => {
    // Players turns to simulate Player 2 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[11].click();
    document.querySelector('.player1.gameboard').children[10].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 2 won!');
  });

  test('Draw', () => {
    // Players turns to simulate Player 2 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[10].click();
    document.querySelector('.player1.gameboard').children[10].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Draw!');
  });
});

test('Restart', () => {
  let playerGb = Gameboard();
  let AiGb = Gameboard();
  playerGb = playerGb.addShip(3, 0, [0, 0]);
  AiGb = AiGb.addShip(2, 0, [0, 0]);
  Game(playerGb, AiGb);
  document.querySelector('.player2.gameboard').children[0].click();
  document.querySelector('.player2.gameboard').children[10].click();
  document.querySelector('.restart').click();
  // result hidden
  expect(document.querySelector('.result').classList.contains('hidden')).toBe(true);
  // no attacks were made
  expect(
    [...document.querySelector('.player1.gameboard').children].reduce((prev, child) => {
      if (child.classList.contains('hit') || child.classList.contains('miss')) return prev + 1;
      return prev;
    }, 0)
  ).toBe(0);
  expect(
    [...document.querySelector('.player2.gameboard').children].reduce((prev, child) => {
      if (child.classList.contains('hit') || child.classList.contains('miss')) return prev + 1;
      return prev;
    }, 0)
  ).toBe(0);
});
