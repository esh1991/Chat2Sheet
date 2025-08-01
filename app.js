// This script provides feedback for the waitlist form.
// In a real application, you would send this email to a service like Mailchimp or a backend server.

document.addEventListener('DOMContentLoaded', () => {
    // Handle the hero section form
    const heroForm = document.getElementById('waitlist-form-hero');
    const heroEmailInput = document.getElementById('email-hero');
    const heroFormMessage = document.getElementById('form-message-hero');

    heroForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from reloading the page
        const email = heroEmailInput.value;
        if (email) {
            // Display a success message
            heroFormMessage.textContent = '✅ Thank you for joining the waitlist!';
            heroFormMessage.className = 'form-message success';
            heroEmailInput.value = ''; // Clear the input field
        }
    });

    // Handle the CTA section form
    const ctaForm = document.getElementById('waitlist-form-cta');
    const ctaEmailInput = document.getElementById('email-cta');
    const ctaFormMessage = document.getElementById('form-message-cta');

    ctaForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from reloading the page
        const email = ctaEmailInput.value;
        if (email) {
            // Display a success message
            ctaFormMessage.textContent = '✅ Thank you! We will be in touch soon.';
            ctaFormMessage.className = 'form-message success';
            ctaEmailInput.value = ''; // Clear the input field
        }
    });
});