// Borja Montseny Peris DAW2 Dual Tarda
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

// variables que creem aquí per a no fer-ho cada cop a les funcions
var divInfo; // recuadre verd de missatge
var msgWelcome; // missatge de benvinguda
var msgGameSuccess; // joc finalitzat correctament
var msgGameFail; // joc finalitzat sense vides
var btnOk; // botó Continuar
var livesText; // text del recuadre de vides
var pressedKey; // tecla premuda
var newGameButton; // botó NEW GAME -> Partida nova (refrescar)
var clueBox;
var letters;
var clueText;
var clueLetter = "";

window.onload = function () {

    divInfo = document.getElementById("info");
    msgWelcome = document.getElementById("welcome");
    msgGameSuccess = document.getElementById("game_success");
    msgGameFail = document.getElementById("game_fail");
    btnOk = document.getElementById("btn_ok");
    newGameButton = document.getElementById("new_game");
    clueBox = document.getElementById("clue");
    livesText = document.getElementsByClassName("lives")[0];
    document.body.addEventListener("keydown", pressKey);
    newGameButton.addEventListener("click", restartGame);
    btnOk.addEventListener("click", closeMessage);
    clueBox.addEventListener("mouseenter", giveClue);
    letters = document.getElementById("letters");
    clueText = document.getElementById("clue").getElementsByTagName("span")[0];

    devConsoleInfo();
    showWelcomeMessage();
};

// per ajudar a escollir una paraula dins l'array
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showInfoMessage() {

    if (gameStatus.lives >= 1 && gameStatus.status === "completed") {
        divInfo.style.display = "block";
        msgGameSuccess.style.display = "block";
        btnOk.style.display = "block";
    } else if (gameStatus.lives === 0 && gameStatus.status === "completed") {
        divInfo.style.display = "block";
        msgGameFail.style.display = "block";
        btnOk.style.display = "block";
    }

}

function closeMessage() {

    divInfo.style.display = "none";
    msgWelcome.style.display = "none";
    msgGameSuccess.style.display = "none";
    msgGameFail.style.display = "none";
    btnOk.style.display = "none";

}

// funcio de perdre una vida, si es < 5, perdem
function loseLive() {
    gameStatus.lives--;

    if (gameStatus.lives < 1) {
        gameStatus.status = "completed";
        msgGameFail.style.display = "block";
        btnOk.style.display = "block";

        // eliminem el listener del botó continuar
        btnOk.removeEventListener("click", closeMessage);

        // Per a que canvii a un que reinicia la página
        btnOk.addEventListener("click", restartGame);

        // cambiar a que se desactiven todos los listeners menos NEW GAME



    }

    livesText.innerHTML = ("<br><br><br>" + gameStatus.lives + "<br> LIVES <br>LEFT");

    if (gameStatus.lives < 5 && gameStatus.lives >= 0) {
        document.getElementById("monster").src = ("img/monster" + gameStatus.lives + ".png");
    }
}

function giveClue() {

    // restem una vida
    loseLive();

    // ensenyem una lletra no registrada ja:
    do { // calculem una lletra de la paraula que no hagi sigut mostrada encara
        clueLetter = gameStatus.wordToGuess.charAt(getRandomNumber(0, gameStatus.wordToGuess.length));
    } while (gameStatus.wordCompleted.includes(clueLetter));

    clueText.innerHTML = clueLetter;

    devConsoleInfo();
    showInfoMessage();

}

function pressKey(event) {
    // guardem la tecla premuda en una variable
    pressedKey = event.key.toUpperCase();

    // if per admetre només lletres del teclat, descartem F4's..., Controls i Alts
    if (!/^[A-Z]$/i.test(pressedKey)) {
        return;
    }

    // ara, si la lletra está a la paraula, la cambien el seu _ per la lletra
    if (gameStatus.wordToGuess.includes(pressedKey)) {
        for (let i = 0; i < gameStatus.wordToGuess.length; i++) {
            if (gameStatus.wordToGuess[i] === pressedKey) {
                gameStatus.wordCompleted = gameStatus.wordCompleted.substring(0, i) + pressedKey + gameStatus.wordCompleted.substring(i + 1);
                letters.innerHTML = gameStatus.wordCompleted;
            }
        }
    } else if (!(gameStatus.wordToGuess.includes(pressedKey))) { // si no está la lletra a la paraula perdem una vida
        loseLive();
    }

    // tant com si no tenim vides com si hem completat wordCompleted, status = completed
    if (gameStatus.lives === 0) {
        gameStatus.status = "completed";
        showInfoMessage();
    } else if (gameStatus.wordToGuess === gameStatus.wordCompleted) {
        gameStatus.status = "completed";
        // eliminem el listener del botó continuar
        btnOk.removeEventListener("click", closeMessage);

        // Per a que canvii a un que reinicia la página
        btnOk.addEventListener("click", restartGame);
        showInfoMessage();
    }

    devConsoleInfo();

}


// missatges per al desenvolupador
function devConsoleInfo() {
    console.log("\n Status: " + gameStatus.status +
        "\n Lives: " + gameStatus.lives +
        "\n wordToGuess: " + gameStatus.wordToGuess +
        "\n wordCompleted: " + gameStatus.wordCompleted +
        "\n clueLetter: " + clueLetter);
}

// funció que reinicia el joc, li asignem a continuar si hem acabat
function restartGame() {
    window.location.reload();
}

function showWelcomeMessage() {
    divInfo.style.display = "block";
    msgWelcome.style.display = "block";
    btnOk.style.display = "block";
}