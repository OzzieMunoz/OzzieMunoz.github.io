// Event Listeners
document.querySelector("#normalBtn").addEventListener("click", normalGame);
document.querySelector("#hardBtn").addEventListener("click", hardGame);
document.querySelector("#playAgainBtn").addEventListener("click", resetGame);
document.addEventListener("keydown", guessKey);

// Global Variables
let attempts = 0;
let endgame = false;
let secretWord = "";
let revealedLetters = [];
let guessedLetters = [];
let lastDiff = "normal";
let feedback = document.querySelector("#feedback");

const NORMAL_WORDS = ["animals", "computer", "fireworks", "hangman", "microwave", 
"collection", "wallpaper", "keyboard", "picture", "microphone"]
const HARD_WORDS = ["buzz", "quiz", "jinx", "glass", "poor", "abyss", "askew", 
"oxen", "absurd", "affix"]

// Functions
function initializeGame(wordList) {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Secret word:", secretWord);

    document.querySelector("#hangman").src = "img/0.jpg";
    document.querySelector("#guesses").textContent = "";
    document.querySelector("#playAgainBtn").style.display = "none";
    feedback.textContent = "Type a letter to begin";
    feedback.style.color = "black";
    
    attempts = 0;
    endgame = false;
    guessedLetters = [];
    revealedLetters = [];
     
    let boxes = "";
    for (let i = 0; i < secretWord.length; i++) {     
        revealedLetters.push("_");
        boxes += '<span class="box">_</span>';
    }
    document.querySelector("#letterBoxes").innerHTML = boxes;
}
function handleGuess(letter) {
    if (endgame) {
        return;  
    }

    if (guessedLetters.includes(letter)) {
        feedback.textContent = "Invalid: Duplicate letter";
        feedback.style.color = "red";
        return;
    } else {
        feedback.textContent = "";
    }

    guessedLetters.push(letter);
    document.querySelector("#guesses").textContent = guessedLetters.join(", ");

    if (secretWord.includes(letter)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letter) {
                revealedLetters[i] = letter;
            }
        }

        let boxes = "";
        for (let i = 0; i < revealedLetters.length; i++) {
            const ch = revealedLetters[i];

            if (ch === "_") {
                boxes += '<span class="box">_</span>';
            } else {
                boxes += '<span class="box">' + ch + '</span>';
            }
        }
        document.querySelector("#letterBoxes").innerHTML = boxes;

        if (!revealedLetters.includes("_")) {
            endgame = true;
            document.querySelector("#playAgainBtn").style.display = "inline";
            feedback.textContent = "Congratulations, you won!";
            feedback.style.color = "green";
        }
    } else {
        attempts++; 
        document.querySelector("#hangman").src = `img/${attempts}.jpg`;

        if (attempts == 10) {
            endgame = true;
            document.querySelector("#playAgainBtn").style.display = "inline";
            feedback.textContent = "Sorry, you lost! The word was " + secretWord;
            feedback.style.color = "red";
        }
    }
}
function guessKey(event) {
  const key = event.key

  if (key >= "a" && key <= "z") {
    handleGuess(key);
  } else {
    feedback.innerHTML = "Invalid: Please enter alphabetic<br>keys only or disable caps lock"
    feedback.style.color = "red";
  }
}
function normalGame() {
    lastDiff = "normal";
    initializeGame(NORMAL_WORDS);
}
function hardGame() {
    lastDiff = "hard";
    initializeGame(HARD_WORDS);
}
function resetGame() {
    if (lastDiff == "normal") {
        normalGame();
    } else {
        hardGame();
    }
}

// Start normal game by default
normalGame();