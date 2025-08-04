// --- Waitlist Form Submission Logic (No changes needed here) ---
document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANT: Replace this with your actual n8n Production Webhook URL if needed
    const n8nWebhookUrl = 'https://esh1991.app.n8n.cloud/webhook/868888f9-3bc4-40dc-b8b7-254302b46576';

    const handleFormSubmit = (event, emailInput, messageElement) => {
        event.preventDefault();
        const email = emailInput.value;
        if (!email) {
            messageElement.textContent = 'Please enter a valid email address.';
            messageElement.className = 'form-message error';
            return;
        }
        messageElement.textContent = 'Adding you to the waitlist...';
        messageElement.className = 'form-message';
        fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }),
        })
        .then(response => {
            if (response.ok) {
                messageElement.textContent = '✅ Thank you for joining! We will be in touch.';
                messageElement.className = 'form-message success';
                emailInput.value = '';
            } else { throw new Error('Something went wrong on the server.'); }
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = '❌ Could not join the waitlist. Please try again later.';
            messageElement.className = 'form-message error';
        });
    };

    const heroForm = document.getElementById('waitlist-form-hero');
    const heroEmailInput = document.getElementById('email-hero');
    const heroFormMessage = document.getElementById('form-message-hero');
    heroForm.addEventListener('submit', (e) => handleFormSubmit(e, heroEmailInput, heroFormMessage));

    const ctaForm = document.getElementById('waitlist-form-cta');
    const ctaEmailInput = document.getElementById('email-cta');
    const ctaFormMessage = document.getElementById('form-message-cta');
    ctaForm.addEventListener('submit', (e) => handleFormSubmit(e, ctaEmailInput, ctaFormMessage));


    // --- NEW CAROUSEL LOGIC ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        const slideWidth = slides[0].getBoundingClientRect().width;

        let currentIndex = 0;

        // Function to move slides
        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
            updateButtons();
        };

        // Function to update button states
        const updateButtons = () => {
            if (currentIndex === 0) {
                prevButton.disabled = true;
            } else {
                prevButton.disabled = false;
            }

            if (currentIndex === slides.length - 1) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        };

        // Click listeners
        nextButton.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                moveToSlide(currentIndex + 1);
            }
        });

        prevButton.addEventListener('click', () => {
             if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        });

        // Initialize
        moveToSlide(0);
    }
});
