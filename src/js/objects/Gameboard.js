import Ship from './Ship';

function Gameboard() {
  const state = {};
  const ships = [];
  // const toChar = (num) => String.fromCharCode(num + 65);
  // const toNum = (char) => char.charCodeAt(0) - 65;
  // const toArr = (str) => str.split(',');
  const toKey = (arr) => arr.join(',');

  Array.from({ length: 10 }, (_, i) => i).forEach((num1) => {
    Array.from({ length: 10 }, (_, i) => i).forEach((num2) => {
      state[[num1, num2].join(',')] = { shipKey: null, position: null };
    });
  });

  function getState(coordsArr) {
    if (arguments.length === 0) return { ...state };
    return { ...state[toKey(coordsArr)] };
  }

  // direction 0 for x (letters in UI), 1 for y (numbers in UI) in decart
  function canBePlaced(length, direction, startCoordsArr) {
    if (length === 0) {
      return true;
    }
    if (startCoordsArr[direction] > 9) {
      return false;
    }
    if (state[toKey(startCoordsArr)].shipKey !== null) {
      return false;
    }
    const coords = [...startCoordsArr];
    coords[direction] += 1;
    return canBePlaced(length - 1, direction, coords);
  }

  function placeShip(ship, direction, startCoordsArr) {
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...startCoordsArr];
      coords[direction] += position;
      state[toKey(coords)].shipKey = ship.getBoardKey();
      state[toKey(coords)].position = position;
    });
  }

  function addShip(length, direction, startCoordsArr) {
    if (canBePlaced(length, direction, startCoordsArr)) {
      const newShip = Ship(length, ships.length);
      ships.push(newShip);
      placeShip(newShip, direction, startCoordsArr);
      return true;
    }
    return false;
  }

  return {
    getState,
    addShip,
  };
}

export default Gameboard;
