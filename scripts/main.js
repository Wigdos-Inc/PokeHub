const mainE = {
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
            this.swipe = mainE.main.appendChild(document.createElement("div"));
            this.swipe.id = "swipeBox";
        }
    },
}
let fadeTimer = undefined;
mainE.mobile.ini();

let navItems = {};


// UI Fade In/Out
function fade(type) {

    if (innerWidth > 850) clearTimeout(fadeTimer);

    if      (type == "in")  mainE.cBox.style.opacity = 1;
    else if (type == "out") mainE.cBox.style.opacity = 0.1;
}

document.addEventListener("mouseover", (event) => {

    // Fade In when user hovers over contentDiv or Header
    if (innerWidth > 850 && (mainE.cBox.contains(event.target) || mainE.header.contains(event.target))) fade("in");
});
document.addEventListener("mouseout", (event) => {

    // Fade Out when user stops hovering over contentDiv or Header
    if (innerWidth > 850 && (mainE.cBox.contains(event.target) || mainE.header.contains(event.target))) fadeTimer = setTimeout(() => fade("out"), 4000);
});
document.addEventListener("click", (event) => {

    if (!mainE.cBox.contains(event.target) && !mainE.header.contains(event.target)) (mainE.cBox.style.opacity == 1 || mainE.cBox.style.opacity == "") ? fade("out") : fade("in");
});


function highlight(boxI, total) {

    if (mainE.mobile.swipe.children) {

        // Remove old highlights
        for (let i=0; i < mainE.mobile.swipe.children.length; i++) {

            mainE.mobile.swipe.children[i].id = "";
        }

        // Set new highlight
        mainE.mobile.swipe.children[boxI].id = "current";

    }
    else mainE.mobile.swipe.innerHTML = boxI;
}


function children(amount) {

    if (!mainE.mobile.swipe.children.length) {

        if (amount < 10) {

            for (let i=0; i < amount; i++) {

                mainE.mobile.swipe.appendChild(document.createElement("div"));
            }

        } else mainE.mobile.swipe.innerHTML = 1;

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

    reset: function() {

        this.dir.lock = false;
        this.dir.current = undefined;
        this.active = false;
    },
    swipe : function() {

        const e = mainE.cBox;

        function trans(on) {

            e.style.transition = on ? "transform 0.2s" : "none";
        }
        function center() {

            trans(true);
            e.style.transform = "translate(0,0)";

            e.ontransitionend = () => {

                trans(false);
                swipeStorage.reset();
            }
        }

        // Store Swipe Distance
        const diff = {
            x: this.endX - this.startX,
            y: this.endY - this.startY
        }
        const dir = this.dir.current;

        if (this.active && this.dir.lock && Math.abs(diff[dir]) > 80) {

            // Prepare Navigation
            const p = (diff[dir] > 0) 
            ? (dir == "x") ? { game: -1 } : { mode: -1 }
            : (dir == "x") ? { game:  1 } : { mode:  1 }
            ;

            // Animate contentDiv
            trans(true);
            e.style.transform = `translate${dir.toUpperCase()}(${(diff[dir] > 0 ? 1 : -1) * (dir == "x" ? innerWidth : innerHeight)}px)`;

            e.ontransitionend = () => {

                // Teleport contentDiv to other side of page
                trans(false);
                e.style.transform = `translate${dir.toUpperCase()}(${(diff[dir] > 0 ? 1 : -1)*-1 * (dir == "x" ? innerWidth : innerHeight)}px)`;

                // Execute Navigation
                navItems.display(p);

                // Re-Center
                center();
            }

        }
        else center();
    }
}

mainE.main.addEventListener("touchstart", (e) => {

    // Store Start Location
    swipeStorage.startX = e.touches[0].clientX;
    swipeStorage.startY = e.touches[0].clientY;
});

mainE.main.addEventListener("touchmove", (e) => {

    // Store Latest Position
    swipeStorage.endX = e.touches[0].clientX;
    swipeStorage.endY = e.touches[0].clientY;

    // Calculate Distance Moved
    const move = {
        x: e.touches[0].clientX - swipeStorage.startX,
        y: e.touches[0].clientY - swipeStorage.startY,

        abs: function(t) {

            return Math.abs(this[t]);
        }
    }

    // Determine Swipe Direction
    const dir = swipeStorage.dir.current || null;
    if (dir) {

        // Animate Swipe
        mainE.cBox.style.transform = `translate${dir.toUpperCase()}(${move[dir]}px)`;

    }
    else if (move.abs("x") > 20 || move.abs("y") > 20) {

        swipeStorage.dir.lock = true;
        swipeStorage.dir.current = (move.abs("x") >= move.abs("y")) ? "x" : "y";
        swipeStorage.active = true;

    }

});
mainE.main.addEventListener("touchend", () => {
    
    swipeStorage.active 
    ? swipeStorage.swipe() 
    : (mainE.cBox.style.opacity == 1 || mainE.cBox.style.opacity == "") ? fade("out") : fade("in");
});