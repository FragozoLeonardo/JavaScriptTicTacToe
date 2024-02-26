let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function checkWin() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let line of lines) {
        if (board[line[0]] && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
            return board[line[0]];
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function handleClick(index) {
    if (!gameActive || board[index] !== null) {
        return;
    }
    board[index] = currentPlayer;

    const winner = checkWin();
    const draw = checkDraw();

    if (winner) {
        displayResult(`Player ${winner} wins!`);
        gameActive = false;
    } else if (draw) {
        displayResult("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }

    updateBoard();
}

function displayResult(message) {
    const status = document.getElementById('status');
    status.style.color = 'blue';
    status.textContent = message;
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    updateBoard();
    updateStatus();
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = board[i];
        cell.addEventListener('click', () => handleClick(i));
        boardElement.appendChild(cell);
    }
}

function updateStatus() {
    const status = document.getElementById('status');
    status.style.color = currentPlayer === 'X' ? 'blue' : 'green';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

window.onload = function () {
  const title = document.createElement('h1');
  title.textContent = 'Tic Tac Toe';
  document.body.insertBefore(title, document.getElementById('board'));

  updateStatus();
  updateBoard();

  const newGameButton = document.querySelector('button');
  newGameButton.addEventListener('click', resetGame);
};