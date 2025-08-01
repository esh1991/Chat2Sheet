// This script now sends the form data to your n8n webhook.

document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: Replace this with your actual n8n Production Webhook URL
    const n8nWebhookUrl = 'https://esh1991.app.n8n.cloud/webhook-test/868888f9-3bc4-40dc-b8b7-254302b46576';

    // A function to handle the form submission logic
    const handleFormSubmit = (event, emailInput, messageElement) => {
        event.preventDefault(); // Stop the form from reloading the page
        const email = emailInput.value;

        if (!email) {
            messageElement.textContent = 'Please enter a valid email address.';
            messageElement.className = 'form-message error';
            return;
        }

        // Show a "processing" message
        messageElement.textContent = 'Adding you to the waitlist...';
        messageElement.className = 'form-message';

        // Send the data to the n8n webhook using the Fetch API
        fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // The body is the data we send. The key 'email' must match the expression in n8n.
            body: JSON.stringify({ email: email }),
        })
        .then(response => {
            if (response.ok) {
                // Success!
                messageElement.textContent = '✅ Thank you for joining! We will be in touch.';
                messageElement.className = 'form-message success';
                emailInput.value = ''; // Clear the input field
            } else {
                // Handle server errors
                throw new Error('Something went wrong on the server.');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Error:', error);
            messageElement.textContent = '❌ Could not join the waitlist. Please try again later.';
            messageElement.className = 'form-message error';
        });
    };

    // Attach the event listener to the hero section form
    const heroForm = document.getElementById('waitlist-form-hero');
    const heroEmailInput = document.getElementById('email-hero');
    const heroFormMessage = document.getElementById('form-message-hero');
    heroForm.addEventListener('submit', (e) => handleFormSubmit(e, heroEmailInput, heroFormMessage));

    // Attach the event listener to the CTA section form
    const ctaForm = document.getElementById('waitlist-form-cta');
    const ctaEmailInput = document.getElementById('email-cta');
    const ctaFormMessage = document.getElementById('form-message-cta');
    ctaForm.addEventListener('submit', (e) => handleFormSubmit(e, ctaEmailInput, ctaFormMessage));
});
