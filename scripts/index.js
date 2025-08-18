"use strict";



/* Variable Declaration */

const output = {
    text     : [document.getElementById("choiceTitle"), document.getElementById("choiceSubtitle")],
    boxes    : [],
    main     : document.getElementsByTagName("main")[0],
    container: document.getElementById("contentDiv"),
    fadeTimer: undefined
}
for (let i=0, boxClass = document.getElementsByClassName("selectorOptions"); i < boxClass.length; i++) output.boxes.push(boxClass[i]);

const nav = {
    left : document.getElementById("leftBotox"),
    right: document.getElementById("rightBotox"),
    up   : document.getElementById("topBotox"),
    down : document.getElementById("bottomBotox")
}


const games = {
    name: {
        l: ["Battle Sim", "PokeGuesser", "Tabletop"],
        s: ["battle", "pkGuess", "ttrpg"],
    },
    mode: {
        l: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All Gens"],
        s: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "All"],
        c: 0
    },

    display: function(change) {

        // Change Load Order if necessary
        if (change == -1) {
            this.name.l.unshift(this.name.l.pop());
            this.name.s.unshift(this.name.s.pop());
        }
        else if (change == 1) {
            this.name.l.push(this.name.l.shift());
            this.name.s.push(this.name.s.shift());
        }

        const center = Math.floor((this.name.l.length-1)/2);
        for (let boxI=0, infoI = center-2; boxI < output.boxes.length; boxI++, infoI++) {

            // Display Text
            output.text[0].innerHTML = this.name.l[center];
            output.text[1].innerHTML = this.mode.l[this.mode.c];

            // Display Images
            const path = (this.name.s[infoI] !== undefined) ? `images/homepage/${this.name.s[infoI]}.png` : `images/homepage/static.gif`;
            output.boxes[boxI].style.backgroundImage = `url(${path})`;
        }
        
    },

    launch: function() {

        location.href = `pages/${this.name.s[Math.floor((this.name.l.length-1)/2)]}.html?mode=${this.mode.s[this.mode.c]}`;
    }
}



/* Functions */

function fade(type) {

    if (innerWidth > 850) clearTimeout(output.fadeTimer);

    if (type == "in") {
        output.container.style.opacity = 1;
    }
    else if (type == "out") {
        output.container.style.opacity = 0.1;
    }
}



/* Event Listeners */

// Game Navigation
nav.left.onclick = () => games.display(-1);
nav.right.onclick = () => games.display(1);

// Launch Game
output.boxes[2].addEventListener("click", () => games.launch());
document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") games.launch();

    // Game Nav Shortcut
    else if (event.key === "ArrowLeft") games.display(-1);
    else if (event.key === "ArrowRight") games.display(1);
    else if (event.key === "ArrowUp") {
        
        if (games.mode.c == 0) games.mode.c = games.mode.l.length-1;
        else games.mode.c--;
        output.text[1].innerHTML = games.mode.l[games.mode.c];

    }
    else if (event.key === "ArrowDown") {
        
        if (games.mode.c == games.mode.l.length-1) games.mode.c = 0;
        else games.mode.c++;
        output.text[1].innerHTML = games.mode.l[games.mode.c];

    }
});


// UI Fade In/Out
document.addEventListener("mouseover", (event) => {

    if (innerWidth > 850 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) fade("in");
});
document.addEventListener("mouseout", (event) => {

    if (innerWidth > 850 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) output.fadeTimer = setTimeout(() => fade("out"), 1000);
});
document.addEventListener("click", (event) => {

    if (innerWidth <= 850) {

        if (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target)) fade("in");
        else fade("out");

    }
});

/* Function Startup */

games.display();