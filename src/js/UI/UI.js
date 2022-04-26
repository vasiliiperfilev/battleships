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

  function updateBoard(gameBoard, gameBoardDiv) {
    gameBoardDiv.replaceChildren(...createGbDiv(gameBoard).children);
  }

  function renderPage(gameBoard1, gameBoard2) {
    document.querySelector('body').textContent = '';
    const header = createHeader();
    const main = document.createElement('main');
    const gb1Div = document.createElement('div');
    const gb2Div = document.createElement('div');
    gb1Div.classList.add('player1', 'gameboard');
    gb2Div.classList.add('player2', 'gameboard');
    main.append(gb1Div, gb2Div);
    const footer = createFooter();
    const result = createResult();
    document.querySelector('body').append(header, main, footer, result);
    updateBoard(gameBoard1, gb1Div);
    updateBoard(gameBoard2, gb2Div);
    hideShips(gb2Div);
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
    updateBoard,
    getTurnInput,
    showResult,
  };
}

export default UI;
