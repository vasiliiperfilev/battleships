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
    img.height = '32';
    img.width = '32';
    img.alt = 'git hub logo';
    img.src = GitHubLogo;
    const link = document.createElement('a');
    link.href = 'https://github.com/vasiliiperfilev';
    footer.textContent = 'Copyright © 2022 Vasilii Perfilev';
    link.append(img);
    footer.append(link);
    return footer;
  }

  function createResult() {
    const result = document.createElement('div');
    result.classList.add('result', 'hidden');
    const resultText = document.createElement('span');
    const restartBtn = document.createElement('button');
    restartBtn.classList.add('restart');
    restartBtn.innerText = 'Restart!';
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
        square.dataset.x = num2;
        square.dataset.y = num1;
        styleGbSquare(square, gameBoard.getShipPosition(num2, num1));
        gameBoardDiv.append(square);
      });
    });
    return gameBoardDiv;
  }

  function createRotateBtn() {
    const rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate');
    rotateBtn.innerText = 'Rotate ship';
    return rotateBtn;
  }

  function hideShips(gameBoardDiv) {
    [...gameBoardDiv.children].forEach((child) => {
      child.classList.remove('ship');
    });
  }

  const updateBoard = (gameBoard, gameBoardDiv) =>
    gameBoardDiv.replaceChildren(...createGbDiv(gameBoard).children);

  function renderPage(gameBoard1, gameBoard2, player1Name, player2Name) {
    document.querySelector('body').textContent = '';
    const header = createHeader();
    const main = document.createElement('main');
    const gb1Div = document.createElement('div');
    const gb2Div = document.createElement('div');
    gb1Div.classList.add(player1Name, 'gameboard');
    gb2Div.classList.add(player2Name, 'gameboard');
    const rotateBtn = createRotateBtn();
    main.append(rotateBtn, gb1Div, gb2Div);
    const footer = createFooter();
    const result = createResult();
    document.querySelector('body').append(header, main, footer, result);
    updateBoard(gameBoard1, gb1Div);
    updateBoard(gameBoard2, gb2Div);
    hideShips(gb2Div);
  }

  const getTurnInput = (event) => [
    parseInt(event.target.dataset.x, 10),
    parseInt(event.target.dataset.y, 10),
  ];

  function showResult(result) {
    document.querySelector('.result > span').textContent = result;
    document.querySelector('.result').classList.remove('hidden');
  }

  const hideRotateBtn = () => document.querySelector('.rotate').classList.add('hidden');

  const getPlayerGb = (playerName) => document.querySelector(`.${playerName}.gameboard`);

  const isOnSameLine = (sq1, sq2, direction) =>
    (sq1.dataset.x === sq2.dataset.x && direction === 1) ||
    (sq1.dataset.y === sq2.dataset.y && direction === 0);

  function mouseMoveHandler(startElement, gameBoard) {
    const direction = gameBoard.getNextShipDirection();
    let length = gameBoard.getNextShipLength() - 1;
    const step = direction === 0 ? 1 : 10;
    const allSquares = Array.from(startElement.parentNode.children);
    const startIndex = allSquares.indexOf(startElement);
    while (length >= 0) {
      const nextIndex = startIndex + length * step;
      const nextElement = allSquares[nextIndex];
      if (nextIndex <= 100 && isOnSameLine(startElement, nextElement, direction))
        allSquares[nextIndex].classList.toggle('ship-possible');
      length -= 1;
    }
  }

  return {
    renderPage,
    updateBoard,
    getTurnInput,
    showResult,
    hideRotateBtn,
    getPlayerGb,
    hideShips,
    mouseMoveHandler,
  };
}

export default UI;
