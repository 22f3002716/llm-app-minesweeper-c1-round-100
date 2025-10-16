document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 8;
    const minesCount = 10;
    const minesweeperGrid = document.getElementById('minesweeperGrid');
    const gameTitle = document.getElementById('gameTitle');
    const resetButton = document.getElementById('resetButton');

    let board = []; // 2D array to store cell objects
    let gameOver = false;
    let revealedCells = 0;

    function initGame() {
        minesweeperGrid.innerHTML = '';
        gameTitle.textContent = 'Minesweeper'; // Reset title
        minesweeperGrid.style.pointerEvents = 'auto'; // Re-enable clicks
        board = [];
        gameOver = false;
        revealedCells = 0;

        createBoard();
        placeMines();
        calculateNeighborCounts();
    }

    function createBoard() {
        for (let y = 0; y < boardSize; y++) {
            board.push([]);
            for (let x = 0; x < boardSize; x++) {
                const cell = {
                    x: x,
                    y: y,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0,
                    element: null // Reference to the DOM element
                };
                board[y].push(cell);

                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.x = x;
                cellElement.dataset.y = y;
                cellElement.addEventListener('click', () => handleClick(cell));
                cell.element = cellElement; // Store DOM element in cell object
                minesweeperGrid.appendChild(cellElement);
            }
        }
    }

    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < minesCount) {
            const randomX = Math.floor(Math.random() * boardSize);
            const randomY = Math.floor(Math.random() * boardSize);
            const cell = board[randomY][randomX];

            if (!cell.isMine) {
                cell.isMine = true;
                minesPlaced++;
            }
        }
    }

    function calculateNeighborCounts() {
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                const cell = board[y][x];
                if (!cell.isMine) {
                    const neighbors = getNeighbors(x, y);
                    let mineCount = 0;
                    neighbors.forEach(neighbor => {
                        if (board[neighbor.y][neighbor.x].isMine) {
                            mineCount++;
                        }
                    });
                    cell.neighborMines = mineCount;
                }
            }
        }
    }

    function getNeighbors(x, y) {
        const neighbors = [];
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue; // Skip self

                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize) {
                    neighbors.push({ x: nx, y: ny });
                }
            }
        }
        return neighbors;
    }

    function handleClick(cell) {
        if (gameOver || cell.isRevealed || cell.isFlagged) {
            return;
        }

        if (cell.isMine) {
            cell.element.classList.add('mine-clicked');
            gameTitle.textContent = 'BOOM! Game Over.';
            gameOver = true;
            revealAllMines();
            minesweeperGrid.style.pointerEvents = 'none'; // Disable clicks after game over
        } else {
            revealCell(cell.x, cell.y);
            checkWin();
        }
    }

    function revealCell(x, y) {
        if (x < 0 || x >= boardSize || y < 0 || y >= boardSize) return; // Out of bounds
        const cell = board[y][x];

        if (cell.isRevealed || cell.isMine) {
            return;
        }

        cell.isRevealed = true;
        revealedCells++;
        cell.element.classList.add('revealed');

        if (cell.neighborMines > 0) {
            cell.element.textContent = cell.neighborMines;
            cell.element.dataset.count = cell.neighborMines; // For styling
        } else {
            // Recursively reveal neighbors if count is 0
            const neighbors = getNeighbors(x, y);
            neighbors.forEach(neighbor => {
                revealCell(neighbor.x, neighbor.y);
            });
        }
    }

    function revealAllMines() {
        for (let y = 0; y < boardSize; y++) {
            for (let x = 0; x < boardSize; x++) {
                const cell = board[y][x];
                if (cell.isMine && !cell.isRevealed) {
                    cell.element.classList.add('mine');
                    cell.element.textContent = '💣'; // Bomb emoji
                } else if (cell.isMine && cell.isRevealed && !cell.element.classList.contains('mine-clicked')) {
                    // If it was already revealed (e.g., from an adjacent 0-cell reveal), but wasn't the clicked mine
                    cell.element.classList.add('mine');
                    cell.element.textContent = '💣';
                }
            }
        }
    }

    function checkWin() {
        // Win condition: all non-mine cells are revealed
        if (revealedCells === (boardSize * boardSize - minesCount)) {
            gameTitle.textContent = 'Congratulations! You Win!';
            gameOver = true;
            minesweeperGrid.style.pointerEvents = 'none'; // Disable clicks after game over
        }
    }

    resetButton.addEventListener('click', initGame);

    // Initialize the game when the script loads
    initGame();
});