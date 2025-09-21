//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#playAgainBtn").addEventListener("click", initializeGame);

//global variables
let randomNumber;
let guessNum = 0;                                    
let wins = 0;
let losses = 0;
// let endgame = false;

initializeGame();

//functions
function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#guessBox").value;
    console.log("Player guess: " + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    guessNum++;
    document.querySelector("#numGuesses").textContent = guessNum; 
    console.log("Attempts: " + guessNum);
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "Congratulations, you won!"; 
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#winsCount").textContent = wins;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";

        if (guessNum == 7) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber; 
            feedback.style.color = "red";
            losses++;
            document.querySelector("#lossesCount").textContent = losses;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}
function gameOver(){
  let guessBtn = document.querySelector("#guessBtn");
  let resetBtn = document.querySelector("#playAgainBtn");
  guessBtn.style.display = "none"; // hide Guess
  resetBtn.style.display = "inline"; // show Reset/Play Again
}
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number: " + randomNumber);
    guessNum = 0; 
    document.querySelector("#numGuesses").textContent = guessNum;


    // hiding the Reset button
    document.querySelector("#playAgainBtn").style.display = "none";

    // showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#guessBox");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ""; // clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; // clearing the feedback

    // clearing previous guesses
    document.querySelector("#guesses").textContent = "";
}
/* OLD CODE (LAB)
function guess() {
    let userGuess = document.querySelector("#guessBox").value;
    document.querySelector("#answers").textContent += userGuess + ", ";
    
    // user guesses right
    if(userGuess == randomNumber){
        document.querySelector("#msgBox").textContent = "Congratulations! You Guessed Right!"
        // user wins game is not over already
        if(!endgame) {
            wins++;
            document.querySelector("#winsCount").textContent = wins;
            endgame = true;
        }
    }
    // user guesses wrong
    else if(userGuess > randomNumber){
        document.querySelector("#msgBox").textContent = "Number is too high";
        
    }
    else if(userGuess < randomNumber){
        document.querySelector("#msgBox").textContent = "Number is too low";
    }

    guessNum++;
    document.querySelector("#numGuesses").textContent = guessNum;

    // user loses game
    if (!endgame && guessNum == 7 && userGuess != randomNumber) {
        document.querySelector("#msgBox").textContent = "You Lost.";
        losses++;
        document.querySelector("#lossesCount").textContent = losses;
        endgame = true;
    }

    changeTextColor(userGuess, randomNumber);
}
function playAgain() {
    // if last game didn't end, add 1 loss; otherwise reset endgame status
    if (endgame == false && guessNum > 0) {
        losses++;
        document.querySelector("#lossesCount").textContent = losses;
    } else { 
        endgame = false;
    }

    document.querySelector("#msgBox").textContent = "The previous number was " + randomNumber + ". Try again!";

    initializeGame();

    guessNum = 0;
    document.querySelector("#answers").textContent = "";
    document.querySelector("#numGuesses").textContent = guessNum;
}
function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log(randomNumber);

    //hiding the Reset button
    document.querySelector("#playAgainBtn").style.display = "none";
}
function changeTextColor(userGuess) {
    let diff = Math.abs(userGuess - randomNumber)
    let color;

    if (userGuess == randomNumber) {
        color = "green";
    } else if (diff <= 5) {
        color = "yellowgreen";
    } else if (diff <= 10) {
        color = "yellow";
    } else if (diff <= 15) {
        color = "orange";
    } else {
        color = "red";
    }

    document.querySelector("#msgBox").style.color = color;
}
*/
