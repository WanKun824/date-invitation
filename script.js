document.addEventListener('DOMContentLoaded', () => {
    const envelopeSection = document.getElementById('envelope-section');
    const summarySection = document.getElementById('summary-section');
    const envelope = document.querySelector('.envelope');
    const acceptBtn = document.getElementById('accept-btn');
    
    // Envelope click handler
    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            
            // Wait for envelope animation to complete
            setTimeout(() => {
                envelopeSection.style.transform = 'translateY(-100%)';
                summarySection.classList.remove('hidden');
                summarySection.classList.add('active');
            }, 1500);
        }
    });

    // Accept button handlers
    acceptBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    function showAcceptanceMessage() {
        alert('💝 Thank you! Looking forward to our special date! 💝');
    }
});
