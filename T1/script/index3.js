let audio = null;

// 全局緩存配置數據
let cachedConfig = null;

// 加載配置文件的函數
const loadConfig = () => {
    if (cachedConfig) {
        return Promise.resolve(cachedConfig);
    }
    return fetch('config.json')
        .then((response) => response.json())
        .then((data) => {
            cachedConfig = data;
            return data;
        });
};

// DOMContentLoaded 事件處理
document.addEventListener('DOMContentLoaded', () => {
    audio = new Audio('music/bgMusic.mp3');
    audio.preload = 'auto';
    audio.play();

    setTimeout(() => {
        animationTimeline();
    }, 500);
});

// 檢查日期並跳轉
loadConfig().then((data) => {
    if (new Date(data.date) - new Date() > 20000) {
        window.location.href = './index.html';
    }
});

// 將數據插入頁面
const fetchData = () => {
    loadConfig().then((data) => {
        Object.keys(data).forEach((key) => {
            if (data[key] !== '') {
                if (key === 'imagePath') {
                    document
                        .querySelector(`[data-node-name*="${key}"]`)
                        .setAttribute('src', data[key]);
                } else if (!['expressUrl', 'date'].includes(key)) {
                    document.querySelector(
                        `[data-node-name*="${key}"]`
                    ).innerText = data[key];
                }
            }
        });
    });
};

// 動畫時間軸
const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName('hbd-chatbox')[0];
    const hbd = document.getElementsByClassName('wish-hbd')[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
        .split('')
        .join('</span><span>')}</span`;

    hbd.innerHTML = `<span>${hbd.innerHTML
        .split('')
        .join('</span><span>')}</span`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: '15deg',
    };

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: '-15deg',
    };

    const tl = new TimelineMax();

    tl.to('.container', 0.1, {
        visibility: 'visible',
    })
        .from('.one', 0.7, {
            opacity: 0,
            y: 10,
        })
        .from('.two', 0.4, {
            opacity: 0,
            y: 10,
        })
        .to(
            '.one',
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            '+=2.5'
        )
        .to(
            '.two',
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            '-=1'
        )
        .from('.three', 0.7, {
            opacity: 0,
            y: 10,
        })
        .to(
            '.three',
            0.7,
            {
                opacity: 0,
                y: 10,
            },
            '+=2'
        )
        .from('.four', 0.7, {
            scale: 0.2,
            opacity: 0,
        })
        .from('.fake-btn', 0.3, {
            scale: 0.2,
            opacity: 0,
        })
        .staggerTo(
            '.hbd-chatbox span',
            0.5,
            {
                visibility: 'visible',
            },
            0.05
        )
        .to('.fake-btn', 0.1, {
            backgroundColor: '#8FE3B6',
        })
        .to(
            '.four',
            0.5,
            {
                scale: 0.2,
                opacity: 0,
                y: -150,
            },
            '+=0.7'
        )
        .from('.idea-1', 0.7, ideaTextTrans)
        .to('.idea-1', 0.7, ideaTextTransLeave, '+=1.5')
        .from('.idea-2', 0.7, ideaTextTrans)
        .to('.idea-2', 0.7, ideaTextTransLeave, '+=1.5')
        .from('.idea-3', 0.7, ideaTextTrans)
        .to('.idea-3 strong', 0.5, {
            scale: 1.2,
            x: 10,
            backgroundColor: 'rgb(21, 161, 237)',
            color: '#fff',
        })
        .to('.idea-3', 0.7, ideaTextTransLeave, '+=1.5')
        .from('.idea-4', 0.7, ideaTextTrans)
        .to('.idea-4', 0.7, ideaTextTransLeave, '+=1.5')
        .from(
            '.idea-5',
            0.7,
            {
                rotationX: 15,
                rotationZ: -10,
                skewY: '-5deg',
                y: 50,
                z: 10,
                opacity: 0,
            },
            '+=0.5'
        )
        .to(
            '.idea-5 .smiley',
            0.7,
            {
                rotation: 90,
                x: 8,
            },
            '+=0.4'
        )
        .to(
            '.idea-5',
            0.7,
            {
                scale: 0.2,
                opacity: 0,
            },
            '+=2'
        )
        .staggerFrom(
            '.idea-6 span',
            0.8,
            {
                scale: 3,
                opacity: 0,
                rotation: 15,
                ease: Expo.easeOut,
            },
            0.2
        )
        .staggerTo(
            '.idea-6 span',
            0.8,
            {
                scale: 3,
                opacity: 0,
                rotation: -15,
                ease: Expo.easeOut,
            },
            0.2,
            '+=1'
        )
        .staggerFromTo(
            '.baloons img',
            2.5,
            {
                opacity: 0.9,
                y: 1400,
            },
            {
                opacity: 1,
                y: -1000,
            },
            0.2
        )
        .from(
            '.lydia-dp',
            0.5,
            {
                scale: 3.5,
                opacity: 0,
                x: 25,
                y: -25,
                rotationZ: -45,
            },
            '-=2'
        )
        .from('.hat', 0.5, {
            x: -100,
            y: 350,
            rotation: -180,
            opacity: 0,
        })
        .staggerFrom(
            '.wish-hbd span',
            0.7,
            {
                opacity: 0,
                y: -50,
                rotation: 150,
                skewX: '30deg',
                ease: Elastic.easeOut.config(1, 0.5),
            },
            0.1
        )
        .staggerFromTo(
            '.wish-hbd span',
            0.7,
            {
                scale: 1.4,
                rotationY: 150,
            },
            {
                scale: 1,
                rotationY: 0,
                color: '#ff69b4',
                ease: Expo.easeOut,
            },
            0.1,
            'party'
        )
        .from(
            '.wish h5',
            0.5,
            {
                opacity: 0,
                y: 10,
                skewX: '-15deg',
            },
            'party'
        )
        .staggerTo(
            '.eight svg',
            1.5,
            {
                visibility: 'visible',
                opacity: 0,
                scale: 80,
                repeat: 3,
                repeatDelay: 1.4,
            },
            0.3
        )
        .to('.six', 0.5, {
            opacity: 0,
            y: 30,
            zIndex: '-1',
        })
        .staggerFrom('.nine p', 1, ideaTextTrans, 1.2)
        .to(
            '.last-smile',
            0.5,
            {
                rotation: 90,
            },
            '+=1'
        );

    // 添加按鈕事件
    loadConfig()
        .then((config) => {
            const expressUrl = config.expressUrl; // 獲取 expressUrl
            const replyBtn = document.getElementById('replay');
            replyBtn.addEventListener('click', () => {
                window.open(expressUrl);
            });
        })
        .catch((error) => {
            console.error('讀取配置時發生錯誤:', error);
        });
};

// 執行 fetch 和動畫初始化
fetchData();
