/** 
 * @desc Calculator project is part of The Odin Project
 *       for learning basic web development
 * @author Phong 
 * date: 2021/xx/xx
 */

// =================== CONSTANTS, GLOBAL ===============
const buttons = Array.from(document.querySelectorAll('.btn'));
const numberButtons = buttons.filter(numButton => !(isNaN(numButton.textContent)));
const mathButtons = Array.from(document.querySelectorAll('.operator')); // + - x /
const equalButton = document.querySelector('.equal-sign');
const clearButton = document.querySelector('.clear');
const backSpaceButton = document.querySelector('.backspace');
const displayScreen = document.querySelector('.display-text');

const MATH_KEYS = ['+', '-', '*', '/'];
const SPECIAL_KEYS = ['AC', 'C'];

let savedUserInputs = []; // empty array to save whatever user is clicked
let displayValue = '0';

let firstNums = [];
let secondNums = [];
let firstOperand = null;
let secondOperand = null;
let operator = null;
let isOperated = false;

// =================== Operator math functions ===============
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(...nums) {
    return nums.reduce((multiply, num) => multiply *= num, 1);
}

function divide(dividend, divisor) {
    if (0 == divisor) {
        throw new Error("Oops! Cannot divide by zero.");
    }
    let quotient = dividend / divisor;
    return quotient;
}

// lacking of percent operator
// function percent(num)
/**
 * Operate function to call for each number
 */
function operate(x, y, math) {
    //converting from string to integer
    x = parseInt(x);
    y = parseInt(y);
    let result = 0;
    //evalutate to call the right operation 
    switch (math) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case 'x':
            result = multiply(x, y);
            break;
        case '÷':
            result = divide(x, y);
            break;
        case '%':
            result = divide(x, y);
            break;
        default:
            break;
    }
    return result;
}

// =================== Functions for the Buttons ===============
// update display screen with a string
function updateDisplay(text) {
    if (firstNums.length == 0 && secondNums.length == 0) {
        text = 0;
    }
    if (text !== null) {
        displayScreen.textContent = text.toString();
    }
    if (displayScreen.textContent.length > 13) {
        displayScreen.textContent = text.substring(0, 13);
    }

}

function clear() {
    displayScreen.textContent = '0';
    clearButton.style.backgroundColor = '#525252';
    clearButton.style.color = '#fafafa';
    firstNums = [];
    secondNums = [];
    operator = null;
}
// checking if we have the first number
// ======== SETTERS =========
function setFirstOperand(x) {
    firstNums.push(x);
}

function setSecondOperand(y) {
    secondNums.push(y);
}

function setOperator(op) {
    operator = op.toLowerCase();
}

// ======== GETTERS =========
function getFirstOperand() {
    if (firstNums.length > 0) {
        return firstNums.join('');
    }
    return null;
}

function getSecondOperand() {
    if (secondNums.length > 0) {
        return secondNums.join('');
    }
    return null;
}

function getOperator() {
    return operator;
}

// =================== Adding Event Listener ===============

// --------------- NUMBERS ------------
numberButtons.forEach(b => b.addEventListener('click',
    (e) => {
        //when there is no operator, or first operator, it is the first operand
        if (getOperator() == null) {
            if (isOperated) {
                firstNums = [];
                isOperated = false;
            }
            setFirstOperand(e.target.textContent);
            updateDisplay(getFirstOperand());
            console.log('opetator is null')
        } else {
            setSecondOperand(e.target.textContent);
            updateDisplay(getSecondOperand());
            console.log('opetator is not null')
        }
    }));

// when a math operator is clicked
// only + is on operation
// --------------- MATHS ------------
mathButtons.forEach(mathButton => mathButton.addEventListener('click',
    (e) => {
        // when there is an exist operator
        if (getOperator() !== null) {
            // console.log(getFirstOperand());
            // console.log(getSecondOperand());
            // when the second number is set, 
            // and when the operator is clicked one more time
            if (getSecondOperand() !== null) {
                let result = operate(getFirstOperand(), getSecondOperand(), getOperator());
                firstNums = [];
                secondNums = [];
                setFirstOperand(result);
                updateDisplay(result);
                isOperated = true;
            }
            setOperator(e.target.textContent);
        } else {
            //when operator is never saved, then initialize it
            setOperator(e.target.textContent);
            updateDisplay(getFirstOperand());
            // console.log('----> set operator for the first time <----');
        }
    }));

// --------------- EQUAL SIGN ------------
equalButton.addEventListener('click', equalSignPressed);

function equalSignPressed() {
    // when ther are all requirements
    if (getFirstOperand() !== null &&
        getSecondOperand() !== null &&
        getOperator() !== null) {
        let result = operate(getFirstOperand(), getSecondOperand(), getOperator());
        firstNums = [];
        secondNums = [];
        operator = null;
        setFirstOperand(result);
        updateDisplay(result);
        isOperated = true;
    } else {
        return;
    }
}

// --------------- CLEAR ALL ------------
clearButton.addEventListener('click', clear);

// --------------- BACK SPACE ------------
backSpaceButton.addEventListener('click', function () {
    if (secondNums.length > 0) {
        secondNums.pop();
        updateDisplay(getSecondOperand());
    } else {
        firstNums.pop();
        updateDisplay(getFirstOperand());
    }
    console.log(firstNums);
    console.log(firstNums);
});

// window.addEventListener('keydown', displayText);

// =================== SANDBOX ===============
// console.log(operate(100, 5, multiply));

updateDisplay(displayValue);