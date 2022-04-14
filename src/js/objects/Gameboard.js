import { cloneDeep } from 'lodash';
import Ship from './Ship';

function Gameboard(board = {}, ships = []) {
  // initial board constructor
  if (Object.keys(board).length === 0) {
    const newBoard = {};
    Array.from({ length: 10 }, (_, i) => i).forEach((num1) => {
      Array.from({ length: 10 }, (_, i) => i).forEach((num2) => {
        newBoard[[num1, num2].join(',')] = { shipKey: null, position: null };
      });
    });
    return Gameboard(newBoard);
  }

  const toKey = (arr) => arr.join(',');

  function getBoardSquare(coordsArr) {
    if (arguments.length === 0) return { ...board };
    return { ...board[toKey(coordsArr)] };
  }

  function getShips() {
    return cloneDeep(ships);
  }

  function ifAllSunk() {
    return ships.every((ship) => ship.isSunk());
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
