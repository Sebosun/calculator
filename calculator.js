
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
    if (a === 0 || b === 0){

        currentCal.style.color = 'red';
        //calculator.firstElementChild.style.color = 'red';

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

// Event listener, once the numbers are clicked, they are added to the displayCurrentCalc / partialOperation
// variable. 
function numbersListener(){
    numbers.forEach((button) => {
        button.addEventListener('click', (e)=>{
            // This is so that if user divides by zero and the color changes to red
            // the color goes back after first new calculation

            if (event.target.id === '<'){
                displayCurrentCalc = displayCurrentCalc.slice(0, -1) // removes last symbol
                partialOperation = partialOperation.slice(0, -1)
                displayEntireCalc = displayEntireCalc.slice(0,-1);

                entireCalc.textContent = displayEntireCalc;
                currentCal.textContent = displayCurrentCalc;
            }
            // calculator.firstElementChild.style.color = 'black';
            else{
                currentCal.style.color = 'black';
                displayCurrentCalc += event.target.id;
                partialOperation += event.target.id;
                displayEntireCalc += event.target.id;

                entireCalc.textContent = displayEntireCalc;
                currentCal.textContent = displayCurrentCalc;
            }
            //calculator.firstElementChild.textContent = displayCurrentCalc;
            
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

            //makes sure no number is NaN
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
                            
                            entireCalc.textContent = displayEntireCalc;
                            currentCal.textContent = numbersArray[0];
                            //calculator.firstElementChild.textContent = numbersArray[0];
                            
                            
                            displayEntireCalc = '';
                            displayCurrentCalc = [];
                            numbersArray = [];
                            operatorInput = '';
                        }
                        else{
                            numbersArray[0] = operate(numbersArray[0], numbersArray[1], operatorInput);
                            numbersArray.splice(1, 1)
                            displayCurrentCalc = numbersArray[0];
                        

                            entireCalc.textContent = displayEntireCalc;
                            currentCal.textContent = displayCurrentCalc;
                            //calculator.firstElementChild.textContent = displayCurrentCalc;
                        }
                    }
                    if (['+', '-', '*', '/'].includes(event.target.id)){
                        operatorInput = event.target.id;

                        // if last element of the displayEntireCalc var is an operator
                        // remove it, so that we may right after append a new operator
                        if (['+', '-', '*', '/'].includes(displayCurrentCalc[displayCurrentCalc.length-1])){
                            displayEntireCalc = displayEntireCalc.slice(0,-1);
                        }
                        displayEntireCalc += operatorInput;
                        displayCurrentCalc = numbersArray[0] + operatorInput;
                        

                        console.log(numbersArray, operatorInput);

                        entireCalc.textContent = displayEntireCalc;
                        currentCal.textContent = displayCurrentCalc;
                        // calculator.firstElementChild.textContent = displayCurrentCalc;

                    }
                    if (event.target.id === 'clear'){
                        displayEntireCalc = '';
                        displayCurrentCalc = '';
                        numbersArray = [];
                        operatorInput = '';

                        entireCalc.textContent = displayEntireCalc;
                        currentCal.textContent = displayCurrentCalc;
                        //calculator.firstElementChild.textContent = displayCurrentCalc;
                    }
                }
            else{
                entireCalc.textContent = displayEntireCalc;
                currentCal.textContent = '';
                //calculator.firstElementChild.textContent = '';
            }
        });
    });
}

const calculator = document.querySelector('.calculator');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const entireCalc = document.querySelector('#wholeCal');
const currentCal = document.querySelector('#currentCal')

let numbersArray = [];

let operatorInput = '';
let firstNumber = '';
let secondNumber = '';
let partialOperation = '';
let displayCurrentCalc = '';
let displayEntireCalc = '';


// listens to operator and returns it when clicked, later the logic will be developed what happens
// once the operator is clicked, maybe use cases?

numbersListener(); // this will be have to be used in some
operatorListener();
    
//bigger event listener