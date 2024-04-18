// Define chessboard and pieces
const board = document.querySelector(".board");
const resetButton = document.querySelector("#reset-button");
const pieces = [];
const maxCaptures = 2;

// Create an 8x8 chessboard
function createChessboard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

// Add white pieces to the board
function placeWhitePieces() {
    for (let i = 0; i < 32; i++) {
        const piece = document.createElement("div");
        piece.classList.add("white-piece");
        piece.dataset.captures = 0;
        pieces.push(piece);
    }

    // Shuffle the pieces randomly
    shufflePieces();
    
    // Place the shuffled pieces on the board
    pieces.forEach((piece, index) => {
        const cell = board.children[index];
        cell.appendChild(piece);
    });
}

// Shuffle the pieces randomly
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
}

// Handle piece captures
board.addEventListener("click", (event) => {
    const cell = event.target;
    if (cell.classList.contains("white-piece")) {
        const captures = parseInt(cell.dataset.captures);
        if (captures < maxCaptures) {
            cell.dataset.captures = captures + 1;
            cell.classList.remove("white-piece");
            cell.classList.add("black-piece");
			cell.style.backgroundImage = 'url("assets/pieces/bp.png")';
            checkGameStatus();
        }
    }
});

// Check if the game is over
function checkGameStatus() {
    const remainingWhitePieces = pieces.filter(piece => piece.classList.contains("white-piece"));
    
    if (remainingWhitePieces.length === 1) {
        alert("Congratulations! You won!");
    }
}

// Reset the game
resetButton.addEventListener("click", () => {
    pieces.forEach((piece) => {
        piece.dataset.captures = 0;
        piece.classList.remove("black-piece");
        piece.classList.add("white-piece");
		piece.style.backgroundImage = 'url("assets/pieces/wp.png")';
    });

    shufflePieces();
    checkGameStatus();
});

createChessboard();
placeWhitePieces();
