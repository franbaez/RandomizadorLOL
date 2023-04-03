const card = document.querySelector('.card');
const name = card.querySelector('.name');
const number = card.querySelector('.number');
const type = card.querySelector('.type');
const image = card.querySelector('img');

// Hacemos una solicitud a la API para obtener los datos del Pokémon
fetch('https://pokeapi.co/api/v2/pokemon/104/')
  .then(response => response.json())
  .then(data => {
    // Convertimos la primera letra del nombre a mayúscula
    const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.substring(1);
    
    // Actualizamos la información de la tarjeta con los datos del Pokémon
    name.textContent = capitalizedName;
    number.textContent = `#${data.id}`;
    type.textContent = `Tipo: ${data.types.map(type => type.type.name).join(', ')}`;
    image.src = data.sprites.versions["generation-v"]["black-white" ].animated.front_default;
  })
  .catch(error => console.error(error));
