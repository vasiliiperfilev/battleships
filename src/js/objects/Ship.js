function Ship(length) {
  if (length < 2) throw new Error('Min.length is 2');
  if (length === undefined || typeof length !== 'number') {
    throw new Error('You must provide a number');
  }

  const status = Array(length).fill(0);

  function getLength() {
    return length;
  }

  function getStatus() {
    return status;
  }

  function hit(position) {
    if (position > this.getLength() - 1 || position < 0 || typeof position !== 'number') {
      throw new Error('Incorrect hit position');
    }
    if (status[position] === 0) {
      status[position] = 1;
      return this.getStatus();
    }
    return false;
  }

  function isSunk() {
    return this.getStatus().reduce((a, b) => a + b, 0) === this.getLength();
  }
  return {
    getLength,
    getStatus,
    hit,
    isSunk,
  };
}

export default Ship;
