let elements = {
    main     : document.getElementsByTagName("main")[0],
    container: document.getElementById("contentDiv"),
    fadeTimer: undefined,
    mobile   : {
        footer: [document.getElementById("footTitle"), document.getElementById("footSub")],
        swipe : document.getElementById("swipeBox")
    }
}

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
        lock   : undefined
    },
    swipe : function() {

        const diffX = this.endX - this.startX;
        const diffY = this.endY - this.startY;

        if (this.active && this.dir.current == "hor" && Math.abs(diffX) > 50) {

            (diffX > 0) ? games.display({  }) : games.display({  });

        }
        else if (this.active && this.dir.current == "ver" && Math.abs(diffY) > 50) {

            (diffY > 0) ? games.display({  }) : games.display({  });

        }
    }
}

elements.main.addEventListener("touchstart", (e) => {

    // Store Start Location
    swipeStorage.startX = e.touches[0].clientX;
    swipeStorage.startY = e.touches[0].clientY;
});

elements.main.addEventListener("touchmove", (e) => {

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

        // Visual Representation

    }

});

elements.main.addEventListener("touchend", (e) => {

    // Store End
    swipeStorage.endX = e.touches[0].clientX;
    swipeStorage.endY = e.touches[0].clientY;

    swipeStorage.swipe();
});