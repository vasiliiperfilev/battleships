import Player from '../../objects/Player';
import Gameboard from '../../objects/Gameboard';

let player;
let AI;
let gb;
beforeEach(() => {
  player = Player();
  AI = Player(true);
  gb = Gameboard([5, 4, 3, 3, 2]);
  gb.addShip(2, [0, 0]);
});

describe('testing correct turns', () => {
  test('Hit turns', () => {
    expect(gb.ifAllSunk()).toBe(false);
    player.takeTurn(gb, [0, 0]);
    player.takeTurn(gb, [1, 0]);
    expect(gb.ifAllSunk()).toBe(true);
  });

  test('Miss turns', () => {
    expect(gb.ifAllSunk()).toBe(false);
    player.takeTurn(gb, [0, 0]);
    player.takeTurn(gb, [0, 1]);
    expect(gb.ifAllSunk()).toBe(false);
  });

  test('AI all turns', () => {
    for (let i = 0; i < 100; i += 1) {
      AI.takeTurn(gb);
    }
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        // all squares were hit by AI, no nulls
        expect(gb.getShipPosition(i, j)).toBeTruthy();
      }
    }
  });
});

describe('testing incorrect turns', () => {
  test('Same square turns', () => {
    player.takeTurn(gb, [0, 0]);
    expect(() => player.takeTurn(gb, [0, 0])).toThrow();
  });

  test('Incorrect coords', () => {
    expect(() => player.takeTurn(gb, [10, 10])).toThrow();
  });
});
