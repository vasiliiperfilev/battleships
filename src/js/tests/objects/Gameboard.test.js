import Gameboard from '../../objects/Gameboard';

let gb;
beforeEach(() => {
  gb = new Gameboard();
});

describe('testing ship placement', () => {
  test('Normal placement by x ax', () => {
    expect(gb.addShip(4, 0, [0, 0])).toBe(true);
    [0, 1, 2, 3].forEach((x) => {
      expect(gb.getState([x, 0]).shipKey).toBe(0);
      expect(gb.getState([x, 0]).position).toBe(x);
    });
  });

  test('Normal placement by y ax', () => {
    expect(gb.addShip(4, 1, [0, 0])).toBe(true);
    [0, 1, 2, 3].forEach((y) => {
      expect(gb.getState([0, y]).shipKey).toBe(0);
      expect(gb.getState([0, y]).position).toBe(y);
    });
  });

  test('Out of bound placement', () => {
    expect(gb.addShip(4, 0, [9, 9])).toBe(false);
    expect(gb.getState([9, 9]).shipKey).toBe(null);
    expect(gb.getState([9, 9]).position).toBe(null);
  });

  test('Ship cross placement', () => {
    gb.addShip(4, 0, [0, 0]);
    expect(gb.addShip(1, 0, [0, 0])).toBe(false);
  });
});

describe('testing recieveAttack', () => {

});

test('Gameboard created', () => {
  expect(gb.getState()).toStrictEqual({
    '0,0': { position: null, shipKey: null },
    '0,1': { position: null, shipKey: null },
    '0,2': { position: null, shipKey: null },
    '0,3': { position: null, shipKey: null },
    '0,4': { position: null, shipKey: null },
    '0,5': { position: null, shipKey: null },
    '0,6': { position: null, shipKey: null },
    '0,7': { position: null, shipKey: null },
    '0,8': { position: null, shipKey: null },
    '0,9': { position: null, shipKey: null },
    '1,0': { position: null, shipKey: null },
    '1,1': { position: null, shipKey: null },
    '1,2': { position: null, shipKey: null },
    '1,3': { position: null, shipKey: null },
    '1,4': { position: null, shipKey: null },
    '1,5': { position: null, shipKey: null },
    '1,6': { position: null, shipKey: null },
    '1,7': { position: null, shipKey: null },
    '1,8': { position: null, shipKey: null },
    '1,9': { position: null, shipKey: null },
    '2,0': { position: null, shipKey: null },
    '2,1': { position: null, shipKey: null },
    '2,2': { position: null, shipKey: null },
    '2,3': { position: null, shipKey: null },
    '2,4': { position: null, shipKey: null },
    '2,5': { position: null, shipKey: null },
    '2,6': { position: null, shipKey: null },
    '2,7': { position: null, shipKey: null },
    '2,8': { position: null, shipKey: null },
    '2,9': { position: null, shipKey: null },
    '3,0': { position: null, shipKey: null },
    '3,1': { position: null, shipKey: null },
    '3,2': { position: null, shipKey: null },
    '3,3': { position: null, shipKey: null },
    '3,4': { position: null, shipKey: null },
    '3,5': { position: null, shipKey: null },
    '3,6': { position: null, shipKey: null },
    '3,7': { position: null, shipKey: null },
    '3,8': { position: null, shipKey: null },
    '3,9': { position: null, shipKey: null },
    '4,0': { position: null, shipKey: null },
    '4,1': { position: null, shipKey: null },
    '4,2': { position: null, shipKey: null },
    '4,3': { position: null, shipKey: null },
    '4,4': { position: null, shipKey: null },
    '4,5': { position: null, shipKey: null },
    '4,6': { position: null, shipKey: null },
    '4,7': { position: null, shipKey: null },
    '4,8': { position: null, shipKey: null },
    '4,9': { position: null, shipKey: null },
    '5,0': { position: null, shipKey: null },
    '5,1': { position: null, shipKey: null },
    '5,2': { position: null, shipKey: null },
    '5,3': { position: null, shipKey: null },
    '5,4': { position: null, shipKey: null },
    '5,5': { position: null, shipKey: null },
    '5,6': { position: null, shipKey: null },
    '5,7': { position: null, shipKey: null },
    '5,8': { position: null, shipKey: null },
    '5,9': { position: null, shipKey: null },
    '6,0': { position: null, shipKey: null },
    '6,1': { position: null, shipKey: null },
    '6,2': { position: null, shipKey: null },
    '6,3': { position: null, shipKey: null },
    '6,4': { position: null, shipKey: null },
    '6,5': { position: null, shipKey: null },
    '6,6': { position: null, shipKey: null },
    '6,7': { position: null, shipKey: null },
    '6,8': { position: null, shipKey: null },
    '6,9': { position: null, shipKey: null },
    '7,0': { position: null, shipKey: null },
    '7,1': { position: null, shipKey: null },
    '7,2': { position: null, shipKey: null },
    '7,3': { position: null, shipKey: null },
    '7,4': { position: null, shipKey: null },
    '7,5': { position: null, shipKey: null },
    '7,6': { position: null, shipKey: null },
    '7,7': { position: null, shipKey: null },
    '7,8': { position: null, shipKey: null },
    '7,9': { position: null, shipKey: null },
    '8,0': { position: null, shipKey: null },
    '8,1': { position: null, shipKey: null },
    '8,2': { position: null, shipKey: null },
    '8,3': { position: null, shipKey: null },
    '8,4': { position: null, shipKey: null },
    '8,5': { position: null, shipKey: null },
    '8,6': { position: null, shipKey: null },
    '8,7': { position: null, shipKey: null },
    '8,8': { position: null, shipKey: null },
    '8,9': { position: null, shipKey: null },
    '9,0': { position: null, shipKey: null },
    '9,1': { position: null, shipKey: null },
    '9,2': { position: null, shipKey: null },
    '9,3': { position: null, shipKey: null },
    '9,4': { position: null, shipKey: null },
    '9,5': { position: null, shipKey: null },
    '9,6': { position: null, shipKey: null },
    '9,7': { position: null, shipKey: null },
    '9,8': { position: null, shipKey: null },
    '9,9': { position: null, shipKey: null },
  });
});
