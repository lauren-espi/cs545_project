document.getElementById('add-ingredient').addEventListener('click', function (e) {
    e.preventDefault();
    const ingredientInput = document.getElementById('ingredients');
    const ingredientList = document.createElement('ul');
    ingredientList.id = 'ingredient-list';

    if (!document.getElementById('ingredient-list')) {
        ingredientInput.insertAdjacentElement('afterend', ingredientList);
    }

    const newIngredient = document.createElement('li');
    newIngredient.textContent = ingredientInput.value;
    document.getElementById('ingredient-list').appendChild(newIngredient);
    ingredientInput.value = ''; // Clear the input field
});
