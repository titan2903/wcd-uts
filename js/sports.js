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
    updateCartDisplay(); // Updates the cart in the interface
    showCartMessage("The sneakers have been added to the cart!"); // Displays the message
}

function toggleMenu() {
    document.querySelector('.menu-mobile').classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".buttonProducts");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const productCard = button.closest(".card");
            const productName = productCard.querySelector("h2").innerText;
            const productPrice = parseFloat(productCard.querySelector(".price").innerText.replace('$', '').replace(',', '.'));
            const productImage = productCard.querySelector("img").src;

            alert('Item success added to cart!');
            addToCart(productName, productPrice, productImage);
        });
    });
});

fetch('../../components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

fetch('../../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));