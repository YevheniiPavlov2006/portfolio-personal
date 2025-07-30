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
    if (ratio >= 0.3) {
      entry.target.classList.add('show');
    }

    // Убираем, когда полностью ушел
    if (ratio === 0) {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: [0, 0.3]
});

document.querySelectorAll('.animation-part').forEach(el => {
  observer.observe(el);
});