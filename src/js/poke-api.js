
String.prototype.capitalize = function (){
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

function getPokemonInfo(pokemon){

    const pkm = new Pokemon()
    pkm.number = pokemon.id
    pkm.name = pokemon.name.capitalize()
    pkm.type = pokemon.type
    pkm.height = pokemon.height
    pkm.weight = pokemon.weight
    pkm.types = pokemon.types
    pkm.type = pokemon.types[0]
    pkm.base = pokemon.stats
    pkm.region = pokemon.region

    return pkm
    
}

const fetchPokemon = async (pokemon) =>{
    
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then((response) => response.json())
                .then(getPokemonInfo)
}
