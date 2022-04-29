/**
 * @jest-environment jsdom
 */
import Game from '../../objects/Game';
import Gameboard from '../../objects/Gameboard';
import Player from '../../objects/Player';

describe('Player vs AI ship placement', () => {
  beforeEach(() => {
    const playerGb = Gameboard([5, 4, 3, 3, 2]);
    const AiGb = Gameboard([5, 4, 3, 3, 2]);
    Game(playerGb, AiGb);
    // place 5 ships horizontaly
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[20].click();
    document.querySelector('.player1.gameboard').children[40].click();
    document.querySelector('.player1.gameboard').children[60].click();
    // last ship is vertical
    document.querySelector('.rotate').click();
    document.querySelector('.player1.gameboard').children[66].click();
  });

  test('5 square ship placed horizontaly', () => {
    for (let i = 0; i < 5; i += 1) {
      expect(
        document.querySelector('.player1.gameboard').children[i].classList.contains('ship')
      ).toBe(true);
    }
  });

  test('4 square ship placed horizontaly', () => {
    for (let i = 20; i < 24; i += 1) {
      expect(
        document.querySelector('.player1.gameboard').children[i].classList.contains('ship')
      ).toBe(true);
    }
  });

  test('First 3 square ship placed horizontaly', () => {
    for (let i = 40; i < 43; i += 1) {
      expect(
        document.querySelector('.player1.gameboard').children[i].classList.contains('ship')
      ).toBe(true);
    }
  });

  test('Second 3 square ship placed horizontaly', () => {
    for (let i = 60; i < 63; i += 1) {
      expect(
        document.querySelector('.player1.gameboard').children[i].classList.contains('ship')
      ).toBe(true);
    }
  });

  test('2 square ship placed verticaly', () => {
    expect(
      document.querySelector('.player1.gameboard').children[66].classList.contains('ship')
    ).toBe(true);
    expect(
      document.querySelector('.player1.gameboard').children[76].classList.contains('ship')
    ).toBe(true);
  });

  test('Rotate button is hidden', () => {
    expect(document.querySelector('.rotate').classList.contains('hidden')).toBe(true);
  });
});

describe('Player 1 turns vs AI and wins', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    const playerGb = Gameboard([3]);
    const AiGb = Gameboard([2]);
    playerGb.addShip(3, [0, 0]);
    AiGb.addShip(2, [0, 0]);
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
    document.querySelector('.player2.gameboard').children[1].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 1 won!');
  });
});

describe('Player 2 wins or draw', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    const player1Gb = Gameboard([2]);
    const player2Gb = Gameboard([2]);
    player1Gb.addShip(2, [0, 0]);
    player2Gb.addShip(2, [0, 0]);
    Game(player1Gb, player2Gb, Player(), Player());
  });

  test('Player 2 wins', () => {
    // Players turns to simulate Player 2 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[2].click();
    document.querySelector('.player1.gameboard').children[1].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 2 won!');
  });

  test('Draw', () => {
    // Players turns to simulate Player 2 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[1].click();
    document.querySelector('.player1.gameboard').children[1].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Draw!');
  });
});

test('Restart', () => {
  let playerGb = Gameboard([3]);
  let AiGb = Gameboard([2]);
  playerGb = playerGb.addShip(3, [0, 0]);
  AiGb = AiGb.addShip(2, [0, 0]);
  Game(playerGb, AiGb);
  document.querySelector('.player2.gameboard').children[0].click();
  document.querySelector('.player2.gameboard').children[1].click();
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
