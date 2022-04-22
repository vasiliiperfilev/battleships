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

  const toKey = (arr) => {
    if (arr.length !== 2 || typeof arr[0] !== 'number' || typeof arr[1] !== 'number') {
      throw new Error('Incorrect array structure');
    }
    if (arr[0] > 9 || arr[0] < 0 || arr[1] > 9 || arr[1] < 0) {
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

  // direction 0 for x (letters in UI), 1 for y (numbers in UI) in decart
  function checkIfOccupied(length, direction, startCoordsArr) {
    if (length === 0) {
      return;
    }
    if (board[toKey(startCoordsArr)].shipKey !== null) {
      throw new Error('Space is occupied');
    }
    const nextCoords = [...startCoordsArr];
    nextCoords[direction] += 1;
    checkIfOccupied(length - 1, direction, nextCoords);
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
    try {
      checkIfOccupied(length, direction, startCoordsArr);
      const newShipsArr = cloneDeep(ships);
      const ship = Ship(length, newShipsArr.length);
      newShipsArr.push(ship);
      const newBoard = placeShipOnBoard(ship, direction, startCoordsArr);
      return Gameboard(newBoard, newShipsArr);
    } catch (e) {
      throw e.message;
    }
  }

  function receiveAttack(coordsArr) {
    const newBoard = JSON.parse(JSON.stringify(board));
    const newShips = cloneDeep(ships);
    const { shipKey, position } = newBoard[toKey(coordsArr)];
    if (shipKey !== null) {
      newShips[shipKey].hit(position);
      newBoard[toKey(coordsArr)].position = 'Hit attack';
    } else {
      newBoard[toKey(coordsArr)].position = 'Missed attack';
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
