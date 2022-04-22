import Player from '../../objects/Player';
import Gameboard from '../../objects/Gameboard';

let player;
let AI;
let gb;
beforeEach(() => {
  player = Player();
  AI = Player(true);
  gb = Gameboard();
  gb = gb.addShip(2, 0, [0, 0]);
});

describe('testing player turn', () => {
  test('Hit turns', () => {
    expect(gb.ifAllSunk()).toBe(false);
    gb = player.takeTurn(gb, [0, 0]);
    gb = player.takeTurn(gb, [1, 0]);
    expect(gb.ifAllSunk()).toBe(true);
  });

  test('Miss turns', () => {
    expect(gb.ifAllSunk()).toBe(false);
    gb = player.takeTurn(gb, [0, 0]);
    gb = player.takeTurn(gb, [0, 1]);
    expect(gb.ifAllSunk()).toBe(false);
  });

  test('AI 1 turn', () => {
    expect(AI.takeTurn(gb)).toBeDefined();
  });

  test('AI all turns', () => {
    for (let i = 0; i < 100; i += 1) {
      gb = AI.takeTurn(gb);
    }
    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        // all squares were hit by AI
        expect(gb.getBoardSquare([i, j]).position).toBeTruthy();
      }
    }
  });
});
