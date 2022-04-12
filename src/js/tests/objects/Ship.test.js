import Ship from '../../objects/Ship';

let ship;
beforeEach(() => {
  ship = new Ship(4);
});

test('Length more than 0', () => {
  expect(() => new Ship(0)).toThrow();
});

test('Length is number', () => {
  expect(() => new Ship('a')).toThrow();
});

describe('testing hit method', () => {
  test('Normal hit', () => {
    expect(ship.hit(3)).toStrictEqual([0, 0, 0, 1]);
  });

  test('Multiple hits', () => {
    ship.hit(0);
    expect(ship.hit(3)).toStrictEqual([1, 0, 0, 1]);
  });

  test('Position > length', () => {
    expect(() => ship.hit(4)).toThrow();
  });

  test('Position < 0', () => {
    expect(() => ship.hit(-1)).toThrow();
  });

  test('Position not a number', () => {
    expect(() => ship.hit(true)).toThrow();
  });
});

test('isSunk true when sunk', () => {
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(true);
});

test('isSunk false when not sunk', () => {
  ship.hit(0);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toBe(false);
});
