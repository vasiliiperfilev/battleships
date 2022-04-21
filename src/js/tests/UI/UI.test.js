/**
 * @jest-environment jsdom
 */
import Gameboard from '../../objects/Gameboard';
import UI from '../../UI/UI';

let ui;
let gb1;
let gb2;
beforeEach(() => {
  ui = UI('player1', 'player2');
});

test('Page render', () => {
  gb1 = Gameboard();
  gb2 = Gameboard();
  ui.renderPage(gb1, gb2);
  expect(document.body.querySelector('header').textContent).toEqual('BATTLESHIPS');
  expect(document.body.querySelector('footer')).toBeDefined();
  // check all squares to be added
  expect(document.body.querySelector('.player1').children.length).toBe(100);
  expect(document.body.querySelector('.player2').children.length).toBe(100);
});

test('New board state render', () => {
  gb1 = Gameboard();
  gb2 = Gameboard();
  ui.renderPage(gb1, gb2);
  // do miss attack
  gb1 = gb1.receiveAttack([0, 0]);
  // rerender gameboard
  ui.renderNewGbDiv(document.querySelector('.player1'), gb1, 'player1');
  // check if state of the first square changed
  expect(document.body.querySelector('.player1').children[0].classList[0]).toBe('miss');
});

test('Get input when clicked', () => {
  expect(ui.getTurnInput({ target: { dataset: { x: 0, y: 0 } } })).toStrictEqual([0, 0]);
});
