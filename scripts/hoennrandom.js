const fetchHoennPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/generation/3/');
    const data = await response.json();
    const hoennPokemon = data.pokemon_species.map(pokemon => ({
      id: pokemon.url.split('/')[6],
      name: pokemon.name
    }));
    return hoennPokemon;

  }
  
const randomButton = document.querySelector('.random-button');
const card = document.querySelector('.card');
const name = card.querySelector('.name');
const number = card.querySelector('.number');
const type = card.querySelector('.type');
const image = card.querySelector('img');
const height = card.querySelector('.height');
const weight = card.querySelector('.weight');
const description = card.querySelector('.description');
image.style.opacity = 1;

const fetchPokemonData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await response.json();
  return data;
};

const fetchSpeciesData = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await response.json();
  return data;
};

const getRandomHoennPokemon = async () => {
  const hoennPokemon = await fetchHoennPokemon();
  const randomIndex = Math.floor(Math.random() * hoennPokemon.length);
  const randomPokemon = hoennPokemon[randomIndex];
  
  const pokemonData = await fetchPokemonData(randomPokemon.id);
  const speciesData = await fetchSpeciesData(randomPokemon.id);

  name.textContent = pokemonData.name.toUpperCase();
  number.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
  type.textContent = `Tipo: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
  height.textContent = `Altura: ${pokemonData.height/10}m`;
  weight.textContent = `Peso: ${pokemonData.weight/10}kg`;
  const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
  description.textContent = descriptionEntry.flavor_text;

  image.style.opacity = 0;
  image.alt = pokemonData.name;
  image.src = pokemonData.sprites.other["official-artwork"].front_default;
  image.style.opacity = 1;
  
};

randomButton.addEventListener('click', getRandomHoennPokemon);
