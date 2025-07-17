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



const buttonViewAll = document.getElementById('button-viewAll')
const worksSlider = document.getElementById('work')
const workGrid = document.getElementById('workGrid')
const buttonBack = document.getElementById('buttonBack')

buttonViewAll.addEventListener('click', function(){
  worksSlider.style.display = 'none'
  workGrid.style.display = 'block'
})

buttonBack.addEventListener('click', function(){
  worksSlider.style.display = 'block'
  workGrid.style.display = 'none'
})