let mainAreaE;
let characterCardE;
let sidebarEpisodesE;
let sidebarButtonE;

function renderCharacter(name, status, species, image) {
    // mainAreaE = document.querySelector("#main-area");
    const cardCharacterE = document.createElement("div");
    cardCharacterE.classList.add("character-card");
    characterCardE.appendChild(cardCharacterE);

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

    
}

async function fetchCharacter(charactersUrls) {
    //map url to fetch promises
    const unresolvedFetchPromises = charactersUrls.map(characterUrl => fetch(characterUrl));
    const resolvedFetchPromises = await Promise.all(unresolvedFetchPromises);
    const jsonPromises = resolvedFetchPromises.map(resolvedPromise => resolvedPromise.json());
    const resolvedPromises = await Promise.all(jsonPromises);
    resolvedPromises.forEach(character => {
        renderCharacter(character.name, character.status, character.species, character.image);
    });


}

function updateMainArea(name, date,episodeCode, characters) {
    //const mainE = document.querySelector("#main-area");
    mainAreaE.innerHTML = "";
    characterCardE.innerHTML = "";

    const titleE = document.createElement("h2");
    titleE.innerText = name;

    const dateAndCodeE = document.createElement("h3");
    dateAndCodeE.innerText = `${date} | ${episodeCode}`;

    mainAreaE.appendChild(titleE);
    mainAreaE.appendChild(dateAndCodeE);
    mainAreaE.appendChild(characterCardE);
    
    fetchCharacter(characters);

}

function updateSidebar(url) {
    fetch(url).then(result => {
        return result.json()
    }).then(json =>{
        json.results.forEach(episode => {
            const titleE = document.createElement("p");
            titleE.innerText = `Episode ${episode.id}`;
            sidebarEpisodesE.appendChild(titleE);
            titleE.addEventListener("click", _event => {
                updateMainArea(episode.name,episode.date,episode.episode,episode.characters);
            });
            
        });
        if (json.info.next != "") {
            
            nextButton.addEventListener("click", _event => {
                
            })
        }
        
        const firstEpisode = json.results[0];
        console.log("json",json.results[0]);
        
        updateMainArea(firstEpisode.name,firstEpisode.date,firstEpisode.episode,firstEpisode.characters);
            
    });
}

//query all the episodes information
function sidebar() {
    const sidebarE = document.createElement("div");
    sidebarE.id="sidebar";
    sidebarEpisodesE = document.createElement("div");
    sidebarEpisodesE.id="sidebar-episodes";
    sidebarButtonE = document.createElement("div");
    sidebarButtonE.id="sidebar-button";
    document.querySelector("#root").appendChild(sidebarE);
    sidebarE.appendChild(sidebarEpisodesE);
    sidebarE.appendChild(sidebarButtonE);
    const nextButton = document.createElement("button");
    nextButton.innerText = "New Episodes";
    sidebarButtonE.appendChild(nextButton);
    updateSidebar("https://rickandmortyapi.com/api/episode");

    
}

function mainArea() {
    mainAreaE = document.createElement("div");
    mainAreaE.id = "main-area";
    document.querySelector("#root").appendChild(mainAreaE);
    mainAreaE.innerText = "this is my main area";

    characterCardE = document.createElement("div");
    //updateMainArea();
    
}

sidebar();
mainArea();