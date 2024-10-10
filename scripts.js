/*
    Lógica de Programação

    [x] Pegar a informação do Input, quando o botão for clicado
    [x] Ir até a API, e trazer as receitas
    [] Colocar as receitas na Tela
    [] Saber quando o usúario clicou na receita
    [] Buscar informações da receita individual na API
    [] Colocar a receita individual na tela
*/

const form = document.querySelector('.search-form')
const recipeList = document.querySelector('.recipe-list')

form.addEventListener('submit', function(event){
    event.preventDefault()
    const inputValue = event.target[0].value

    searchRecipes(inputValue)
})

async function searchRecipes(ingredient){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()

    console.log(data)
}

function showRecipes(recipes){
    recipes.map(element => {

    })
}