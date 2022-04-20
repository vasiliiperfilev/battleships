import GitHubLogo from '../../assets/GitHubLogo.png';

function UI(player1Name, player2Name) {
  // TODO: change square nums https://stackoverflow.com/questions/432174/how-to-store-arbitrary-data-for-some-html-tags
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
        square.classList.add(num1, num2);
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

  function renderPage(gameBoard1, gameBoard2) {
    const header = createHeader();
    const main = document.createElement('main');
    const player1Gb = createGbDiv(gameBoard1);
    player1Gb.classList.add(player1Name);
    const player2Gb = createGbDiv(gameBoard2);
    player2Gb.classList.add(player2Name);
    hideShips(player2Gb);
    const footer = createFooter();
    main.append(player1Gb, player2Gb);
    document.querySelector('body').append(header, main, footer);
  }

  function renderNewGbDiv(currentGbDiv, gameBoard, playerName) {
    const newGbDiv = createGbDiv(gameBoard);
    newGbDiv.classList.add(playerName);
    currentGbDiv.parentNode.replaceChild(newGbDiv, currentGbDiv);
  }

  function getTurnInput(e) {
    return [...e.target.classList].slice(0, 1);
  }

  return {
    renderPage,
    renderNewGbDiv,
    getTurnInput,
  };
}

export default UI;
