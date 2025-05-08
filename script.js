document.addEventListener('DOMContentLoaded', () => {
    const videoSection = document.getElementById('video-section');
    const summarySection = document.getElementById('summary-section');
    const video = document.getElementById('intro-video');

    // Start video playback
    video.play().catch(function(error) {
        console.log("Video play failed:", error);
    });

    // Video ended event handler
    video.addEventListener('ended', () => {
        // Hide video section and show summary section
        videoSection.classList.remove('active');
        videoSection.classList.add('hidden');
        summarySection.classList.remove('hidden');
        summarySection.classList.add('active');
    });

    // Accept button handlers
    const acceptBtn = document.getElementById('accept-btn');
    
    // Touch event
    acceptBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    // Click event
    acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    // Acceptance message
    function showAcceptanceMessage() {
        alert('💝 Thank you! Looking forward to our special date! 💝');
    }

    // Prevent default touch behavior
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
});
