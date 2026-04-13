// 見出しテキスト切り替え
const rotatingText = document.getElementById('rotating-text');
const words = [
  '問い合わせにつながる',
  '信頼感を高める',
  '行動を後押しする'
];

if (rotatingText) {
  let wordIndex = 0;
  rotatingText.style.display = 'inline-block';
  rotatingText.style.transition = 'all .25s ease';

  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    rotatingText.style.opacity = 0;
    rotatingText.style.transform = 'translateY(8px)';

    setTimeout(() => {
      rotatingText.textContent = words[wordIndex];
      rotatingText.style.opacity = 1;
      rotatingText.style.transform = 'translateY(0)';
    }, 180);
  }, 2500);
}

// FAQ開閉
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    if (item) item.classList.toggle('open');
  });
});

// スクロール表示
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => revealObserver.observe(el));
}

// 数値カウントアップ
const counters = document.querySelectorAll('.counter');
const statsBand = document.querySelector('.stats-band');
let counted = false;

if (statsBand && counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;

        counters.forEach((counter) => {
          const target = Number(counter.dataset.target || 0);
          const suffix = counter.dataset.suffix || '';
          const duration = 1400;
          const start = performance.now();

          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              counter.textContent = target + suffix;
            }
          };

          requestAnimationFrame(animate);
        });
      }
    });
  }, { threshold: 0.4 });

  counterObserver.observe(statsBand);
}

// 追従CTA
const floatingCta = document.getElementById('floatingCta');
window.addEventListener('scroll', () => {
  if (!floatingCta) return;
  floatingCta.style.display = window.scrollY > 700 ? 'block' : 'none';
});
