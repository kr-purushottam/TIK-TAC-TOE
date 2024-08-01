let gameInfo = document.querySelector('.game-info');
let boxes = document.querySelectorAll('.box');
let newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets's create a funciton to initialize the game
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    // UI pr empty bhi krna padega boxesko 
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //green colour ko v hatana hai : initialize box with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === 'X') currentPlayer = 'O';
    else currentPlayer = 'X';

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else
                    answer = "O";
                //winner diclare hone k bad fill na ho aage
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })    
                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    //check if match is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box != "")
            fillCount++;
    });

    //board is filled , game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        //check kro koi jeeta ki nai
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);

