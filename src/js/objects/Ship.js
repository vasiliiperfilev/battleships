/* eslint-disable no-param-reassign */
function Ship(length, number) {
  if (length < 2) throw new Error('Min.length is 2');
  if (length === undefined || typeof length !== 'number') {
    throw new Error('You must provide a number');
  }

  const status = Array(length).fill(0);

  function getLength() {
    return length;
  }

  function getState() {
    return [...status];
  }

  function getBoardKey() {
    return number;
  }

  function setBoardKey(newNumber) {
    number = newNumber;
  }

  function hit(position) {
    if (position > this.getLength() - 1 || position < 0 || typeof position !== 'number') {
      throw new Error('Incorrect hit position');
    }
    if (status[position] === 0) {
      status[position] = 1;
      return this.getState();
    }
    return false;
  }

  function isSunk() {
    return this.getState().reduce((a, b) => a + b, 0) === this.getLength();
  }
  return {
    getLength,
    getState,
    getBoardKey,
    setBoardKey,
    hit,
    isSunk,
  };
}

export default Ship;
