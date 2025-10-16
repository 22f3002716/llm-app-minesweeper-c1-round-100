# Minesweeper Game

This is a simple, single-page web application implementing a classic 8x8 Minesweeper game with 10 randomly placed mines. The game features a 'Game Over' state that is triggered when a mine is clicked, revealing all mines on the board and displaying a 'BOOM! Game Over.' message.

## Features

-   **8x8 Grid:** A standard 64-cell game board.
-   **10 Mines:** Mines are randomly distributed across the grid at the start of each game.
-   **Mine Count:** Cells adjacent to mines display the number of neighboring mines.
-   **Recursive Reveal:** Clicking on an empty cell (with no adjacent mines) automatically reveals all connected empty cells and their numbered neighbors.
-   **Game Over State:**
    -   Clicking a mine immediately ends the game.
    -   A prominent 'BOOM! Game Over.' message is displayed.
    -   All unrevealed mines on the board are shown.
    -   Further interaction with the grid is disabled.

## How to Run

1.  **Save the files:** Save `index.html`, `style.css`, and `script.js` into the same directory on your local machine.
2.  **Open `index.html`:** Navigate to the directory where you saved the files and open `index.html` with your preferred web browser.
3.  **Play:** Click on cells to start playing. Try to uncover all non-mine cells without hitting a mine.

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript (ES6+)
