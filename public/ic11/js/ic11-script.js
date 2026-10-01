// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy


// Step 5 Function declaration
console.log("--- Function Declarations ---");
function greet(name) {return "Hello, " + name + "!";}
console.log(greet("Maria"));

function area(width, height) {return width * height;}
console.log("Area of 4 x 5 = " + area(4, 5));


//Step 6 Function expresions + arrow functions
console.log("--- Function Expressions & Arrow Functions --");

const multiply = function(a, b) {return a * b; }
const divide = (a,b) => {return a / b; } //explicit return
const square = n => n * n; //implicit return
console.log("multiply(3, 6) = " + multiply(3, 6));
console.log("divide(20, 5) = " + divide(20, 5));
console.log("square(7) = " + square(7));

//Step 7 Default parameters + rest operator
console.log("--- Default Parameters & Rest Operator ---");
function greetUser(name, greeting = "Hello") { return greeting + ", " + name + "!"; }
console.log(greetUser("Sam")); //uses default
console.log(greetUser("Sam", "Yo")); //overrides default

function sumAll(...numbers) {
    let total = 0;
    for (const n of numbers) { total += n; }
    return total;
}

console.log("sumAll(1,2,3) = " + sumAll(1, 2, 3));


//Step 8 - Callback functions 
console.log("--- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing " + value + "...");
    return callback(value);
}

const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double));
console.log("triple -> " + processNumber(5, triple));


// Step 9 - Object methods with this 
console.log("--- Object Methods (this) ---");
const product = {
    brand: "Acme",
    price: 12.5,
    quantity: 4,
    total() { return this.price * this.quantity; },
    describe() {
        return this.quantity + " x " + this.brand + " @ $" + this.price + " = $"+ this.total().toFixed(2);
    }
}

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());
