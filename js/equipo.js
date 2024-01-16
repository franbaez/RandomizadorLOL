// Variables para gestionar la lista de Pokémon del equipo
var team = [];
var teamElement = document.querySelector(".team-list"); // Selecciona el elemento con la clase .team-list

// Función para obtener los datos del Pokémon seleccionado
function getPokemonData() {
  // Obtiene el nombre del Pokémon seleccionado
  var name = document.querySelector("#pokemonName").textContent; // Selecciona por el ID del elemento

  // Obtiene la imagen del Pokémon seleccionado
  var image = document.querySelector("#pokemonImage").src; // Selecciona por el ID del elemento

  // Devuelve un objeto JSON con los datos del Pokémon
  return {
    name: name,
    image: image
   }};


// Función para obtener los datos del Pokémon seleccionado
function getPokemonData() {
  // Obtiene el nombre del Pokémon seleccionado
  var name = document.querySelector("#pokemonName").textContent;
  var image = document.querySelector("#pokemonImage").src;
  // Devuelve el nombre del Pokémon
  return {
    name: name,
    image: image
  };
}

// Función para agregar un Pokémon al equipo
function addPokemonToTeam() {
  // Obtiene los datos del Pokémon a agregar
  document.querySelector(".team-list").classList.add("visible");
  document.querySelector(".btn-borrar").classList.add("visible");

  var pokemonData = getPokemonData();

  // Verifica si el equipo está completo
  if (team.length >= 6) {
    alert("La lista de equipo está completa. No se puede agregar más Pokémon.");
    return;
  }

  // Verifica si el Pokémon ya está en el equipo
  if (team.some(p => p.name === pokemonData.name)) {
    alert("El Pokémon ya está en el equipo.");
    return;
  }

  // Agrega el Pokémon al equipo
  team.push({
    name: pokemonData.name,
    image: pokemonData.image
  });

  // Actualiza la lista de equipo en la página
  updateTeamList();
}

// Función para actualizar la lista de equipo en la página
function updateTeamList() {
  // Limpia el contenido del elemento .team-list
  teamElement.innerHTML = "";

// Agrega los elementos a la lista de equipo
team.forEach(pokemon => {
  var teamItem = document.createElement("li");

  // Agrega el sprite del Pokémon
  var spriteElement = document.createElement("img");
  spriteElement.src = pokemon.image;
  spriteElement.classList.add("pokemon-sprite");
  teamItem.appendChild(spriteElement);

  // Agrega el nombre del Pokémon
  var nameElement = document.createElement("p");
  nameElement.textContent = pokemon.name;
  nameElement.classList.add("text-white");
  teamItem.appendChild(nameElement);
  teamElement.appendChild(teamItem);
});
}

// Agrega el evento de clic al botón "Agregar a equipo"
document.querySelector(".card .btn-primary").addEventListener('click', addPokemonToTeam);

function clearTeam() {
  document.querySelector(".team-list").classList.remove("visible");
  document.querySelector(".btn-borrar").classList.remove("visible");
  team = [];
  updateTeamList();
}