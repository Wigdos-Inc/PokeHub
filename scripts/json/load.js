async function loadData() {
    
    try {

        // Convert JSON Info & Store Globally (window)
        const files = ["items", "moves", "pokedex", "types"];
        for (let i=0; i < files.length; i++) {

            const response = (await fetch(`scripts/json/${files[i]}.json`));
            window[`${files[i]}`] = await response.json();
        }

        // Create Event (for event listeners)
        window.dispatchEvent(new Event("dataLoad"));

        // Testing
        console.log(window.pokedex[0].name.english);

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}
loadData();