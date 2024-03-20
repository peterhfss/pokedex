let pokemonNumber = document.getElementById('pkm-number')
let pokemonName = document.getElementById('pkm-name')
let pokemonHeight = document.getElementById('pkm-height')
let pokemonWeight = document.getElementById('pkm-weight')
let pokemonRegion = document.getElementById('pkm-region')
let pokemonImage = document.getElementById('pkm-image')
let pokemonContainerTypes = document.getElementById('container-types')
let pokemonHPStat = document.getElementById('hp-stat')
let pokemonAttackStat = document.getElementById('attack-stat')
let pokemonDefenseStat = document.getElementById('defense-stat')
let pokemonSPAttackStat = document.getElementById('sp-attack-stat')
let pokemonSPDefenseStat = document.getElementById('sp-defense-stat')
let pokemonSpeedStat = document.getElementById('speed-stat')

let btnPrevious = document.getElementById('btn-prev')
let btnNext = document.getElementById('btn-next')
let formSearch = document.getElementById('form-search')
let input = document.getElementById('input-search-pokemon')

let body = document.querySelector('body');

let searchPokemon = 1;

const renderPokemon = async(pokemon) => {

     const colorThief = new ColorThief();

     const pkm = await fetchPokemon(pokemon)
     let pkmImageName = ('00' + pkm.number).slice(-3) + (pkm.name) + '.png';
     let pkmLocation = 'Kanto'
     const currentPokemon = {...pkm, avatar:pkmImageName, region: pkmLocation} 

     searchPokemon = currentPokemon.number

     // First Column
     pokemonNumber.innerHTML = `#${currentPokemon.avatar.slice(0,3)}`;
     pokemonName.innerHTML = currentPokemon.name;
     pokemonHeight.innerHTML = `${(currentPokemon.height/10)}m`;
     pokemonWeight.innerHTML = `${(currentPokemon.weight/10)}kg`;
     pokemonRegion.innerHTML = currentPokemon.region;

     

     // Second Column
     pokemonImage.src = `./assets/images/pokemons/${currentPokemon.avatar}`;
     pokemonImage.alt = currentPokemon.name;

     // carrega a cor predominante da imagem do pokémon atual

     pokemonImage.addEventListener('load', function(){
     let color = colorThief.getColor(pokemonImage);
     body.style.background = `rgb(${color[0]},${color[1]},${color[2]} )`
     });
     

     // Third Column
     pokemonContainerTypes.innerHTML= "";
     currentPokemon.types.map((type) =>{
          let pkmType = (type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1));
          let pokemonType = document.createElement('img');
          pokemonType.src= `./assets/images/types/${pkmType}.png`;
          pokemonType.id = 'pkm-type';
          pokemonType.alt = pkmType;
          pokemonContainerTypes.appendChild(pokemonType);
     });

     pokemonHPStat.innerHTML = currentPokemon.base[0].base_stat
     pokemonAttackStat.innerHTML = currentPokemon.base[1].base_stat
     pokemonDefenseStat.innerHTML = currentPokemon.base[2].base_stat
     pokemonSPAttackStat.innerHTML = currentPokemon.base[3].base_stat
     pokemonSPDefenseStat.innerHTML = currentPokemon.base[4].base_stat
     pokemonSpeedStat.innerHTML = currentPokemon.base[5].base_stat

}

formSearch.addEventListener('submit' , (event)=>{
     event.preventDefault();
     renderPokemon(input.value)
     input.value = ''
})

btnPrevious.addEventListener('click', ()=>{
     if (searchPokemon > 1){

          searchPokemon -= 1
          renderPokemon(searchPokemon)
     }
})

btnNext.addEventListener('click', ()=>{
     searchPokemon +=1
     renderPokemon(searchPokemon)
 });

renderPokemon(searchPokemon)
