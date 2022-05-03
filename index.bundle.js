/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/UI/UI.js":
/*!*************************!*\
  !*** ./src/js/UI/UI.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _assets_GitHubLogo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/GitHubLogo.png */ "./src/assets/GitHubLogo.png");



function UI() {
  // creates page header
  function createHeader() {
    var header = document.createElement('header');
    var h1 = document.createElement('h1');
    h1.textContent = 'BATTLESHIPS';
    header.append(h1);
    return header;
  } // creates page footer


  function createFooter() {
    var footer = document.createElement('footer');
    var img = document.createElement('img');
    img.height = '32';
    img.width = '32';
    img.alt = 'git hub logo';
    img.src = _assets_GitHubLogo_png__WEBPACK_IMPORTED_MODULE_1__;
    var link = document.createElement('a');
    link.href = 'https://github.com/vasiliiperfilev';
    footer.textContent = 'Copyright © 2022 Vasilii Perfilev';
    link.append(img);
    footer.append(link);
    return footer;
  } // creates result window with restart button to show after the game


  function createResult() {
    var result = document.createElement('div');
    result.classList.add('result', 'hidden');
    var resultText = document.createElement('span');
    var restartBtn = document.createElement('button');
    restartBtn.classList.add('restart');
    restartBtn.innerText = 'Restart!';
    result.append(resultText, restartBtn);
    return result;
  } // adds class to square if that square was attacked or has ship


  function styleGbSquare(square, state) {
    if (state === 'Hit attack') {
      square.classList.add('hit');
    } else if (state === 'Missed attack') {
      square.classList.add('miss');
    } else if (state !== null) {
      square.classList.add('ship');
    }
  } // creates gb, adds x and y values to each square


  function createGbDiv(gameBoard) {
    var gameBoardDiv = document.createElement('div');
    Array.from(Array(10).keys()).forEach(function (num1) {
      Array.from(Array(10).keys()).forEach(function (num2) {
        var square = document.createElement('div');
        square.dataset.x = num2;
        square.dataset.y = num1;
        styleGbSquare(square, gameBoard.getShipPosition(num2, num1));
        gameBoardDiv.append(square);
      });
    });
    return gameBoardDiv;
  } // creates rotate btn to rotate ships


  function createRotateBtn() {
    var rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate');
    rotateBtn.innerText = 'Rotate ship';
    return rotateBtn;
  } // hides ships by removing ships class from squares


  function hideShips(gameBoardDiv) {
    (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(gameBoardDiv.children).forEach(function (child) {
      child.classList.remove('ship');
    });
  } // rerenders all squares of board


  var updateBoard = function updateBoard(gameBoard, gameBoardDiv) {
    return gameBoardDiv.replaceChildren.apply(gameBoardDiv, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(createGbDiv(gameBoard).children));
  }; // renders whole page


  function renderPage(gameBoard1, gameBoard2, player1Name, player2Name) {
    document.querySelector('body').textContent = '';
    var header = createHeader();
    var main = document.createElement('main');
    var gb1Div = document.createElement('div');
    var gb2Div = document.createElement('div');
    gb1Div.classList.add(player1Name, 'gameboard');
    gb2Div.classList.add(player2Name, 'gameboard');
    var rotateBtn = createRotateBtn();
    rotateBtn.addEventListener('click', function () {
      return gameBoard1.changeNextShipDirection();
    });
    main.append(rotateBtn, gb1Div, gb2Div);
    var footer = createFooter();
    var result = createResult();
    document.querySelector('body').append(header, main, footer, result);
    updateBoard(gameBoard1, gb1Div);
    updateBoard(gameBoard2, gb2Div);
    hideShips(gb2Div);
  } // returns array of x and y from event target(square)


  var getTurnInput = function getTurnInput(event) {
    return [parseInt(event.target.dataset.x, 10), parseInt(event.target.dataset.y, 10)];
  }; // shows result window with text from input value


  function showResult(result) {
    document.querySelector('.result > span').textContent = result;
    document.querySelector('.result').classList.remove('hidden');
  } // hides rotate ship button


  var hideRotateBtn = function hideRotateBtn() {
    return document.querySelector('.rotate').classList.add('hidden');
  }; // returns players gb element by player name


  var getPlayerGb = function getPlayerGb(playerName) {
    return document.querySelector(".".concat(playerName, ".gameboard"));
  }; // returns if two squares are on the same line of particular direction 0 - X, 1- Y;
  // if squares have same x they're on the same line of Y direction and vice versa


  var isOnSameLine = function isOnSameLine(sq1, sq2, direction) {
    return sq1.dataset.x === sq2.dataset.x && direction === 1 || sq1.dataset.y === sq2.dataset.y && direction === 0;
  }; // shows potential ship shadow. Handles mouseover and mouse out events


  function mouseMoveHandler(startElement, gameBoard) {
    var direction = gameBoard.getNextShipDirection();
    var length = gameBoard.getNextShipLength() - 1;
    var step = direction === 0 ? 1 : 10;
    var allSquares = Array.from(startElement.parentNode.children);
    var startIndex = allSquares.indexOf(startElement);

    while (length >= 0) {
      var nextIndex = startIndex + length * step;

      if (nextIndex < 100) {
        var nextElement = allSquares[nextIndex];
        if (isOnSameLine(startElement, nextElement, direction)) allSquares[nextIndex].classList.toggle('ship-possible');
      }

      length -= 1;
    }
  } // copies element and places it to the same dom position removing event listeners


  function copyWithoutEventListeners(element) {
    var gbDiv = element.cloneNode(true);
    element.parentNode.replaceChild(gbDiv, element);
  }

  return {
    renderPage: renderPage,
    updateBoard: updateBoard,
    getTurnInput: getTurnInput,
    showResult: showResult,
    hideRotateBtn: hideRotateBtn,
    getPlayerGb: getPlayerGb,
    hideShips: hideShips,
    mouseMoveHandler: mouseMoveHandler,
    copyWithoutEventListeners: copyWithoutEventListeners
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

/***/ }),

/***/ "./src/js/objects/Game.js":
/*!********************************!*\
  !*** ./src/js/objects/Game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UI_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UI/UI */ "./src/js/UI/UI.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/js/objects/Gameboard.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/js/objects/Player.js");




function Game(options) {
  var ui = (0,_UI_UI__WEBPACK_IMPORTED_MODULE_0__["default"])();
  var player1 = options.plr1 || (0,_Player__WEBPACK_IMPORTED_MODULE_2__["default"])('player1');
  var player2 = options.plr2 || (0,_Player__WEBPACK_IMPORTED_MODULE_2__["default"])('player2', true);
  var player1Gb = options.gb1 || (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var player2Gb = options.gb2 || (0,_Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var activePlayer = player1;
  var activePlayerGb = player1Gb; // returns if both boards has their ships placed

  var canStart = function canStart() {
    return player1Gb.getShipsToPlaceLeft() === 0 && player2Gb.getShipsToPlaceLeft() === 0;
  }; // switches active player, updates UI and triggers AI action if required


  function switchActivePlayer(AIlistenerElement) {
    // hide current active player ships
    ui.hideShips(ui.getPlayerGb(activePlayer.getName()));
    activePlayer = activePlayer === player1 ? player2 : player1;
    activePlayerGb = activePlayerGb === player1Gb ? player2Gb : player1Gb; // show new active player ships

    ui.updateBoard(activePlayerGb, ui.getPlayerGb(activePlayer.getName())); // triggers AI action if any

    if (activePlayer === player2 && player2.isAI) AIlistenerElement.click();
  } // returns game result if any or undefined otherwise


  function getGameResult(isAllSunkPlayer1, isAllSunkPlayer2) {
    var result;
    if (isAllSunkPlayer1) result = 'Player 2 won!';
    if (isAllSunkPlayer2) result = 'Player 1 won!';
    if (isAllSunkPlayer2 && isAllSunkPlayer1) result = 'Draw!';
    return result;
  } // attacks clicked square, updates UI, switches active player and repeat AI attack if AI hit before


  function attackHandler(event, opponentGb, player) {
    if (player === activePlayer) {
      var wasShipHit = player.takeTurn(opponentGb, ui.getTurnInput(event));
      ui.updateBoard(opponentGb, event.currentTarget); // hide opponent gb ships after update

      ui.hideShips(event.currentTarget);
      if (!wasShipHit || opponentGb.ifAllSunk()) switchActivePlayer(ui.getPlayerGb(player1.getName()));
      if (player.isAI && wasShipHit) attackHandler(event, opponentGb, player);
    }
  } // hide preparation phase UI, setup attack event listeners and restart button


  function setupAttackPhase() {
    ui.hideRotateBtn(); // check for game results after player 2 turn

    ui.getPlayerGb(player1.getName()).addEventListener('click', function (event) {
      attackHandler(event, player1Gb, player2);
      var result = getGameResult(player1Gb.ifAllSunk(), player2Gb.ifAllSunk());
      if (result !== undefined) ui.showResult(result);
    });
    ui.getPlayerGb(player2.getName()).addEventListener('click', function (event) {
      attackHandler(event, player2Gb, player1);
    });
    document.querySelector('.restart').addEventListener('click', function () {
      Game({});
    });
  } // hides player ships, remove preparation phase event listeners and switch active player


  function finishPlayerPreparation(event) {
    ui.hideShips(event.currentTarget);
    ui.copyWithoutEventListeners(event.currentTarget);
    switchActivePlayer(ui.getPlayerGb(player2.getName()));
  } // places ship on click coords and updates UI


  function preparationHandler(event, gb, player) {
    if (gb.getShipsToPlaceLeft() > 0 && player === activePlayer) {
      player.placeShip(gb, ui.getTurnInput(event));
      ui.updateBoard(gb, event.currentTarget); // if can start the game finish this player preparation and setup attack phase

      if (canStart()) {
        finishPlayerPreparation(event);
        setupAttackPhase(); // else if all ships were placed but can't start yet finish this player preparation
      } else if (gb.getShipsToPlaceLeft() === 0) {
        finishPlayerPreparation(event);
      }
    }
  } // setup preparation event listeners - ship placements and a potential ship shadow on mouseover


  function setupPreparationPhase() {
    ui.getPlayerGb(player1.getName()).addEventListener('mouseover', function (event) {
      ui.mouseMoveHandler(event.target, player1Gb);
    });
    ui.getPlayerGb(player1.getName()).addEventListener('mouseout', function (event) {
      ui.mouseMoveHandler(event.target, player1Gb);
    });
    ui.getPlayerGb(player1.getName()).addEventListener('click', function (event) {
      preparationHandler(event, player1Gb, player1);
    });
    ui.getPlayerGb(player2.getName()).addEventListener('click', function (event) {
      preparationHandler(event, player2Gb, player2);
    });
  } // start game


  ui.renderPage(player1Gb, player2Gb, player1.getName(), player2.getName());
  setupPreparationPhase();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/js/objects/Gameboard.js":
/*!*************************************!*\
  !*** ./src/js/objects/Gameboard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ "./src/js/objects/Ship.js");




function Gameboard() {
  var shipsToPlaceLengths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [5, 4, 3, 3, 2];
  // initial board constructor
  var board = [];
  var placedShips = [];
  var occupiedSquares = [];
  var hitState = 'Hit attack';
  var missState = 'Missed attack';
  var incorrectSquareError = new Error('Incorrect square coordinates');
  var spaceOccupiedError = new Error('Space is occupied');
  var nextShipDirection = 0;
  var nextShipStartCoords = null;
  var nextShipLength = null;
  Array.from(Array(10).keys()).forEach(function (num1) {
    board[num1] = [];
    Array.from(Array(10).keys()).forEach(function (num2) {
      board[num1][num2] = {
        ship: null,
        position: null
      };
    });
  }); // getters

  var getNextShipDirection = function getNextShipDirection() {
    return nextShipDirection;
  };

  var getOppositeDirection = function getOppositeDirection() {
    return 1 - nextShipDirection;
  };

  var getShip = function getShip(x, y) {
    return board[x][y].ship;
  };

  var getShipPosition = function getShipPosition(x, y) {
    return board[x][y].position;
  };

  var getShipsToPlaceLeft = function getShipsToPlaceLeft() {
    return shipsToPlaceLengths.length;
  };

  var getNextShipLength = function getNextShipLength() {
    return shipsToPlaceLengths[0];
  }; // helpers


  var isValidCoords = function isValidCoords(x, y) {
    return x <= 9 && x >= 0 && y <= 9 && y >= 0;
  };

  var ifAllSunk = function ifAllSunk() {
    return placedShips.every(function (ship) {
      return ship.isSunk();
    }) || placedShips.length === 0;
  };

  var wasSquareAttacked = function wasSquareAttacked(_ref) {
    var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    return typeof board[x][y].position === 'string';
  }; // changes direction of next ship to place on this board 0 - by x, 1 - by y


  var changeNextShipDirection = function changeNextShipDirection() {
    nextShipDirection = 1 - nextShipDirection;
  }; // links square to its ship and position of that ship


  function setSquare(ship, position, x, y) {
    if (isValidCoords(x, y)) {
      board[x][y].ship = ship;
      board[x][y].position = position;
    } else {
      throw incorrectSquareError;
    }
  } // adds square and squares that adjacent and perpendicular to ship direction to list of occupied squares


  function addAdjacentOccupiedSquares(centerCoords) {
    for (var i = -1; i < 2; i += 1) {
      var newCoords = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(centerCoords);

      newCoords[getOppositeDirection()] += i;

      if (isValidCoords.apply(void 0, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(newCoords))) {
        occupiedSquares.push(newCoords);
      }
    }
  } // sets each ships square


  function placeShipOnBoard(ship) {
    (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(Array(ship.getLength()).keys()).forEach(function (position) {
      var coords = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(nextShipStartCoords);

      coords[nextShipDirection] += position;
      setSquare.apply(void 0, [ship, position].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(coords)));
    });
  } // moves ship from "to place" list to "were placed" list


  function moveShipToPlaced(ship) {
    var shipIndex = shipsToPlaceLengths.indexOf(ship.getLength());

    if (shipIndex === -1) {
      throw new Error('No ship of that length can be placed!');
    }

    placedShips.push(ship);
    shipsToPlaceLengths.splice(shipIndex, 1);
  } // checks if potential ship squares are within board and not in list of occupied squares


  function checkShipSquares() {
    for (var i = 0; i < nextShipLength; i += 1) {
      var coords = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(nextShipStartCoords);

      coords[nextShipDirection] += i;
      if (!isValidCoords.apply(void 0, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(coords))) throw incorrectSquareError;
      if (JSON.stringify(occupiedSquares).includes(JSON.stringify(coords))) throw spaceOccupiedError;
    }
  } // adds occupied by ship squares to list of occupied squares


  function addToOccupiedSquares() {
    var startOfOccupied = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(nextShipStartCoords);

    startOfOccupied[nextShipDirection] -= 1;

    for (var i = 0; i <= nextShipLength + 1; i += 1) {
      var coords = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(startOfOccupied);

      coords[nextShipDirection] += i;
      addAdjacentOccupiedSquares(coords);
    }
  } // adds ship to board or throws error


  function addShip(length, startCoordsArr) {
    nextShipLength = length || shipsToPlaceLengths[0];
    nextShipStartCoords = startCoordsArr;
    checkShipSquares();
    addToOccupiedSquares();
    var ship = new _Ship__WEBPACK_IMPORTED_MODULE_2__["default"](nextShipLength);
    moveShipToPlaced(ship);
    placeShipOnBoard(ship);
  } // places all ships from shipsToPlace list on board


  function placeShipsRandomly() {
    while (shipsToPlaceLengths.length > 0) {
      var coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
      var length = shipsToPlaceLengths[0];

      try {
        addShip(length, coordsArr);
      } catch (_unused) {
        coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
        changeNextShipDirection();
      }
    }
  } // receives attack on coordinats x,y


  function receiveAttack(_ref3) {
    var _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref3, 2),
        x = _ref4[0],
        y = _ref4[1];

    if (board[x][y].ship !== null) {
      board[x][y].ship.hit(board[x][y].position);
      board[x][y].position = hitState;
      return true;
    }

    board[x][y].position = missState;
    return false;
  }

  return {
    getShip: getShip,
    getShipPosition: getShipPosition,
    changeNextShipDirection: changeNextShipDirection,
    addShip: addShip,
    receiveAttack: receiveAttack,
    ifAllSunk: ifAllSunk,
    getShipsToPlaceLeft: getShipsToPlaceLeft,
    wasSquareAttacked: wasSquareAttacked,
    placeShipsRandomly: placeShipsRandomly,
    getNextShipDirection: getNextShipDirection,
    getNextShipLength: getNextShipLength
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/js/objects/Player.js":
/*!**********************************!*\
  !*** ./src/js/objects/Player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");


function Player(name) {
  var isAI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var getName = function getName() {
    return name;
  }; // returns array with allowed attack square coords [X, Y]


  function getAImove(gb) {
    var coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];

    while (typeof gb.getShipPosition.apply(gb, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(coordsArr)) === 'string') {
      coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    }

    return coordsArr;
  } // attacks opponent gb


  function takeTurn(opponentGb, coordsArr) {
    var coords = isAI ? getAImove(opponentGb) : coordsArr;

    if (!opponentGb.wasSquareAttacked(coords)) {
      return opponentGb.receiveAttack(coords);
    }

    throw new Error('Position was attacked before');
  } // places one ship for player or all ships randomly for AI


  function placeShip(gb, coordsArr, length) {
    if (isAI) {
      gb.placeShipsRandomly();
    } else {
      gb.addShip(length, coordsArr);
    }
  }

  return {
    isAI: isAI,
    takeTurn: takeTurn,
    getName: getName,
    placeShip: placeShip
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/js/objects/Ship.js":
/*!********************************!*\
  !*** ./src/js/objects/Ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ship(length) {
  // input check
  if (length < 2) throw new Error('Min.length is 2');

  if (length === undefined || typeof length !== 'number') {
    throw new Error('You must provide a number');
  }

  var state = Array(length).fill(0);

  function getLength() {
    return length;
  } // if position wasn't hit before
  // changes state of this position to hit and return true
  // otherwise changes nothing and return false


  function hit(position) {
    if (position > getLength() - 1 || position < 0 || typeof position !== 'number') {
      throw new Error('Incorrect hit position');
    }

    if (state[position] === 0) {
      state[position] = 1;
      return true;
    }

    return false;
  } // returns if all ship positions were hit


  function isSunk() {
    return state.reduce(function (a, b) {
      return a + b;
    }, 0) === getLength();
  }

  return {
    getLength: getLength,
    hit: hit,
    isSunk: isSunk
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\nbody {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  height: 99vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: lightgray;\n}\n\nheader {\n  font-family: 'Black Ops One', cursive;\n  font-size: 3rem;\n  height: 100px;\n}\n\nheader>h1 {\n  margin: 0;\n}\n\nmain {\n  flex:1;\n  display: grid;\n  grid-template: 40px 1fr / 1fr 1fr;\n  width: 100%;\n  gap: 20px;\n  padding: 50px;\n}\n\n.rotate,\n.result>button {\n  grid-column: 1;\n  height: 30px;\n  width: 100px;\n  border-radius: 5px;\n  justify-self: center;\n}\n\n.gameboard {\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  align-self: center;\n  justify-self: center;\n}\n\n.player1.gameboard {\n  grid-row: 2 / 3;\n  grid-column: 1;\n}\n\n.player2.gameboard {\n  grid-row: 2 / 3;\n  grid-column: 2 / 3;\n}\n\n.gameboard > div {\n  min-height: 30px;\n  min-width: 30px;\n  border: 1px solid black;\n}\n\nfooter {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\nfooter>a>img {\n  height: 24px;\n  width: auto;\n  transition: 0.5s;\n}\n\nfooter>a>img:hover {\n  height: 24px;\n  width: auto;\n  transform: scale(1.2) rotate(360deg);\n  cursor: pointer;\n}\n\n.ship {\n  background-color: darkcyan;\n}\n\n.ship-possible {\n  background-color: rgb(0, 179, 179);\n}\n\n.hit {\n  background-color: darkred;\n}\n\n.miss {\n  background-color: dimgray;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.result {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 40px;\n  z-index: 1;\n  background-color: rgba(204, 196, 79, 0.4);\n}\n\n.result>span {\n  font-family: 'Black Ops One', cursive;\n  font-size: 2rem;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,0JAA0J;EAC1J,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,qCAAqC;EACrC,eAAe;EACf,aAAa;AACf;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,MAAM;EACN,aAAa;EACb,iCAAiC;EACjC,WAAW;EACX,SAAS;EACT,aAAa;AACf;;AAEA;;EAEE,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,gDAAgD;EAChD,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;EACT,UAAU;EACV,yCAAyC;AAC3C;;AAEA;EACE,qCAAqC;EACrC,eAAe;AACjB","sourcesContent":["* {\n  box-sizing: border-box;\n  padding: 0;\n  margin: 0;\n}\n\nbody {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  height: 99vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: lightgray;\n}\n\nheader {\n  font-family: 'Black Ops One', cursive;\n  font-size: 3rem;\n  height: 100px;\n}\n\nheader>h1 {\n  margin: 0;\n}\n\nmain {\n  flex:1;\n  display: grid;\n  grid-template: 40px 1fr / 1fr 1fr;\n  width: 100%;\n  gap: 20px;\n  padding: 50px;\n}\n\n.rotate,\n.result>button {\n  grid-column: 1;\n  height: 30px;\n  width: 100px;\n  border-radius: 5px;\n  justify-self: center;\n}\n\n.gameboard {\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  align-self: center;\n  justify-self: center;\n}\n\n.player1.gameboard {\n  grid-row: 2 / 3;\n  grid-column: 1;\n}\n\n.player2.gameboard {\n  grid-row: 2 / 3;\n  grid-column: 2 / 3;\n}\n\n.gameboard > div {\n  min-height: 30px;\n  min-width: 30px;\n  border: 1px solid black;\n}\n\nfooter {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 20px;\n}\n\nfooter>a>img {\n  height: 24px;\n  width: auto;\n  transition: 0.5s;\n}\n\nfooter>a>img:hover {\n  height: 24px;\n  width: auto;\n  transform: scale(1.2) rotate(360deg);\n  cursor: pointer;\n}\n\n.ship {\n  background-color: darkcyan;\n}\n\n.ship-possible {\n  background-color: rgb(0, 179, 179);\n}\n\n.hit {\n  background-color: darkred;\n}\n\n.miss {\n  background-color: dimgray;\n}\n\n.hidden {\n  display: none !important;\n}\n\n.result {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 40px;\n  z-index: 1;\n  background-color: rgba(204, 196, 79, 0.4);\n}\n\n.result>span {\n  font-family: 'Black Ops One', cursive;\n  font-size: 2rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/GitHubLogo.png":
/*!***********************************!*\
  !*** ./src/assets/GitHubLogo.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b039b2d83982c8256af3.png";

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _objects_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/Game */ "./src/js/objects/Game.js");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style.css */ "./src/style.css");



(0,_objects_Game__WEBPACK_IMPORTED_MODULE_0__["default"])({});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7QUNmQTtBQUNBO0FBQ0E7QUFFQXJDLHlEQUFJLENBQUMsRUFBRCxDQUFKLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9zcmMvanMvVUkvVUkuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vc3JjL2pzL29iamVjdHMvR2FtZS5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9zcmMvanMvb2JqZWN0cy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vc3JjL2pzL29iamVjdHMvUGxheWVyLmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL3NyYy9qcy9vYmplY3RzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz8zNDJmIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheUxpa2VUb0FycmF5LmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlXaXRob3V0SG9sZXMuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXkuanMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9zdGFydC1jb25maWcvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3RhcnQtY29uZmlnL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3N0YXJ0LWNvbmZpZy8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2l0SHViTG9nbyBmcm9tICcuLi8uLi9hc3NldHMvR2l0SHViTG9nby5wbmcnO1xuXG5mdW5jdGlvbiBVSSgpIHtcbiAgLy8gY3JlYXRlcyBwYWdlIGhlYWRlclxuICBmdW5jdGlvbiBjcmVhdGVIZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGgxLnRleHRDb250ZW50ID0gJ0JBVFRMRVNISVBTJztcbiAgICBoZWFkZXIuYXBwZW5kKGgxKTtcbiAgICByZXR1cm4gaGVhZGVyO1xuICB9XG4gIC8vIGNyZWF0ZXMgcGFnZSBmb290ZXJcbiAgZnVuY3Rpb24gY3JlYXRlRm9vdGVyKCkge1xuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5oZWlnaHQgPSAnMzInO1xuICAgIGltZy53aWR0aCA9ICczMic7XG4gICAgaW1nLmFsdCA9ICdnaXQgaHViIGxvZ28nO1xuICAgIGltZy5zcmMgPSBHaXRIdWJMb2dvO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS92YXNpbGlpcGVyZmlsZXYnO1xuICAgIGZvb3Rlci50ZXh0Q29udGVudCA9ICdDb3B5cmlnaHQgwqkgMjAyMiBWYXNpbGlpIFBlcmZpbGV2JztcbiAgICBsaW5rLmFwcGVuZChpbWcpO1xuICAgIGZvb3Rlci5hcHBlbmQobGluayk7XG4gICAgcmV0dXJuIGZvb3RlcjtcbiAgfVxuICAvLyBjcmVhdGVzIHJlc3VsdCB3aW5kb3cgd2l0aCByZXN0YXJ0IGJ1dHRvbiB0byBzaG93IGFmdGVyIHRoZSBnYW1lXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlc3VsdCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByZXN1bHQuY2xhc3NMaXN0LmFkZCgncmVzdWx0JywgJ2hpZGRlbicpO1xuICAgIGNvbnN0IHJlc3VsdFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgncmVzdGFydCcpO1xuICAgIHJlc3RhcnRCdG4uaW5uZXJUZXh0ID0gJ1Jlc3RhcnQhJztcbiAgICByZXN1bHQuYXBwZW5kKHJlc3VsdFRleHQsIHJlc3RhcnRCdG4pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLy8gYWRkcyBjbGFzcyB0byBzcXVhcmUgaWYgdGhhdCBzcXVhcmUgd2FzIGF0dGFja2VkIG9yIGhhcyBzaGlwXG4gIGZ1bmN0aW9uIHN0eWxlR2JTcXVhcmUoc3F1YXJlLCBzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PT0gJ0hpdCBhdHRhY2snKSB7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ01pc3NlZCBhdHRhY2snKSB7XG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUgIT09IG51bGwpIHtcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgfVxuICB9XG4gIC8vIGNyZWF0ZXMgZ2IsIGFkZHMgeCBhbmQgeSB2YWx1ZXMgdG8gZWFjaCBzcXVhcmVcbiAgZnVuY3Rpb24gY3JlYXRlR2JEaXYoZ2FtZUJvYXJkKSB7XG4gICAgY29uc3QgZ2FtZUJvYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKS5mb3JFYWNoKChudW0xKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKEFycmF5KDEwKS5rZXlzKCkpLmZvckVhY2goKG51bTIpID0+IHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNxdWFyZS5kYXRhc2V0LnggPSBudW0yO1xuICAgICAgICBzcXVhcmUuZGF0YXNldC55ID0gbnVtMTtcbiAgICAgICAgc3R5bGVHYlNxdWFyZShzcXVhcmUsIGdhbWVCb2FyZC5nZXRTaGlwUG9zaXRpb24obnVtMiwgbnVtMSkpO1xuICAgICAgICBnYW1lQm9hcmREaXYuYXBwZW5kKHNxdWFyZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZ2FtZUJvYXJkRGl2O1xuICB9XG4gIC8vIGNyZWF0ZXMgcm90YXRlIGJ0biB0byByb3RhdGUgc2hpcHNcbiAgZnVuY3Rpb24gY3JlYXRlUm90YXRlQnRuKCkge1xuICAgIGNvbnN0IHJvdGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHJvdGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUnKTtcbiAgICByb3RhdGVCdG4uaW5uZXJUZXh0ID0gJ1JvdGF0ZSBzaGlwJztcbiAgICByZXR1cm4gcm90YXRlQnRuO1xuICB9XG4gIC8vIGhpZGVzIHNoaXBzIGJ5IHJlbW92aW5nIHNoaXBzIGNsYXNzIGZyb20gc3F1YXJlc1xuICBmdW5jdGlvbiBoaWRlU2hpcHMoZ2FtZUJvYXJkRGl2KSB7XG4gICAgWy4uLmdhbWVCb2FyZERpdi5jaGlsZHJlbl0uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICB9KTtcbiAgfVxuICAvLyByZXJlbmRlcnMgYWxsIHNxdWFyZXMgb2YgYm9hcmRcbiAgY29uc3QgdXBkYXRlQm9hcmQgPSAoZ2FtZUJvYXJkLCBnYW1lQm9hcmREaXYpID0+XG4gICAgZ2FtZUJvYXJkRGl2LnJlcGxhY2VDaGlsZHJlbiguLi5jcmVhdGVHYkRpdihnYW1lQm9hcmQpLmNoaWxkcmVuKTtcbiAgLy8gcmVuZGVycyB3aG9sZSBwYWdlXG4gIGZ1bmN0aW9uIHJlbmRlclBhZ2UoZ2FtZUJvYXJkMSwgZ2FtZUJvYXJkMiwgcGxheWVyMU5hbWUsIHBsYXllcjJOYW1lKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnRleHRDb250ZW50ID0gJyc7XG4gICAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZGVyKCk7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21haW4nKTtcbiAgICBjb25zdCBnYjFEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBnYjJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBnYjFEaXYuY2xhc3NMaXN0LmFkZChwbGF5ZXIxTmFtZSwgJ2dhbWVib2FyZCcpO1xuICAgIGdiMkRpdi5jbGFzc0xpc3QuYWRkKHBsYXllcjJOYW1lLCAnZ2FtZWJvYXJkJyk7XG4gICAgY29uc3Qgcm90YXRlQnRuID0gY3JlYXRlUm90YXRlQnRuKCk7XG4gICAgcm90YXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZ2FtZUJvYXJkMS5jaGFuZ2VOZXh0U2hpcERpcmVjdGlvbigpKTtcbiAgICBtYWluLmFwcGVuZChyb3RhdGVCdG4sIGdiMURpdiwgZ2IyRGl2KTtcbiAgICBjb25zdCBmb290ZXIgPSBjcmVhdGVGb290ZXIoKTtcbiAgICBjb25zdCByZXN1bHQgPSBjcmVhdGVSZXN1bHQoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kKGhlYWRlciwgbWFpbiwgZm9vdGVyLCByZXN1bHQpO1xuICAgIHVwZGF0ZUJvYXJkKGdhbWVCb2FyZDEsIGdiMURpdik7XG4gICAgdXBkYXRlQm9hcmQoZ2FtZUJvYXJkMiwgZ2IyRGl2KTtcbiAgICBoaWRlU2hpcHMoZ2IyRGl2KTtcbiAgfVxuICAvLyByZXR1cm5zIGFycmF5IG9mIHggYW5kIHkgZnJvbSBldmVudCB0YXJnZXQoc3F1YXJlKVxuICBjb25zdCBnZXRUdXJuSW5wdXQgPSAoZXZlbnQpID0+IFtcbiAgICBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC54LCAxMCksXG4gICAgcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSwgMTApLFxuICBdO1xuICAvLyBzaG93cyByZXN1bHQgd2luZG93IHdpdGggdGV4dCBmcm9tIGlucHV0IHZhbHVlXG4gIGZ1bmN0aW9uIHNob3dSZXN1bHQocmVzdWx0KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdCA+IHNwYW4nKS50ZXh0Q29udGVudCA9IHJlc3VsdDtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH1cbiAgLy8gaGlkZXMgcm90YXRlIHNoaXAgYnV0dG9uXG4gIGNvbnN0IGhpZGVSb3RhdGVCdG4gPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIC8vIHJldHVybnMgcGxheWVycyBnYiBlbGVtZW50IGJ5IHBsYXllciBuYW1lXG4gIGNvbnN0IGdldFBsYXllckdiID0gKHBsYXllck5hbWUpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BsYXllck5hbWV9LmdhbWVib2FyZGApO1xuICAvLyByZXR1cm5zIGlmIHR3byBzcXVhcmVzIGFyZSBvbiB0aGUgc2FtZSBsaW5lIG9mIHBhcnRpY3VsYXIgZGlyZWN0aW9uIDAgLSBYLCAxLSBZO1xuICAvLyBpZiBzcXVhcmVzIGhhdmUgc2FtZSB4IHRoZXkncmUgb24gdGhlIHNhbWUgbGluZSBvZiBZIGRpcmVjdGlvbiBhbmQgdmljZSB2ZXJzYVxuICBjb25zdCBpc09uU2FtZUxpbmUgPSAoc3ExLCBzcTIsIGRpcmVjdGlvbikgPT5cbiAgICAoc3ExLmRhdGFzZXQueCA9PT0gc3EyLmRhdGFzZXQueCAmJiBkaXJlY3Rpb24gPT09IDEpIHx8XG4gICAgKHNxMS5kYXRhc2V0LnkgPT09IHNxMi5kYXRhc2V0LnkgJiYgZGlyZWN0aW9uID09PSAwKTtcbiAgLy8gc2hvd3MgcG90ZW50aWFsIHNoaXAgc2hhZG93LiBIYW5kbGVzIG1vdXNlb3ZlciBhbmQgbW91c2Ugb3V0IGV2ZW50c1xuICBmdW5jdGlvbiBtb3VzZU1vdmVIYW5kbGVyKHN0YXJ0RWxlbWVudCwgZ2FtZUJvYXJkKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gZ2FtZUJvYXJkLmdldE5leHRTaGlwRGlyZWN0aW9uKCk7XG4gICAgbGV0IGxlbmd0aCA9IGdhbWVCb2FyZC5nZXROZXh0U2hpcExlbmd0aCgpIC0gMTtcbiAgICBjb25zdCBzdGVwID0gZGlyZWN0aW9uID09PSAwID8gMSA6IDEwO1xuICAgIGNvbnN0IGFsbFNxdWFyZXMgPSBBcnJheS5mcm9tKHN0YXJ0RWxlbWVudC5wYXJlbnROb2RlLmNoaWxkcmVuKTtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gYWxsU3F1YXJlcy5pbmRleE9mKHN0YXJ0RWxlbWVudCk7XG4gICAgd2hpbGUgKGxlbmd0aCA+PSAwKSB7XG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBzdGFydEluZGV4ICsgbGVuZ3RoICogc3RlcDtcbiAgICAgIGlmIChuZXh0SW5kZXggPCAxMDApIHtcbiAgICAgICAgY29uc3QgbmV4dEVsZW1lbnQgPSBhbGxTcXVhcmVzW25leHRJbmRleF07XG4gICAgICAgIGlmIChpc09uU2FtZUxpbmUoc3RhcnRFbGVtZW50LCBuZXh0RWxlbWVudCwgZGlyZWN0aW9uKSlcbiAgICAgICAgICBhbGxTcXVhcmVzW25leHRJbmRleF0uY2xhc3NMaXN0LnRvZ2dsZSgnc2hpcC1wb3NzaWJsZScpO1xuICAgICAgfVxuICAgICAgbGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG4gIC8vIGNvcGllcyBlbGVtZW50IGFuZCBwbGFjZXMgaXQgdG8gdGhlIHNhbWUgZG9tIHBvc2l0aW9uIHJlbW92aW5nIGV2ZW50IGxpc3RlbmVyc1xuICBmdW5jdGlvbiBjb3B5V2l0aG91dEV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpIHtcbiAgICBjb25zdCBnYkRpdiA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZ2JEaXYsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXJQYWdlLFxuICAgIHVwZGF0ZUJvYXJkLFxuICAgIGdldFR1cm5JbnB1dCxcbiAgICBzaG93UmVzdWx0LFxuICAgIGhpZGVSb3RhdGVCdG4sXG4gICAgZ2V0UGxheWVyR2IsXG4gICAgaGlkZVNoaXBzLFxuICAgIG1vdXNlTW92ZUhhbmRsZXIsXG4gICAgY29weVdpdGhvdXRFdmVudExpc3RlbmVycyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVUk7XG4iLCJpbXBvcnQgVUkgZnJvbSAnLi4vVUkvVUknO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuZnVuY3Rpb24gR2FtZShvcHRpb25zKSB7XG4gIGNvbnN0IHVpID0gVUkoKTtcbiAgY29uc3QgcGxheWVyMSA9IG9wdGlvbnMucGxyMSB8fCBQbGF5ZXIoJ3BsYXllcjEnKTtcbiAgY29uc3QgcGxheWVyMiA9IG9wdGlvbnMucGxyMiB8fCBQbGF5ZXIoJ3BsYXllcjInLCB0cnVlKTtcbiAgY29uc3QgcGxheWVyMUdiID0gb3B0aW9ucy5nYjEgfHwgR2FtZWJvYXJkKCk7XG4gIGNvbnN0IHBsYXllcjJHYiA9IG9wdGlvbnMuZ2IyIHx8IEdhbWVib2FyZCgpO1xuICBsZXQgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgbGV0IGFjdGl2ZVBsYXllckdiID0gcGxheWVyMUdiO1xuICAvLyByZXR1cm5zIGlmIGJvdGggYm9hcmRzIGhhcyB0aGVpciBzaGlwcyBwbGFjZWRcbiAgY29uc3QgY2FuU3RhcnQgPSAoKSA9PlxuICAgIHBsYXllcjFHYi5nZXRTaGlwc1RvUGxhY2VMZWZ0KCkgPT09IDAgJiYgcGxheWVyMkdiLmdldFNoaXBzVG9QbGFjZUxlZnQoKSA9PT0gMDtcblxuICAvLyBzd2l0Y2hlcyBhY3RpdmUgcGxheWVyLCB1cGRhdGVzIFVJIGFuZCB0cmlnZ2VycyBBSSBhY3Rpb24gaWYgcmVxdWlyZWRcbiAgZnVuY3Rpb24gc3dpdGNoQWN0aXZlUGxheWVyKEFJbGlzdGVuZXJFbGVtZW50KSB7XG4gICAgLy8gaGlkZSBjdXJyZW50IGFjdGl2ZSBwbGF5ZXIgc2hpcHNcbiAgICB1aS5oaWRlU2hpcHModWkuZ2V0UGxheWVyR2IoYWN0aXZlUGxheWVyLmdldE5hbWUoKSkpO1xuICAgIGFjdGl2ZVBsYXllciA9IGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSA/IHBsYXllcjIgOiBwbGF5ZXIxO1xuICAgIGFjdGl2ZVBsYXllckdiID0gYWN0aXZlUGxheWVyR2IgPT09IHBsYXllcjFHYiA/IHBsYXllcjJHYiA6IHBsYXllcjFHYjtcbiAgICAvLyBzaG93IG5ldyBhY3RpdmUgcGxheWVyIHNoaXBzXG4gICAgdWkudXBkYXRlQm9hcmQoYWN0aXZlUGxheWVyR2IsIHVpLmdldFBsYXllckdiKGFjdGl2ZVBsYXllci5nZXROYW1lKCkpKTtcbiAgICAvLyB0cmlnZ2VycyBBSSBhY3Rpb24gaWYgYW55XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMiAmJiBwbGF5ZXIyLmlzQUkpIEFJbGlzdGVuZXJFbGVtZW50LmNsaWNrKCk7XG4gIH1cbiAgLy8gcmV0dXJucyBnYW1lIHJlc3VsdCBpZiBhbnkgb3IgdW5kZWZpbmVkIG90aGVyd2lzZVxuICBmdW5jdGlvbiBnZXRHYW1lUmVzdWx0KGlzQWxsU3Vua1BsYXllcjEsIGlzQWxsU3Vua1BsYXllcjIpIHtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGlmIChpc0FsbFN1bmtQbGF5ZXIxKSByZXN1bHQgPSAnUGxheWVyIDIgd29uISc7XG4gICAgaWYgKGlzQWxsU3Vua1BsYXllcjIpIHJlc3VsdCA9ICdQbGF5ZXIgMSB3b24hJztcbiAgICBpZiAoaXNBbGxTdW5rUGxheWVyMiAmJiBpc0FsbFN1bmtQbGF5ZXIxKSByZXN1bHQgPSAnRHJhdyEnO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLy8gYXR0YWNrcyBjbGlja2VkIHNxdWFyZSwgdXBkYXRlcyBVSSwgc3dpdGNoZXMgYWN0aXZlIHBsYXllciBhbmQgcmVwZWF0IEFJIGF0dGFjayBpZiBBSSBoaXQgYmVmb3JlXG4gIGZ1bmN0aW9uIGF0dGFja0hhbmRsZXIoZXZlbnQsIG9wcG9uZW50R2IsIHBsYXllcikge1xuICAgIGlmIChwbGF5ZXIgPT09IGFjdGl2ZVBsYXllcikge1xuICAgICAgY29uc3Qgd2FzU2hpcEhpdCA9IHBsYXllci50YWtlVHVybihvcHBvbmVudEdiLCB1aS5nZXRUdXJuSW5wdXQoZXZlbnQpKTtcbiAgICAgIHVpLnVwZGF0ZUJvYXJkKG9wcG9uZW50R2IsIGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgLy8gaGlkZSBvcHBvbmVudCBnYiBzaGlwcyBhZnRlciB1cGRhdGVcbiAgICAgIHVpLmhpZGVTaGlwcyhldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIGlmICghd2FzU2hpcEhpdCB8fCBvcHBvbmVudEdiLmlmQWxsU3VuaygpKVxuICAgICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIodWkuZ2V0UGxheWVyR2IocGxheWVyMS5nZXROYW1lKCkpKTtcbiAgICAgIGlmIChwbGF5ZXIuaXNBSSAmJiB3YXNTaGlwSGl0KSBhdHRhY2tIYW5kbGVyKGV2ZW50LCBvcHBvbmVudEdiLCBwbGF5ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhpZGUgcHJlcGFyYXRpb24gcGhhc2UgVUksIHNldHVwIGF0dGFjayBldmVudCBsaXN0ZW5lcnMgYW5kIHJlc3RhcnQgYnV0dG9uXG4gIGZ1bmN0aW9uIHNldHVwQXR0YWNrUGhhc2UoKSB7XG4gICAgdWkuaGlkZVJvdGF0ZUJ0bigpO1xuICAgIC8vIGNoZWNrIGZvciBnYW1lIHJlc3VsdHMgYWZ0ZXIgcGxheWVyIDIgdHVyblxuICAgIHVpLmdldFBsYXllckdiKHBsYXllcjEuZ2V0TmFtZSgpKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgYXR0YWNrSGFuZGxlcihldmVudCwgcGxheWVyMUdiLCBwbGF5ZXIyKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGdldEdhbWVSZXN1bHQocGxheWVyMUdiLmlmQWxsU3VuaygpLCBwbGF5ZXIyR2IuaWZBbGxTdW5rKCkpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB1aS5zaG93UmVzdWx0KHJlc3VsdCk7XG4gICAgfSk7XG4gICAgdWkuZ2V0UGxheWVyR2IocGxheWVyMi5nZXROYW1lKCkpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBhdHRhY2tIYW5kbGVyKGV2ZW50LCBwbGF5ZXIyR2IsIHBsYXllcjEpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBHYW1lKHt9KTtcbiAgICB9KTtcbiAgfVxuICAvLyBoaWRlcyBwbGF5ZXIgc2hpcHMsIHJlbW92ZSBwcmVwYXJhdGlvbiBwaGFzZSBldmVudCBsaXN0ZW5lcnMgYW5kIHN3aXRjaCBhY3RpdmUgcGxheWVyXG4gIGZ1bmN0aW9uIGZpbmlzaFBsYXllclByZXBhcmF0aW9uKGV2ZW50KSB7XG4gICAgdWkuaGlkZVNoaXBzKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIHVpLmNvcHlXaXRob3V0RXZlbnRMaXN0ZW5lcnMoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgc3dpdGNoQWN0aXZlUGxheWVyKHVpLmdldFBsYXllckdiKHBsYXllcjIuZ2V0TmFtZSgpKSk7XG4gIH1cbiAgLy8gcGxhY2VzIHNoaXAgb24gY2xpY2sgY29vcmRzIGFuZCB1cGRhdGVzIFVJXG4gIGZ1bmN0aW9uIHByZXBhcmF0aW9uSGFuZGxlcihldmVudCwgZ2IsIHBsYXllcikge1xuICAgIGlmIChnYi5nZXRTaGlwc1RvUGxhY2VMZWZ0KCkgPiAwICYmIHBsYXllciA9PT0gYWN0aXZlUGxheWVyKSB7XG4gICAgICBwbGF5ZXIucGxhY2VTaGlwKGdiLCB1aS5nZXRUdXJuSW5wdXQoZXZlbnQpKTtcbiAgICAgIHVpLnVwZGF0ZUJvYXJkKGdiLCBldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgIC8vIGlmIGNhbiBzdGFydCB0aGUgZ2FtZSBmaW5pc2ggdGhpcyBwbGF5ZXIgcHJlcGFyYXRpb24gYW5kIHNldHVwIGF0dGFjayBwaGFzZVxuICAgICAgaWYgKGNhblN0YXJ0KCkpIHtcbiAgICAgICAgZmluaXNoUGxheWVyUHJlcGFyYXRpb24oZXZlbnQpO1xuICAgICAgICBzZXR1cEF0dGFja1BoYXNlKCk7XG4gICAgICAgIC8vIGVsc2UgaWYgYWxsIHNoaXBzIHdlcmUgcGxhY2VkIGJ1dCBjYW4ndCBzdGFydCB5ZXQgZmluaXNoIHRoaXMgcGxheWVyIHByZXBhcmF0aW9uXG4gICAgICB9IGVsc2UgaWYgKGdiLmdldFNoaXBzVG9QbGFjZUxlZnQoKSA9PT0gMCkge1xuICAgICAgICBmaW5pc2hQbGF5ZXJQcmVwYXJhdGlvbihldmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0dXAgcHJlcGFyYXRpb24gZXZlbnQgbGlzdGVuZXJzIC0gc2hpcCBwbGFjZW1lbnRzIGFuZCBhIHBvdGVudGlhbCBzaGlwIHNoYWRvdyBvbiBtb3VzZW92ZXJcbiAgZnVuY3Rpb24gc2V0dXBQcmVwYXJhdGlvblBoYXNlKCkge1xuICAgIHVpLmdldFBsYXllckdiKHBsYXllcjEuZ2V0TmFtZSgpKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgIHVpLm1vdXNlTW92ZUhhbmRsZXIoZXZlbnQudGFyZ2V0LCBwbGF5ZXIxR2IpO1xuICAgIH0pO1xuICAgIHVpLmdldFBsYXllckdiKHBsYXllcjEuZ2V0TmFtZSgpKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChldmVudCkgPT4ge1xuICAgICAgdWkubW91c2VNb3ZlSGFuZGxlcihldmVudC50YXJnZXQsIHBsYXllcjFHYik7XG4gICAgfSk7XG4gICAgdWkuZ2V0UGxheWVyR2IocGxheWVyMS5nZXROYW1lKCkpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBwcmVwYXJhdGlvbkhhbmRsZXIoZXZlbnQsIHBsYXllcjFHYiwgcGxheWVyMSk7XG4gICAgfSk7XG4gICAgdWkuZ2V0UGxheWVyR2IocGxheWVyMi5nZXROYW1lKCkpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBwcmVwYXJhdGlvbkhhbmRsZXIoZXZlbnQsIHBsYXllcjJHYiwgcGxheWVyMik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBzdGFydCBnYW1lXG4gIHVpLnJlbmRlclBhZ2UocGxheWVyMUdiLCBwbGF5ZXIyR2IsIHBsYXllcjEuZ2V0TmFtZSgpLCBwbGF5ZXIyLmdldE5hbWUoKSk7XG4gIHNldHVwUHJlcGFyYXRpb25QaGFzZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcblxuZnVuY3Rpb24gR2FtZWJvYXJkKHNoaXBzVG9QbGFjZUxlbmd0aHMgPSBbNSwgNCwgMywgMywgMl0pIHtcbiAgLy8gaW5pdGlhbCBib2FyZCBjb25zdHJ1Y3RvclxuICBjb25zdCBib2FyZCA9IFtdO1xuICBjb25zdCBwbGFjZWRTaGlwcyA9IFtdO1xuICBjb25zdCBvY2N1cGllZFNxdWFyZXMgPSBbXTtcbiAgY29uc3QgaGl0U3RhdGUgPSAnSGl0IGF0dGFjayc7XG4gIGNvbnN0IG1pc3NTdGF0ZSA9ICdNaXNzZWQgYXR0YWNrJztcbiAgY29uc3QgaW5jb3JyZWN0U3F1YXJlRXJyb3IgPSBuZXcgRXJyb3IoJ0luY29ycmVjdCBzcXVhcmUgY29vcmRpbmF0ZXMnKTtcbiAgY29uc3Qgc3BhY2VPY2N1cGllZEVycm9yID0gbmV3IEVycm9yKCdTcGFjZSBpcyBvY2N1cGllZCcpO1xuICBsZXQgbmV4dFNoaXBEaXJlY3Rpb24gPSAwO1xuICBsZXQgbmV4dFNoaXBTdGFydENvb3JkcyA9IG51bGw7XG4gIGxldCBuZXh0U2hpcExlbmd0aCA9IG51bGw7XG4gIEFycmF5LmZyb20oQXJyYXkoMTApLmtleXMoKSkuZm9yRWFjaCgobnVtMSkgPT4ge1xuICAgIGJvYXJkW251bTFdID0gW107XG4gICAgQXJyYXkuZnJvbShBcnJheSgxMCkua2V5cygpKS5mb3JFYWNoKChudW0yKSA9PiB7XG4gICAgICBib2FyZFtudW0xXVtudW0yXSA9IHsgc2hpcDogbnVsbCwgcG9zaXRpb246IG51bGwgfTtcbiAgICB9KTtcbiAgfSk7XG4gIC8vIGdldHRlcnNcbiAgY29uc3QgZ2V0TmV4dFNoaXBEaXJlY3Rpb24gPSAoKSA9PiBuZXh0U2hpcERpcmVjdGlvbjtcbiAgY29uc3QgZ2V0T3Bwb3NpdGVEaXJlY3Rpb24gPSAoKSA9PiAxIC0gbmV4dFNoaXBEaXJlY3Rpb247XG4gIGNvbnN0IGdldFNoaXAgPSAoeCwgeSkgPT4gYm9hcmRbeF1beV0uc2hpcDtcbiAgY29uc3QgZ2V0U2hpcFBvc2l0aW9uID0gKHgsIHkpID0+IGJvYXJkW3hdW3ldLnBvc2l0aW9uO1xuICBjb25zdCBnZXRTaGlwc1RvUGxhY2VMZWZ0ID0gKCkgPT4gc2hpcHNUb1BsYWNlTGVuZ3Rocy5sZW5ndGg7XG4gIGNvbnN0IGdldE5leHRTaGlwTGVuZ3RoID0gKCkgPT4gc2hpcHNUb1BsYWNlTGVuZ3Roc1swXTtcbiAgLy8gaGVscGVyc1xuICBjb25zdCBpc1ZhbGlkQ29vcmRzID0gKHgsIHkpID0+IHggPD0gOSAmJiB4ID49IDAgJiYgeSA8PSA5ICYmIHkgPj0gMDtcbiAgY29uc3QgaWZBbGxTdW5rID0gKCkgPT4gcGxhY2VkU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpIHx8IHBsYWNlZFNoaXBzLmxlbmd0aCA9PT0gMDtcbiAgY29uc3Qgd2FzU3F1YXJlQXR0YWNrZWQgPSAoW3gsIHldKSA9PiB0eXBlb2YgYm9hcmRbeF1beV0ucG9zaXRpb24gPT09ICdzdHJpbmcnO1xuICAvLyBjaGFuZ2VzIGRpcmVjdGlvbiBvZiBuZXh0IHNoaXAgdG8gcGxhY2Ugb24gdGhpcyBib2FyZCAwIC0gYnkgeCwgMSAtIGJ5IHlcbiAgY29uc3QgY2hhbmdlTmV4dFNoaXBEaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgbmV4dFNoaXBEaXJlY3Rpb24gPSAxIC0gbmV4dFNoaXBEaXJlY3Rpb247XG4gIH07XG4gIC8vIGxpbmtzIHNxdWFyZSB0byBpdHMgc2hpcCBhbmQgcG9zaXRpb24gb2YgdGhhdCBzaGlwXG4gIGZ1bmN0aW9uIHNldFNxdWFyZShzaGlwLCBwb3NpdGlvbiwgeCwgeSkge1xuICAgIGlmIChpc1ZhbGlkQ29vcmRzKHgsIHkpKSB7XG4gICAgICBib2FyZFt4XVt5XS5zaGlwID0gc2hpcDtcbiAgICAgIGJvYXJkW3hdW3ldLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGluY29ycmVjdFNxdWFyZUVycm9yO1xuICAgIH1cbiAgfVxuICAvLyBhZGRzIHNxdWFyZSBhbmQgc3F1YXJlcyB0aGF0IGFkamFjZW50IGFuZCBwZXJwZW5kaWN1bGFyIHRvIHNoaXAgZGlyZWN0aW9uIHRvIGxpc3Qgb2Ygb2NjdXBpZWQgc3F1YXJlc1xuICBmdW5jdGlvbiBhZGRBZGphY2VudE9jY3VwaWVkU3F1YXJlcyhjZW50ZXJDb29yZHMpIHtcbiAgICBmb3IgKGxldCBpID0gLTE7IGkgPCAyOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IFsuLi5jZW50ZXJDb29yZHNdO1xuICAgICAgbmV3Q29vcmRzW2dldE9wcG9zaXRlRGlyZWN0aW9uKCldICs9IGk7XG4gICAgICBpZiAoaXNWYWxpZENvb3JkcyguLi5uZXdDb29yZHMpKSB7XG4gICAgICAgIG9jY3VwaWVkU3F1YXJlcy5wdXNoKG5ld0Nvb3Jkcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIHNldHMgZWFjaCBzaGlwcyBzcXVhcmVcbiAgZnVuY3Rpb24gcGxhY2VTaGlwT25Cb2FyZChzaGlwKSB7XG4gICAgWy4uLkFycmF5KHNoaXAuZ2V0TGVuZ3RoKCkpLmtleXMoKV0uZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IFsuLi5uZXh0U2hpcFN0YXJ0Q29vcmRzXTtcbiAgICAgIGNvb3Jkc1tuZXh0U2hpcERpcmVjdGlvbl0gKz0gcG9zaXRpb247XG4gICAgICBzZXRTcXVhcmUoc2hpcCwgcG9zaXRpb24sIC4uLmNvb3Jkcyk7XG4gICAgfSk7XG4gIH1cbiAgLy8gbW92ZXMgc2hpcCBmcm9tIFwidG8gcGxhY2VcIiBsaXN0IHRvIFwid2VyZSBwbGFjZWRcIiBsaXN0XG4gIGZ1bmN0aW9uIG1vdmVTaGlwVG9QbGFjZWQoc2hpcCkge1xuICAgIGNvbnN0IHNoaXBJbmRleCA9IHNoaXBzVG9QbGFjZUxlbmd0aHMuaW5kZXhPZihzaGlwLmdldExlbmd0aCgpKTtcbiAgICBpZiAoc2hpcEluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzaGlwIG9mIHRoYXQgbGVuZ3RoIGNhbiBiZSBwbGFjZWQhJyk7XG4gICAgfVxuICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcCk7XG4gICAgc2hpcHNUb1BsYWNlTGVuZ3Rocy5zcGxpY2Uoc2hpcEluZGV4LCAxKTtcbiAgfVxuICAvLyBjaGVja3MgaWYgcG90ZW50aWFsIHNoaXAgc3F1YXJlcyBhcmUgd2l0aGluIGJvYXJkIGFuZCBub3QgaW4gbGlzdCBvZiBvY2N1cGllZCBzcXVhcmVzXG4gIGZ1bmN0aW9uIGNoZWNrU2hpcFNxdWFyZXMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0U2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBbLi4ubmV4dFNoaXBTdGFydENvb3Jkc107XG4gICAgICBjb29yZHNbbmV4dFNoaXBEaXJlY3Rpb25dICs9IGk7XG4gICAgICBpZiAoIWlzVmFsaWRDb29yZHMoLi4uY29vcmRzKSkgdGhyb3cgaW5jb3JyZWN0U3F1YXJlRXJyb3I7XG4gICAgICBpZiAoSlNPTi5zdHJpbmdpZnkob2NjdXBpZWRTcXVhcmVzKS5pbmNsdWRlcyhKU09OLnN0cmluZ2lmeShjb29yZHMpKSlcbiAgICAgICAgdGhyb3cgc3BhY2VPY2N1cGllZEVycm9yO1xuICAgIH1cbiAgfVxuICAvLyBhZGRzIG9jY3VwaWVkIGJ5IHNoaXAgc3F1YXJlcyB0byBsaXN0IG9mIG9jY3VwaWVkIHNxdWFyZXNcbiAgZnVuY3Rpb24gYWRkVG9PY2N1cGllZFNxdWFyZXMoKSB7XG4gICAgY29uc3Qgc3RhcnRPZk9jY3VwaWVkID0gWy4uLm5leHRTaGlwU3RhcnRDb29yZHNdO1xuICAgIHN0YXJ0T2ZPY2N1cGllZFtuZXh0U2hpcERpcmVjdGlvbl0gLT0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuZXh0U2hpcExlbmd0aCArIDE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY29vcmRzID0gWy4uLnN0YXJ0T2ZPY2N1cGllZF07XG4gICAgICBjb29yZHNbbmV4dFNoaXBEaXJlY3Rpb25dICs9IGk7XG4gICAgICBhZGRBZGphY2VudE9jY3VwaWVkU3F1YXJlcyhjb29yZHMpO1xuICAgIH1cbiAgfVxuICAvLyBhZGRzIHNoaXAgdG8gYm9hcmQgb3IgdGhyb3dzIGVycm9yXG4gIGZ1bmN0aW9uIGFkZFNoaXAobGVuZ3RoLCBzdGFydENvb3Jkc0Fycikge1xuICAgIG5leHRTaGlwTGVuZ3RoID0gbGVuZ3RoIHx8IHNoaXBzVG9QbGFjZUxlbmd0aHNbMF07XG4gICAgbmV4dFNoaXBTdGFydENvb3JkcyA9IHN0YXJ0Q29vcmRzQXJyO1xuICAgIGNoZWNrU2hpcFNxdWFyZXMoKTtcbiAgICBhZGRUb09jY3VwaWVkU3F1YXJlcygpO1xuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChuZXh0U2hpcExlbmd0aCk7XG4gICAgbW92ZVNoaXBUb1BsYWNlZChzaGlwKTtcbiAgICBwbGFjZVNoaXBPbkJvYXJkKHNoaXApO1xuICB9XG4gIC8vIHBsYWNlcyBhbGwgc2hpcHMgZnJvbSBzaGlwc1RvUGxhY2UgbGlzdCBvbiBib2FyZFxuICBmdW5jdGlvbiBwbGFjZVNoaXBzUmFuZG9tbHkoKSB7XG4gICAgd2hpbGUgKHNoaXBzVG9QbGFjZUxlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGNvb3Jkc0FyciA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5KSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSldO1xuICAgICAgY29uc3QgbGVuZ3RoID0gc2hpcHNUb1BsYWNlTGVuZ3Roc1swXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFkZFNoaXAobGVuZ3RoLCBjb29yZHNBcnIpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGNvb3Jkc0FyciA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5KSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSldO1xuICAgICAgICBjaGFuZ2VOZXh0U2hpcERpcmVjdGlvbigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyByZWNlaXZlcyBhdHRhY2sgb24gY29vcmRpbmF0cyB4LHlcbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhbeCwgeV0pIHtcbiAgICBpZiAoYm9hcmRbeF1beV0uc2hpcCAhPT0gbnVsbCkge1xuICAgICAgYm9hcmRbeF1beV0uc2hpcC5oaXQoYm9hcmRbeF1beV0ucG9zaXRpb24pO1xuICAgICAgYm9hcmRbeF1beV0ucG9zaXRpb24gPSBoaXRTdGF0ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBib2FyZFt4XVt5XS5wb3NpdGlvbiA9IG1pc3NTdGF0ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFNoaXAsXG4gICAgZ2V0U2hpcFBvc2l0aW9uLFxuICAgIGNoYW5nZU5leHRTaGlwRGlyZWN0aW9uLFxuICAgIGFkZFNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBpZkFsbFN1bmssXG4gICAgZ2V0U2hpcHNUb1BsYWNlTGVmdCxcbiAgICB3YXNTcXVhcmVBdHRhY2tlZCxcbiAgICBwbGFjZVNoaXBzUmFuZG9tbHksXG4gICAgZ2V0TmV4dFNoaXBEaXJlY3Rpb24sXG4gICAgZ2V0TmV4dFNoaXBMZW5ndGgsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImZ1bmN0aW9uIFBsYXllcihuYW1lLCBpc0FJID0gZmFsc2UpIHtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gIC8vIHJldHVybnMgYXJyYXkgd2l0aCBhbGxvd2VkIGF0dGFjayBzcXVhcmUgY29vcmRzIFtYLCBZXVxuICBmdW5jdGlvbiBnZXRBSW1vdmUoZ2IpIHtcbiAgICBsZXQgY29vcmRzQXJyID0gW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5KV07XG4gICAgd2hpbGUgKHR5cGVvZiBnYi5nZXRTaGlwUG9zaXRpb24oLi4uY29vcmRzQXJyKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvb3Jkc0FyciA9IFtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5KSwgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSldO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRzQXJyO1xuICB9XG4gIC8vIGF0dGFja3Mgb3Bwb25lbnQgZ2JcbiAgZnVuY3Rpb24gdGFrZVR1cm4ob3Bwb25lbnRHYiwgY29vcmRzQXJyKSB7XG4gICAgY29uc3QgY29vcmRzID0gaXNBSSA/IGdldEFJbW92ZShvcHBvbmVudEdiKSA6IGNvb3Jkc0FycjtcbiAgICBpZiAoIW9wcG9uZW50R2Iud2FzU3F1YXJlQXR0YWNrZWQoY29vcmRzKSkge1xuICAgICAgcmV0dXJuIG9wcG9uZW50R2IucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Bvc2l0aW9uIHdhcyBhdHRhY2tlZCBiZWZvcmUnKTtcbiAgfVxuICAvLyBwbGFjZXMgb25lIHNoaXAgZm9yIHBsYXllciBvciBhbGwgc2hpcHMgcmFuZG9tbHkgZm9yIEFJXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcChnYiwgY29vcmRzQXJyLCBsZW5ndGgpIHtcbiAgICBpZiAoaXNBSSkge1xuICAgICAgZ2IucGxhY2VTaGlwc1JhbmRvbWx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdiLmFkZFNoaXAobGVuZ3RoLCBjb29yZHNBcnIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXNBSSxcbiAgICB0YWtlVHVybixcbiAgICBnZXROYW1lLFxuICAgIHBsYWNlU2hpcCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgLy8gaW5wdXQgY2hlY2tcbiAgaWYgKGxlbmd0aCA8IDIpIHRocm93IG5ldyBFcnJvcignTWluLmxlbmd0aCBpcyAyJyk7XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBhIG51bWJlcicpO1xuICB9XG4gIGNvbnN0IHN0YXRlID0gQXJyYXkobGVuZ3RoKS5maWxsKDApO1xuICBmdW5jdGlvbiBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfVxuICAvLyBpZiBwb3NpdGlvbiB3YXNuJ3QgaGl0IGJlZm9yZVxuICAvLyBjaGFuZ2VzIHN0YXRlIG9mIHRoaXMgcG9zaXRpb24gdG8gaGl0IGFuZCByZXR1cm4gdHJ1ZVxuICAvLyBvdGhlcndpc2UgY2hhbmdlcyBub3RoaW5nIGFuZCByZXR1cm4gZmFsc2VcbiAgZnVuY3Rpb24gaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uID4gZ2V0TGVuZ3RoKCkgLSAxIHx8IHBvc2l0aW9uIDwgMCB8fCB0eXBlb2YgcG9zaXRpb24gIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBoaXQgcG9zaXRpb24nKTtcbiAgICB9XG4gICAgaWYgKHN0YXRlW3Bvc2l0aW9uXSA9PT0gMCkge1xuICAgICAgc3RhdGVbcG9zaXRpb25dID0gMTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gcmV0dXJucyBpZiBhbGwgc2hpcCBwb3NpdGlvbnMgd2VyZSBoaXRcbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBzdGF0ZS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLCAwKSA9PT0gZ2V0TGVuZ3RoKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldExlbmd0aCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1FBQ1EsTUFBTTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7U0FDUyxNQUFNO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXFxcIlNlZ29lIFVJXFxcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiwgXFxcIkFwcGxlIENvbG9yIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIEVtb2ppXFxcIiwgXFxcIlNlZ29lIFVJIFN5bWJvbFxcXCI7XFxuICBoZWlnaHQ6IDk5dmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGZvbnQtZmFtaWx5OiAnQmxhY2sgT3BzIE9uZScsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBoZWlnaHQ6IDEwMHB4O1xcbn1cXG5cXG5oZWFkZXI+aDEge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5tYWluIHtcXG4gIGZsZXg6MTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiA0MHB4IDFmciAvIDFmciAxZnI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDUwcHg7XFxufVxcblxcbi5yb3RhdGUsXFxuLnJlc3VsdD5idXR0b24ge1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICB3aWR0aDogMTAwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5wbGF5ZXIxLmdhbWVib2FyZCB7XFxuICBncmlkLXJvdzogMiAvIDM7XFxuICBncmlkLWNvbHVtbjogMTtcXG59XFxuXFxuLnBsYXllcjIuZ2FtZWJvYXJkIHtcXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGdyaWQtY29sdW1uOiAyIC8gMztcXG59XFxuXFxuLmdhbWVib2FyZCA+IGRpdiB7XFxuICBtaW4taGVpZ2h0OiAzMHB4O1xcbiAgbWluLXdpZHRoOiAzMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG5mb290ZXI+YT5pbWcge1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG5mb290ZXI+YT5pbWc6aG92ZXIge1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMikgcm90YXRlKDM2MGRlZyk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtjeWFuO1xcbn1cXG5cXG4uc2hpcC1wb3NzaWJsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMTc5LCAxNzkpO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtyZWQ7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRpbWdyYXk7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xcbn1cXG5cXG4ucmVzdWx0IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDQwcHg7XFxuICB6LWluZGV4OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMDQsIDE5NiwgNzksIDAuNCk7XFxufVxcblxcbi5yZXN1bHQ+c3BhbiB7XFxuICBmb250LWZhbWlseTogJ0JsYWNrIE9wcyBPbmUnLCBjdXJzaXZlO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usc0JBQXNCO0VBQ3RCLFVBQVU7RUFDVixTQUFTO0FBQ1g7O0FBRUE7RUFDRSwwSkFBMEo7RUFDMUosWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLE1BQU07RUFDTixhQUFhO0VBQ2IsaUNBQWlDO0VBQ2pDLFdBQVc7RUFDWCxTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBOztFQUVFLGNBQWM7RUFDZCxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0RBQWdEO0VBQ2hELGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QsVUFBVTtFQUNWLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBcXFwiU2Vnb2UgVUlcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLCBcXFwiQXBwbGUgQ29sb3IgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgU3ltYm9sXFxcIjtcXG4gIGhlaWdodDogOTl2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgZm9udC1mYW1pbHk6ICdCbGFjayBPcHMgT25lJywgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIGhlaWdodDogMTAwcHg7XFxufVxcblxcbmhlYWRlcj5oMSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbm1haW4ge1xcbiAgZmxleDoxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IDQwcHggMWZyIC8gMWZyIDFmcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogNTBweDtcXG59XFxuXFxuLnJvdGF0ZSxcXG4ucmVzdWx0PmJ1dHRvbiB7XFxuICBncmlkLWNvbHVtbjogMTtcXG4gIGhlaWdodDogMzBweDtcXG4gIHdpZHRoOiAxMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLnBsYXllcjEuZ2FtZWJvYXJkIHtcXG4gIGdyaWQtcm93OiAyIC8gMztcXG4gIGdyaWQtY29sdW1uOiAxO1xcbn1cXG5cXG4ucGxheWVyMi5nYW1lYm9hcmQge1xcbiAgZ3JpZC1yb3c6IDIgLyAzO1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAzO1xcbn1cXG5cXG4uZ2FtZWJvYXJkID4gZGl2IHtcXG4gIG1pbi1oZWlnaHQ6IDMwcHg7XFxuICBtaW4td2lkdGg6IDMwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbmZvb3Rlcj5hPmltZyB7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbmZvb3Rlcj5hPmltZzpob3ZlciB7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICB3aWR0aDogYXV0bztcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yKSByb3RhdGUoMzYwZGVnKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya2N5YW47XFxufVxcblxcbi5zaGlwLXBvc3NpYmxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAxNzksIDE3OSk7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3JlZDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGltZ3JheTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbi5yZXN1bHQge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNDBweDtcXG4gIHotaW5kZXg6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwNCwgMTk2LCA3OSwgMC40KTtcXG59XFxuXFxuLnJlc3VsdD5zcGFuIHtcXG4gIGZvbnQtZmFtaWx5OiAnQmxhY2sgT3BzIE9uZScsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYXJyMltpXSA9IGFycltpXTtcbiAgfVxuXG4gIHJldHVybiBhcnIyO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn0iLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KGFycik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGl0ZXJbU3ltYm9sLml0ZXJhdG9yXSAhPSBudWxsIHx8IGl0ZXJbXCJAQGl0ZXJhdG9yXCJdICE9IG51bGwpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdO1xuXG4gIGlmIChfaSA9PSBudWxsKSByZXR1cm47XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuXG4gIHZhciBfcywgX2U7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59IiwiaW1wb3J0IGFycmF5V2l0aEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5TGltaXQgZnJvbSBcIi4vaXRlcmFibGVUb0FycmF5TGltaXQuanNcIjtcbmltcG9ydCB1bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBmcm9tIFwiLi91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IG5vbkl0ZXJhYmxlUmVzdCBmcm9tIFwiLi9ub25JdGVyYWJsZVJlc3QuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59IiwiaW1wb3J0IGFycmF5V2l0aG91dEhvbGVzIGZyb20gXCIuL2FycmF5V2l0aG91dEhvbGVzLmpzXCI7XG5pbXBvcnQgaXRlcmFibGVUb0FycmF5IGZyb20gXCIuL2l0ZXJhYmxlVG9BcnJheS5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVTcHJlYWQgZnJvbSBcIi4vbm9uSXRlcmFibGVTcHJlYWQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufSIsImltcG9ydCBhcnJheUxpa2VUb0FycmF5IGZyb20gXCIuL2FycmF5TGlrZVRvQXJyYXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIGFycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBhcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgR2FtZSBmcm9tICcuL29iamVjdHMvR2FtZSc7XG5pbXBvcnQgJ25vcm1hbGl6ZS5jc3MnO1xuaW1wb3J0ICcuLi9zdHlsZS5jc3MnO1xuXG5HYW1lKHt9KTtcbiJdLCJuYW1lcyI6WyJHaXRIdWJMb2dvIiwiVUkiLCJjcmVhdGVIZWFkZXIiLCJoZWFkZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJoMSIsInRleHRDb250ZW50IiwiYXBwZW5kIiwiY3JlYXRlRm9vdGVyIiwiZm9vdGVyIiwiaW1nIiwiaGVpZ2h0Iiwid2lkdGgiLCJhbHQiLCJzcmMiLCJsaW5rIiwiaHJlZiIsImNyZWF0ZVJlc3VsdCIsInJlc3VsdCIsImNsYXNzTGlzdCIsImFkZCIsInJlc3VsdFRleHQiLCJyZXN0YXJ0QnRuIiwiaW5uZXJUZXh0Iiwic3R5bGVHYlNxdWFyZSIsInNxdWFyZSIsInN0YXRlIiwiY3JlYXRlR2JEaXYiLCJnYW1lQm9hcmQiLCJnYW1lQm9hcmREaXYiLCJBcnJheSIsImZyb20iLCJrZXlzIiwiZm9yRWFjaCIsIm51bTEiLCJudW0yIiwiZGF0YXNldCIsIngiLCJ5IiwiZ2V0U2hpcFBvc2l0aW9uIiwiY3JlYXRlUm90YXRlQnRuIiwicm90YXRlQnRuIiwiaGlkZVNoaXBzIiwiY2hpbGRyZW4iLCJjaGlsZCIsInJlbW92ZSIsInVwZGF0ZUJvYXJkIiwicmVwbGFjZUNoaWxkcmVuIiwicmVuZGVyUGFnZSIsImdhbWVCb2FyZDEiLCJnYW1lQm9hcmQyIiwicGxheWVyMU5hbWUiLCJwbGF5ZXIyTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJtYWluIiwiZ2IxRGl2IiwiZ2IyRGl2IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNoYW5nZU5leHRTaGlwRGlyZWN0aW9uIiwiZ2V0VHVybklucHV0IiwiZXZlbnQiLCJwYXJzZUludCIsInRhcmdldCIsInNob3dSZXN1bHQiLCJoaWRlUm90YXRlQnRuIiwiZ2V0UGxheWVyR2IiLCJwbGF5ZXJOYW1lIiwiaXNPblNhbWVMaW5lIiwic3ExIiwic3EyIiwiZGlyZWN0aW9uIiwibW91c2VNb3ZlSGFuZGxlciIsInN0YXJ0RWxlbWVudCIsImdldE5leHRTaGlwRGlyZWN0aW9uIiwibGVuZ3RoIiwiZ2V0TmV4dFNoaXBMZW5ndGgiLCJzdGVwIiwiYWxsU3F1YXJlcyIsInBhcmVudE5vZGUiLCJzdGFydEluZGV4IiwiaW5kZXhPZiIsIm5leHRJbmRleCIsIm5leHRFbGVtZW50IiwidG9nZ2xlIiwiY29weVdpdGhvdXRFdmVudExpc3RlbmVycyIsImVsZW1lbnQiLCJnYkRpdiIsImNsb25lTm9kZSIsInJlcGxhY2VDaGlsZCIsIkdhbWVib2FyZCIsIlBsYXllciIsIkdhbWUiLCJvcHRpb25zIiwidWkiLCJwbGF5ZXIxIiwicGxyMSIsInBsYXllcjIiLCJwbHIyIiwicGxheWVyMUdiIiwiZ2IxIiwicGxheWVyMkdiIiwiZ2IyIiwiYWN0aXZlUGxheWVyIiwiYWN0aXZlUGxheWVyR2IiLCJjYW5TdGFydCIsImdldFNoaXBzVG9QbGFjZUxlZnQiLCJzd2l0Y2hBY3RpdmVQbGF5ZXIiLCJBSWxpc3RlbmVyRWxlbWVudCIsImdldE5hbWUiLCJpc0FJIiwiY2xpY2siLCJnZXRHYW1lUmVzdWx0IiwiaXNBbGxTdW5rUGxheWVyMSIsImlzQWxsU3Vua1BsYXllcjIiLCJhdHRhY2tIYW5kbGVyIiwib3Bwb25lbnRHYiIsInBsYXllciIsIndhc1NoaXBIaXQiLCJ0YWtlVHVybiIsImN1cnJlbnRUYXJnZXQiLCJpZkFsbFN1bmsiLCJzZXR1cEF0dGFja1BoYXNlIiwidW5kZWZpbmVkIiwiZmluaXNoUGxheWVyUHJlcGFyYXRpb24iLCJwcmVwYXJhdGlvbkhhbmRsZXIiLCJnYiIsInBsYWNlU2hpcCIsInNldHVwUHJlcGFyYXRpb25QaGFzZSIsIlNoaXAiLCJzaGlwc1RvUGxhY2VMZW5ndGhzIiwiYm9hcmQiLCJwbGFjZWRTaGlwcyIsIm9jY3VwaWVkU3F1YXJlcyIsImhpdFN0YXRlIiwibWlzc1N0YXRlIiwiaW5jb3JyZWN0U3F1YXJlRXJyb3IiLCJFcnJvciIsInNwYWNlT2NjdXBpZWRFcnJvciIsIm5leHRTaGlwRGlyZWN0aW9uIiwibmV4dFNoaXBTdGFydENvb3JkcyIsIm5leHRTaGlwTGVuZ3RoIiwic2hpcCIsInBvc2l0aW9uIiwiZ2V0T3Bwb3NpdGVEaXJlY3Rpb24iLCJnZXRTaGlwIiwiaXNWYWxpZENvb3JkcyIsImV2ZXJ5IiwiaXNTdW5rIiwid2FzU3F1YXJlQXR0YWNrZWQiLCJzZXRTcXVhcmUiLCJhZGRBZGphY2VudE9jY3VwaWVkU3F1YXJlcyIsImNlbnRlckNvb3JkcyIsImkiLCJuZXdDb29yZHMiLCJwdXNoIiwicGxhY2VTaGlwT25Cb2FyZCIsImdldExlbmd0aCIsImNvb3JkcyIsIm1vdmVTaGlwVG9QbGFjZWQiLCJzaGlwSW5kZXgiLCJzcGxpY2UiLCJjaGVja1NoaXBTcXVhcmVzIiwiSlNPTiIsInN0cmluZ2lmeSIsImluY2x1ZGVzIiwiYWRkVG9PY2N1cGllZFNxdWFyZXMiLCJzdGFydE9mT2NjdXBpZWQiLCJhZGRTaGlwIiwic3RhcnRDb29yZHNBcnIiLCJwbGFjZVNoaXBzUmFuZG9tbHkiLCJjb29yZHNBcnIiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwibmFtZSIsImdldEFJbW92ZSIsImZpbGwiLCJyZWR1Y2UiLCJhIiwiYiJdLCJzb3VyY2VSb290IjoiIn0=