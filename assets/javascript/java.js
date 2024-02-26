const possibleWords = ['leona', 'sivir', 'jinx', 'ahri', 'teemo', 'braum', 'nautilus', 'diana', 
        'morgana', 'missfortune', 'caitlyn', 'tristana', 'masteryi', 'soraka', 'rakan', 'xayah', 
        'ashe', 'vi', 'irelia'];

const def = ['i must not fall', 'everyone has a price', 'i feel like i forgot to shoot something', 
        'dont you trust me', 'ill scout ahead', 'you hit like baby ram', 'all will drown', 
        'no more lies', 'without mercy', 'i know what im doing', 'boom headshot', 
        'get in my way i dare ya', 'form before strength', 'this is my path', 
        'you going to marry me today', 'compromise is so unsatisfying', 
        'i always take the high ground', 'here i come to save the day.. or wreck it', 'tyrant'];
let underscores = [];
let guesses = [];
let remainingGuesses = 5;
let randomIndex = "";
let word = "";
let generateUnderscores = () => {
    underscores = [];
    for (let i = 0; i < word.length; i++) {
        if (word.charAt(i)) {
            underscores.push("_");
        }
    }
    return underscores;
};

/* Stripped down start to basically just what would be necessary to initially boot and reboot the 
        program for the reset button functionality*/
let start = () => {
    remainingGuesses = 5;
    word;
    guesses = [];

    randomIndex = Math.floor(Math.random() * possibleWords.length);
    word = possibleWords[randomIndex].toUpperCase();

    document.getElementById("g").innerHTML = remainingGuesses;
    document.getElementById("G").innerHTML = guesses;
    document.getElementById("hint").innerHTML = "";
    document.getElementById("message").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("answer").innerHTML = generateUnderscores().join(" ");
};

document.addEventListener("keyup", event => {
    // Checks if the "win" or "lose" condition was met, if they have it will not accept anymore input
    if (underscores.join("") == word || remainingGuesses <= 0) {
        return false;
    }

    // Just changes whatever key you type into a capital, establishes the keyChar variable
    let keyChar = String.fromCharCode(event.keyCode).toUpperCase();

    /* This first checks to see if the key you hit is in the word you are guessing, then changes the
            underscores and updates the "answer" on the screen */
    if (word.indexOf(keyChar) >= 0) {
        updateUnderscores(keyChar);
        document.getElementById("answer").innerHTML = underscores.join(" ");

        // This checks if the win condition is met, if it is it'll display text
        if (underscores.join("") == word) {
            document.getElementById("message").innerHTML = 
                'You Won!!! Good job. You either googled the answers or you play league!';
        }
    }
    /* This else if occurs if your key you've clicked is NOT in the word you're guessing AND it's not
            in the guess list currently, and then... */
    else if (guesses.indexOf(keyChar) < 0) {
        // ... It increments the count
        document.getElementById ("g").textContent = --remainingGuesses;

        // This checks if the loss condition is met, if it is it'll display text
        if (remainingGuesses <= 0) {
            document.getElementById("message").innerHTML = 
            'You Lost <br>' + 
            'The word was: ' + word;
        }
    }
    /* Secondary check if the key above has been put on the guess list that will occur whether it was in
            the word or not, and...*/
    if (guesses.indexOf(keyChar) < 0) {
        // ... Updates the guess list with the new character and separates the key with a ","
        guesses.push(keyChar)
        document.getElementById("G").innerHTML = guesses.join(",");
    }
});

/* This function goes and changes the _'s to the actual letters that correspond to the word you're
        guessing to display */
let updateUnderscores = keyChar => {
    for (var i = 0; i < word.length; i++) {
        if (keyChar == word.charAt(i)) {
            underscores[i] = keyChar;
        }
    }
};

// This makes the hint button display the hint
let hint = () => {
    document.getElementById("hint").innerHTML = def[randomIndex];
};

// Runs!!!
start();