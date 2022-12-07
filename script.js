/* data structure */

/* Module */
const Gameboard = (() => {
    let gameboard = ['X','O','X','O','X','O','X','O','X'];
    return {gameboard};
})();


/* Factory Function */ 
const Game = () => {

    const displayBoard = (gameboard) => {
        const board = document.querySelector('.gameboard');
        for(let i=0;i < gameboard.length;i++){
            board.children[i].innerText = gameboard[i];

        }
    }
    return {displayBoard};
};

const Players = (sign) => {
    const player1 = document.querySelector('.player1 button');
    const player2 = document.querySelector('.player2');

    const signSelection = () => {
        
    }


    return {};
};





