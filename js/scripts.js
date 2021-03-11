let pokemonRepository = (function(){
  let pokemonList = [
    { name: 'Spearow', height: 3, types: ['Flying']},
    { name: 'Bulbasaur', height: 7, types: ['Monster', 'Grass']},
    { name: 'Squirtle', height: 5, types: ['Monster', 'Water']}
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (
      typeof item === "object" &&
      "name" in item &&
      "height" in item &&
      "types" in item
    ) {
        pokemonList.push(item);
      } else {
        console.log("pokemon is not correct");
      }
  }

  function addListItem(pokemon) {
    let container = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    container.appendChild(listItem);
    button.addEventListener('click', function(event){
      showDetails(pokemon.name);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

//forEach Loop iterates each pokemon name
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
