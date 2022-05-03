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
  // getters
  const getNextShipDirection = () => nextShipDirection;
  const getOppositeDirection = () => 1 - nextShipDirection;
  const getShip = (x, y) => board[x][y].ship;
  const getShipPosition = (x, y) => board[x][y].position;
  const getShipsToPlaceLeft = () => shipsToPlaceLengths.length;
  const getNextShipLength = () => shipsToPlaceLengths[0];
  // helpers
  const isValidCoords = (x, y) => x <= 9 && x >= 0 && y <= 9 && y >= 0;
  const ifAllSunk = () => placedShips.every((ship) => ship.isSunk()) || placedShips.length === 0;
  const wasSquareAttacked = ([x, y]) => typeof board[x][y].position === 'string';
  // changes direction of next ship to place on this board 0 - by x, 1 - by y
  const changeNextShipDirection = () => {
    nextShipDirection = 1 - nextShipDirection;
  };
  // links square to its ship and position of that ship
  function setSquare(ship, position, x, y) {
    if (isValidCoords(x, y)) {
      board[x][y].ship = ship;
      board[x][y].position = position;
    } else {
      throw incorrectSquareError;
    }
  }
  // adds square and squares that adjacent and perpendicular to ship direction to list of occupied squares
  function addAdjacentOccupiedSquares(centerCoords) {
    for (let i = -1; i < 2; i += 1) {
      const newCoords = [...centerCoords];
      newCoords[getOppositeDirection()] += i;
      if (isValidCoords(...newCoords)) {
        occupiedSquares.push(newCoords);
      }
    }
  }
  // sets each ships square
  function placeShipOnBoard(ship) {
    [...Array(ship.getLength()).keys()].forEach((position) => {
      const coords = [...nextShipStartCoords];
      coords[nextShipDirection] += position;
      setSquare(ship, position, ...coords);
    });
  }
  // moves ship from "to place" list to "were placed" list
  function moveShipToPlaced(ship) {
    const shipIndex = shipsToPlaceLengths.indexOf(ship.getLength());
    if (shipIndex === -1) {
      throw new Error('No ship of that length can be placed!');
    }
    placedShips.push(ship);
    shipsToPlaceLengths.splice(shipIndex, 1);
  }
  // checks if potential ship squares are within board and not in list of occupied squares
  function checkShipSquares() {
    for (let i = 0; i < nextShipLength; i += 1) {
      const coords = [...nextShipStartCoords];
      coords[nextShipDirection] += i;
      if (!isValidCoords(...coords)) throw incorrectSquareError;
      if (JSON.stringify(occupiedSquares).includes(JSON.stringify(coords)))
        throw spaceOccupiedError;
    }
  }
  // adds occupied by ship squares to list of occupied squares
  function addToOccupiedSquares() {
    const startOfOccupied = [...nextShipStartCoords];
    startOfOccupied[nextShipDirection] -= 1;
    for (let i = 0; i <= nextShipLength + 1; i += 1) {
      const coords = [...startOfOccupied];
      coords[nextShipDirection] += i;
      addAdjacentOccupiedSquares(coords);
    }
  }
  // adds ship to board or throws error
  function addShip(length, startCoordsArr) {
    nextShipLength = length || shipsToPlaceLengths[0];
    nextShipStartCoords = startCoordsArr;
    checkShipSquares();
    addToOccupiedSquares();
    const ship = new Ship(nextShipLength);
    moveShipToPlaced(ship);
    placeShipOnBoard(ship);
  }
  // places all ships from shipsToPlace list on board
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
  // receives attack on coordinats x,y
  function receiveAttack([x, y]) {
    if (board[x][y].ship !== null) {
      board[x][y].ship.hit(board[x][y].position);
      board[x][y].position = hitState;
      return true;
    }
    board[x][y].position = missState;
    return false;
  }

  return {
    getShip,
    getShipPosition,
    changeNextShipDirection,
    addShip,
    receiveAttack,
    ifAllSunk,
    getShipsToPlaceLeft,
    wasSquareAttacked,
    placeShipsRandomly,
    getNextShipDirection,
    getNextShipLength,
  };
}

export default Gameboard;
