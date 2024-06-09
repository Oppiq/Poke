const LIST_OF_POKEMON = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"];
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#testButton");
const closeModalBtn = document.querySelector(".btn-close");
const POKE_DATA = document.querySelector("div", "#modalPoke")
const STATSCONTAINER = document.querySelector("div", "stats-container")
LIST_OF_POKEMON.sort();
    
const cardContainer = document.querySelector('#cardContainer');
const card = document.querySelector('#cardTemplate');

// builds out the page and buttons + event listener
async function pageBuilder(LIST_OF_POKEMON){
  for (let i = 0; i < LIST_OF_POKEMON.length; i++) {
    let newNode = card.cloneNode(true);
    newNode.setAttribute("id", `${LIST_OF_POKEMON[i]}-card`);
    cardContainer.appendChild(newNode);
  
    // now we call some function to get the pictures
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${LIST_OF_POKEMON[i].toLowerCase()}`);
    const data = await response.json();

    const images = document.querySelectorAll(".card-img-top");
    images[i].src = data.sprites.front_default;

    //const name = document.querySelectorAll(".card-title");
    //name[i].innerHTML = data.name;

    const buttonLink = document.querySelectorAll(".btn");
    buttonLink[i].innerHTML = data.name;
    buttonLink[i].setAttribute("data-bs-toggle", "modal");
    buttonLink[i].setAttribute("data-bs-target", "#exampleModal"); 
    buttonLink[i].addEventListener("click", () => getPoke(`https://pokeapi.co/api/v2/pokemon/${LIST_OF_POKEMON[i].toLowerCase()}`));
  }
}
pageBuilder(LIST_OF_POKEMON);

async function getPoke(url){
  const response = await fetch(url);
  const data = await response.json();
  
  // Card/pokemon name
  const modalTitle = document.querySelector('#exampleModalLabel');
  modalTitle.innerHTML = data.name;

  // Sprites for the pokemon
  const modalSpriteOne = document.querySelector('#spriteOne');
  const modalSpriteTwo = document.querySelector('#spriteTwo');
  modalSpriteOne.src = data.sprites.front_default;
  modalSpriteTwo.src = data.sprites.back_default;

  // weights and height for pokemon
  const weightContainer = document.querySelector("#weightContainer");
  weightContainer.innerHTML = `Weight: ${data.weight} lbs. | Height: ${data.height} in.`;

  // Get the stats for a pokemon
  let baseStats = [];
  for (let j = 0; j < data.stats.length; j++) {
  baseStats.push(`${data.stats[j].stat.name}: ${data.stats[j].base_stat}`)
  }
  const listGroupItem = document.querySelectorAll(".list-group-item");
  for (let i = 0; i < listGroupItem.length; i++){
    listGroupItem[i].innerHTML = baseStats[i];
  }
  
  // get the type(s) pokemon
  let baseTypes = [];
  for (let j = 0; j < data.types.length; j++){
  baseTypes.push(data.types[j].type.name);
  }
  const typeContainer = document.querySelector("#typeContainer")
  if(baseTypes.length > 1){
    typeContainer.innerHTML = `Pokemon Types: ${baseTypes[0]} | ${baseTypes[1]}`;
  } else {
    typeContainer.innerHTML = `Pokemon Type: ${baseTypes[0]}`;
  }

  // get the pokemon abilities
  let abilities = [];
  let abilitiesDetails = [];
  for (let j = 0; j < data.abilities.length; j++){
    abilities.push(data.abilities[j].ability.name);
    //abilitiesUrl.push(data.abilities[j].ability.url)
    let abilityText = await getAbility(data.abilities[j].ability.url);
    abilitiesDetails.push(abilityText);
  }
  async function getAbility(url){
    let abilityResponse = await fetch(url);
    let abilityData = await abilityResponse.json();
    return abilityData.effect_entries[1].effect;
  }
  const abilitiesContainer = document.querySelector("#abilitiesContainer");
  
  for (let i = 0; i < abilities.length; i++){
    const abilityOne = document.createElement("p");
    abilityOne.innerText = `${abilities[i]}: ${abilitiesDetails[i]}`;
    abilitiesContainer.appendChild(abilityOne);
  }
}