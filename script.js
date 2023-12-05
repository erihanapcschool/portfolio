'use strict';

//ローディングが終わったら#loadingに.loadedを追加
const loading = document.querySelector('#loading');

window.addEventListener('load', () => {
    loading.classList.add('loaded');
});

//上から300以上スクロールしたら#page-topに.openを追加し、300未満の時は.openをはずす
const getScrollY = () => {
    const scrolled = window.scrollY;
    const pageTop = document.querySelector('#page-top');

    if (scrolled >= 1500) {
        pageTop.classList.add('open');
    } else {
        pageTop.classList.remove('open');
    }
};

window.addEventListener('scroll', getScrollY);


$(function () {
	$('.btn-gNav').on("click", function () {
		$('.gnav').toggleClass('open');  // メニューにopenクラスをつけ外しする
	});
});


//マウスストーカー用のdivを取得
const stalker = document.getElementById('stalker');

//aタグにホバー中かどうかの判別フラグ
let hovFlag = false;

//マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
document.addEventListener('mousemove', function (e) {
    if (!hovFlag) {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    }
});

//リンクへ吸い付く処理
const linkElem = document.querySelectorAll('a:not(.no_stick_)');
for (let i = 0; i < linkElem.length; i++) {
    //マウスホバー時
    linkElem[i].addEventListener('mouseover', function (e) {
        hovFlag = true;

        //マウスストーカーにクラスをつける
        stalker.classList.add('hov_');

        //マウスストーカーの位置をリンクの中心に固定
        let rect = e.target.getBoundingClientRect();
        let posX = rect.left + (rect.width / 2);
        let posY = rect.top + (rect.height / 2);

        stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    });

    //マウスホバー解除時
    linkElem[i].addEventListener('mouseout', function (e) {
        hovFlag = false;
        stalker.classList.remove('hov_');
    });
}

//対象が画面に入ったらフェードイン
const animateFade = (entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate({
                opacity: [0, 1],
                filter: ['blur(.4rem)', 'blur(0)'],
                translate: ['0 4rem', 0],
            }, {
                duration: 2000,
                easing: 'ease',
                fill: 'forwards',
            });
            obs.unobserve(entry.target);
        };
    });
};

const fadeObserver = new IntersectionObserver(animateFade);

const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
    fadeObserver.observe(fadeElement);
});

// スライドショーの画像要素を取得
const slideshow = document.getElementById('slideshow');
const slides = slideshow.getElementsByTagName('img');
const slideCount = slides.length;
let currentIndex = 0;

// 最初の画像にactiveクラスを追加
slides[currentIndex].classList.add('active');

// 一定の時間間隔で画像を切り替えるタイマーを設定
setInterval(() => {
  // 現在の画像を非表示にする
  slides[currentIndex].classList.remove('active');
  // 次の画像のインデックスを計算
  currentIndex = (currentIndex + 1) % slideCount;
  // 次の画像を表示する
  slides[currentIndex].classList.add('active');
}, 3000); // 3秒ごとに切り替える（適宜時間を調整



//ふよふよ
document.querySelector(".square").animate({
    borderRadius: [
        "50% 50% 50% 70%/50% 50% 70% 60%",
        "80% 30% 50% 50%/50%",
        "40% 40% 50% 40%/30% 50% 40% 80%"
    ]
}, {
    iterations: Infinity,
    direction: "alternate",
    duration: 7000
});