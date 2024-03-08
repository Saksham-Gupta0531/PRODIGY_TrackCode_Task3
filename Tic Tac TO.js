document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('resetBtn');
    const colorPicker = document.getElementById('colorPicker');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          gameActive = false;
          return gameState[a];
        }
      }
  
      if (!gameState.includes('')) {
        gameActive = false;
        return 'Draw';
      }
  
      return null;
    };
  
    const handleCellClick = (index) => {
      if (!gameActive || gameState[index] !== '') return;
  
      gameState[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        alert(winner === 'Draw' ? 'It\'s a draw!' : `Player ${winner} wins!`);
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });
  
    resetBtn.addEventListener('click', () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      cells.forEach(cell => cell.textContent = '');
    });
  
    colorPicker.addEventListener('input', () => {
      const color = colorPicker.value;
      document.body.style.backgroundColor = color;
    });
  });
  