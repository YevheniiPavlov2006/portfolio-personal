new Swiper('.work-slider', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    }
  }
})

/*-------------------------------------------------------------------*/

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const ratio = entry.intersectionRatio;

    // Показываем, когда 30% видно
    if (ratio >= 0.4) {
      entry.target.classList.add('show');
    }

    // Убираем, когда полностью ушел
    if (ratio === 0) {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: [0, 0.4]
});

document.querySelectorAll('.animation-part').forEach(el => {
  observer.observe(el);
});



const block = document.querySelector('.about-photos-block');
const lines = document.querySelectorAll('.about-photo-line');

const observer1 = new IntersectionObserver(
  ([entry]) => {
    if (entry.intersectionRatio >= 0.4) {
      lines.forEach(line => line.classList.add('animated'));
    } else if (entry.intersectionRatio === 0) {
      lines.forEach(line => line.classList.remove('animated'));
    }
  },
  {
    threshold: [0, 0.4], // следим за нулем и 40%
  }
);

observer1.observe(block);

const info = document.querySelector('.about-info');

const observer2 = new IntersectionObserver(
  ([entry]) => {
    if (entry.intersectionRatio >= 0.4) {
      info.classList.add('animated');
    } else if (entry.intersectionRatio === 0) {
      info.classList.remove('animated');
    }
  },
  {
    threshold: [0, 0.4], // то же самое
  }
);

observer2.observe(info);