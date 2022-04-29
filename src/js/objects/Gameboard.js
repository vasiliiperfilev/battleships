import Ship from './Ship';

function Gameboard(shipsToPlaceLengths = [5, 4, 3, 3, 2]) {
  // initial board constructor
  const board = [];
  const placedShips = [];
  Array.from(Array(10).keys()).forEach((num1) => {
    board[num1] = [];
    Array.from(Array(10).keys()).forEach((num2) => {
      board[num1][num2] = { ship: null, position: null };
    });
  });

  const hitState = 'Hit attack';
  const missState = 'Missed attack';
  let shipDirection = 0;

  const getOppositeDirection = () => 1 - shipDirection;

  const changeNextShipDirection = () => {
    shipDirection = 1 - shipDirection;
  };

  const isValidCoords = (x, y) => x <= 9 && x >= 0 && y <= 9 && y >= 0;

  const getShip = (x, y) => board[x][y].ship;

  const getShipPosition = (x, y) => board[x][y].position;

  const getShipsToPlaceLengths = () => [...shipsToPlaceLengths];

  function setSquare(ship, position, x, y) {
    if (isValidCoords(x, y)) {
      board[x][y].ship = ship;
      board[x][y].position = position;
    } else {
      throw new Error('Incorrect square coordinates');
    }
  }

  function ifAllSunk() {
    return placedShips.every((ship) => ship.isSunk()) || placedShips.length === 0;
  }

  function checkAdjacentSquares(centerCoords) {
    for (let i = -1; i < 2; i += 1) {
      const newCoords = [...centerCoords];
      newCoords[getOppositeDirection()] += i;
      if (isValidCoords(...newCoords)) {
        if (getShip(...newCoords) !== null) throw new Error('Space is occupied');
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
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...startCoordsArr];
      coords[shipDirection] += position;
      setSquare(ship, position, ...coords);
    });
  }

  function moveShipToPlaced(ship) {
    const shipIndex = shipsToPlaceLengths.indexOf(ship.getLength());
    if (shipIndex === -1) {
      throw new Error('No ship of that length can be placed!');
    }
    placedShips.push(ship);
    shipsToPlaceLengths.splice(shipIndex, 1);
  }

  function addShip(length, startCoordsArr) {
    const shipLength = length === null ? shipsToPlaceLengths[0] : length;
    const startOfOccupied = [...startCoordsArr];
    startOfOccupied[shipDirection] -= 1;
    checkFreeSpace(shipLength, startOfOccupied);
    const ship = new Ship(shipLength);
    moveShipToPlaced(ship);
    placeShipOnBoard(ship, startCoordsArr);
  }

  function receiveAttack([x, y]) {
    if (board[x][y].ship !== null) {
      board[x][y].ship.hit(board[x][y].position);
      board[x][y].position = hitState;
    } else {
      board[x][y].position = missState;
    }
  }

  function wasSquareAttacked([x, y]) {
    return typeof board[x][y].position === 'string';
  }

  return {
    getShip,
    getShipPosition,
    changeNextShipDirection,
    addShip,
    receiveAttack,
    ifAllSunk,
    getShipsToPlaceLengths,
    wasSquareAttacked,
  };
}

export default Gameboard;
