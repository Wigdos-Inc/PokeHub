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
            l: ["Battle Sim", "PokeGuesser", "Tabletop"],
            s: ["battle", "pkGuess", "ttrpg"]
        },
        mode: {
            l: ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All Gens"],
            s: ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "All"],
            c: 0
        }
    },
    order: [],

    display: function(change) {

        // Initialize Load Order
        if (!this.order.length) {

            const center = Math.ceil(this.base.name.l.length);
            for (let i = center-2; i < i < center+2; i++) {

                if (this.base.name.l[i]) this.order.push(i);
                else this.order.push(-1);
            }

        }

        // Change Load Order if necessary
        if      (change == -1) this.order.unshift(this.order.pop());
        else if (change == 1)  this.order.push(this.order.shift());
        
        // Update Boxes
        for (let i=0; i < 5; i++) {

            let path = (this.base.name.s[this.order[i]] !== "") ? `images/homepage/${this.base.name.s[this.order[i]]}.png` : `images/homepage/static.gif`;
            output.boxes[i].style.backgroundImage = `url(${path})`;
        }

        // Display Game Info
        output.text[0].innerHTML = this.base.name.l[this.order[2]];
        output.text[1].innerHTML = this.base.mode.l[0];
        
    },

    launch: function() {

        location.href = `pages/${games.base.name.s[2]}.html?mode=${this.base.mode[cMode]}`;
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
    else if (event.key === "ArrowUp") {
        
        if (games.base.mode.c == 0) games.base.mode.c = games.base.mode.l.length-1;
        else games.base.mode.c--;
        output.text[1].innerHTML = games.base.mode.l[games.base.mode.c];

    }
    else if (event.key === "ArrowDown") {
        
        if (games.base.mode.c == games.base.mode.l.length-1) games.base.mode.c = 0;
        else games.base.mode.c++;
        output.text[1].innerHTML = games.base.mode.l[games.base.mode.c];

    }
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