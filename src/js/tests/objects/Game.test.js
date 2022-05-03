/**
 * @jest-environment jsdom
 */
import Game from '../../objects/Game';
import Gameboard from '../../objects/Gameboard';
import Player from '../../objects/Player';

describe('Player vs AI ship placement', () => {
  beforeEach(() => {
    const gb1 = Gameboard([5, 4, 3, 3, 2]);
    const gb2 = Gameboard([5, 4, 3, 3, 2]);
    const plr1 = Player('player1');
    const plr2 = Player('player2', true);
    Game({ gb1, gb2, plr1, plr2 });
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

describe('Player 1 turns vs AI', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    const gb1 = Gameboard([3]);
    const gb2 = Gameboard([2]);
    const plr1 = Player('player1');
    const plr2 = Player('player2', true);
    Game({ gb1, gb2, plr1, plr2 });
    // placing ships
    document.querySelector('.player1.gameboard').children[0].click();
  });

  test('One turn Player vs AI', () => {
    document.querySelector('.player2.gameboard').children[0].click();
    // miss to give turn to AI
    document.querySelector('.player2.gameboard').children[9].click();
    // hit class added to the clicked square of player2(AI) board
    expect(
      ['hit', 'miss'].includes(
        document.querySelector('.player2.gameboard').children[0].classList[0]
      )
    ).toBe(true);
    // AI made 1 turn or more (if hit) too
    expect(
      [...document.querySelector('.player1.gameboard').children].reduce((prev, child) => {
        if (child.classList.contains('hit') || child.classList.contains('miss')) return prev + 1;
        return prev;
      }, 0) >= 1
    ).toBe(true);
  });
});

describe('Game results', () => {
  beforeEach(() => {
    // game created with predefined ships positions
    const gb1 = Gameboard([2]);
    const gb2 = Gameboard([2]);
    const plr1 = Player('player1');
    const plr2 = Player('player2');
    Game({ gb1, gb2, plr1, plr2 });
    // placing ships
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[0].click();
  });

  test('Player1 wins', () => {
    // Players turns to simulate Player 1 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[9].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[12].click();
    document.querySelector('.player2.gameboard').children[1].click();
    document.querySelector('.player1.gameboard').children[13].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 1 won!');
  });

  test('Player 2 wins', () => {
    // Players turns to simulate Player 2 win
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[9].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[1].click();
    document.querySelector('.player2.gameboard').children[12].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Player 2 won!');
  });

  test('Draw', () => {
    // Players turns to simulate draw
    document.querySelector('.player2.gameboard').children[0].click();
    document.querySelector('.player2.gameboard').children[9].click();
    document.querySelector('.player1.gameboard').children[0].click();
    document.querySelector('.player1.gameboard').children[9].click();
    document.querySelector('.player2.gameboard').children[1].click();
    document.querySelector('.player1.gameboard').children[1].click();
    expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
    expect(document.querySelector('.result > span').textContent).toBe('Draw!');
  });
});

test('Restart', () => {
  const gb1 = Gameboard([3]);
  const gb2 = Gameboard([2]);
  gb2.addShip(2, [0, 0]);
  const plr1 = Player('player1');
  const plr2 = Player('player2', true);
  Game({ gb1, gb2, plr1, plr2 });
  // placing ships
  document.querySelector('.player1.gameboard').children[0].click();
  // attacks
  document.querySelector('.player2.gameboard').children[0].click();
  document.querySelector('.player2.gameboard').children[1].click();
  // restart
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
