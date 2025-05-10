document.addEventListener("DOMContentLoaded", () => {
    // Retrieving the total cart value
    const cartTotal = localStorage.getItem("cartTotal") || "0.00";

    // Displaying the total amount on the Payment page
    const PaymentElement = document.getElementById("totalPayment");
    PaymentElement.textContent = `Total: $ ${parseFloat(cartTotal).toFixed(2).replace(".", ",")}`;

    document.getElementById("confirmPayment").addEventListener("click", () => {
        alert("Payment made successfully!");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTotal");
        window.location.href = "/index.html";
    });
});