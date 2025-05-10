document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach(carousel => {
        const productContainer = carousel.querySelector(".product-container");
        const prevButton = carousel.querySelector(".prev");
        const nextButton = carousel.querySelector(".next");

        const scrollAmount = 350;
        const scrollSpeed = 15;
        const scrollStep = 20;

        function smoothScroll(container, direction) {
            let step = 0;
            const interval = setInterval(() => {
                container.scrollBy({ left: direction * scrollStep, behavior: "auto" });
                step += scrollStep;
                if (step >= scrollAmount) {
                    clearInterval(interval);
                }
            }, scrollSpeed);
        }

        prevButton.addEventListener("click", () => {
            smoothScroll(productContainer, -1);
        });

        nextButton.addEventListener("click", () => {
            smoothScroll(productContainer, 1);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const shoesImage = document.getElementById("shoesImage");
    const colorOptions = document.querySelectorAll(".color-option");

    const shoeColors = {
        green: "https://assets.codepen.io/4164355/shoes.png",
        blue: "https://assets.codepen.io/4164355/shoes-blue.png",
        red: "https://assets.codepen.io/4164355/shoes-red.png"
    };

    colorOptions.forEach(option => {
        option.addEventListener("click", function () {
            const selectedColor = this.getAttribute("data-color");
            shoesImage.src = shoeColors[selectedColor] || shoeColors.green;
        });
    });
});

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

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    showCartMessage("The sneakers have been added to the cart!");
}

document.addEventListener("DOMContentLoaded", function () {
    const brandLogos = document.querySelectorAll(".imgsBrand img");
    const allSections = document.querySelectorAll(".products");
    const sectionsMap = {}; // Mapping for quick access

    // Creating a section mapping to avoid going through the entire list every time
    allSections.forEach(section => {
        const sectionTitle = section.querySelector("h2").textContent.toLowerCase().trim();
        sectionsMap[sectionTitle] = section;
    });

    brandLogos.forEach(logo => {
        logo.addEventListener("click", function () {
            const selectedBrand = this.alt.toLowerCase().trim();

            console.log("Selected brand:", selectedBrand); // Debug to see brand name

            // Fix names that may be different in HTML
            const brandMapping = {
                "nike": "nike",
                "puma": "puma",
                "adidas": "adidas",
                "jordan": "jordan",
                "vans": "vans",
                "newbalance": "new balance",
                "new balance": "new balance",
                "nb": "new balance" // Added to fix wrong selection
            };

            const normalizedBrand = brandMapping[selectedBrand] || selectedBrand;

            console.log("Standardized brand:", normalizedBrand); // Debug

            // Hides all sections
            allSections.forEach(section => section.style.display = "none");

            // Display only the corresponding section
            if (sectionsMap[normalizedBrand]) {
                const selectedSection = sectionsMap[normalizedBrand];
                selectedSection.style.display = "flex";
                selectedSection.style.flexDirection = "column";

                // Transform into grid
                const productContainer = selectedSection.querySelector(".product-container");
                productContainer.style.display = "grid";
                productContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
                productContainer.style.gap = "20px";
                productContainer.style.overflow = "visible";

                // Hides the carousel buttons
                selectedSection.querySelectorAll(".prev, .next").forEach(button => button.style.display = "none");
            } else {
                console.warn(`No sections found for brand: ${selectedBrand}`);
            }
        });
    });

    // Resetting initial display as carousel on reload
    function resetDisplay() {
        allSections.forEach(section => {
            section.style.display = "flex";
            section.style.flexDirection = "column";

            const productContainer = section.querySelector(".product-container");
            const carouselButtons = section.querySelectorAll(".prev, .next");

            productContainer.style.display = "flex";
            productContainer.style.overflowX = "auto";
            carouselButtons.forEach(button => button.style.display = "block");
        });
    }

    resetDisplay();
});

/*menu responsive */
document.addEventListener("DOMContentLoaded", function () {
    let btnMenu = document.getElementById('btn-menu');
    let menu = document.getElementById('menu-mobile');
    let overlay = document.getElementById('overlay-menu');

    // Check if elements exist before adding event listeners
    if (btnMenu && menu && overlay) {
        btnMenu.addEventListener('click', () => {
            menu.classList.add('abrir-menu');
        });

        menu.addEventListener('click', () => {
            menu.classList.remove('abrir-menu');
        });

        overlay.addEventListener('click', () => {
            menu.classList.remove('abrir-menu');
        });
    }

    // Toggle menu for mobile
    function toggleMenu() {
        var menu = document.querySelector(".menu-mobile");
        menu.classList.toggle("active");
    }

    // Optional: If you have a separate button to toggle the menu, call the function
    let toggleButton = document.getElementById("btn-toggle-menu");
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleMenu);
    }
});

fetch('./components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));

fetch('./components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));