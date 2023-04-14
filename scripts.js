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

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${randomId}`;

  const [pokemonData, speciesData] = await Promise.all([
    fetchData(pokemonUrl),
    fetchData(speciesUrl)
  ]);

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

randomButton.addEventListener('click', getRandomPokemon);

ñ


