document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buttonProducts");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const productCard = button.closest(".card");
            const productName = productCard.querySelector("h2").innerText;
            const productPrice = parseFloat(productCard.querySelector(".price").innerText.replace('$', '').replace(',', '.'));
            const productImage = productCard.querySelector("img").src;

            addToCart(productName, productPrice, productImage);
        });
    });
});

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(); // Atualiza o carrinho na interface
    showCartMessage("O tênis foi adicionado ao carrinho!"); // Exibe a mensagem
}

function toggleMenu() {
    document.querySelector('.menu-mobile').classList.toggle('active');
}
