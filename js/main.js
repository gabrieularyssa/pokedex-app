const pokemonsList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 8
let offset = 0
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.types[0]}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${(pokemon.name).toUpperCase()}</span>
        <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type.toUpperCase()}</li>`).join('')}
        </ol>
        <img src=${pokemon.photo} alt=${pokemon.name}>
        </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) { 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        newHtml = pokemons.map(convertPokemonToLi).join('')    
        pokemonsList.innerHTML += newHtml
    })
    .catch((err) => console.log(err))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})


