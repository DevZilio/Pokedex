// Criando a funcao para usar o API de banco de dados dos Pokemons

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => {

    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //o uso do await e para que quando for executar o fetch buscando a informacao no site, ele aguarde ate a resposta ser enviada. Obrigatorio incluir "async" na funcao.


    if (APIReponse.status === 200) { //este If e para evitar o erro de tentar procurar um dado no banco de dados Json e nao encontar, como escrever o nome do pokemon errado ou algo aleatorio.
        const data = await APIReponse.json(); //Os dados no site esta em formato json, entao devemos informar dentro da funcao para que o dado seja recolhido

        return data;
    }
}

const renderPokemon = async(pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';

    }
}


// Funcao para pegar o escrito no Input e pesquisar no api para trazer a informacao desejeda


form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649)
        searchPokemon += 1;
    renderPokemon(searchPokemon)

});

renderPokemon(searchPokemon);