/* Objects */

const elements = {
    text: [document.getElementById("choiceTitle"), document.getElementById("choiceSubtitle")],
    boxes: [],
    nav: {
        left : document.getElementById("leftBotox"),
        right: document.getElementById("rightBotox"),
        up   : document.getElementById("topBotox"),
        down : document.getElementById("bottomBotox")
    }
}
for (let i=0, boxClass = document.getElementsByClassName("selectorOptions"); i < boxClass.length; i++) elements.boxes.push(boxClass[i]);


navItems = {
    name: {
        l: ["Battle Sim", "PokeGuesser", "Free Guesser", "Tabletop"],
        s: ["battle", "pkGuess", "freeGuess", "ttrpg"],
        c: undefined
    },
    mode: {
        l: 
        [
            ["Easy Mode", "Hard Mode", "Versus"],
            ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All"],
            ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5", "Gen 6", "Gen 7", "Gen 8", "Gen 9", "All"],
            ["1st Edition"]
        ],
        s: 
        [
            [1, 2, "vs"],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            [1]
        ],
        c: [0, 0]
    },

    display: function(change) {

        // Create Children if necessary
        children(this.name.l.length);

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

        // Display Text
        const tgt = (innerWidth > 850) ? elements.text : mainE.mobile.footer;
        tgt[0].innerHTML = this.name.l[this.name.c];
        tgt[1].innerHTML = this.mode.l[this.mode.c[0]][this.mode.c[1]];

        // Highlight SwipeBox
        highlight(this.mode.c[0]);

        for (let boxI=0, infoI = this.name.c-2; boxI < elements.boxes.length; boxI++, infoI++) {

            // Display Images
            const path = (this.name.s[infoI] !== undefined) ? `images/homepage/${((innerWidth <= 850) ? "mobile/" : "")}${this.name.s[infoI]}.png` : `images/homepage/static.gif`;
            elements.boxes[boxI].style.backgroundImage = `url(${path})`;
        }
        
    },

    launch: function() {
        
        location.href = `pages/${this.name.s[this.name.c]}.html?mode=${this.mode.s[this.mode.c[0]][this.mode.c[1]]}`;
    }
}
navItems.name.c = Math.floor((navItems.name.l.length-1)/2);
navItems.mode.c[0] = navItems.name.c;



/* Event Listeners */

// Game Navigation
elements.nav.left.onclick  = () => navItems.display({game: -1});
elements.nav.right.onclick = () => navItems.display({game: 1});
elements.nav.up.onclick    = () => navItems.display({mode: -1});
elements.nav.down.onclick  = () => navItems.display({mode: 1});

// Launch Game
elements.boxes[2].addEventListener("click", () => {
    
    if (!swipeStorage.active) navItems.launch();
});
elements.boxes[2].addEventListener("touchend", () => {

    console.log(elements.cBox.style.opacity, (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == ""), swipeStorage.active);
    if (!swipeStorage.active && (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == "")) navItems.launch();
});
document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == "") ? navItems.launch() : fade("in");

    // Game Nav Shortcut
    else if (event.key === "ArrowLeft")  navItems.display({game: -1});
    else if (event.key === "ArrowRight") navItems.display({game: 1});
    else if (event.key === "ArrowUp")    navItems.display({mode: -1});
    else if (event.key === "ArrowDown")  navItems.display({mode: 1});
});


// UI Fade In/Out
document.addEventListener("click", (event) => {

    if (innerWidth <= 850 && !elements.cBox.contains(event.target)) {
        (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == "") ? fade("out") : fade("in");
    }
});

// Reload Games on Screen Change
window.onresize = () => {

    navItems.display({});
    fade("in");
}

// Swipe Detection



/* Startup */

navItems.display({});