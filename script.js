document.addEventListener('DOMContentLoaded', () => {
    const GRID_SIZE = 8;
    const NUM_MINES = 10;
    const gameGrid = document.getElementById('game-grid');
    const gameMessage = document.getElementById('game-message');
    let board = [];
    let gameOver = false;

    // Initialize the game
    function initGame() {
        gameOver = false;
        gameMessage.classList.add('hidden');
        gameMessage.textContent = '';
        gameGrid.innerHTML = ''; // Clear previous grid

        // Create an empty board
        board = Array(GRID_SIZE).fill(null).map(() => 
            Array(GRID_SIZE).fill(null).map(() => ({
                isMine: false,
                isRevealed: false,
                mineCount: 0,
                element: null // Reference to the DOM element
            }))
        );

        placeMines();
        calculateAdjacentMines();
        createGridElements();
    }

    // Place mines randomly on the board
    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < NUM_MINES) {
            const row = Math.floor(Math.random() * GRID_SIZE);
            const col = Math.floor(Math.random() * GRID_SIZE);

            if (!board[row][col].isMine) {
                board[row][col].isMine = true;
                minesPlaced++;
            }
        }
    }

    // Calculate adjacent mine counts for each non-mine cell
    function calculateAdjacentMines() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (!board[row][col].isMine) {
                    let count = 0;
                    for (let dRow = -1; dRow <= 1; dRow++) {
                        for (let dCol = -1; dCol <= 1; dCol++) {
                            const nRow = row + dRow;
                            const nCol = col + dCol;

                            if (nRow >= 0 && nRow < GRID_SIZE && nCol >= 0 && nCol < GRID_SIZE && board[nRow][nCol].isMine) {
                                count++;
                            }
                        }
                    }
                    board[row][col].mineCount = count;
                }
            }
        }
    }

    // Create the HTML elements for the grid
    function createGridElements() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;
                cellElement.addEventListener('click', handleCellClick);
                
                board[row][col].element = cellElement;
                gameGrid.appendChild(cellElement);
            }
        }
    }

    // Handle a cell click event
    function handleCellClick(event) {
        if (gameOver) {
            return;
        }

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const cell = board[row][col];

        if (cell.isRevealed) {
            return;
        }

        if (cell.isMine) {
            cell.element.classList.add('mine-clicked');
            gameOverState(true);
        } else {
            revealCell(row, col);
            // Optionally check for win condition here (not required by brief)
        }
    }

    // Reveal a cell and its neighbors if it's empty
    function revealCell(row, col) {
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || board[row][col].isRevealed || board[row][col].isMine) {
            return;
        }

        const cell = board[row][col];
        cell.isRevealed = true;
        cell.element.classList.add('revealed');

        if (cell.mineCount > 0) {
            cell.element.textContent = cell.mineCount;
            cell.element.classList.add(`num-${cell.mineCount}`);
        } else {
            // Recursively reveal neighbors if cell is empty
            for (let dRow = -1; dRow <= 1; dRow++) {
                for (let dCol = -1; dCol <= 1; dCol++) {
                    if (dRow !== 0 || dCol !== 0) { // Exclude self
                        revealCell(row + dRow, col + dCol);
                    }
                }
            }
        }
    }

    // Set game over state
    function gameOverState(hitMine) {
        gameOver = true;
        gameMessage.textContent = 'BOOM! Game Over.';
        gameMessage.classList.remove('hidden');
        
        revealAllMines();
        // Disable further clicks
        gameGrid.querySelectorAll('.cell').forEach(cellElement => {
            cellElement.removeEventListener('click', handleCellClick);
            cellElement.style.cursor = 'default';
        });
    }

    // Reveal all mines on the board
    function revealAllMines() {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                const cell = board[row][col];
                if (cell.isMine && !cell.element.classList.contains('mine-clicked')) { // Don't override the clicked mine's style
                    cell.element.classList.add('mine');
                }
            }
        }
    }

    // Start the game
    initGame();
});
