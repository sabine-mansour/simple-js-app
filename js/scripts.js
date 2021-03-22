let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    let container = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("list-group-item-action");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-block");
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target', '#pokemonModal');
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


    function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

//function log pokemon details to the console
function showDetails(pokemon) {

  loadDetails(pokemon).then(function () {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr("src", pokemon.imageUrl);
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>");

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);

  });
}

window.addEventListener('keydown', function(e) {
  if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
    hideModal();
  }
});

modalContainer.addEventListener('click', function(e) {
  let target = e.target;
  if (target === modalContainer) {
    hideModal()
  }
});

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function(){
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});
