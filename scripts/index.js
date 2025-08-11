"use strict";



/* Variable Declaration */

const output = {
    text     : [document.getElementById("choiceTitle"), document.getElementById("choiceSubtitle")],
    boxes    : [],
    main     : document.getElementsByTagName("main")[0],
    container: document.getElementById("contentDiv")
}
for (let i=0, boxClass = document.getElementsByClassName("selectorOptions"); i < boxClass.length; i++) output.boxes.push(boxClass[i]);

const nav = {
    left : document.getElementById("leftBotox"),
    right: document.getElementById("rightBotox"),
    up   : document.getElementById("topBotox"),
    down : document.getElementById("bottomBotox")
}


const games = {
    base : {
        name: {
            l: ["", "Battle Sim", "PokeGuesser", "Tabletop", ""],
            s: ["", "battle", "pkGuess", "ttrpg", ""]
        },
        mode: {
            l: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All Gens"],
            s: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "All"]
        }
    },
    order: [0, 1, 2, 3, 4],

    display: function(change) {

        // Change Load Order if necessary
        if      (change == -1) this.order.unshift(this.order.pop());
        else if (change == 1)  this.order.push(this.order.shift());
        
        // Display Game Info
        for (let i=0; i < 5; i++) {

            let path = (this.base.name.s[this.order[i]] !== "") ? `images/homepage/${this.base.name.s[this.order[i]]}.png` : `images/homepage/static.gif`;
            output.boxes[i].style.backgroundImage = `url(${path})`;
        }
    },

    launch: function() {

        location.href = `pages/${games.order.link[2]}.html`;
    }
}


let fadeTimer;



/* Functions */

function fade(type) {

    if (window.innerWidth > 800) clearTimeout(fadeTimer);

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
});


// UI Fade In/Out
document.addEventListener("mouseover", (event) => {

    if (window.innerWidth > 800 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) fade("in");
});
document.addEventListener("mouseout", (event) => {

    if (window.innerWidth > 800 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) fadeTimer = setTimeout(() => fade("out"), 1000);
});
document.addEventListener("click", (event) => {

    if (window.innerWidth <= 800) {

        if (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target)) fade("in");
        else fade("out");

    }
});


/* Function Startup */

games.display(-0);