let boxes = document.querySelectorAll(".box");
let resetbtn = null;
let newGame = null;
let msgContainer = null;
let msg = null;
let count = 0;
let playerO = "";
let playerX = "";
let scoreO = 0;
let scoreX = 0;

let turnO = true;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

document.querySelector("#start-btn").addEventListener("click", () => {
  let oName = document.querySelector("#player-o-name").value.trim();
  let xName = document.querySelector("#player-x-name").value.trim();

  if (oName === "" || xName === "") {
    document.querySelector("#alert-msg").style.display = "block";
    return;
  }

  playerO = oName;
  playerX = xName;

  document.querySelector("#name-container").style.display = "none";
  document.querySelector("#main-game").style.display = "block";
  document.querySelector("#score-o").innerText = `${playerO} (O): 0`;
  document.querySelector("#score-x").innerText = `${playerX} (X): 0`;
  resetbtn = document.querySelector("#reset-btn");
  newGame = document.querySelector("#new-btn");
  msgContainer = document.querySelector(".msg-container");
  msg = document.querySelector("#msg");

  newGame.addEventListener("click", () => {
    turnO = true;
    count = 0;
    enabledboxes();
    msgContainer.classList.add("hide");
  });

  resetbtn.addEventListener("click", resetGame);
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.classList.add("box-pop");
    box.disabled = true;
    count++;
    checkWinner();
    checkDraw();
  });
});

const disabledboxes = () => {
  for (let box of boxes) {
    box.disabled = true;
    box.classList.add("box-hidden");
  }
};

const enabledboxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("box-hidden");
    box.classList.remove("box-pop");
  }
};
const resetGame = () => {
  turnO = true;
  count = 0;
  scoreO = 0;
  scoreX = 0;
  enabledboxes();
  msgContainer.classList.add("hide");
  document.querySelector("#score-o").innerText = `${playerO} (O): 0`;
  document.querySelector("#score-x").innerText = `${playerX} (X): 0`;
};

const showWinner = (winner) => {
  let winnerName = winner === "O" ? playerO : playerX;
  msg.innerText = `Congratulations, ${winnerName} Won the game!`;
  msgContainer.classList.remove("hide");
  disabledboxes();

  if (winner === "O") {
    scoreO++;
    document.querySelector("#score-o").innerText = `${playerO} (O): ${scoreO}`;
  } else {
    scoreX++;
    document.querySelector("#score-x").innerText = `${playerX} (X): ${scoreX}`;
  }
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      }
    }
  }
};

const checkDraw = () => {
  if (count === 9) {
    msg.innerText = "Game Was Draw";
    msgContainer.classList.remove("hide");
    disabledboxes();
  }
};
