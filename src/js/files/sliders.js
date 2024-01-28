/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// EffectCoverflow
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.workbook-content__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		const sl = new Swiper('.workbook-content__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			spaceBetween: 100,
			speed: 800,
			grabCursor: true,
			loop: true,
			loopAdditionalSlides: 2,
			slidesPerView: 2,
			pagination: {
				el: '.workbook-content__pagination',
				clickable: true,
			},

			// Скроллбар
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button_prev',
				nextEl: '.swiper-button_next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},

			
			*/
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				767.98: {
					slidesPerView: 2,
					spaceBetween: 50,
					// Події
					on: {

					},
				},

			},

		});

		// Викликаємо slideTo, якщо слайдер вже завантажений та ширина екрану більше 767.98px
		if (window.innerWidth > 767.98 && sl.initialized) {
			sl.slideTo(2, 0, false);
		} else {
			// Якщо слайдер ще не завантажено або ширина екрану менше 767.98px, чекаємо подію 'init'
			sl.on('init', function () {
				if (window.innerWidth > 767.98) {
					this.slideTo(2, 0, false);
				}
			});
		}

		// Якщо ви хочете викликати slideTo при кожному ресайзі (при ширині більше 767.98px)
		window.addEventListener('resize', function () {
			if (window.innerWidth > 767.98) {
				sl.slideTo(2, 0, false);
			}
		});

	}


}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});