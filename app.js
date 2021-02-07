const searchItem = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealContainer = document.querySelector('.meal-containers');
const gredientClose = document.getElementById('ingredientCloseBtn');



function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Ingredient</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Can't match any item";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>About:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    mealContainer.innerHTML = html;
    mealContainer.parentElement.classList.add('showRecipe');
}


searchItem.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
gredientClose.addEventListener('click', () => {
mealContainer.parentElement.classList.remove('showRecipe');
});