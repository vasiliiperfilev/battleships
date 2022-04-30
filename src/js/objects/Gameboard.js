import Ship from './Ship';

function Gameboard(shipsToPlaceLengths = [5, 4, 3, 3, 2]) {
  // initial board constructor
  const board = [];
  const placedShips = [];
  const occupiedSquares = [];
  const hitState = 'Hit attack';
  const missState = 'Missed attack';
  const incorrectSquareError = new Error('Incorrect square coordinates');
  const spaceOccupiedError = new Error('Space is occupied');
  let nextShipDirection = 0;
  let nextShipStartCoords = null;
  let nextShipLength = null;
  Array.from(Array(10).keys()).forEach((num1) => {
    board[num1] = [];
    Array.from(Array(10).keys()).forEach((num2) => {
      board[num1][num2] = { ship: null, position: null };
    });
  });

  const getNextShipDirection = () => nextShipDirection;

  const getOppositeDirection = () => 1 - nextShipDirection;

  const changeNextShipDirection = () => {
    nextShipDirection = 1 - nextShipDirection;
  };

  const isValidCoords = (x, y) => x <= 9 && x >= 0 && y <= 9 && y >= 0;

  const getShip = (x, y) => board[x][y].ship;

  const getShipPosition = (x, y) => board[x][y].position;

  const shipsToPlaceLeft = () => shipsToPlaceLengths.length;

  const getNextShipLength = () => shipsToPlaceLengths[0];

  function setSquare(ship, position, x, y) {
    if (isValidCoords(x, y)) {
      board[x][y].ship = ship;
      board[x][y].position = position;
    } else {
      throw incorrectSquareError;
    }
  }

  function ifAllSunk() {
    return placedShips.every((ship) => ship.isSunk()) || placedShips.length === 0;
  }

  function addAdjacentOccupiedSquares(centerCoords) {
    for (let i = -1; i < 2; i += 1) {
      const newCoords = [...centerCoords];
      newCoords[getOppositeDirection()] += i;
      if (isValidCoords(...newCoords)) {
        occupiedSquares.push(newCoords);
      }
    }
  }

  function placeShipOnBoard(ship) {
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...nextShipStartCoords];
      coords[nextShipDirection] += position;
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

  function checkShipSquares() {
    for (let i = 0; i < nextShipLength; i += 1) {
      const coords = [...nextShipStartCoords];
      coords[nextShipDirection] += i;
      if (!isValidCoords(...coords)) throw incorrectSquareError;
      if (JSON.stringify(occupiedSquares).includes(JSON.stringify(coords)))
        throw spaceOccupiedError;
    }
  }

  function addToOccupiedSquares() {
    const startOfOccupied = [...nextShipStartCoords];
    startOfOccupied[nextShipDirection] -= 1;
    for (let i = 0; i <= nextShipLength + 1; i += 1) {
      const coords = [...startOfOccupied];
      coords[nextShipDirection] += i;
      addAdjacentOccupiedSquares(coords);
    }
  }

  function addShip(length, startCoordsArr) {
    const shipLength = length === null ? shipsToPlaceLengths[0] : length;
    nextShipStartCoords = startCoordsArr;
    nextShipLength = shipLength;
    checkShipSquares();
    addToOccupiedSquares();
    const ship = new Ship(shipLength);
    moveShipToPlaced(ship);
    placeShipOnBoard(ship);
  }

  function placeShipsRandomly() {
    while (shipsToPlaceLengths.length > 0) {
      let coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
      const length = shipsToPlaceLengths[0];
      try {
        addShip(length, coordsArr);
      } catch {
        coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
        changeNextShipDirection();
      }
    }
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
    shipsToPlaceLeft,
    wasSquareAttacked,
    placeShipsRandomly,
    getNextShipDirection,
    getNextShipLength,
  };
}

export default Gameboard;
