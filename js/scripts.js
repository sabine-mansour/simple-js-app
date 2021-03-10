let pokemonRepository = (function(){
  let pokemonList = [
    { name: 'Spearow', height: 3, types: ['Flying']},
    { name: 'Bulbasaur', height: 7, types: ['Monster', 'Grass']},
    { name: 'Squirtle', height: 5, types: ['Monster', 'Water']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item){
    pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add
  };
})();

//forEach Loop iterates each pokemon name  and height.
pokemonRepository.getAll().forEach(function(pokemon) {
  //Conditional checks if a pokemon'height is above average.
  if (pokemon.height > 5) {
    document.write(pokemon.name + " (height: " + pokemon.height +") - Wow, that’s big!<br>" )
  }else{
    document.write(pokemon.name + " (height: " + pokemon.height +")<br>")
  }
});
