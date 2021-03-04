let pokemonList = [
  { name: 'Spearow', height: 3, types: ['Flying']},
  { name: 'Bulbasaur', height: 7, types: ['Monster', 'Grass']},
  { name: 'Squirtle', height: 5, types: ['Monster', 'Water']}
];

//Loop iterates each pokemon name  and height.
for (let i=0; i < pokemonList.length; i++){
  //Conditional checks if a pokemon'height is above average.
  if (pokemonList[i].height > 5){
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +") - Wow, that’s big!<br>")
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height +")<br>")
  }
}
