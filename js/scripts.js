//Selecciono los elementos del DOM mediante clases
const pokeCard = document.querySelector('.poke-card');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeImagecontainer = document.querySelector('.image-container');
const pokeImg = document.querySelector('.poke-img');
const pokeTypes = document.querySelector('.poke-types');
const pokeDescription = document.querySelector('.poke-description');
const pokeStats = document.querySelector('.poke-stats');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');

//Creo una constante con los colores que se le asignaran a cada tipo de pokemon
const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

//Creo una funcion que usa la PokeAPI para traer la informacion de los pokemon
const searchPokemon = event => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(pokemonData => {
      fetch(pokemonData.species.url)
        .then(data => data.json())
        .then(speciesData => {
          const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text;
          pokemonData.description = description;
          renderPokemonData(pokemonData);
        });
    });
}

//Creo la funcion que me renderiza  los datos del pokemon que traje anteriormente de la api
const renderPokemonData = data => {
  const sprite = data.sprites.other["official-artwork"].front_default;
  const { stats, types, description} = data;
  console.log(data);
  pokeName.textContent = data.name.toUpperCase();
  pokeId.textContent =`# ${data.id}`;
  pokeImg.setAttribute('src', sprite);
  pokeHeight.textContent = ` Altura: ${data.height/10}m`;
  pokeWeight.textContent = ` Peso: ${data.weight/10}kg`;
  pokeDescription.textContent = description; // <-- Agregado para mostrar la descripción
  renderPokemonTypes(types);
  renderPokemonStats(stats);
}


//Funcion que renderiza los tipos de pokemon y les da un color.
const renderPokemonTypes = types => {
  pokeTypes.innerHTML = '';
  types.forEach(type => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name.toUpperCase();
    pokeTypes.appendChild(typeTextElement);
  });
}

//Funcion que renderiza las Stats del pokemon.
const renderPokemonStats = stats => {
  pokeStats.innerHTML = '';
  stats.forEach(stat =>{
    const StatElement = document.createElement("div");
    const StatElementName = document.createElement("div");
    const StatElementAmount = document.createElement("div");
    StatElementName.textContent = stat.stat.name.toUpperCase();
    StatElementAmount.textContent = stat.base_stat;
    StatElement.appendChild(StatElementName);
    StatElement.appendChild(StatElementAmount);
    pokeStats.appendChild(StatElement);
  })
}
