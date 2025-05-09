document.addEventListener('DOMContentLoaded', () => {
    const envelopeSection = document.getElementById('envelope-section');
    const summarySection = document.getElementById('summary-section');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const letterTitle = document.querySelector('.letter-title');
    const contentItems = document.querySelectorAll('.content-item');
    const acceptBtn = document.getElementById('accept-btn');
    const statCards = document.querySelectorAll('.stat-card');
    
    let isEnvelopeOpened = false;

    // Envelope click handler
    envelope.addEventListener('click', () => {
        if (!isEnvelopeOpened) {
            isEnvelopeOpened = true;
            envelope.classList.add('open');
            
            // Show letter title after envelope opens
            setTimeout(() => {
                letterTitle.classList.remove('hidden');
                letterTitle.style.opacity = '1';
                letterTitle.style.transform = 'translateY(0)';
            }, 600);

            // Show content items one by one
            contentItems.forEach((item, index) => {
                const delay = parseInt(item.dataset.delay);
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, 1000 + (delay * 400));
            });

            // Transition to summary section
            setTimeout(() => {
                envelopeSection.style.transform = 'translateY(-100%)';
                summarySection.classList.remove('hidden');
                summarySection.classList.add('active');
                
                // Animate stat cards one by one
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }, 3000);
        }
    });

    // Handle scroll animations for stat cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    statCards.forEach(card => {
        observer.observe(card);
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
        const confirmed = window.confirm('💝 Thank you! Looking forward to our special date! 💝');
        if (confirmed) {
            // 替换 your-email@example.com 为您想要接收邮件的地址
            const subject = encodeURIComponent("Date Invitation Accepted! 💑");
            const body = encodeURIComponent("我同意和你约会！\n\n接受时间：" + new Date().toLocaleString());
            window.location.href = `mailto:master.van1995@gmail.com?subject=${subject}&body=${body}`;
        }
    }

    

    // Prevent default touch behavior on mobile
    // 只在信封部分阻止滑动
    envelopeSection.addEventListener('touchmove', (e) => {
        if (isEnvelopeOpened) {
            e.preventDefault();
        }
    }, { passive: false });

});
