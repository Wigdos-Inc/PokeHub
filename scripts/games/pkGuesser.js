// Wait for Data to be Loaded
window.addEventListener("dataLoad", () => {

    const tColors = {
        normal  : "#aaaa99",
        fire    : "#ff4422",
        water   : "#3399ff",
        electric: "#ffcc33",
        grass   : "#77cc55",
        ice     : "#66ccff",
        fighting: "#bb5544",
        poison  : "#aa5599",
        ground  : "#ddbb55",
        flying  : "#8899ff",
        psychic : "#ff5599",
        bug     : "#aabb22",
        rock    : "#bbaa66",
        ghost   : "#6666bb",
        dragon  : "#7766ee",
        dark    : "#775544",
        steel   : "#aaaabb",
        fairy   : "#ee99ee"
    }
    const tBackgrounds = {
        
        normal  : ["city", "route", "forest", "meadow"],
        fire    : ["desert", "volcano", "mountain"],
        water   : ["shore", "sea", "beach", "river"],
        electric: ["thunderplains", "route"],
        grass   : ["meadow", "forest"],
        ice     : ["ice"],
        fighting: ["meadow", "mountain", "city"],
        poison  : ["cave", "desert", "mountain", "forest"],
        ground  : ["mountain", "cave", "route", "desert"],
        flying  : ["meadow", "forest", "route", "mountain", "city"],
        psychic : ["city", "space", "spl"],
        bug     : ["forest", "meadow"],
        rock    : ["mountain", "cave"],
        ghost   : ["cave", "spl", "forest", "city"],
        dragon  : ["space", "mountain"],
        dark    : ["city", "forest", "cave"],
        steel   : ["mountain", "cave"],
        fairy   : ["space"]
    }
    
    const elements = {
        img  : {
            bg     : document.getElementById("guessIconBG"),
            pk     : document.getElementById("guessIcon"),

            flipped: false,
            timer  : null,
            cb     : undefined,

            flip: function(type, path, filter, reset) {

                if (this.timer) {
                    clearTimeout(this.timer)
                    this.timer = null;
                }

                if (this.flipped !== type || reset) this.bg.style.transform = "rotateY(90deg)";

                this.timer = setTimeout(() => {
                    
                    this.bg.style.backgroundImage = path.bg;
                    this.pk.src = path.pk;
                    this.pk.style.marginTop = (!path.pk.includes("ball") ? "10%" : 0);
                    this.pk.style.filter = (filter ? "brightness(0)" : "brightness(1)");

                    this.bg.style.transform = `rotateY(0)`;

                    this.flipped = type;
                    this.timer = null;
                }, 500);
            }
        },
    
        text : {
            answer: document.getElementById("correct"),
            entry : document.getElementById("topTopP"),
            type  : document.getElementById("topRightType"),

            cDex  : document.getElementById("cDexNr"),
            tDex  : document.getElementById("tDexNr"),

            cHints: document.getElementById("cHints"),
            tHints: document.getElementById("tHints"),

            flipped: false,
            timer  : null,

            flip: function(text, color) {

                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }

                if (this.type.innerHTML != text) this.type.style.transform = "rotateX(90deg)";

                this.timer = setTimeout(() => {

                    this.type.innerHTML = "";
                    this.type.style.backgroundColor = "black";
                    this.type.style.backgroundImage = "none";

                    this.type.innerHTML = text;
                    this.type.style[`${color[0]}`] = color[1];

                    this.type.style.transform = "rotateX(0)";
                }, 500);
            }
        },

        score: {
            box  : document.getElementById("scoreLiveBox"),
            total: document.getElementById("sTR"),

            // Show Scoreboard
            display: function() {}
        },

        next : document.getElementById("next"),
        prev : document.getElementById("prev"),
    
        input: document.getElementById("input"),
        inbtn: document.getElementById("inputBtn"),

        info : document.getElementsByClassName("infoInner"),


        ini  : function() {

            // Display Total
            this.text.tDex.innerHTML = game.total[game.gen];


            this.img.pk.src = "images/pokeball.png";
            this.text.type.style.backgroundColor = "black";


            // Create scoreBoard Items
            for (let i=0; i < game.total[game.gen]; i++) {

                const box = this.score.box.appendChild(document.createElement("div")); box.classList.add("scorePK");

                const left  = box.appendChild(document.createElement("div")); left.classList.add("sPKL");  left.id  = `sPK${i}L`;
                const right = box.appendChild(document.createElement("div")); right.classList.add("sPKR"); right.id = `sPK${i}R`;
            }
            

            // Display Info Boxes
            document.addEventListener("mouseover", (event) => {

                // Dex Index
                if (this.text.cDex.contains(event.target)) {
                    this.info[0].innerHTML = "Dex Nr of current Pokemon";
                    this.info[0].style.opacity = 1;
                }
                else if (this.text.tDex.contains(event.target)) {
                    this.info[0].innerHTML = "Total amount of Pokemon in this region";
                    this.info[0].style.opacity = 1;
                }
                else if (this.prev.contains(event.target)) {
                    this.info[0].innerHTML = "Previous Pokemon";
                    this.info[0].style.opacity = 1;
                }
                else if (this.next.contains(event.target)) {
                    this.info[0].innerHTML = "Next Pokemon";
                    this.info[0].style.opacity = 1;
                }

                // Hint/Tries
                else if (this.text.cHints.contains(event.target)) {
                    this.info[2].innerHTML = "Hints/Tries Remaining";
                    this.info[2].style.opacity = 1;
                }
                else if (this.text.tHints.contains(event.target)) {
                    this.info[2].innerHTML = "Total Amount of Hints/Tries";
                    this.info[2].style.opacity = 1;
                }

            });
            document.addEventListener("mouseout", (event) => {

                // Dex Index
                if (
                    this.text.cDex.contains(event.target) || 
                    this.text.tDex.contains(event.target) ||
                    this.prev.contains(event.target)      ||
                    this.next.contains(event.target)
                ) {
                    this.info[0].style.opacity = 0;
                }

                // Hint/Tries
                if (this.text.cHints.contains(event.target) || this.text.tHints.contains(event.target)) this.info[2].style.opacity = 0;
            });


            // Navigate through Entries
            this.next.onclick = () => {

                if (game.index != 150) {
                    game.index++;
                    this.display();
                }
            }
            this.prev.onclick = () => {

                if (game.index != 0) {
                    game.index--;
                    this.display();
                }
            }


            // Keypress Events
            document.addEventListener("keydown", (event) => {

                // Navigate through Entries
                if (elements.input != document.activeElement) {

                    if (event.key === "ArrowLeft" && game.index != 0) {
                        game.index--;
                        this.display();
                    }
                    else if (event.key === "ArrowRight" && game.index != 150) {
                        game.index++;
                        this.display();
                    }

                    // Use Hint
                    if (event.key === "h" && game.cHints[game.index] > 0) {

                        game.cHints[game.index]--;
                        this.text.cHints.innerHTML = game.cHints[game.index];

                        this.hintStuff();

                    }

                    if (event.key === "Enter") this.input.focus();

                }

                // Submit Answer
                else if (elements.input == document.activeElement && event.key === "Enter") this.validate();

                
                // Autofill Entries
                const fillEntries = document.getElementsByClassName("fillEntry");
                if (fillEntries.length > 0) {

                    // Check if a box is already selected
                    let cBox = {
                        b: undefined,
                        i: undefined
                    };
                    for (let i=0; i < fillEntries.length; i++) {

                        // Store Selected Box
                        if (fillEntries[i].classList.contains("selected")) {
                            cBox.b = fillEntries[i];
                            cBox.i = i;
                        }
                    }

                    if (event.key === "ArrowUp" || event.key === "ArrowDown") {

                        if (!cBox.b) fillEntries[0].classList.add("selected");
                        else {

                            // Unselect Previous Box
                            cBox.b.classList.remove("selected");

                            // Select New Box
                            if (event.key === "ArrowUp")   fillEntries[(cBox.i == 0 ? fillEntries.length-1 : cBox.i-1)].classList.add("selected");
                            if (event.key === "ArrowDown") fillEntries[(cBox.i == fillEntries.length-1 ? 0 : cBox.i+1)].classList.add("selected");
                        }

                    }
                    else if ((event.key === "Enter" || event.key === "ArrowRight") && cBox.b) {

                        // Concat Autofill Value
                        let concat = "";
                        for (let i=0; i < cBox.b.childNodes.length; i++) {

                            concat += cBox.b.childNodes[i].textContent;
                        }

                        // Autofill
                        this.input.value = concat;
                        this.autofill(false);

                    }

                }
            });

            this.input.addEventListener("input", (event) => this.autofill(true));


            // Click Events
            document.addEventListener("click", (event) => {

                // Use Hint / Burn Try
                if ((this.text.cHints.contains(event.target) || this.text.tHints.contains(event.target)) && game.cHints[game.index] > 0) {

                    game.cHints[game.index]--;
                    this.text.cHints.innerHTML = game.cHints[game.index];

                    this.hintStuff();

                };

                // Display/Hide Auto-Fill Box
                if (this.input.contains(event.target)) this.autofill(true);
                else if (!this.input.contains(event.target) && !this.info[1].contains(event.target)) this.autofill(false);

                // Submit Answer
                if (this.inbtn.contains(event.target) && !game.lock[game.index]) this.validate();
            });
        },


        display: function() {

            clearTimeout(this.fTimer);

            // Reset Pokemon & Background
            this.img.flip(
                false,
                {
                    bg: "none",
                    pk: "images/pokeball.png"
                },
                false,
                (this.img.bg.style.backgroundImage == "none" || this.img.bg.style.backgroundImage == "" ? false : true)
            );
            this.img.cb = undefined;


            // Enable/Disable Input Field & Button as needed
            this.input.value = "";
            if (game.lock[game.index]) {

                this.input.disabled = true;
                this.input.style.filter = "brightness(0.5)";
                this.inbtn.style.filter = "brightness(0.5)";
                this.inbtn.classList.remove("iActive");

            }
            else {
                
                this.input.disabled = false;
                this.input.style.filter = "brightness(1)";
                this.inbtn.style.filter = "brightness(1)";
                this.inbtn.classList.add("iActive");

            }

            // Reset Type Box (type & bg)
            this.text.flip("???", ["backgroundColor", "black"]);


            // Display Pokemon Index
            this.text.cDex.innerHTML = game.index+1;

            // Store Current Pokemon & Display Dex Entry
            game.pokemon.fill();
            this.text.entry.innerHTML = game.pokemon.entry;


            // Display Previous Hint Info
            this.hintStuff();
        },

        hintStuff: function() {

            // Display Hint Count
            this.text.cHints.innerHTML = game.cHints[game.index];

            // Apply First Hint (Reveal Typing)
            if (game.cHints[game.index] < 3) {

                const text  = game.pokemon.type.length == 1 ? game.pokemon.type[0] : `${game.pokemon.type[0]} <br> ${game.pokemon.type[1]}`;
                const color = 
                [
                    game.pokemon.type.length == 1 ? "backgroundColor" : "backgroundImage",
                    game.pokemon.type.length == 1 ?  tColors[`${game.pokemon.type[0].toLowerCase()}`]: `linear-gradient(to bottom, ${tColors[`${game.pokemon.type[0].toLowerCase()}`]}, ${tColors[`${game.pokemon.type[1].toLowerCase()}`]}`,
                ]

                this.text.flip(text, color);

            }

            // Apply Second Hint (Reveal Silhouette)
            if (game.cHints[game.index] < 2) {

                const typeBG = tBackgrounds[`${game.pokemon.type[0].toLowerCase()}`];
                const rng    = Math.floor(Math.random() * typeBG.length);
                if (!this.img.cb) this.img.cb = typeBG[rng];

                this.img.flip(
                    true, 
                    {
                        bg: `url(images/bg/guesser/types/${typeBG[rng]}.png)`,
                        pk: game.pokemon.img
                    },
                    true,
                    false
                );

            }

            // Apply Final Hint (Reveal Pokemon)
            if (game.cHints[game.index] < 1) {

                this.img.flip(
                    false,
                    {
                        bg: `url(images/bg/guesser/types/${this.img.cb}.png)`,
                        pk: game.pokemon.img
                    },
                    false,
                    false
                );

            }
        },

        autofill: function(create) {

            
            // Remove all Auto-Fill Entries
            const fillEntries = document.getElementsByClassName("fillEntry");
            while (fillEntries[0]) fillEntries[0].remove();

            // Store User Input
            const value = this.input.value.replaceAll(" ", "").toLowerCase();

            // Check if Autofill Applies
            const length = /* game.cHints[game.index] == 3 ? 4 : 2 */ 2;
            if (create && value.length > length) {

                // Display Auto-Fill Box
                this.info[1].style.opacity = 1;

                // Iterate through gen's Pokemon
                for (let i=0; i < game.total[game.gen]; i++) {

                    // Store Pokemon Name & Prepare to Count Correct Letters
                    const pName = window.pokedex[i].name.english.replaceAll(" ", "").toLowerCase();
                    let cLetters = 0;

                    // Iterate through Letters of User Input
                    for (let l=0; l < value.length; l++) {

                        // Count if Letters match
                        if (value[l] == pName[l]) cLetters++;
                        else break;
                    }

                    if (cLetters == value.length) {

                        // Display Auto-Fill
                        const entry = this.info[1].appendChild(document.createElement("div")); entry.classList.add("fillEntry");

                        let fOutput = window.pokedex[i].name.english;
                        let nOutput = "";
                        
                        // Highlight matching Letters
                        for (let l=0; l < cLetters; l++) nOutput += `<span class='highlight'>${fOutput[l]}</span>`;
                        nOutput += fOutput.slice(cLetters);

                        entry.innerHTML = nOutput;

                        // Fill/click Functionality
                        entry.onclick = () => {
                            
                            this.input.value = fOutput;
                            this.autofill(false);
                        }

                    }
                }

            } else this.info[1].style.opacity = 0;
        },

        validate: function() {

            // Store User Input
            const value = this.input.value.replaceAll(" ", "").toLowerCase();
            const answer = game.pokemon.name.replaceAll(" ", "").toLowerCase();

            // Empty Input Field
            this.input.value = "";

            // Check if answer is correct
            if (value == answer) game.locker(true);
            else {

                if (game.cHints[game.index] > 0) {
                    game.cHints[game.index]--;
                    this.hintStuff();
                }
                else game.locker(false);

            }
        }
    }

    let game = {
        index: 0,
        total: [151, 100, 135, 107, 156, 72, 85],
        gen  : document.getElementById("subtitleBox").innerHTML[document.getElementById("subtitleBox").innerHTML.length-1]-1,

        cHints: [],
        tHints: 3,

        points: {
            base : [1, 2, 3, 5],
            color: ["#ffc107", "#cddc39", "#8bc34a", "#4caf50"],
            total: 0,
            pp   : []
        },

        lock: [],

        pokemon: {
            name : undefined,
            type : undefined,
            img  : undefined,
            entry: undefined,

            fill: function() {

                const pokemon = window.pokedex[game.index];
                this.name  = pokemon.name.english;
                this.type  = pokemon.type;
                this.img   = pokemon.image.hires;
                this.entry = pokemon.dEntry;
            }
        },

        ini: function() {

            for (let i=0; i < this.total[this.gen]; i++) {

                this.cHints.push(this.tHints);
                this.lock.push(false);

                // Preload all Pokemon Images in Cache to prevent Display Delay
                const imgLoader = document.body.appendChild(document.createElement("img")); imgLoader.id = "imgLoader";
                imgLoader.src = window.pokedex[i].image.hires;
                imgLoader.remove();

                // Prep Points per Pokemon Storage
                this.points.pp.push(undefined);
            }

            elements.display();
        },

        locker: function(success) {

            // Disable Input
            this.lock[this.index] = true;
            elements.input.disabled = true;

            elements.input.value = (success) ? `Correct! (used ${this.tHints-this.cHints[this.index]} hints)` : "Wrong!";
            elements.input.style.filter = "brightness(0.5)";
            
            elements.inbtn.classList.remove("iActive");
            elements.inbtn.style.filter = "brightness(0.5)";

            elements.autofill(false);

            // Determine Earned Points
            const points = success ? this.points.base[this.cHints[this.index]] : 0;


            // Display Guess in the List
            document.getElementsByClassName("scorePK")[this.index].style.display = "flex";
            document.getElementsByClassName("scorePK")[this.index].style.backgroundColor = (success) ? this.points.color[this.cHints[this.index]] : "#f44336";
            document.getElementsByClassName(`sPKL`)[this.index].innerHTML = `${this.index+1}. ${this.pokemon.name}`;
            document.getElementsByClassName(`sPKR`)[this.index].innerHTML = points;

            // Add points to PP and Total
            this.points.pp[this.index] = points;
            this.points.total += points;
            document.getElementById("sTR").innerHTML = this.points.total;


            // Reveal Pokemon
            this.cHints[this.index] = 0;
            elements.hintStuff();
        },

        validate: function() {

            // Store User Input
            const value = elements.input.replaceAll(" ", "").toLowerCase();
            const answer = this.pokemon.name.replaceAll(" ", "").toLowerCase();

            // Check if answer is correct
            if (value == answer) this.locker(true);
            else {

                if (this.cHints[this.index] > 0) {
                    this.cHints[this.index]--;
                    elements.hintStuff();
                }
                else this.locker(false);

            }
        }
    }



    // Fire Setup Functions
    game.pokemon.fill();

    elements.ini();
    game.ini();
});