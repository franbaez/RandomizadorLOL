const randomButton = document.querySelector('.random-button');
const card = document.querySelector('.card');
const name = card.querySelector('.name');
const number = card.querySelector('.number');
const type = card.querySelector('.type');
const image = card.querySelector('img');

function getRandomPokemon(){
    const randomId = Math.floor(Math.random() * 898) + 1; // Genera un id aleatorio entre 1 y 898
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Actualiza la información de la tarjeta con el Pokemon aleatorio
          name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          number.textContent = `#${data.id.toString().padStart(3, '0')}`;
          type.textContent = `Type: ${data.types.map(type => type.type.name).join(', ')}`;
          image.src = data.sprites.front_default;
          image.alt = data.name;
})
.catch(error => console.log(error));
}
randomButton.addEventListener('click', getRandomPokemon);