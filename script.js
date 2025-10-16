const GRID_SIZE = 8;
const NUM_MINES = 10;
let board = [];
let gameOver = false;

const gridElement = document.querySelector('.grid');
const messageElement = document.querySelector('h1');

function initGame() {
    gameOver = false;
    messageElement.style.visibility = 'hidden';
    messageElement.textContent = '';
    gridElement.innerHTML = '';
    board = []; // Reset board

    // Create board cells
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        board.push({
            isMine: false,
            count: 0,
            isRevealed: false,
            element: null, // Placeholder for DOM element
            index: i
        });
    }

    placeMines();
    calculateNumbers();
    renderBoard();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < NUM_MINES) {
        const randomIndex = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        if (!board[randomIndex].isMine) {
            board[randomIndex].isMine = true;
            minesPlaced++;
        }
    }
}

function calculateNumbers() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        if (board[i].isMine) continue;

        const neighbors = getNeighbors(i);
        let mineCount = 0;
        for (const neighborIndex of neighbors) {
            if (board[neighborIndex].isMine) {
                mineCount++;
            }
        }
        board[i].count = mineCount;
    }
}

function renderBoard() {
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = i;
        cellElement.addEventListener('click', () => handleClick(i));
        
        board[i].element = cellElement; // Store reference to DOM element
        gridElement.appendChild(cellElement);
    }
}

function handleClick(index) {
    if (gameOver || board[index].isRevealed) {
        return;
    }

    if (board[index].isMine) {
        handleGameOver();
    } else {
        revealCell(index);
    }
}

function revealCell(index) {
    if (index < 0 || index >= GRID_SIZE * GRID_SIZE || board[index].isRevealed || gameOver) {
        return;
    }

    board[index].isRevealed = true;
    const cellElement = board[index].element;
    cellElement.classList.add('revealed');

    if (board[index].count > 0) {
        cellElement.textContent = board[index].count;
        cellElement.classList.add(`num-${board[index].count}`);
    } else { // Empty cell, reveal neighbors
        const neighbors = getNeighbors(index);
        for (const neighborIndex of neighbors) {
            revealCell(neighborIndex); // Recursive call
        }
    }
}

function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    // Relative positions for 8 neighbors
    const deltas = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [dr, dc] of deltas) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
            neighbors.push(newRow * GRID_SIZE + newCol);
        }
    }
    return neighbors;
}

function handleGameOver() {
    gameOver = true;
    messageElement.textContent = 'BOOM! Game Over.';
    messageElement.style.visibility = 'visible';

    // Reveal all mines
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        if (board[i].isMine) {
            board[i].element.classList.add('mine');
            board[i].element.textContent = '💣'; // Unicode bomb
        } else if (!board[i].isRevealed) {
            // Optionally show non-revealed numbers if not a mine
            if (board[i].count > 0) {
                board[i].element.textContent = board[i].count;
                board[i].element.classList.add(`num-${board[i].count}`);
            }
            board[i].element.classList.add('revealed');
        }
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initGame);
