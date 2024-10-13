/*
    Lógica de Programação

    [x] Pegar a informação do Input, quando o botão for clicado
    [x] Ir até a API, e trazer as receitas
    [x] Colocar as receitas na Tela
    [x] Saber quando o usúario clicou na receita
    [x] Buscar informações da receita individual na API
    [] Colocar a receita individual na tela
*/

const form = document.querySelector('.search-form')
const recipeList = document.querySelector('.recipe-list')
const recipeDetails = document.querySelector('.recipe-delails')

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value

    searchRecipes(inputValue)
})

async function searchRecipes(ingredient) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    )
    const data = await response.json()
    showRecipes(data.meals)
}

function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map(
        (item) => `
        <div class="recipe-card" onclick="getRecipesDetails(${item.idMeal})">
            <img src="${item.strMealThumb}" alt="receita-foto">
            <h3>${item.strMeal}</h3>
        </div>
        `
    ).join('')
}

async function getRecipesDetails(id){
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
    const data = await response.json()
    const recipe = data.meals[0]

    console.log(recipe)

    let ingredients = ''

    for(let i = 1; i <= 20; i++){
        if(recipe[`strMeasure1${i}`]){
            ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]} </li>`
        } else {
            break;
        }
    }

    recipeDetails.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt=${recipe.strMeal} class="recipe-img">
        <h3>Categoria: ${recipe.strCategory}</h3>
        <h3>Origim: ${recipe.strArea}</h3>
        <h3>Ingredientes:</h3>
        <ul>${ingredients}</ul>
        <h3>Instruções:</h3>
        <p>${recipe.strInstructions}</p>
        <p>Tags: ${recipe.strTags}</p>
        <p>Vídeo: <a href="${recipe.strYoutube}" target="_blank">Assista no YouTube</a></p>

    `
}
