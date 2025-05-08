document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeSection = document.getElementById('envelope-section');
    const contentSection = document.getElementById('content-section');
    const letterTitle = document.querySelector('.letter-title');
    const contentItems = document.querySelectorAll('.content-item');
    const acceptBtn = document.getElementById('accept-btn');
    
    let isEnvelopeOpen = false;
    
    // Envelope click handler
    envelope.addEventListener('click', () => {
        if (!isEnvelopeOpen) {
            isEnvelopeOpen = true;
            envelope.classList.add('open');
            
            // Show letter title
            setTimeout(() => {
                letterTitle.style.opacity = '1';
                letterTitle.style.transform = 'translateY(0)';
            }, 600);
            
            // Switch to content section
            setTimeout(() => {
                envelopeSection.classList.add('hidden');
                contentSection.classList.remove('hidden');
                contentSection.classList.add('active');
                
                // Reveal content items sequentially
                contentItems.forEach((item, index) => {
                    const delay = parseInt(item.dataset.delay) * 500;
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 500 + delay);
                });
            }, 2000);
        }
    });

    // Accept button handlers
    acceptBtn.addEventListener('click', showAcceptanceMessage);
    acceptBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    function showAcceptanceMessage() {
        alert('💝 感谢你的接受！期待我们的约会！ 💝');
    }
});