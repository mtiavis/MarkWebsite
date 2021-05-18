const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
   const key = e.target;
   const action = key.dataset.action;
   const keyContent = key.textContent;
   const displayedNum = display.textContent;
   const previousKeyType = calculator.dataset.previousKeyType;
   Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'));
   if (!action) {
   console.log('number key!');
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
      display.textContent = keyContent;
      calculator.dataset.previousKeyType = 'number';
    }
    else {
      display.textContent = displayedNum + keyContent;
    }
   }
   if (
   action === 'add' ||
   action === 'subtract' ||
   action === 'multiply' ||
   action === 'divide'
  )  {
     console.log('operator key!');
     key.classList.add('is-depressed');
     calculator.dataset.previousKeyType = 'operator';
     calculator.dataset.firstValue = displayedNum;
     calculator.dataset.operator = action;
  }
    if (action === 'decimal') {
    console.log('decimal key!');
      if (displayedNum.includes('.')) {
      }
      else {
        display.textContent = displayedNum + '.';
      }
      if (previousKeyType === 'operator') {
      display.textContent = '0.';
      }
    calculator.dataset.previousKeyType = 'decimal';
    }

    if (action === 'clear') {
    console.log('clear key!');
    display.textContent = '0';
    calculator.dataset.firstValue = void(0);
    calculator.dataset.operator = void(0);
    calculator.dataset.secondValue = void(0);
    calculator.dataset.previousKeyType = 'clear';
    }

    if (action === 'calculate') {
    console.log('equal key!');
    if (previousKeyType === 'calculate') {
      const firstValue = displayedNum;
      const operator = calculator.dataset.operator;
      const secondValue = calculator.dataset.secondValue;
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = 'calculate'
    }
      else if (calculator.dataset.operator === void(0)) {
      }
      else {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      calculator.dataset.secondValue = displayedNum;
      secondValue = calculator.dataset.secondValue;
      console.log(calculate(firstValue, operator, secondValue));
      display.textContent = calculate(firstValue, operator, secondValue);
      calculator.dataset.previousKeyType = 'calculate'
      }
    }

 }
})
function calculate(n1, operator, n2) {
  var result = '0';
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  return result
}
