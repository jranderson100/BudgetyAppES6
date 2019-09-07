import DOMstrings from './base';








export const formatNumber = (num, type) => {
  //this may be a const
  let numSplit, int, dec, exp, sign;
  let type2 = type;
  //let type2 = type; is my own addition, as is declaring let sign
  num = Math.abs(num);
  num = num.toFixed(2);

  numSplit = num.split('.');

  int = numSplit[0];

  if (int.length > 3) {
    int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
  }

  dec = numSplit[1];

  type === 'exp' ? sign = '-' : sign = '+';

  return (type === 'exp' ? '-' : '+') + '' + int + '.' + dec;
};

export const nodeListForEach = (list, callback) => {
  for (var i = 0; i < list.length; i++) {
    callback(list[i], i);
  }
};

export const getInput = () => {
  return {
    type: document.querySelector(DOMstrings.inputType).value, //will be either 'inc' or 'exp'
    description: document.querySelector(DOMstrings.inputDescription).value,
    value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //parseFloat converts from a string to a number so we can do more stuff with it
  };
};

export const addListItem = (obj, type) =>  {
  let html, newHtml, element;
  //create HTML string with placeholder text

  if (type === 'inc') {
    element  = DOMstrings.incomeContainer;
    '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  } else if (type === 'exp') {
    element = DOMstrings.expensesContainer;
    html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
  }
//replace the placeholder HTML with some actual data structure
newHtml = html.replace('%id', obj.id);
newHtml = html.replace('%description%', obj.description);
newHtml = html.replace('%value%', formatNumber(obj.value, type));

//insert the new HTML into the DOM
document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
};

export const deleteListItem = (selectorID) => {
  let el = document.getElementById(selectorID);
  el.parentNode.removeChild(el);
};

export const clearFields = () => {
  fieldsArray = Array.from(document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue));

  fieldsArray.forEach((current, index, array) => {
    current.value = '';
  });

  fieldsArray[0].focus();
};

export const displayBudget = (obj) => {
let type;

obj.budget > 0 ? type = 'inc' : type = 'exp';

document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

if(obj.percentage > 0) {
  document.querySelector(DOMstrings.percentageLabel).textContent = `${obj.percentage}%`;
} else {
  document.querySelector(DOMstrings.percentageLabel).textContent = '---';
}
};

export const displayPercentages = (percentages) => {

//the below returns a node list
  let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

  nodeListForEach(fields, (current, index) => {
    if (percentages[index] > 0) {
      current.textContent = percentages[index] + '%';
    } else {
      current.textContent = '---';
    }
  });
};

  export let displayMonth = () => {
    let now, year, month, months;

    now = new Date();
    //var christmas = new Date (2019, 11, 25)

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    month = now.getMonth();

    year = now.getFullYear();

    document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
  };

  export const changedType = () => {
    var fields = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

    nodeListforEach(fields, (cur) => cur.classList.toggle('red-focus'));

    document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
  };
