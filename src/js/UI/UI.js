import GitHubLogo from '../../assets/GitHubLogo.png';

function UI() {
  function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'BATTLESHIPS';
    header.append(h1);
    return header;
  }

  function createFooter() {
    const footer = document.createElement('footer');
    const img = document.createElement('img');
    img.height = '64';
    img.width = '64';
    img.alt = 'git hub logo';
    img.src = GitHubLogo;
    const link = document.createElement('a');
    link.href = 'https://github.com/vasiliiperfilev';
    footer.textContent = 'Copyright © 2021 Vasilii Perfilev';
    link.append(img);
    footer.append(link);
    return footer;
  }

  function createResult() {
    const result = document.createElement('div');
    result.classList.add('result', 'hidden');
    const resultText = document.createElement('span');
    const restartBtn = document.createElement('btn');
    restartBtn.classList.add('restart');
    result.append(resultText, restartBtn);
    return result;
  }

  function styleGbSquare(square, state) {
    if (state === 'Hit attack') {
      square.classList.add('hit');
    } else if (state === 'Missed attack') {
      square.classList.add('miss');
    } else if (state !== null) {
      square.classList.add('ship');
    }
  }

  function createGbDiv(gameBoard) {
    const gameBoardDiv = document.createElement('div');
    Array.from(Array(10).keys()).forEach((num1) => {
      Array.from(Array(10).keys()).forEach((num2) => {
        const square = document.createElement('div');
        square.dataset.x = num1;
        square.dataset.y = num2;
        styleGbSquare(square, gameBoard.getBoardSquare([num1, num2]).position);
        gameBoardDiv.append(square);
      });
    });
    return gameBoardDiv;
  }

  function hideShips(gameBoardDiv) {
    [...gameBoardDiv.children].forEach((child) => {
      child.classList.remove('ship');
    });
  }

  function updateBoards(gameBoard1, gameBoard2) {
    document.querySelector('.player1.gameboard').textContent = '';
    document.querySelector('.player2.gameboard').textContent = '';
    document
      .querySelector('.player1.gameboard')
      .replaceChildren(...createGbDiv(gameBoard1).children);
    document
      .querySelector('.player2.gameboard')
      .replaceChildren(...createGbDiv(gameBoard2).children);
    hideShips(document.querySelector('.player2.gameboard'));
  }

  function renderPage(gameBoard1, gameBoard2) {
    document.querySelector('body').textContent = '';
    const header = createHeader();
    const main = document.createElement('main');
    const gb1 = document.createElement('div');
    const gb2 = document.createElement('div');
    gb1.classList.add('player1', 'gameboard');
    gb2.classList.add('player2', 'gameboard');
    main.append(gb1, gb2);
    const footer = createFooter();
    const result = createResult();
    document.querySelector('body').append(header, main, footer, result);
    updateBoards(gameBoard1, gameBoard2);
  }

  function getTurnInput(e) {
    return [parseInt(e.target.dataset.x, 10), parseInt(e.target.dataset.y, 10)];
  }

  function showResult(result) {
    document.querySelector('.result > span').textContent = result;
    document.querySelector('.result').classList.remove('hidden');
  }

  return {
    renderPage,
    updateBoards,
    getTurnInput,
    showResult,
  };
}

export default UI;
