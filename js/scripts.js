document.addEventListener('DOMContentLoaded', function () {
    var randomPokemonButton = document.getElementById('randomPokemonButton');
    randomPokemonButton.addEventListener('click', obtenerPokemonAleatorio);

    var searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', buscarPokemon);

    function obtenerPokemonAleatorio() {
        var numeroPokemon = Math.floor(Math.random() * 1016) + 1;
        var url = `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}/`;

        fetchPokemonData(url);
    }

    function buscarPokemon() {
        var searchTerm = document.getElementById('pokemonSearch').value;
        var url;

        if (!isNaN(searchTerm)) {
            url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}/`;
        } else {
            url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}/`;
        }

        fetchPokemonData(url);
    }

    function fetchPokemonData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                mostrarInformacion(data);
                mostrarEvoluciones(data.species.url);
            })
            .catch(error => {
                console.error(error);
                alert('No se pudo encontrar el Pokémon. Verifica el número o nombre.');
            });
    }});

    




