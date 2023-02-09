interface CreateBoardProps {
  rows: number;
  cols: number;
}

export function createBoardElement({ rows, cols }: CreateBoardProps) {
  const board = document.createElement("main");

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      const tile = document.createElement("div");
      tile.dataset.tile = `${x}:${y}`;

      board.appendChild(tile);
    }
  }

  return board;
}
