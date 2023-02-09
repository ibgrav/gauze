import "./main.css";

import { setCSSVariables } from "./variables";
import { createBoardElement } from "./board";

function intialize() {
  const rows = 15;
  const cols = 15;

  setCSSVariables({ rows, cols });

  const board = createBoardElement({ rows, cols });
  document.body.appendChild(board);
}

document.addEventListener("DOMContentLoaded", intialize);
