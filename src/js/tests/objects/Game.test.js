/**
 * @jest-environment jsdom
 */
import Game from '../../objects/Game';
import Gameboard from '../../objects/Gameboard';

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
    // hit or miss class added to a square of player1 board
    [...document.querySelector('.player1.gameboard').children].some(
      (child) => child.classList.contains('hit') || child.classList.contains('miss')
    )
  ).toBe(true);
});

test('Player wins', () => {
  expect(document.querySelector('.result').classList.contains('hidden')).toBe(true);
  document.querySelector('.player2.gameboard').children[0].click();
  document.querySelector('.player2.gameboard').children[10].click();
  expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
  expect(document.querySelector('.result > span').textContent).toBe('You won!');
});

test('AI wins or draw', () => {
  // 99 turns by player leaving 1 AI ship square;
  for (let i = 1; i < 100; i += 1) {
    document.querySelector('.player2.gameboard').children[i].click();
  }
  // hit last AI ship in last possible turn
  document.querySelector('.player2.gameboard').children[0].click();
  // expect draw or AI won
  expect(document.querySelector('.result').classList.contains('hidden')).toBe(false);
  expect(
    document.querySelector('.result > span').textContent === 'Computer won!' ||
      document.querySelector('.result > span').textContent === 'Draw!'
  ).toBeTruthy();
});
