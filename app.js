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
    750: {
      slidesPerView: 2,
    },
    1220: {
      slidesPerView: 3,
    }
  }
})

/*----------------------------Theme---------------------------------------*/


const toggleBtns = document.querySelectorAll('.theme-toggle');
const root = document.documentElement;

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');

    if (currentTheme === 'dark') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
});




/*------------------------------------------------------------------------------------*/
setTimeout(() => {
  document.querySelector('.hello-screen-block').classList.add('close');
}, 3700);

setTimeout(() => {
  document.querySelector('.hello-screen-block').classList.add('close-1');
}, 5500);

setTimeout(() => {
  document.querySelector('.hello-screen-portfolio').classList.add('open');
}, 2500);



const burgerButton = document.getElementById('burger-button')
const sidebar = document.getElementById('sidebar')

const burgerButtonActiveClass = 'active'
const sidebarActiveClass = 'opened'
const bodyFixedClass = 'body--fixed'

// функция закрытия меню
function closeMenu() {
  burgerButton.classList.remove(burgerButtonActiveClass)
  sidebar.classList.remove(sidebarActiveClass)
  document.body.classList.remove(bodyFixedClass)
}

// бургер
burgerButton.addEventListener('click', function (e) {
  e.stopPropagation() // чтобы клик не дошёл до document
  burgerButton.classList.toggle(burgerButtonActiveClass)
  sidebar.classList.toggle(sidebarActiveClass)
  document.body.classList.toggle(bodyFixedClass)
})

// закрытие по клику на пункт меню
sidebar.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    closeMenu()
  }
})

// закрытие по клику вне меню
document.addEventListener('click', (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target)
  const isClickOnBurger = burgerButton.contains(e.target)

  if (!isClickInsideSidebar && !isClickOnBurger) {
    closeMenu()
  }
})



let touchStartX = 0
let touchEndX = 0
const swipeThreshold = 70 // минимальная дистанция свайпа

sidebar.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX
})

sidebar.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX
  handleSwipe()
})

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX

  // свайп влево → закрыть меню
  if (swipeDistance < -swipeThreshold) {
    closeMenu()
  }
}


const menuLinks = sidebar.querySelectorAll('a')

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerButton.classList.remove(burgerButtonActiveClass)
    sidebar.classList.remove(sidebarActiveClass)
    document.body.classList.remove(bodyFixedClass)
  })
})


const ranges = Array.from(document.querySelectorAll('[data-range]'))

ranges.forEach(range => {
  const control1 = range.querySelector('[data-range-control-1]')
  const control2 = range.querySelector('[data-range-control-2]')

  const label1 = range.querySelector('[data-control-label-1]')
  const label2 = range.querySelector('[data-control-label-2]')

  const track = range.querySelector('[data-range-track]')

  if (!control1 || !label1 || !control2 || !label2 || !track) return console.log('cidioc')

  const rangeMin = Number(range.getAttribute('data-range-min'))
  const rangeMax = Number(range.getAttribute('data-range-max'))

  let value1 = 0
  let value2 = 1

  let isControlMoving1 = false
  let isControlMoving2 = false

  updateCSSVariables()
  updateLabels()

  control1.addEventListener('mousedown', () => {
    isControlMoving1 = true
  })
  control1.addEventListener('touchstart', () => {
    isControlMoving1 = true
  })

  control2.addEventListener('mousedown', () => {
    isControlMoving2 = true
  })
  control2.addEventListener('touchstart', () => {
    isControlMoving2 = true
  })

  window.addEventListener('mousemove', (e) => {
    if(!isControlMoving1 && !isControlMoving2) return 

    const mouseX = e.touches ? e.touches[0].clientX : e.clientX
    const trackX = track.getBoundingClientRect().x
    const trackWidth = track.getBoundingClientRect().width

    const value = normalize((mouseX - trackX) / trackWidth)

    if(isControlMoving1) return updateValue1(value)
    if(isControlMoving2) return updateValue2(value)
  })

  window.addEventListener('touchmove', (e) => {
    if(!isControlMoving1 && !isControlMoving2) return 

    const mouseX = e.touches ? e.touches[0].clientX : e.clientX
    const trackX = track.getBoundingClientRect().x
    const trackWidth = track.getBoundingClientRect().width

    const value = normalize((mouseX - trackX) / trackWidth)

    if(isControlMoving1) return updateValue1(value)
    if(isControlMoving2) return updateValue2(value)
  })



  
  function updateValue1(value) {
    value1 = value
    updateCSSVariables()
    updateLabels()
  }
  function updateValue2(value) {
    value2 = value
    updateCSSVariables()
    updateLabels()
  }
  function updateLabels() {
    const amplitude = rangeMax - rangeMin
    label1.innerHTML = Math.round(value1 * amplitude + rangeMin)
    label2.innerHTML = Math.round(value2 * amplitude + rangeMin)
  }
  function updateCSSVariables() {
    range.style.setProperty('--value-1', value1)
    range.style.setProperty('--value-2', value2)
    range.style.setProperty('--min', Math.min(value1, value2))
    range.style.setProperty('--max', Math.max(value1, value2))
  }




  window.addEventListener('mouseup', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('touchend', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('mouseleave', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  window.addEventListener('touchcancel', () => {
    isControlMoving1 = false
    isControlMoving2 = false
  })
  

})

function normalize(value) {
  return clamp (0, value, 1)
}
function clamp(min, value, max) {
  if(value < min) return min
  if(value > max) return max
  return value
}




/*-------------------------------------------------------------------------------------*/
  const toTop = document.getElementById('toTop');
  const mainSection = document.getElementById('mainSection');

  window.addEventListener('scroll', () => {
    const rect = mainSection.getBoundingClientRect();

    if (rect.top <= 0) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  });

  toTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  /*--------------------------------------------------------------------------*/
  const burgerButtonExample = document.getElementById('burger-button-example')

  const burgerButtonActiveClassExample = 'active-example'

  burgerButtonExample.addEventListener('click', function(){
    burgerButtonExample.classList.toggle(burgerButtonActiveClassExample)
  })