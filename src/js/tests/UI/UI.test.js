/**
 * @jest-environment jsdom
 */
import Gameboard from '../../objects/Gameboard';
import UI from '../../UI/UI';

let ui;
let gb1;
let gb2;
beforeEach(() => {
  ui = UI();
  gb1 = Gameboard();
  gb2 = Gameboard();
  gb1 = gb1.addShip(2, 0, [0, 0]);
  gb2 = gb2.addShip(2, 0, [0, 0]);
  ui.renderPage(gb1, gb2);
});

test('Page render', () => {
  expect(document.body.querySelector('header').textContent).toEqual('BATTLESHIPS');
  expect(document.body.querySelector('footer')).toBeDefined();
  // check all squares to be added
  expect(document.body.querySelector('.player1.gameboard').children.length).toBe(100);
  expect(document.body.querySelector('.player2.gameboard').children.length).toBe(100);
  // player ships visible
  const playerShip = [...document.querySelector('.player1.gameboard').children].filter((child) =>
    child.classList.contains('ship')
  );
  expect(playerShip.length).toBe(2);
  // AI ships invisible
  const aiShip = [...document.querySelector('.player2.gameboard').children].filter((child) =>
    child.classList.contains('ship')
  );
  expect(aiShip.length).toBe(0);
});

test('AI ships are hidden', () => {
  [...document.querySelector('.player2.gameboard').children].forEach((child) => {
    // no class added to mark ship squares
    expect(child.classList.length).toBe(0);
  });
});

test('New board state render', () => {
  // do hit attack
  gb1 = gb1.receiveAttack([0, 0]);
  // rerender gameboard
  ui.renderPage(gb1, gb2);
  // check if state of the first square changed
  expect(document.body.querySelector('.player1.gameboard').children[0].classList[0]).toBe('hit');
});

test('Get input when clicked', () => {
  expect(ui.getTurnInput({ target: { dataset: { x: 0, y: 0 } } })).toStrictEqual([0, 0]);
  ui.getTurnInput({ target: { dataset: { x: 0, y: 0 } } }).forEach((elem) => {
    expect(typeof elem === 'number').toBe(true);
  });
});
