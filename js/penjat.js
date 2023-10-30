
/* Estructura "constant" del joc */
var gameConfig = {
    liveLook: ["monster5.png", "monster4.png", "monster3.png", "monster2.png", "monster1.png", "monster0.png"],
    wordsToGuess: ["elefant", "criatura", "llapis", "maduixa"],
    numberOfLives: 5,
}

/* Estructura per tenir controlat en tot moment l'estat del joc */
var gameStatus = {
    status: "playing",
    lives: gameConfig.numberOfLives,
    // Aquí ja escollim la paraula de forma aleatòria
    wordToGuess: gameConfig.wordsToGuess[getRandomNumber(0, gameConfig.wordsToGuess.length - 1)].toUpperCase(),
    wordCompleted: "",
}

// wordToGuess => "PAU" | wordCompleted => "_ _ _"
for (let index = 0; index < gameStatus.wordToGuess.length; index++) {
    gameStatus.wordCompleted += "_";
}

window.onload = function () {
    console.log(gameStatus.wordToGuess + " " + gameStatus.lives + " " + gameStatus.wordCompleted);
    showInfoMessage();

};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showInfoMessage() {

    var divInfo = document.getElementById("info");
    var msgWelcome = document.getElementById("welcome");
    var msgGameSuccess = document.getElementById("game_success");
    var msgGameFail = document.getElementById("game_fail");
    var btnOk = document.getElementById("btn_ok");
    
    console.log(gameStatus.lives + " - " + gameStatus.status);
    if (gameStatus.lives === 5 && gameStatus.status === "playing") {
        divInfo.style.display = "block";
        msgWelcome.style.display = "block";
        btnOk.style.display = "block";
    }
    else if (gameStatus.lives >= 1 && gameStatus.status === "completed") {
        divInfo.style.display = "block";
        msgGameSuccess.style.display = "block";
        btnOk.style.display = "block";
    } else if (gameStatus.lives === 0 && gameConfig.status === "completed") {
        divInfo.style.display = "block";
        msgGameFail.style.display = "block";
        btnOk.style.display = "block";
    }

} 