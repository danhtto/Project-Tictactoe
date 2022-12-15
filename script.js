/* data structure */



/* Module */
const Gameboard = (() => {
  const boardArray = new Array(9);
  const sampleBoard = ['x','o','x','o','x','o','x','o','x'];

  const newBoard = () => {
    return boardArray;
  }

  const fillBoard = (index,mark) => {
    return boardArray[index] = mark;
  }

  return {sampleBoard,boardArray,newBoard,fillBoard};
})();



/* Factory Function */
const Selections = (() => {

  const getSignSelection = (player) => {
    player.forEach((element) => {
      element.addEventListener('click', (button) => {
        if (button.target.id === 'x') {
          if (button.target.nextElementSibling.id === 'o' && button.target.nextElementSibling.className === 'active') {
            button.target.nextElementSibling.classList.remove('active');
          }
        } else if (button.target.id === 'o') {
          if (button.target.previousElementSibling.id === 'x' && button.target.previousElementSibling.className === 'active') {
            button.target.previousElementSibling.classList.remove('active');
          }
        }
        button.target.classList.add('active');
        return button.target.id;
      });
    });
  };




  return {getSignSelection};
})();

const boardCheck = (() => {

  const checkForDraw = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] !== undefined) {
        return false;
      }
    }
    return true;
  };

  const checkForWin = (board,player) => {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        row.push(board[j]);
      }

      if (row[0] === row[1] === row[2] === player) {
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = 0; j < 3; j++) {
        column.push(board[i + 3 * j]);
      }
      if (column[0] === column[1] === column[2] === player[0]) {
        return true;
      }
    }
    const cross1 = [board[0], board[4], board[8]];
    const cross2 = [board[2], board[4], board[6]];
    if (cross1.every((items) => items === player) || cross2.every((items) => items === player)) {
      return true
    }

    return false;
  };

  return {checkForDraw,checkForWin};
})();



const game = () => {

  const fieldSelection = (board,index) => {
    if(board[index] === undefined){
      return true;
    } else {
      return false;
    }
  };

  const displayBoard = (currentBoard) => {
    const board = document.querySelector('.gameboard');
    for(let item in currentBoard){
      if(currentBoard[item] !== undefined){
        board.children[item].innerText = currentBoard[item];
      }
    }
  };

  return {displayBoard,fieldSelection};
};


/* Game Logic */

const displayController = (() => {
  const player1 = document.querySelectorAll('.player1 button');
  const player2 = document.querySelectorAll('.player2 button');
  const start = document.querySelector('.buttons button.start');
  

  Selections.getSignSelection(player1);
  Selections.getSignSelection(player2);

  const newGameboard = Gameboard;

  const _gameWonPlayer1 = () => {
    const player1 = document.querySelector('.scoreboard #left');
    player1.innerText += 1;
  }
  const _gameWonPlayer2 = () => {
    const player2 = document.querySelector('.scoreboard #right');
    player2.innerText += 1;
  }

  const gameOn = () => {
    const board = document.querySelector('.gameboard');
    const player1Sign = document.querySelector('.player1 .buttons button.active');
    const player2Sign = document.querySelector('.player2 .buttons button.active');
    let signs = [player1Sign.innerText,player2Sign.innerText];
    newGameboard.newBoard();

    let turn = 1;
    const playRound = (e) => {
      if(turn === 1){
        
        if(boardCheck.checkForWin(newGameboard.boardArray,signs[0]) === true){
          _gameWonPlayer1();
        }

        if(game().fieldSelection(newGameboard.boardArray,e.target.value) === true){
          newGameboard.fillBoard(e.target.value,signs[0]);
          game().displayBoard(newGameboard.boardArray);
          return turn = 2;
        } else {
          return turn = 1;
        }
      } else if(turn === 2){

        if(boardCheck.checkForWin(newGameboard.boardArray,signs[1]) === true){
          _gameWonPlayer2();
        }

        if(game().fieldSelection(newGameboard.boardArray,e.target.value) === true) {
          newGameboard.fillBoard(e.target.value,signs[1]);
          game().displayBoard(newGameboard.boardArray);
          return turn = 1;
        } else {
          return turn = 2;
        }
      }
    }

    board.addEventListener('click',playRound);
  };

  start.addEventListener('click',gameOn);


})();