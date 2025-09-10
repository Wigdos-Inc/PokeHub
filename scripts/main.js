let elements = {
    main     : document.getElementsByTagName("main")[0],
    container: document.getElementById("contentDiv"),
    fadeTimer: undefined,
    mobile   : {
        footer: [document.getElementById("footTitle"), document.getElementById("footSub")],
        swipe : document.getElementById("swipeBox")
    }
}