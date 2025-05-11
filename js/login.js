document.addEventListener("DOMContentLoaded", () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
        showProfile(savedUser);
    }
});

function toggleForm() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
    formTitle.innerText = loginForm.style.display === "none" ? "Register" : "Login";
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    handleLogin();
});

document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    handleRegister();
});

function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
        localStorage.setItem("loggedIn", "true");
        showProfile(savedUser);
    } else {
        alert("Incorrect email or password!");
    }
}

function handleRegister() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!name || !email || !password) {
        alert("Fill in all fields!");
        return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
        alert("Email already registered!");
        return;
    }

    const newUser = { name, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", "true");

    alert("Account created successfully!");
    showProfile(newUser);
}

function showProfile(user) {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("profile-container").style.display = "block";
    document.getElementById("profile-name").innerText = user.name;
    document.getElementById("profile-email").innerText = user.email;
}

function updateProfile() {
    const newName = document.getElementById("edit-name").value;
    let user = JSON.parse(localStorage.getItem("user"));

    if (newName.trim() !== "") {
        user.name = newName;
        localStorage.setItem("user", JSON.stringify(user));
        document.getElementById("profile-name").innerText = newName;
        alert("Name updated successfully!");
    } else {
        alert("Enter a valid name!");
    }
}

function updateEmail() {
    const newEmail = document.getElementById("edit-email").value;
    let user = JSON.parse(localStorage.getItem("user"));

    if (newEmail.trim() !== "") {
        user.email = newEmail;
        localStorage.setItem("user", JSON.stringify(user));
        document.getElementById("profile-email").innerText = newEmail;
        alert("Email updated successfully!");
    } else {
        alert("Enter a valid email!");
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("profile-container").style.display = "none";
    document.getElementById("auth-container").style.display = "block";
}

function logout() {
    localStorage.removeItem("loggedIn"); // Remove login status
    localStorage.removeItem("user"); // Optional: remove user data (if you want them to register again)
    window.location.href = "/index.html"; // Redirect to the home page
}