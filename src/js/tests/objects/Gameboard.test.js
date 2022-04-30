import Gameboard from '../../objects/Gameboard';
import Ship from '../../objects/Ship';

let gb;
beforeEach(() => {
  gb = Gameboard([5, 4, 3, 3, 2]);
});

describe('testing ship placement', () => {
  test('Normal placement by x ax', () => {
    gb.addShip(4, [0, 0]);
    [0, 1, 2, 3].forEach((x) => {
      expect(gb.getShip(x, 0) instanceof Ship).toBe(true);
      expect(gb.getShipPosition(x, 0)).toBe(x);
    });
  });

  test('Normal placement by y ax', () => {
    gb.changeNextShipDirection();
    gb.addShip(4, [0, 0]);
    [0, 1, 2, 3].forEach((y) => {
      expect(gb.getShip(0, y) instanceof Ship).toBe(true);
      expect(gb.getShipPosition(0, y)).toBe(y);
    });
  });

  test('Corner placement', () => {
    gb.addShip(2, [8, 0]);
    [0, 1].forEach((x) => {
      expect(gb.getShip(8 + x, 0) instanceof Ship).toBe(true);
      expect(gb.getShipPosition(8 + x, 0)).toBe(x);
    });
  });

  test('Out of bound placement', () => {
    expect(() => gb.addShip(4, [9, 9])).toThrow('Incorrect square coordinates');
    expect(gb.getShipPosition(9, 9)).toBe(null);
    expect(gb.getShip(9, 9)).toBe(null);
  });

  test('Ship cross placement', () => {
    gb.addShip(4, [0, 0]);
    expect(() => gb.addShip(3, [0, 0])).toThrow('Space is occupied');
  });

  test('Ship placed too close', () => {
    gb.addShip(4, [0, 0]);
    expect(() => gb.addShip(3, [4, 0])).toThrow('Space is occupied');
    expect(() => gb.addShip(3, [0, 1])).toThrow('Space is occupied');
    expect(gb.getShipPosition(0, 1)).toBe(null);
    expect(gb.getShip(0, 1)).toBe(null);
  });

  test('Ships placed around with 1 square gaps', () => {
    gb.addShip(4, [0, 0]);
    // to right
    expect(() => gb.addShip(3, [5, 0])).not.toThrow();
    [0, 1, 2].forEach((x) => {
      expect(gb.getShip(5 + x, 0) instanceof Ship).toBe(true);
      expect(gb.getShipPosition(5 + x, 0)).toBe(x);
    });
    // below
    expect(() => gb.addShip(3, [0, 2])).not.toThrow();
    [0, 1, 2].forEach((x) => {
      expect(gb.getShip(x, 2) instanceof Ship).toBe(true);
      expect(gb.getShipPosition(x, 2)).toBe(x);
    });
  });
});

describe('testing receiveAttack', () => {
  beforeEach(() => {
    gb.addShip(2, [0, 0]);
  });

  test('Hit attacks', () => {
    gb.receiveAttack([0, 0]);
    expect(gb.getShip(0, 0).isSunk()).toBe(false);
    gb.receiveAttack([1, 0]);
    expect(gb.getShip(0, 0).isSunk()).toBe(true);
  });

  test('Miss attack', () => {
    gb.receiveAttack([0, 1]);
    expect(gb.getShipPosition(0, 1)).toBe('Missed attack');
  });
});

describe('testing ifAllSunk', () => {
  beforeEach(() => {
    gb.addShip(2, [0, 0]);
  });

  test('One sunk ship', () => {
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([1, 0]);
    expect(gb.ifAllSunk()).toBe(true);
  });

  test('One sunk, another not', () => {
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([0, 1]);
    gb.addShip(3, [0, 2]);
    expect(gb.ifAllSunk()).toBe(false);
  });
});
