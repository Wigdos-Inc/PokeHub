let elements = {
    header   : document.getElementsByTagName("header")[0],
    main     : document.getElementsByTagName("main")[0],
    cBox     : document.getElementById("contentDiv"),
    mobile   : {
        footer: undefined,
        swipe : undefined,

        ini: function() {

            // Create Footer
            const footer = document.body.appendChild(document.createElement("footer"));
            this.footer = [footer.appendChild(document.createElement("div")), footer.appendChild(document.createElement("div"))];
            this.footer[0].id = "footTitle";
            this.footer[1].id = "footSub";

            // Create Swipe Box
            this.swipe = elements.main.appendChild(document.createElement("div"));
            this.swipe.id = "swipeBox";
        }
    }
}
let fadeTimer = undefined;
elements.mobile.ini();


// UI Fade In/Out
function fade(type) {

    if (innerWidth > 850) clearTimeout(fadeTimer);

    if      (type == "in")  elements.cBox.style.opacity = 1;
    else if (type == "out") elements.cBox.style.opacity = 0.1;
}

document.addEventListener("mouseover", (event) => {

    // Fade In when user hovers over contentDiv or Header
    if (innerWidth > 850 && (elements.cBox.contains(event.target) || elements.header.contains(event.target))) fade("in");
});
document.addEventListener("mouseout", (event) => {

    // Fade Out when user stops hovering over contentDiv or Header
    if (innerWidth > 850 && (elements.cBox.contains(event.target) || elements.header.contains(event.target))) fadeTimer = setTimeout(() => fade("out"), 4000);
});
document.addEventListener("click", (event) => {

    if (!elements.cBox.contains(event.target) && !elements.header.contains(event.target)) (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == "") ? fade("out") : fade("in");
});


function highlight(boxI) {

    // Remove old highlights
    for (let i=0; i < elements.mobile.swipe.children.length; i++) {

        elements.mobile.swipe.children[i].id = "";
    }

    // Set new highlight
    elements.mobile.swipe.children[boxI].id = "current";
}


function children(amount) {

    if (!elements.mobile.swipe.children.length) {

        for (let i=0; i < amount; i++) {

            elements.mobile.swipe.appendChild(document.createElement("div"));
        }

    }
}


let swipeStorage = {
    startX: 0,
    startY: 0,
    endX  : 0,
    endY  : 0,
    active: false,
    dir   : {
        current: undefined,
        lock   : false
    },
    swipe : function() {

        const diffX = this.endX - this.startX;
        const diffY = this.endY - this.startY;

        if (this.active && this.dir.current == "hor" && Math.abs(diffX) > 80) {

            (diffX > 0) ? games.display({ game: -1 }) : games.display({ game: 1 });

        }
        else if (this.active && this.dir.current == "ver" && Math.abs(diffY) > 80) {

            (diffY > 0) ? games.display({ mode: 1 }) : games.display({ mode: -1 });

        }

        // Reset Locks
        this.dir.lock = false;
        this.dir.current = undefined;
        this.active = false;
    }
}

elements.main.addEventListener("touchstart", (e) => {

    // Store Start Location
    swipeStorage.startX = e.touches[0].clientX;
    swipeStorage.startY = e.touches[0].clientY;
});

elements.main.addEventListener("touchmove", (e) => {

    // Store Latest Position
    swipeStorage.endX = e.touches[0].clientX;
    swipeStorage.endY = e.touches[0].clientY;

    // Calculate Distance Moved
    const moveX = Math.abs(e.touches[0].clientX - swipeStorage.startX);
    const moveY = Math.abs(e.touches[0].clientY - swipeStorage.startY);

    // Determine Swipe Direction
    if (!swipeStorage.dir.lock) {

        if (moveX > 20 || moveY > 20) {

            swipeStorage.dir.lock = true;
            swipeStorage.dir.current = (moveX >= moveY) ? "hor" : "ver";
            swipeStorage.active = true;

        }

    }
    else {

        

    }

});
elements.main.addEventListener("touchend", () => {
    
    swipeStorage.active ? swipeStorage.swipe() : (elements.cBox.style.opacity == 1 || elements.cBox.style.opacity == "") ? fade("out") : fade("in");
});