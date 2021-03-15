let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (
      typeof item === "object" &&
      "name" in item &&
      "detailsUrl" in item
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

  function loadList () {
    return fetch(apiURL).then(function(response){
      return response.json();
    }).then (function(json){
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList
  };
})();

//forEach Loop iterates each pokemon name
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
