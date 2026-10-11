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
    for (const x =0; x > discountCodes.length; x++) {
        let CODE = code.trim();
        CODE = CODE.toUpperCase();
        if (CODE === discount) {
            return discount;
        }
    }
    return 0;
}

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const code = document.querySelector("#discount-code");
const discountedSubtotalElement = document.querySelector(".discountAmount");
const taxRate = document.querySelector("#tax");
const totalPrice = document.querySelector("#total");
const orderForm = document.querySelector("#orderForm");
const productText = document.querySelector("#productText");
const quantityText = document.querySelector("#quantity");
const codeText = document.querySelector("#code");
orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedProduct = e.target.product.value();
    const productQuantity = e.target.parseInt(quantity.value());
    const discountCode = e.target.code.value().trim();
    if (!productPrices[selectedProduct]) {
        alert("Invalid Product");
        return;
    } else if (productQuantity <= 0) {
        alert("Invalid quantity");
        return;
    }
    let subtotal = productPrices.selectedProduct * productQuantity;
    let discountedAmount = applyDiscount(subtotal, discountCode);
    let discountedSubtotal = (subtotal - discountedAmount);
    let tax = calculateTax(discountedSubtotal);
    let total = discountedSubtotal + tax;

    
    discountedSubtotalElement.textContent ="\ndiscounted Subtotal: $" + discountedSubtotal.toFixed(2);
    taxRate.textContent = "\ntax: $" + tax.toFixed(2);
    totalPrice.textContent = "\ntotal price: $" + total.toFixed(2);
    productText.textContent = "Product: " + product.value();
    quantityText.textContent = "Amount: " + quantity.value();
    codeText.textContent = "discount code: " + code.value().trim();
});
const result = document.querySelector("#results");
result.classList.remove(".results-hidden");




