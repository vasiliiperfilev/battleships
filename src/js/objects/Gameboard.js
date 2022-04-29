import { cloneDeep } from 'lodash';
import Ship from './Ship';

function Gameboard(board = {}, ships = []) {
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
  // TODO: add direction, add ships to place
  const hitState = 'Hit attack';
  const missState = 'Missed attack';
  let shipDirection = 0;
  const getPerpendicularDirection = () => 1 - shipDirection;
  const changeNextShipDirection = () => {
    shipDirection = 1 - shipDirection;
  };

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

  function getSquare(coordsArr) {
    if (arguments.length === 0) return { ...board };
    return { ...board[toKey(coordsArr)] };
  }

  function getShips() {
    return cloneDeep(ships);
  }

  function ifAllSunk() {
    return ships.every((ship) => ship.isSunk()) || ships.length === 0;
  }

  function checkAdjacentSquares(centerCoords) {
    for (let i = -1; i < 2; i += 1) {
      const newCoords = [...centerCoords];
      newCoords[getPerpendicularDirection()] += i;
      if (isValidCoords(newCoords)) {
        const adjacentSquare = getSquare(newCoords);
        if (adjacentSquare.shipKey !== null) throw new Error('Space is occupied');
      }
    }
  }

  // direction 0 for x, 1 for y in decart
  function checkFreeSpace(length, startCoordsArr) {
    const coords = [...startCoordsArr];
    checkAdjacentSquares(coords);
    if (length === -1) {
      return;
    }
    coords[shipDirection] += 1;
    checkFreeSpace(length - 1, coords);
  }

  function placeShipOnBoard(ship, startCoordsArr) {
    const newBoard = JSON.parse(JSON.stringify(board));
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...startCoordsArr];
      coords[shipDirection] += position;
      newBoard[toKey(coords)].shipKey = ship.getBoardKey();
      newBoard[toKey(coords)].position = position;
    });
    return newBoard;
  }

  function addShip(length, startCoordsArr) {
    const startOfOccupied = [...startCoordsArr];
    startOfOccupied[shipDirection] -= 1;
    checkFreeSpace(length, startOfOccupied);
    const newShipsArr = cloneDeep(ships);
    const ship = Ship(length, newShipsArr.length);
    newShipsArr.push(ship);
    const newBoard = placeShipOnBoard(ship, startCoordsArr);
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
    getSquare,
    changeNextShipDirection,
    getShips,
    addShip,
    receiveAttack,
    ifAllSunk,
  };
}

export default Gameboard;
