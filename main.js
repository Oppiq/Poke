const LIST_OF_POKEMON = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];
const POKE_CONTAINER = document.querySelector(".body-container");
const TEST_BUTTON = document.querySelector("#testButton");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#testButton");
const closeModalBtn = document.querySelector(".btn-close");
const POKE_DATA = document.querySelector("div", "#modalPoke")
const STATSCONTAINER = document.querySelector("div", "stats-container")
LIST_OF_POKEMON.sort();

// Loop that takes in the poke array, and iterates through creating a button/card for each
for (let poke of LIST_OF_POKEMON){
    const newButton = document.createElement("button");
    newButton.setAttribute("class", "pokeButton");
    newButton.setAttribute("id", poke);
    newButton.innerHTML = poke;
    newButton.addEventListener("click", () => getPoke(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`));
    POKE_CONTAINER.appendChild(newButton);
    const newImage = document.createElement("img");
    newImage.classList.add('pokeSprites');
    
    // Gets the pokemon sprite for the cards
    getSprite();
    async function getSprite() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`);
      const data = await response.json();
      newImage.src = data.sprites.front_default;
      newButton.insertBefore(newImage, newButton.firstChild);
    }
}

// launches the modal 
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

// Closes the modal 
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
closeModalBtn.addEventListener("click", closeModal);

// Function that gets all the data for the card/modal
async function getPoke(url){
    openModal();
    const response = await fetch(url);
    const data = await response.json();
    
    // get table cells
    const pokeName = document.querySelector("#pokeName");
    const pokeHeight = document.querySelector("#td21");
    const pokeWeight = document.querySelector("#td31");
    pokeName.textContent = data.name;
    pokeHeight.innerHTML = `Height: ${data.height}`;
    pokeWeight.innerHTML = `Weight: ${data.weight}`;
    
    // const pictures = await getCardDetails(data.name);
    const pictureLeft = document.querySelector('#pp1');
    const pictureMiddle = document.querySelector('#pp2');
    pictureLeft.src = data.sprites.front_default;
    pictureMiddle.src = data.sprites.back_default;

//
const pokeHp = document.querySelector("#td41")
const pokeAttack = document.querySelector("#td51")
const pokeDefense = document.querySelector("#td61")
const pokeSpecialAttack = document.querySelector("#td71")
const pokeSpecialDefense = document.querySelector("#td81")
const pokeSpeed = document.querySelector("#td91")

let baseStats = [];
for (let j = 0; j < data.stats.length; j++) {
  baseStats.push(`${data.stats[j].stat.name}: ${data.stats[j].base_stat}`)
}
console.log(baseStats);
pokeHp.innerHTML = baseStats[0];
pokeAttack.innerHTML = baseStats[1];
pokeDefense.innerHTML = baseStats[2];
pokeSpecialAttack.innerHTML = baseStats[3];
pokeSpecialDefense.innerHTML = baseStats[4];
pokeSpeed.innerHTML = baseStats[5];

let baseTypes = [];
for (let j = 0; j < data.types.length; j++){
  baseTypes.push(data.types[j].type.name)
}
console.log(baseTypes)
}

// async function getCardDetails(poke) {
//   console.log(poke)
//   const pictureLeft = document.querySelector('#pp1');
//   const pictureMiddle = document.querySelector('#pp2');
  
//   const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`);
//   const data1 = await response1.json();
//   pictureLeft.src = data1.sprites.front_default;
//   pictureMiddle.src = data1.sprites.back_default;
  
// }

// async function pageBuilder(url){
//     const response = await fetch(url);
//     const data = await response.json();
//     let poke = [];
//     //console.log(data.results[0].name);
//     for (let i = 0; i < data.results.length; i++) {
//         const name = data.results[i].name;
//         poke.push(name);
//     }
//     console.log(poke);
// }
// class pokemon {
//     constructor(name, weight, height){
//         this.name = name;
//         this.weight = weight;
//         this.height = height;
//     }
// }

//let newObject = pageBuilder(url);
