"use strict";



/* Variable Declaration */

const output = {
    text     : [document.getElementById("choiceTitle"), document.getElementById("choiceSubtitle")],
    boxes    : [],
    main     : document.getElementsByTagName("main")[0],
    container: document.getElementById("contentDiv")
}
for (let i=0, boxClass = document.getElementsByClassName("selectorOptions"); i < boxClass.length; i++) output.boxes.push(boxClass[i]);


const games = {
    base : {
        name: ["PokeGuesser"],
        img : ["whoPokemon.png"],
        link: ["pages/pkGuesser.html"]
    },
    order: {
        name: [],
        img : [],
        link: []
    },

    display: function() {

        // Reset Arrays
        for (let [key, entry] of Object.entries(this.order)) entry = [];

        // Determine Load Order
        let realI = 0;
        for (let i=0; i < 5; i++) {

            if (
                this.base.name.length == 1 && i != 2 ||
                this.base.name.length == 2 && (i < 2 || i > 3) ||
                this.base.name.length == 3 && (i == 0 || i == 4) ||
                this.base.name.length == 4 && i == 0
            )  {
                for (let [key, entry] of Object.entries(this.order)) entry.push(null);
            } else {

                this.order.name.push(this.base.name[realI]);
                this.order.img.push(this.base.img[realI]);
                this.order.link.push(this.base.link[realI]);

                realI++;

            }
        }

        // Load Text (change if more entries are added)
        output.text[0].innerHTML = this.order.name[2];
        output.text[1].innerHTML = "Gen 1" // Only available one for now

        // Load Image and link
        for (let i=0; i < 5; i++) {

            let path = (this.order.img[i] !== null) ? `images/homepage/${this.order.img[i]}` : `images/homepage/static.png`;
            output.boxes[i].style.backgroundImage = `url(${path})`;
        }
    }
}


let fadeTimer;



/* Functions */

function fade(type) {

    if (window.innerWidth > 800) clearTimeout(fadeTimer);

    if (type == "in") output.container.style.opacity = 1;
    else if (type == "out") output.container.style.opacity = 0.1;
}



/* Event Listeners */

output.boxes[2].addEventListener("click", () => location.href = games.order.link[2]);


document.addEventListener("mouseover", (event) => {

    if (window.innerWidth > 800 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) fade("in");
});
document.addEventListener("mouseout", (event) => {

    if (window.innerWidth > 800 && (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target))) fadeTimer = setTimeout(() => fade("out"), 1000);
});

document.addEventListener("click", (event) => {

    console.log(event.target);

    if (window.innerWidth <= 800) {

        if (output.container.contains(event.target) || document.getElementsByTagName("header")[0].contains(event.target)) fade("in");
        else fade("out");

    }
});


/* Function Startup */

games.display();