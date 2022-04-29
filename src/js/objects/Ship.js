class Ship {
  #length;

  #state;

  constructor(length) {
    if (length < 2) throw new Error('Min.length is 2');
    if (length === undefined || typeof length !== 'number') {
      throw new Error('You must provide a number');
    }
    this.#length = length;
    this.#state = Array(length).fill(0);
  }

  getLength() {
    return this.#length;
  }

  hit(position) {
    if (position > this.getLength() - 1 || position < 0 || typeof position !== 'number') {
      throw new Error('Incorrect hit position');
    }
    if (this.#state[position] === 0) {
      this.#state[position] = 1;
      return true;
    }
    return false;
  }

  isSunk() {
    return this.#state.reduce((a, b) => a + b, 0) === this.getLength();
  }
}

export default Ship;
