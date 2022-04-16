let mainAreaE;
function renderCharacter(name, status, species, image) {
    // mainAreaE = document.querySelector("#main-area");
    const cardCharacterE = document.createElement("div");
    mainAreaE.appendChild(cardCharacterE);

    //image
    const characterImageE = document.createElement("img");
    characterImageE.src = image;
    
    //name
    const nameE = document.createElement("p");
    nameE.innerText = name;
    
    //specie and status
    const specieAndEstatusE = document.createElement("div");
    specieAndEstatusE.innerText = `${species} | ${status}`;
    
    cardCharacterE.appendChild(characterImageE);
    cardCharacterE.appendChild(nameE);
    cardCharacterE.appendChild(specieAndEstatusE);

    console.log("name", name);
}

async function fetchCharacter(charactersUrls) {
    //map url to fetch promises
    const unresolvedFetchPromises = charactersUrls.map(characterUrl => fetch(characterUrl));
    const resolvedFetchPromises = await Promise.all(unresolvedFetchPromises);
    const jsonPromises = resolvedFetchPromises.map(resolvedPromise => resolvedPromise.json());
    const resolvedPromises = await Promise.all(jsonPromises);
    console.log("resolvedPromises",resolvedPromises);
    resolvedPromises.forEach(character => {
        renderCharacter(character.name, character.status, character.species, character.image);
    });


}

function updateMainArea(name, date,episodeCode, characters) {
    console.log("update main area"); 
    //const mainE = document.querySelector("#main-area");
    mainAreaE.innerHTML = "";

    const titleE = document.createElement("h2");
    titleE.innerText = name;

    const dateAndCodeE = document.createElement("h3");
    dateAndCodeE.innerText = `${date} | ${episodeCode}`;

    mainAreaE.appendChild(titleE);
    mainAreaE.appendChild(dateAndCodeE);

    fetchCharacter(characters);

}

//query all the episodes information
function sidebar() {
    const sidebarE = document.createElement("div");
    document.querySelector("#root").appendChild(sidebarE);
    fetch("https://rickandmortyapi.com/api/episode").then(result => {
        return result.json()
    }).then(json =>{
        console.log(json.results);

        json.results.forEach(episode => {
            console.log(`Episode ${episode}`);
            const titleE = document.createElement("p");
            titleE.innerText = `Episode ${episode.id}`;
            sidebarE.appendChild(titleE);
            titleE.addEventListener("click", _event => {
                console.log("episode", episode.name);
                updateMainArea(episode.name,episode.date,episode.episode,episode.characters);
            });
            
        });

    })
    
}

function mainArea() {
    mainAreaE = document.createElement("div");
    mainAreaE.id = "main-area";
    document.querySelector("#root").appendChild(mainAreaE);
    mainAreaE.innerText = "this is my main area";
    
}

sidebar();
mainArea();