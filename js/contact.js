// Handle form submission and display success alert
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting for now

    // Show success alert
    alert("Thank you for contacting us! We will get back to you soon.");

    // Optionally, reset the form after submission
    document.getElementById('contact-form').reset();
});