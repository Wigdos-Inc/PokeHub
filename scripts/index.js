/* Objects */

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
        c: undefined
    },
    mode: {
        l: 
        [
            ["Easy Mode", "Hard Mode"],
            ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All Gens"],
            ["1st Edition"]
        ],
        s: 
        [
            [0, 1],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            [1]
        ],
        c: [0, 0]
    },

    display: function(change) {

        // Change Game Order if necessary
        if ("game" in change) {

            if (change.game == -1) {

                // Move Last Array Item to the Start
                this.name.l.unshift(this.name.l.pop());
                this.name.s.unshift(this.name.s.pop());

                this.mode.c[0] = (this.mode.c[0] == 0) ? this.mode.l.length-1 : this.mode.c[0]-1;

            }
            else if (change.game == 1) {

                // Move First Array Item to the End
                this.name.l.push(this.name.l.shift());
                this.name.s.push(this.name.s.shift());

                this.mode.c[0] = (this.mode.c[0] == this.mode.l.length-1) ? 0 : this.mode.c[0]+1;

            }

            // Reset Mode Index
            this.mode.c[1] = 0;

        }

        // Change Mode Index if necessary
        if ("mode" in change) {

            if      (change.mode == -1) this.mode.c[1] = (this.mode.c[1] == 0) ? this.mode.s[this.mode.c[0]].length-1 : this.mode.c[1]-1;
            else if (change.mode == 1)  this.mode.c[1] = (this.mode.c[1] == this.mode.s[this.mode.c[0]].length-1) ? 0 : this.mode.c[1]+1;

        }


        for (let boxI=0, infoI = this.name.c-2; boxI < output.boxes.length; boxI++, infoI++) {

            // Display Text
            output.text[0].innerHTML = this.name.l[this.name.c];
            output.text[1].innerHTML = this.mode.l[this.mode.c[0]][this.mode.c[1]];

            // Display Images
            const path = (this.name.s[infoI] !== undefined) ? `images/homepage/${this.name.s[infoI]}.png` : `images/homepage/static.gif`;
            output.boxes[boxI].style.backgroundImage = `url(${path})`;
        }
        
    },

    launch: function() {

        location.href = `pages/${this.name.s[this.name.c]}.html?mode=${this.mode.s[this.mode.c[0]][this.mode.c[1]]}`;
    }
}
games.name.c = Math.floor((games.name.l.length-1)/2);
games.mode.c[0] = games.name.c;



/* Functions */

function fade(type) {

    if (innerWidth > 850) clearTimeout(output.fadeTimer);

    if      (type == "in")  output.container.style.opacity = 1;
    else if (type == "out") output.container.style.opacity = 0.1;
}



/* Event Listeners */

// Game Navigation
nav.left.onclick  = () => games.display({game: -1});
nav.right.onclick = () => games.display({game: 1});
nav.up.onclick    = () => games.display({mode: -1});
nav.down.onclick  = () => games.display({mode: 1});

// Launch Game
output.boxes[2].addEventListener("click", () => games.launch());
document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") games.launch();

    // Game Nav Shortcut
    else if (event.key === "ArrowLeft")  games.display({game: -1});
    else if (event.key === "ArrowRight") games.display({game: 1});
    else if (event.key === "ArrowUp")    games.display({mode: -1});
    else if (event.key === "ArrowDown")  games.display({mode: 1});
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



/* Startup */

games.display({});