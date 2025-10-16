document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('grid');
    const gameTitleElement = document.getElementById('game-title');
    const GRID_SIZE = 8;
    const TOTAL_MINES = 10;
    let board = []; // 2D array representing the board logic
    let isGameOver = false;
    let minesLocations = new Set(); // To store mine positions as "row,col"

    // Initialize the board and place mines
    function initializeGame() {
        board = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill({
            isMine: false,
            isRevealed: false,
            minesAround: 0 // Number of adjacent mines
        }));
        minesLocations.clear();
        isGameOver = false;
        gameTitleElement.textContent = 'Minesweeper'; // Reset title
        gameTitleElement.style.color = '#f39c12'; // Reset title color

        placeMines();
        calculateMinesAroundAllCells();
        renderGrid();
    }

    // Place mines randomly
    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < TOTAL_MINES) {
            const row = Math.floor(Math.random() * GRID_SIZE);
            const col = Math.floor(Math.random() * GRID_SIZE);
            const position = `${row},${col}`;

            if (!minesLocations.has(position)) {
                board[row][col].isMine = true;
                minesLocations.add(position);
                minesPlaced++;
            }
        }
    }

    // Calculate the number of mines around each non-mine cell
    function calculateMinesAroundAllCells() {
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (!board[r][c].isMine) {
                    board[r][c].minesAround = countMinesAround(r, c);
                }
            }
        }
    }

    // Count mines around a specific cell (r, c)
    function countMinesAround(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                // Skip the current cell itself
                if (i === 0 && j === 0) continue;

                const newRow = row + i;
                const newCol = col + j;

                if (newRow >= 0 && newRow < GRID_SIZE &&
                    newCol >= 0 && newCol < GRID_SIZE &&
                    board[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count;
    }

    // Render the grid elements in the DOM
    function renderGrid() {
        gridElement.innerHTML = ''; // Clear existing grid
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = r;
                cellElement.dataset.col = c;
                cellElement.addEventListener('click', handleCellClick);
                gridElement.appendChild(cellElement);
            }
        }
    }

    // Handle a click on a cell
    function handleCellClick(event) {
        if (isGameOver) return;

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        const cell = board[row][col];

        if (cell.isRevealed) return; // Prevent re-revealing already revealed cells

        if (cell.isMine) {
            gameOver(false); // Player clicked a mine
        } else {
            revealCell(row, col);
            // Optional: Add win condition check here if all non-mine cells are revealed
        }
    }

    // Recursively reveal cells
    function revealCell(row, col) {
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) return; // Out of bounds
        const cell = board[row][col];
        if (cell.isRevealed || cell.isMine) return; // Already revealed or is a mine

        cell.isRevealed = true;
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cellElement) {
            cellElement.classList.add('revealed');
        }

        if (cell.minesAround > 0) {
            if (cellElement) {
                cellElement.textContent = cell.minesAround;
                cellElement.dataset.mines = cell.minesAround; // For number coloring
            }
        } else {
            // If no mines around, reveal all adjacent cells recursively
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    // Skip the current cell itself
                    if (i === 0 && j === 0) continue;
                    revealCell(row + i, col + j);
                }
            }
        }
    }

    // Game over logic
    function gameOver(hasWon) {
        isGameOver = true;
        if (hasWon) {
            gameTitleElement.textContent = 'YOU WIN!'; // Not required by brief but good to have
            gameTitleElement.style.color = 'green';
        } else {
            gameTitleElement.textContent = 'BOOM! Game Over.';
            gameTitleElement.style.color = '#ff4444'; // Red color for game over
        }

        // Reveal all mines
        minesLocations.forEach(pos => {
            const [row, col] = pos.split(',').map(Number);
            const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cellElement) {
                cellElement.classList.add('mine', 'revealed'); // Mark as mine and revealed
                cellElement.textContent = '💣'; // Mine emoji
            }
        });

        // Disable further clicks on all cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
            cell.style.cursor = 'default';
        });
    }

    initializeGame();
});