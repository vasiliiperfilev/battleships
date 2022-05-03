function Player(name, isAI = false) {
  const getName = () => name;
  // returns array with allowed attack square coords [X, Y]
  function getAImove(gb) {
    let coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    while (typeof gb.getShipPosition(...coordsArr) === 'string') {
      coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    }
    return coordsArr;
  }
  // attacks opponent gb
  function takeTurn(opponentGb, coordsArr) {
    const coords = isAI ? getAImove(opponentGb) : coordsArr;
    if (!opponentGb.wasSquareAttacked(coords)) {
      return opponentGb.receiveAttack(coords);
    }
    throw new Error('Position was attacked before');
  }
  // places one ship for player or all ships randomly for AI
  function placeShip(gb, coordsArr, length) {
    if (isAI) {
      gb.placeShipsRandomly();
    } else {
      gb.addShip(length, coordsArr);
    }
  }

  return {
    isAI,
    takeTurn,
    getName,
    placeShip,
  };
}

export default Player;
