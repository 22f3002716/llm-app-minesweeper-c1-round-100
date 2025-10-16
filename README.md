# Minesweeper Game

This is a simple 8x8 Minesweeper game implemented as a single-page web application. The objective of the game is to clear a minefield without detonating any mines.

## Features

*   **8x8 Grid:** A classic 8x8 game board.
*   **10 Mines:** Ten randomly placed mines.
*   **Neighbor Counts:** Cells display the number of adjacent mines.
*   **Game Over State:** If you click on a mine, the game ends, all mines are revealed, and a "BOOM! Game Over." message is displayed.
*   **Recursive Reveal:** Clicking an empty cell (with 0 adjacent mines) automatically reveals all its empty neighbors and their numbered neighbors.
*   **Win Condition:** Win by revealing all non-mine cells.
*   **Reset Button:** Start a new game at any time.

## How to Play

1.  **Objective:** The goal is to clear the minefield without clicking on any of the 10 hidden mines.
2.  **Clicking a Cell:**
    *   If you click a cell that contains a mine, the game is over. All mines will be revealed, and you will see a "BOOM! Game Over." message.
    *   If you click a cell that does not contain a mine, it will reveal a number. This number indicates how many mines are in the eight surrounding cells (horizontally, vertically, and diagonally).
    *   If you click a cell that has `0` adjacent mines, it will automatically clear all its adjacent cells until it reaches cells with numbers.
3.  **Winning:** You win the game by revealing all cells that do not contain mines.
4.  **Reset:** Click the "Reset Game" button to start a brand new game at any point.

## How to Run Locally

1.  **Save Files:** Save `index.html`, `style.css`, and `script.js` into the same directory on your computer.
2.  **Open `index.html`:** Open the `index.html` file using your preferred web browser (e.g., Chrome, Firefox, Safari).
3.  **Play:** The game will load, and you can start playing immediately.

## File Structure

*   `index.html`: The main HTML file that structures the web page.
*   `style.css`: Provides the styling for the game board, cells, and messages.
*   `script.js`: Contains all the JavaScript logic for game setup, mine placement, cell interactions, and game state management.
*   `README.md`: This file, providing information about the project.
*   `LICENSE`: The MIT License under which this project is distributed.
