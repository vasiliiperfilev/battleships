function Player(isAI = false) {
  function takeTurnAI(gameBoard) {
    let coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    while (['Missed attack', 'Hit attack'].includes(gameBoard.getBoardSquare(coordsArr).position)) {
      coordsArr = [Math.round(Math.random() * 9), Math.round(Math.random() * 9)];
    }
    return gameBoard.receiveAttack(coordsArr);
  }

  // change gameBoard arg to gbReceiveAttackFunc
  function takeTurn(gameBoard, coordsArray) {
    if (isAI === false) return gameBoard.receiveAttack(coordsArray);
    return takeTurnAI(gameBoard);
  }

  return {
    isAI,
    takeTurn,
  };
}

export default Player;
