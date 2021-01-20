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
const decimalButton = document.querySelector('.decimal');
const equalButton = document.querySelector('.equal-sign');
const clearButton = document.querySelector('.clear');
const backSpaceButton = document.querySelector('.backspace');
const displayScreen = document.querySelector('.display-text');
const message = document.querySelector('.message');
const chechBox = document.querySelector('#checkBox');
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];
const calculatoContainer = document.querySelector('.calculator-container');

let firstNums = [];
let secondNums = [];
let firstOperand = null;
let secondOperand = null;
let operator = null;
let isOperated = false;
let currentOperand = null;
let isEqualClicked = false;

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
        return 0;
    }
    let quotient = dividend / divisor;
    return quotient;
}

// percentage
function percentage(x, y) {
    if (x == null) {
        return y / 100;
    } else {
        return x / 100;
    }
}
/**
 * Operate function to call for each number
 */
function operate(x, y, math) {
    //converting from string to integer
    x = parseFloat(x);
    y = parseFloat(y);
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
            if (y != 0) {
                result = divide(x, y);
            } else {
                result = 0;
                setMessage('Can not divided by 0');
            }
            break;
        case '%':
            result = percentage(x, y);
            break;
        default:
            break;
    }
    result = Math.round((result + Number.EPSILON) * 100) / 100;
    return result;
}

// =================== Functions for the Buttons ===============
// update display screen with a string
function updateDisplay(text) {
    if (firstNums.length == 0 && secondNums.length == 0) {
        if (text != '0.') {
            text = 0;
        }
    }
    if (text !== null) {
        displayScreen.textContent = text.toString();
    }
    if (displayScreen.textContent.length > 13) {
        displayScreen.textContent = text.substring(0, 13);
    }
}

// clear function
function clear() {
    setMessage('');
    firstNums = [];
    secondNums = [];
    firstOperand = null;
    secondOperand = null;
    operator = null;
    isOperated = false;
    currentOperand = null;
    isEqualClicked = false;
    updateDisplay('0');
}

// when equal is pressed
function equalSignPressed() {
    setMessage('');
    // when ther are all requirements
    if (getFirstOperand() !== null &&
        getSecondOperand() !== null &&
        getOperator() !== null) {
        let result = operate(getFirstOperand(), getSecondOperand(), getOperator());
        firstNums = [];
        secondNums = [];
        operator = null;
        setFirstOperand(result);
        isOperated = true;
        isEqualClicked = true;
    } else {
        return;
    }
}

// deleting 
function backSpace() {
    if (isEqualClicked) {
        clear();
    }
    if (currentOperand === 'first') {
        firstNums.pop();
        updateDisplay(getFirstOperand());
    } else {
        secondNums.pop();
        if (secondNums.length == 0) {
            clear();
        } else {
            updateDisplay(getSecondOperand());
        }
    }
}
// checking if we have the first number
// ======== SETTERS =========
function setFirstOperand(x) {
    currentOperand = 'first';
    firstNums.push(x);
    updateDisplay(getFirstOperand());
}

function setMessage(myMessage) {
    if (myMessage != '') {
        message.textContent = myMessage;
        message.style.visibility = 'visible';
    } else {
        message.style.visibility = 'hidden';
    }
}

function setSecondOperand(y) {
    currentOperand = 'second';
    secondNums.push(y);
    updateDisplay(getSecondOperand());
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

function getCurrentOperand() {
    return currentOperand;
}

// =================== Adding Event Listener ===============
// --------------- NUMBERS ------------
numberButtons.forEach(b => b.addEventListener('click',
    (e) => {
        //when there is no operator, or first operator, it is the first operand
        setMessage('');
        if (getOperator() == null) {
            if (isOperated) {
                firstNums = [];
                isOperated = false;
            }
            setFirstOperand(e.target.textContent);
        } else {
            setSecondOperand(e.target.textContent);
        }
    }));

// --------------- MATHS ------------
mathButtons.forEach(mathButton => mathButton.addEventListener('click',
    (e) => {
        setMessage('');
        // when there is an exist operator
        if (getOperator() !== null) {
            // when the second number is set, 
            // and when the operator is clicked one more time
            if (getSecondOperand() !== null) {
                let result = operate(getFirstOperand(), getSecondOperand(), getOperator());
                firstNums = [];
                secondNums = [];
                setFirstOperand(result);
                isOperated = true;
            }
            setOperator(e.target.textContent);
            if (getOperator() == '%' && getCurrentOperand() != null) {
                let result = operate(getFirstOperand(), getSecondOperand(), '%');
                firstNums = [];
                secondNums = [];
                setFirstOperand(result);
            }
        } else {
            //when operator is never saved, then initialize it
            setOperator(e.target.textContent);
            if (getOperator() == '%' && getCurrentOperand() != null) {
                let result = operate(getFirstOperand(), getSecondOperand(), getOperator());
                firstNums = [];
                secondNums = [];
                setFirstOperand(result);
                isOperated = true;
            }
        }
    }));

// --------------- DECIMAL ------------
decimalButton.addEventListener('click', function () {
    // if pressing this at the begining
    setMessage('');
    if (getCurrentOperand() == null) {
        setFirstOperand('0.');
        // when there is number in first or second operand
    } else {
        if (getCurrentOperand() === 'first') {
            if (isOperated) {
                if (isEqualClicked) {
                    firstNums = [];
                    setFirstOperand('0.');
                    isEqualClicked = false;
                    isOperated = false;
                } else {
                    setSecondOperand('0.');
                }
            } else {
                if (!getFirstOperand().includes('.')) {
                    setFirstOperand('.')
                }
            }
        } else {
            if (!getSecondOperand().includes('.')) {
                setSecondOperand('.')
            }
        }
    }
});



// --------------- SWITCHER ------------
chechBox.addEventListener('click', function (e) {
    body.classList.toggle('dark-mode');
    html.classList.toggle('dark-mode');
    calculatoContainer.classList.toggle('shadow-calculator');
});



equalButton.addEventListener('click', equalSignPressed);
clearButton.addEventListener('click', clear);
backSpaceButton.addEventListener('click', backSpace);

// =================== SANDBOX ===============
updateDisplay('0');