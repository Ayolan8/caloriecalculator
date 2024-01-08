const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let changeBg = document.getElementById("changeBg");


isError = true;

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return  str.replace(regex, '');
}

function isInvalidInput(str){
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">
    Entry ${entryNumber} Name </label>
    <input type="text"
    id="${entryDropdown.value}-${entryNumber}-name"
    placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calorie">
    Entry ${entryNumber} Calorie </label>
    <input type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calorie"
    placeholder="Calorie" />`;

    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalorie(e) {
    e.preventDefault();
    isError = false;

    const breakfastNumberInput = document.querySelectorAll('#breakfast input[type="number"]');
    const lunchNumberInput = document.querySelectorAll('#lunch input[type="number"]');
    const dinnerNumberInput = document.querySelectorAll('#dinner input[type="number"]');
    const snacksNumberInput = document.querySelectorAll('#snacks input[type="number"]');
    const exerciseNumberInput = document.querySelectorAll('#exercise input[type="number"]');


    const breakfastCalories = getCalorieBudget(breakfastNumberInput);
    const lunchCalories = getCalorieBudget(lunchNumberInput);
    const dinnerCalories = getCalorieBudget(dinnerNumberInput);
    const snacksCalories = getCalorieBudget(snacksNumberInput);
    const exerciseCalories = getCalorieBudget(exerciseNumberInput);
    const budgetCalories = getCalorieBudget([budgetNumberInput]);

    if (isError){
        return;
    }

    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories > 0 ? 'surplus' : 'deficit';

    output.innerHTML = `<span class="${surplusOrDeficit.toLocaleLowerCase()}">
    ${Math.abs(remainingCalories)} Calories ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`;
    
    output.classList.remove('hide');
}

function getCalorieBudget(list) {
    let calories = 0;

    for(let i = 0; i < list.length; i++) {
        let currVal = cleanInputString(list[i].value);
        let invalidInputMatch = isInvalidInput(currVal);
        
        if (invalidInputMatch){
            alert(`Invalid Input ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}

function clear(){
    const inputContainer = Array.from(document.querySelectorAll('.input-container'));

    for(let i=0; i < inputContainer.length; i++){
        inputContainer[i].innerHTML = '';
    }
    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add('hide');
}

// changing the background color to either white or dark mode
const buttonText = ["Toggle Light Mode", "Toggle Dark Mode"];

function toggleBgColor(){
    let bgColor = document.body;
    let change = bgColor.classList.toggle('light-mode');
    if (changeBg.innerText == buttonText[0]){
        changeBg.innerText = buttonText[1];
        changeBg.style.backgroundColor = "black";
        changeBg.style.color = "white";
    }else{
        changeBg.innerText = buttonText[0];
        changeBg.style.backgroundColor = "white";
        changeBg.style.color = "black";
    }
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter>addEventListener("submit", calculateCalorie);
clearButton.addEventListener("click", clear);
lightOrDark.addEventListener("click", changeColor);