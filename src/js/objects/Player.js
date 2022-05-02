function Player(name, isAI = false) {
  const getName = () => name;

  function getAImove(gameBoard) {
    let coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    while (typeof gameBoard.getShipPosition(...coordsArr) === 'string') {
      coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    }
    return coordsArr;
  }

  function takeTurn(gameBoard, coordsArr) {
    const coords = isAI ? getAImove(gameBoard) : coordsArr;
    if (!gameBoard.wasSquareAttacked(coords)) {
      return gameBoard.receiveAttack(coords);
    }
    throw new Error('Position was attacked before');
  }

  return {
    isAI,
    takeTurn,
    getName,
  };
}

export default Player;
