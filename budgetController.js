import DOMstrings from '../views/base';

import Income from './Income.js';
import Expense from './Expense.js';

export let data = {
  allItems: {
    exp: [],
    inc: []
  },
  totals: {
    exp: 0,
    inc: 0
  },
};

export const calculateTotal = (type) => {
  let sum = 0;
  data.allItems[type].forEach(() => {
    sum += cur.value;
  });
  data.totals[type] = sum;
};

export const addItem = (type, des, val) => {
  let newItem, ID;

  //Create new ID

  if (data.allItems[type].length > 0) {
    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
  } else {
    ID = 0;
  }

  //Create new item based on 'inc' or 'exp' type

  if (type === 'exp') {
    newItem = new Expense(ID, des, val);
  } else if (type === 'inc') {
    newItem = new Income(ID, des, val);
  }

  //Push it into our data structure

  data.allItems[type].push(newItem);

  //return the new element
  return newItem;
};

export const deleteItem = (type, id) => {
  let ids, index;


  //create a new array based on allItems[type] then return arrays with current id
  //map similar to array.forEach but map returns an entire new array

  ids = data.allItems[type].map((current) => {
    return current.id;
  });

  //then index of the second array
  index = ids.indexOf(id);

  //then splice an element off the first array using the index we've just discovered

  if (index !== -1) {
    data.allItems[type].splice(id, 1);
  }
};

export const calculateBudget = () => {

  //calculate total income and expenses

  calculateTotal('exp');
  calculateTotal('inc');

  //calculate budget: income - expenses

  data.budget = data.totals.inc - data.totals.exp;

  //calculate the percentage of income that we spend

  if(data.totals.inc > 0 ){
    data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
  } else {
    data.percentage =-1;
  }
};




export const calculatePercentages = () => {
  data.allItems.exp.forEach((cur) => {

    cur.calcPercentage(data.totals.inc);

});
};

export const getPercentages = () => {
  let allPerc = data.allItems.exp.map((cur) => {
    return cur.getPercentage();
  });
  return allPerc;
};

export const getBudget = () => {
  //return an object

  return {
    budget: data.budget,
    totalInc: data.totals.inc,
    totalExp: data.totals.exp,
    percentage: data.percentage
  }
};
