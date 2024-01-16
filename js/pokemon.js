function mostrarInformacion(pokemon) {
    document.getElementById('pokemonNumber').textContent = `#${pokemon.id}`;
    document.getElementById('pokemonName').textContent = ` ${pokemon.name.toUpperCase()}`;
    document.getElementById('pokemonImage').src = pokemon.sprites.other["official-artwork"].front_default;
    
    fetch(pokemon.species.url)
        .then(response => response.json())
        .then(speciesData => {
            const description = speciesData.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text;
            document.getElementById('pokemonDescription').textContent = `Descripción: ${description}`;
        });
        document.querySelector(".btn-primary").classList.add("visible");
        document.getElementById('pokemonNumber').classList.add("visible");
        document.getElementById('pokemonName').classList.add("visible");
        document.getElementById('pokemonImage').classList.add("visible");
        document.getElementById('pokemonDescription').classList.add("visible");


    }

function mostrarEvoluciones(speciesUrl) {
    // Limpiar evoluciones anteriores
    document.getElementById('pokemonEvolutions').innerHTML = '';

    fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
            const evolutionChainUrl = speciesData.evolution_chain.url;
            fetch(evolutionChainUrl)
                .then(response => response.json())
                .then(evolutionChainData => {
                    if (evolutionChainData.chain.evolves_to.length === 0) {
                        const noEvolutionsElement = document.createElement('p');
                        noEvolutionsElement.textContent = 'Este Pokémon no tiene evoluciones.';
                        document.getElementById('pokemonEvolutions').appendChild(noEvolutionsElement);
                    } else {
                        mostrarEvolucionesRecursivo(evolutionChainData.chain);
                    }
                });
        });
}

function mostrarEvolucionesRecursivo(evolution) {
    const evolutionDetails = evolution.evolution_details[0];
    const evolutionText = `${evolution.species.name.toUpperCase()} ${evolutionDetails ? `${evolutionDetails.item ? 'Usando ' + evolutionDetails.item.name : ''}` : ''}`;

    const evolutionContainer = document.createElement('div');
    evolutionContainer.classList.add('evolution-container');

    fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}/`)
        .then(response => response.json())
        .then(evolutionPokemonData => {
            const evolutionImage = document.createElement('img');
            evolutionImage.src = evolutionPokemonData.sprites.front_default;
            evolutionContainer.appendChild(evolutionImage);

            const evolutionTextElement = document.createElement('p');
            evolutionTextElement.textContent = evolutionText;
            evolutionContainer.appendChild(evolutionTextElement);

            document.getElementById('pokemonEvolutions').appendChild(evolutionContainer);
            document.getElementById('pokemonEvolutions').classList.add("visible");

        })
        .catch(error => {
            console.error(error);
            evolutionContainer.textContent = `Error al cargar la información de la evolución: ${evolution.species.name}`;
        });

    if (evolution.evolves_to && evolution.evolves_to.length > 0) {
        evolution.evolves_to.forEach(subEvolution => mostrarEvolucionesRecursivo(subEvolution));
    }
}
