async function loadData() {
    
    try {

        // Fetch JSON Info & Store Globally (window)
        for (let i=0, files = ["items", "moves", "pokedex", "types"]; i < files.length; i++) {

            const response = (await fetch(`scripts/json/${files[i]}.json`));
            window[`${files[i]}`] = await response.json();
        }

        // Create Event (for event listeners)
        window.dispatchEvent(new Event("dataLoad"));

    } 
    catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}
loadData();



// Type Visual Storage
const type = {
    color: {
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
    },
    bg: {
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
        fairy   : ["space"],
        path    : "images/bg/guess/types/"
    }
}