import { cloneDeep } from 'lodash';
import Ship from './Ship';

function Gameboard(board = {}, ships = []) {
  const hitState = 'Hit attack';
  const missState = 'Missed attack';
  // initial board constructor
  if (Object.keys(board).length === 0) {
    const newBoard = {};
    Array.from(Array(10).keys()).forEach((num1) => {
      Array.from(Array(10).keys()).forEach((num2) => {
        newBoard[[num1, num2].join(',')] = { shipKey: null, position: null };
      });
    });
    return Gameboard(newBoard);
  }

  function isValidCoords(coords) {
    const [x, y] = coords;
    return x <= 9 && x >= 0 && y <= 9 && y >= 0;
  }

  const toKey = (arr) => {
    if (arr.length !== 2 || typeof arr[0] !== 'number' || typeof arr[1] !== 'number') {
      throw new Error('Incorrect array structure');
    }
    if (!isValidCoords(arr)) {
      throw new Error('Incorrect square coordinates');
    }
    return arr.join(',');
  };

  function getBoardSquare(coordsArr) {
    if (arguments.length === 0) return { ...board };
    return { ...board[toKey(coordsArr)] };
  }

  function getShips() {
    return cloneDeep(ships);
  }

  function ifAllSunk() {
    return ships.every((ship) => ship.isSunk()) || ships.length === 0;
  }

  function checkAdjacentSquares(centerCoords, direction) {
    for (let i = -1; i < 2; i += 1) {
      const newCoords = [...centerCoords];
      newCoords[direction] += i;
      if (isValidCoords(newCoords)) {
        const adjacentSquare = getBoardSquare(newCoords);
        if (adjacentSquare.shipKey !== null) throw new Error('Space is occupied');
      }
    }
  }

  // direction 0 for x, 1 for y in decart
  function checkFreeSpace(length, direction, startCoordsArr) {
    const coords = [...startCoordsArr];
    checkAdjacentSquares(coords, 1 - direction);
    if (length === -1) {
      return;
    }
    coords[direction] += 1;
    checkFreeSpace(length - 1, direction, coords);
  }

  function placeShipOnBoard(ship, direction, startCoordsArr) {
    const newBoard = JSON.parse(JSON.stringify(board));
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...startCoordsArr];
      coords[direction] += position;
      newBoard[toKey(coords)].shipKey = ship.getBoardKey();
      newBoard[toKey(coords)].position = position;
    });
    return newBoard;
  }

  function addShip(length, direction, startCoordsArr) {
    const startOfOccupied = [...startCoordsArr];
    startOfOccupied[direction] -= 1;
    checkFreeSpace(length, direction, startOfOccupied);
    const newShipsArr = cloneDeep(ships);
    const ship = Ship(length, newShipsArr.length);
    newShipsArr.push(ship);
    const newBoard = placeShipOnBoard(ship, direction, startCoordsArr);
    return Gameboard(newBoard, newShipsArr);
  }

  function receiveAttack(coordsArr) {
    const newBoard = JSON.parse(JSON.stringify(board));
    const newShips = cloneDeep(ships);
    const { shipKey, position } = newBoard[toKey(coordsArr)];
    if (shipKey !== null) {
      newShips[shipKey].hit(position);
      newBoard[toKey(coordsArr)].position = hitState;
    } else {
      newBoard[toKey(coordsArr)].position = missState;
    }
    return Gameboard(newBoard, newShips);
  }

  return {
    getBoardSquare,
    getShips,
    addShip,
    receiveAttack,
    ifAllSunk,
  };
}

export default Gameboard;
