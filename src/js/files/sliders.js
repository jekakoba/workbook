/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
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
const sliderCatalog = document.querySelector('.catalog__slider');
let mySwiper;
// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector('.workbook-content__slider')) { // Вказуємо склас потрібного слайдера
		const sl = new Swiper('.workbook-content__slider', { // Вказуємо склас потрібного слайдера
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

	if (sliderCatalog) {
		if (window.innerWidth <= 767.98 && sliderCatalog.dataset.mobile == "false") {
			if (document.querySelector('.catalog__slider')) { // Вказуємо клас потрібного слайдера
				mySwiper = new Swiper('.catalog__slider', { // Вказуємо клас потрібного слайдера
					modules: [Navigation, Pagination],
					observer: true,
					observeParents: true,
					slidesPerView: 2,
					spaceBetween: 30,
					speed: 800,
					pagination: {
						el: '.catalog__slider-pagination',
						clickable: true,
						dynamicBullets: true,
					},

					breakpoints: {
						320: {
							slidesPerView: 1,
							spaceBetween: 40,
						},
						479.98: {
							slidesPerView: 1.5,
							spaceBetween: 20,
						},
						767.98: {

						},
					},
					// Події
					on: {
					}
				});
				sliderCatalog.dataset.mobile = 'true';
			}
		}
	}

	if (document.querySelector('.item-catalog__slider')) { // Вказуємо склас потрібного слайдера
		const sl = new Swiper('.item-catalog__slider', { // Вказуємо склас потрібного слайдера
			modules: [Navigation, Pagination, EffectFade],
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			spaceBetween: 100,
			speed: 800,
			grabCursor: true,
			slidesPerView: 1,
			effect: 'fade',
			nested: true,
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.item-catalog__navigation-btn_prev',
				nextEl: '.item-catalog__navigation-btn_next',
			},
		});
	}

	if (sliderCatalog) {
		if (window.innerWidth > 767.98) {
			sliderCatalog.dataset.mobile = "false";
			if (sliderCatalog.classList.contains('swiper-initialized')) {
				mySwiper.destroy();
			}
		}
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

// window.addEventListener("load", function (e) {
// 	// Запуск ініціалізації слайдерів
// 	initSliders();
// 	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
// 	//initSlidersScroll();
// });

window.addEventListener('resize', () => {
	initSliders();
});
window.addEventListener("load", function (e) {

	initSliders();

});