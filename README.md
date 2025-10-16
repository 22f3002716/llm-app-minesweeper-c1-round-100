# Minesweeper Game

This is a simple single-page web application that implements an 8x8 Minesweeper game with 10 randomly placed mines.

## Features

*   **8x8 Grid:** A classic Minesweeper grid size.
*   **10 Mines:** Mines are randomly distributed across the board at the start of each game.
*   **Cell Revealing:** Click on a cell to reveal its content.
    *   If the cell contains a number, it indicates how many mines are adjacent to it.
    *   If the cell is empty (contains '0' adjacent mines), it automatically reveals all adjacent empty cells and their numbered borders.
*   **Game Over State:** Clicking on a mine immediately ends the game.
    *   A prominent 'BOOM! Game Over.' message is displayed.
    *   All mines on the board are revealed visually.

## How to Run

1.  **Save the files:** Save `index.html`, `style.css`, `script.js`, `README.md`, and `LICENSE` into a single directory on your computer.
2.  **Open in Browser:** Open the `index.html` file using any modern web browser (e.g., Chrome, Firefox, Safari, Edge).
3.  **Play:** The game will start automatically. Simply click on cells to begin playing.

## Controls

*   **Left-click:** Reveals the content of the clicked cell.

## Game Over

The game ends immediately if you click a cell containing a mine. The message "BOOM! Game Over." will appear, and all mine locations will be shown on the grid.

Enjoy playing!
