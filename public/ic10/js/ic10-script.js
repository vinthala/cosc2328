// IC10 - COSC 2328 - Professor McCurry
// Implemented by: Val Inthalangsy

// Step 5 - cariables & concatenation

const city = "Austin";
const country = "USA";
let population = 980000;

console.log("Location: " + city + " , " + country);
console.log("Population: " + population);



// Step 6 - a decision
if (population > 1000000) {
    console.log(city + " is a metropolis.");
} else {
    console.log(city + " is a growing city.");
}



// Step 7 - Boolean 
let isLoggedIn = false;
if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in");
}



// Step 8 - truthy / falsy
let username = 123;
if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required");
}


// Step 9 - combined logic
const hasAccount = false;
const isEmailVerified = false;
const agreedToTerms = true;
if ((hasAccount && agreedToTerms) || (isEmailVerified)) {
    console.log("Registration allowed");
} else{
    console.log("Registration blocked");
}