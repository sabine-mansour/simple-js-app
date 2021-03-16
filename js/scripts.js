let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

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
      showDetails(pokemon);
    });
  }

//function fetches list of pokemon from pokeapi
  function loadList() {
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
    });
  }

//function fetches details of pokemons from pokeapi
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }

//function log pokemon details to the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {

      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButton = document.createElement('button');
      closeButton.classList.add('modal-close');
      closeButton.innerText = 'X';
      closeButton.addEventListener('click', function(event){
        hideModal();
      });

      let pokemonName = document.createElement('h2');
      pokemonName.classList.add('modal-title');
      pokemonName.innerText = pokemon.name;

      let pokemonHeight = document.createElement('p');
      pokemonHeight.classList.add('modal-content');
      pokemonHeight.innerText = 'Height: ' + pokemon.height;

      let pokemonPicture = document.createElement('img');
      pokemonPicture.src = pokemon.imageUrl;


      modal.appendChild(closeButton);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonPicture);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  function hideModal() {
  modalContainer.classList.remove('is-visible');
}

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    hideModal: hideModal;
  };
})();

pokemonRepository.loadList().then(function(){
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
