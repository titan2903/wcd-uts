document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const baseFreight = 10; //Base freight value
    const cartTotalElement = document.getElementById("cartTotal");
    const cartItemsContainer = document.getElementById("cartItems");
    const cargoValue = document.getElementById("cargoValue");
    const calculateShippingBtn = document.getElementById("calculateShipping");
    const finalizePurchaseBtn = document.getElementById("finalizePurchase");

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((product, index) => {
            total += product.price;
            const itemElement = document.createElement("li");
            itemElement.innerHTML = `${product.name} - $ ${product.price.toFixed(2).replace(".", ",")} <button class='remove-btn' data-index='${index}'>Remover</button>`;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalElement.textContent = `Total: $ ${total.toFixed(2).replace(".", ",")}`;

        // Storing the total cart value in localStorage
        localStorage.setItem("cartTotal", total.toFixed(2));
    }

    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCart();
        }
    });

    calculateShippingBtn.addEventListener("click", () => {
        const cep = document.getElementById("cep").value;
        if (cep.length >= 5) {
            let freight = baseFreight + Math.random() * 20; // Freight calculation simulation
            cargoValue.textContent = `Freight: $ ${freight.toFixed(2).replace(".", ",")}`;
        } else {
            alert("Please enter a valid zip code.");
        }
    });

    finalizePurchaseBtn.addEventListener("click", () => {
        window.location.href = "../finalizepurchase/finalizepurchase.html";
    });

    updateCart();
});