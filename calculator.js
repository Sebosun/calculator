
function add(a, b){
    return (a + b);
}

function subtract(a, b){
    return (a - b);
}

function multiply(a, b){
    return (a * b);
}
// TODO: for now returns miliard places po przecinku, search for the round method 
// and fix it
function divide(a, b){
    if (a || b === 0){
        return 'ERROR'
    }
    return (a/b);
    
}


function operate(a, b, operator){
    switch (operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '*':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        default:
            console.log('Error, no operator');
    }
}

// Event listener, once the numbers are clicked, they are added to the entireOperation / partialOperation
// variable. 
function numbersListener(){
    numbers.forEach((button) => {
        button.addEventListener('click', (e)=>{
            entireOperation += event.target.id;
            partialOperation += event.target.id;
            calculator.firstElementChild.textContent = entireOperation;
        })
    });
}


// Main function, listens to the operational buttons, depending on the button clicked
// certain functions are launched. 
function operatorListener(){
    operators.forEach((operator) =>{
        operator.addEventListener('click', (e) =>{
            console.log(event.target.id);
            // converts number entered into float and adds it to the numbers array

            numbersArray.push(parseFloat(partialOperation));
            partialOperation = '';


            numbersArray = numbersArray.filter((number) =>{
                return isNaN(number) === false;
            });

            // if we have 2 numbers stored in numbersarray, then perform the calculation
            // if user has clicked '=' then the the data is cleared
            if (numbersArray.length > 0){
                    if (numbersArray.length === 2){
                        if (event.target.id === '='){
                            numbersArray[0] = operate(numbersArray[0], numbersArray[1], operatorInput);
                            numbersArray.splice(1, 1)
                            calculator.firstElementChild.textContent = numbersArray[0];
                            entireOperation = [];
                            numbersArray = [];
                            operatorInput = '';
                        }
                        else{
                            numbersArray[0] = operate(numbersArray[0], numbersArray[1], operatorInput);
                            numbersArray.splice(1, 1)
                            entireOperation = numbersArray[0];
                            calculator.firstElementChild.textContent = entireOperation;
                        }
                    }
                    if (['+', '-', '*', '/'].includes(event.target.id)){
                        operatorInput = event.target.id;
                        entireOperation = numbersArray[0] + operatorInput;
                        console.log(numbersArray, operatorInput);
                        calculator.firstElementChild.textContent = entireOperation;
                    }
                    if (event.target.id === 'clear'){
                        entireOperation = '';
                        numbersArray = [];
                        operatorInput = '';
                        calculator.firstElementChild.textContent = entireOperation;
                    }
                }
            else{
                calculator.firstElementChild.textContent = 'You need to start with a number';
            }
        });
    });
}

const calculator = document.querySelector('.calculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');

let numbersArray = [];
let operatorInput = '';
let firstNumber = '';
let secondNumber = '';
let partialOperation = '';
let entireOperation = '';


// listens to operator and returns it when clicked, later the logic will be developed what happens
// once the operator is clicked, maybe use cases?




numbersListener(); // this will be have to be used in some
operatorListener();
    
//bigger event listener