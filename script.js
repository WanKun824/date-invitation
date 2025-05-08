document.addEventListener('DOMContentLoaded', () => {
    const sunflowerContainer = document.querySelector('.sunflower-container');
    const musicSummary = document.getElementById('music-summary');
    const sunflowersSection = document.getElementById('sunflowers-section');

    // 移动端优化的向日葵位置
    const positions = [
        { top: '15%', left: '15%' },
        { top: '25%', left: '65%' },
        { top: '45%', left: '35%' },
        { top: '40%', left: '75%' },
        { top: '65%', left: '25%' },
        { top: '75%', left: '60%' },
        { top: '85%', left: '45%' }
    ];

    // 禁用默认的触摸行为
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });

    // 创建和动画向日葵
    const createSunflowers = () => {
        positions.forEach((pos, index) => {
            setTimeout(() => {
                const sunflower = document.createElement('div');
                sunflower.className = 'sunflower';
                sunflower.style.top = pos.top;
                sunflower.style.left = pos.left;
                sunflower.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/270px-Vincent_Willem_van_Gogh_127.jpg')";
                sunflowerContainer.appendChild(sunflower);

                // 触发重排
                sunflower.offsetHeight;
                
                // 添加可见类来触发淡入效果
                setTimeout(() => {
                    sunflower.classList.add('visible');
                }, 100);
            }, index * 800); // 稍微加快动画速度
        });

        // 向日葵全部出现后，转换到音乐总结
        setTimeout(showMusicSummary, (positions.length + 1) * 800);
    };

    const showMusicSummary = () => {
        sunflowersSection.classList.remove('active');
        sunflowersSection.classList.add('hidden');
        musicSummary.classList.remove('hidden');
        musicSummary.classList.add('active');
    };

    // 开始动画序列
    createSunflowers();

    // 接受按钮的触摸事件处理
    const acceptBtn = document.getElementById('accept-btn');
    acceptBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        alert('💝 感谢你的接受！期待我们的特别约会！💝');
    });

    // 同时保留点击事件支持
    acceptBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('💝 感谢你的接受！期待我们的特别约会！💝');
    });
});
