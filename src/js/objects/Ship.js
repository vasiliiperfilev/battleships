function Ship(length) {
  // input check
  if (length < 2) throw new Error('Min.length is 2');
  if (length === undefined || typeof length !== 'number') {
    throw new Error('You must provide a number');
  }
  const state = Array(length).fill(0);
  function getLength() {
    return length;
  }
  // if position wasn't hit before
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
  }
  // returns if all ship positions were hit
  function isSunk() {
    return state.reduce((a, b) => a + b, 0) === getLength();
  }

  return {
    getLength,
    hit,
    isSunk,
  };
}

export default Ship;
