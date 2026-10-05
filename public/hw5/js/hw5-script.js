// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy

// Step 5.2 Book Inventory variables an data
console.log("=== BOOKSTORE INVENTORY CALCULATOR===");
const book1 = {title:"Animal Farm", author:"George Orwell", price: 14.99}
const book2 = {title:"An Orphan's Tale", author:"Pam Jenoff", price: 17.50}
const book3 = {title:"The Art of War", author:"Sun Tzu", price: 13.29}
const TAX_RATE = 0.0825;
let isMember = false;
console.log("--- Book Inventory ---");
console.log("Book title: " + book1.title + " author: " +  book1.author + " price: $" +book1.price);
console.log("Book title: " + book2.title + " author: " +  book2.author + " price: $" +book2.price);
console.log("Book title: " + book3.title + "author: " +  book3.author + " price: $" +book3.price);


// Step 5.3 Function declarations - subtotal & currency formatting
function calculateSubtotal(price, quantity) {return price * quantity;}
function formatCurrency(amount) {return "$" + amount.toFixed(2);}
console.log("--- Function Declarations Test ---");
console.log("testing calculateSubtotal(book1.price, 7): " + calculateSubtotal(book1.price, 7));
console.log("testing formatCurrency(10000.0000): " + formatCurrency(10000.0000));
console.log("testing formatCurrency(1): " + formatCurrency(1));
console.log("testing formatCurrency(calculateSubtotal(book2.price, 4)): " + formatCurrency(calculateSubtotal(book2.price, 4)));

// Step 5.4 Arrow functions - taz & member discount 
const calculateTax = (subtotal) => subtotal * TAX_RATE;
const applyMemberDiscount =(subtotal, isMember) => {return isMember ? subtotal * 0.9: subtotal;};
console.log("--- Arrow Functions Test ---");
console.log("testing calculateTax(book3.price): " + calculateTax(book3.price));
console.log("testing applyMemberDiscount(calculateTax(book3.price), isMember), where isMember = false: " + applyMemberDiscount(calculateTax(book3.price), isMember));
isMember = true;
console.log("testing applyMemberDiscount(calculateTax(book3.price), isMember), where isMember = true: " + applyMemberDiscount(calculateTax(book3.price), isMember));


//5.5 Function expression with default parameters - full order total
const calculateTotal = function(price, quantity=1, isMember=false) {const subtotal = applyMemberDiscount(calculateSubtotal(price, quantity), isMember); 
    return subtotal+ calculateTax(calculateSubtotal(price, quantity));};
console.log("--- Function Expression with Defaults ---");
console.log("testing calculateTotal(book1.price): " + calculateTotal(book1.price));
console.log("testing calculateTotal(book1.price, 6): " + calculateTotal(book1.price, 6));
console.log("testing calculateTotal(book1.price, 6, isMember), where isMember = true: " + calculateTotal(book1.price, 6, isMember));
isMember = false;
console.log("testing calculateTotal(book1.price, isMember), where isMember = false: " + calculateTotal(book1.price, isMember));

//5.6 Rest operator - bulk order price
function calculateBulkOrder(...prices) {
    let total = 0;
     for (const price of prices) {total += price; }
     return total;}
console.log("--- Rest Operator Test ---");
console.log("testing calculateBulkOrder(book1.price, book1.price, book2.price): " + calculateBulkOrder(book1.price, book1.price, book2.price));
console.log("testing calculateBulkOrder(book2.price, book3.price, book2.price, book1.price, book3.price): " + calculateBulkOrder(book2.price, book3.price, book2.price, book1.price, book3.price));


//5.7 callback functions - flexible pricing
function processOrder(book, quantity, callback) {
    let total = callback(book.price, quantity)
    total = calculateTotal(total);
    total = total * quantity;
    console.log("Processing order: " + book.title + " quantity: " + quantity + "...")
    return book.title + ": " + formatCurrency(total);
}
const standardPricing = fullPrice => fullPrice;
const memberPricing = tenPercentOff => tenPercentOff * .9;
console.log("--- Callback Functions");
console.log("testing processOrder(book2, 4, standardPricing): " + processOrder(book2, 4, standardPricing));
console.log("testing processOrder(book2, 4, memberPricing): " + processOrder(book2, 4, memberPricing));


//5.8 Object methods with this- order summary
const orderSummary = {
    customerName: "Marty",
    items: [],
    addItems(book, quantity) {
        const Order = {book: book, quantity: quantity};
        this.items.push(Order);
    },
    getTotal() {
        let total = 0.00;
        for (index in this.items) {
             total += this.items[index].book.price * this.items[index].quantity;
        }
        return total;
    },
    displaySummary() {
        let formattedMultiLine = "Customer Name: " + this.customerName;
        for (item in this.items) {
            let line = "\n book title: " + this.items[item].book.title + ", book quantity: " + this.items[item].quantity;
            formattedMultiLine += line;
        }
        formattedMultiLine += "\nTotal: " + formatCurrency(this.getTotal());
        return formattedMultiLine;
    },

}

console.log("--- Object Methods ---");
orderSummary.addItems(book2, 1);
orderSummary.addItems(book1, 3);
console.log("testing getTotal(): " + orderSummary.getTotal());
console.log("testing displaySummary(): " + orderSummary.displaySummary());


// 5.9 Truthy/falsy conditional logic - discount code validation
function validateDiscount(code) {
    if (code) {
        if (code.toUpperCase() == "MEMBER10"){
            return 0.10;
        } else if (code.toUpperCase() == "SAVE20"){
            return 0.20;
        }
    }
    return 0;
}
console.log("--- Truthy/Falsy Validation ---");
console.log("testing validateDiscount(\"MEMBER10\"): " + validateDiscount("MEMBER10"));
console.log("testing validateDiscount(\"SAVE20\"): " + validateDiscount("SAVE20"));
console.log("testing validateDiscount(\"\"): " + validateDiscount(""));
console.log("testing validateDiscount(\"INVALID\"): " + validateDiscount("INVALID"));

//5.10 Closures - nested order processor (capstone)
function createOrderProcessor(storeName) {
    let tax_rate = TAX_RATE;
    function processStoreOrder(book, quantity) {
        let formattedOrder = "Store Name: " + storeName + ", Book Title: " + book.title + ", Calculated total:";
        let totalPrice = book.price * quantity;
        let taxedPrice = totalPrice + (totalPrice * tax_rate);
        formattedOrder += formatCurrency(taxedPrice);
        return formattedOrder;
    }
    return processStoreOrder;
}
console.log("--- Nested Function and Closures ---");
const BookStore = createOrderProcessor("St. Ed's Bookstore");
console.log("testing BookStore(book1, 5): " + BookStore(book1, 5));
console.log("testing BookStore(book2, 2): " + BookStore(book2, 2));
console.log("testing BookStore(book3, 1): " + BookStore(book3, 1));




