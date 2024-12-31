const board = document.querySelector('.board');
const restartButton = document.getElementById("reset");
for(let i=0;i<9;i++) {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('data-index', i);
  board.appendChild(cell);
}

let boardState = ["","","","","","","","",""];
let currentPlayer='X';
const cells= document.querySelectorAll('.cell');
const message = document.querySelector('#message');

message.textContent = `Player ${currentPlayer}'s turn!`;

cells.forEach((cell,index)=>{
  const handleClick = ()=>{
    if (cell.textContent === '') {
      cell.textContent = currentPlayer;
      cell.classList.add(`player-${currentPlayer.toLowerCase()}`);
      boardState[index] = currentPlayer;
      console.log(boardState);
      if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        endGame();
      } else if (boardState.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        endGame();
      } else {
        switchPlayer();
      }

    } else {
      message.textContent = 'Cell already taken!choose any other.';
    }
  }
  cell.addEventListener("click", handleClick);
  cell.handleClick = handleClick;
})

const switchPlayer = ()=>{
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn!`;
}

const checkWin = ()=>{
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  return winningCombinations.some(combination=>{
    const [a,b,c] = combination;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  })
}

const endGame = ()=>{
   cells.forEach(cell=>{
     cell.removeEventListener('click', cell.handleClick);
   });
}

console.log(boardState);

restartButton.addEventListener('click',()=>{
  boardState = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell=>{
    cell.textContent = "";
    cell.className = "cell"; 
  })
  currentPlayer = "X";
  message.textContent = `Player ${currentPlayer}'s turn!`;

  cells.forEach((cell) => {
    cell.addEventListener("click", cell.handleClick);
  });
})

