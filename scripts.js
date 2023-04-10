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

const getRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${randomId}`;

  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(apiUrl),
      fetch(speciesUrl)
    ]);

    const pokemonData = await pokemonResponse.json();
    const speciesData = await speciesResponse.json();

    name.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    number.textContent = `#${pokemonData.id.toString().padStart(3, '0')}`;
    type.textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;
    height.textContent = `Altura: ${pokemonData.height/10}m`;
    weight.textContent = `Peso: ${pokemonData.weight/10}kg`;
    const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
    description.textContent = descriptionEntry.flavor_text;

    image.style.opacity = 0;
    image.alt = pokemonData.name;
    image.src = pokemonData.sprites.other["official-artwork"].front_default;
    image.style.opacity = 1;
  } catch (error) {
    console.log(error);
  }
};

randomButton.addEventListener('click', getRandomPokemon);

