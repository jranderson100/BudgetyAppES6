import DOMstrings from './views/base';
import * as uIController from './views/uIController';
import * as budgetController from './models/budgetController';
import Expense from './models/Expense';
import Income from './models/Income';

/*var test = uIController.formatNumber(34000, 'inc');

console.log(test);
*/

const updateBudget = () => {
  //1. calculate the budget
  budgetController.calculateBudget();

  //2. Return the budget
  let budget = budgetController.getBudget();

  //3. Display the budget on the UI

  uIController.displayBudget(budget);

};

const updatePercentages =  () => {
  //1. Calculate percentages
  budgetController.calculatePercentages();

  //2.Read percentages from the budget controller
  let percentages = budgetController.getPercentages();

  //3. Update the UI with the new percentages
  uIController.displayPercentages(percentages);

};

const ctrlAddItem = () => {
  let input, newItem;

  //1. Get field input data

  input = uIController.getInput();

  // Make sure there is data in input fields

  if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

    //2. Add the item to the budget controller

    newItem = budgetController.addItem(input.type, input.description, input.value);

    //3. Add the item to the UI

    uIController.addListItem(newItem, input.type);

    //4.Clear the fields

    uIController.clearFields();

    //5. calculate and update budget
    updateBudget();

    //6. Calculate and update percentages
    updatePercentages();

  }
};

const ctrlDeleteItem = (event) => {
  let itemID, splitID, type, ID; //returns an array of the string which has now been split at the point we specify

  itemID = event.target.parentNode.parentNode.parentNode.parentNode.id //bad hardcoding

  if (itemID /*is true*/){

    //inc-1
    splitID = itemID.split('-');
    type = splitID[0]
    ID = parseInt(splitID[1]);

    //1. Delete item from the data structure
    budgetController.deleteItem(type, ID);

    //2. Delete the item from the user interface
    uIController.deleteListItem(itemID);

    //3. Update and show the new budget
    updateBudget();

    //4. Calculte and update percentages
    updatePercentages();

  }
};

const setupEventListeners = () => {
//Event Listeners
document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

//key press is a global event so we add the event listener straight to the document object

document.addEventListener('keypress', (event) => {
  if(event.keyCode === 13 || event.which ===13) {
    ctrladdItem();
  }
});

document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);
document.querySelector(DOMstrings.inputType).addEventListener('click', uIController.changedType);

};

const init = () => {
  console.log('Started');
  //DOMstrings.dateLabel = document.querySelector('.budget__title__month');
  uIController.displayMonth();
  uIController.displayBudget({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percentage: -1
  });
setupEventListeners();
};

init();
