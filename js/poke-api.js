const pokeApi = {}

function convertPokeApiDetalToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json())
   .then(convertPokeApiDetalToPokemon)
} 

pokeApi.getPokemons = (offset = 0, limit =5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())

        .then((responseBody) =>  {
            const pokemons = responseBody.results;
            // console.log(pokemonList)
            return pokemons
        })
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))

        .then((detailResquests) => Promise.all(detailResquests))

        .then((pokemonDetails) => pokemonDetails)
        
        .catch((err) => (console.error(err))
        )}
