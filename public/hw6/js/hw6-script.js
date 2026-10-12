// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
const productPrices = {
    laptop: 999.99,
    tablet: 499.99,
    phone: 699.99,
    monitor: 299.99
}

const discountCodes = {
    SAVE10: 0.10,
    SAVE20: 0.20,
    STUDENT: 0.15
}

const calculateTax = subtotal => subtotal * 0.0825;

const applyDiscount = function(subtotal, code) {
    const CODE = code.trim().toUpperCase();
    if (discountCodes[CODE]) {
       return subtotal * discountCodes[CODE];
        
    } else {return 0};
}

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const code = document.querySelector("#discountCode");
const discountedSubtotalElement = document.querySelector("#discountAmount");
const taxRate = document.querySelector("#tax");
const totalPrice = document.querySelector("#total");
const orderForm = document.querySelector("#orderForm");
const productText = document.querySelector("#productText");
const quantityText = document.querySelector("#numProducts");
const actualSubtotal = document.querySelector("#actualSubtotal");
orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedProduct = e.target.product;
    const productQuantity = e.target.quantity;
    const discountCode = e.target.discountCode;
    const theProduct = selectedProduct.value;
    const numProducts = Number(productQuantity.value);
    let theCode = discountCode.value;
    theCode = theCode.trim();
     if (numProducts <= 0) {
        alert("Invalid quantity");
        return;
    }
    if (!productPrices[theProduct]) {
        alert("not a valid product");
        return;
    }else{
        let subtotal = productPrices[theProduct] * numProducts;
        let discountedAmount = applyDiscount(subtotal,theCode);
        let discountedSubtotal = (subtotal - discountedAmount);
        let tax = calculateTax(discountedSubtotal);
        let total = discountedSubtotal + tax;

    
        discountedSubtotalElement.textContent ="discounted Subtotal: $" + discountedSubtotal.toFixed(2);
        taxRate.textContent = "\ntax: $" + tax.toFixed(2);
        totalPrice.textContent = "\ntotal price: $" + total.toFixed(2);
        productText.textContent = "Product: " + theProduct;
        quantity.textContent = "Amount: " + numProducts;
        actualSubtotal.textContent = "subtotal: $" + subtotal.toFixed(2);
        
    }
});
const result = document.querySelector("#results");
result.classList.remove("results-hidden");




