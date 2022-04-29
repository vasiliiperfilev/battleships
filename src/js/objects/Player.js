function Player(isAI = false) {
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
      gameBoard.receiveAttack(coords);
    } else {
      throw new Error('Position was attacked before');
    }
  }

  return {
    isAI,
    takeTurn,
  };
}

export default Player;
