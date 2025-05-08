document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope');
    const envelopeContainer = document.querySelector('.envelope-container');
    const envelopeSection = document.getElementById('envelope-section');
    const contentSection = document.getElementById('content-section');
    const letterTitle = document.querySelector('.letter-title');
    const contentItems = document.querySelectorAll('.content-item');
    const acceptBtn = document.getElementById('accept-btn');
    
    let isEnvelopeOpen = false;
    
    // 添加视觉反馈，表明信封可以点击
    envelopeContainer.classList.add('clickable');
    
    // 同时支持点击和触摸事件
    function openEnvelope(event) {
        event.preventDefault(); // 防止默认行为
        
        if (!isEnvelopeOpen) {
            isEnvelopeOpen = true;
            envelope.classList.add('open');
            envelopeContainer.classList.remove('clickable'); // 移除可点击提示
            
            // 显示信件标题
            setTimeout(() => {
                letterTitle.style.opacity = '1';
                letterTitle.style.transform = 'translateY(0)';
            }, 600);
            
            // 切换到内容部分
            setTimeout(() => {
                envelopeSection.style.opacity = '0';
                setTimeout(() => {
                    envelopeSection.classList.add('hidden');
                    contentSection.classList.remove('hidden');
                    requestAnimationFrame(() => {
                        contentSection.classList.add('active');
                        
                        // 逐条显示内容
                        contentItems.forEach((item, index) => {
                            const delay = parseInt(item.dataset.delay) * 500;
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, 500 + delay);
                        });
                    });
                }, 500);
            }, 2000);
        }
    }

    // 添加多个事件监听器确保交互可靠性
    envelopeContainer.addEventListener('click', openEnvelope);
    envelopeContainer.addEventListener('touchend', openEnvelope);
    
    // 防止触摸滚动干扰
    envelopeContainer
