document.addEventListener('DOMContentLoaded', () => {
    const envelopeSection = document.getElementById('envelope-section');
    const summarySection = document.getElementById('summary-section');
    const envelope = document.querySelector('.envelope');
    const letter = document.querySelector('.letter');
    const letterTitle = document.querySelector('.letter-title');
    const contentItems = document.querySelectorAll('.content-item');
    const acceptBtn = document.getElementById('accept-btn');
    const declineBtn = document.getElementById('decline-btn');
    const statCards = document.querySelectorAll('.stat-card');
    const datePicker = document.getElementById('date-picker');
    
    let isEnvelopeOpened = false;

    // Set minimum date to current date (2025-05-09 07:52)
    const now = new Date('2025-05-09T07:52:35Z');
    const formattedDateTime = now.toISOString().slice(0, 16);
    datePicker.min = formattedDateTime;
    datePicker.value = formattedDateTime;

    // Envelope click handler
    envelope.addEventListener('click', () => {
        if (!isEnvelopeOpened) {
            isEnvelopeOpened = true;
            envelope.classList.add('open');
            
            setTimeout(() => {
                letterTitle.classList.remove('hidden');
                letterTitle.style.opacity = '1';
                letterTitle.style.transform = 'translateY(0)';
            }, 600);

            contentItems.forEach((item, index) => {
                const delay = parseInt(item.dataset.delay);
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, 1000 + (delay * 400));
            });

            setTimeout(() => {
                envelopeSection.style.transform = 'translateY(-100%)';
                summarySection.classList.remove('hidden');
                summarySection.classList.add('active');
                
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            }, 3000);
        }
    });

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

    // Accept handler
    function showAcceptanceMessage() {
        const selectedDate = datePicker.value;
        if (!selectedDate) {
            alert('请先选择约会日期和时间！');
            return;
        }

        const formattedDate = new Date(selectedDate).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const confirmed = window.confirm(`💝 谢谢你！期待在 ${formattedDate} 与你相见！ 💝`);
        if (confirmed) {
            const subject = encodeURIComponent("Date Invitation Accepted! 💑");
            const body = encodeURIComponent(
                `我同意和你约会！\n\n` +
                `约定时间：${formattedDate}\n\n` +
                `接受时间：${new Date().toLocaleString('zh-CN')}\n\n` +
                `来自：WanKun824`
            );
            window.location.href = `mailto:master.van1995@gmail.com?subject=${subject}&body=${body}`;
        }
    }

    // Decline handler
    function showDeclineMessage() {
        const confirmed = window.confirm('💔 Are you sure you want to decline? 💔');
        if (confirmed) {
            const declineReasons = [
                "我这段时间特别忙",
                "我有其他安排",
                "我觉得时机不太合适",
                "我想我们还是保持现在的关系比较好",
                "其他原因"
            ];
            
            let reason = prompt(`
                请选择一个原因（输入数字1-5）：
                1. 我这段时间特别忙
                2. 我有其他安排
                3. 我觉得时机不太合适
                4. 我想我们还是保持现在的关系比较好
                5. 其他原因
            `);

            let selectedReason = "未提供原因";
            let customReason = "";

            if (reason && !isNaN(reason)) {
                const index = parseInt(reason) - 1;
                if (index >= 0 && index < declineReasons.length) {
                    selectedReason = declineReasons[index];
                    if (index === 4) { // 其他原因
                        customReason = prompt("请简单说明原因：") || "未提供具体原因";
                    }
                }
            }

            const subject = encodeURIComponent("Date Invitation Declined 💔");
            let body = `很抱歉，我不能接受邀请。\n\n原因：${selectedReason}`;
            if (customReason) {
                body += `\n具体原因：${customReason}`;
            }
            body += `\n\n回复时间：${new Date().toLocaleString('zh-CN')}\n\n来自：WanKun824`;
            
            window.location.href = `mailto:master.van1995@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
        }
    }

    // Event listeners
    acceptBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAcceptanceMessage();
    });

    declineBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        showDeclineMessage();
    });

    declineBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDeclineMessage();
    });
});