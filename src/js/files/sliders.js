/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Thumbs, Controller } from 'swiper/modules';

/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

import "../../scss/base/swiper.scss";
const sliderCatalog = document.querySelector('.catalog__slider');
let mySwiper;
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
				prevEl: '.navigation__button_prev',
				nextEl: '.navigation__button_next',
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

					// pagination: {
					// 	el: '.catalog__slider-pagination',
					// 	clickable: true,
					// 	dynamicBullets: true,
					// },

					navigation: {
						prevEl: '.navigation-catalog-preset-prev',
						nextEl: '.navigation-catalog-preset-next',
					},

					breakpoints: {
						320: {
							slidesPerView: 1,
							autoHeight: true,
						},
						479.98: {
							autoHeight: true,
							slidesPerView: 1.5,
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


	//===================================================================================================//

	if (document.querySelector('.product__slider-wrapper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		let thumbsSwiper = new Swiper('.product-preview-images__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Thumbs, Controller],
			observer: true,
			observeParents: true,
			slidesPerView: 6,
			speed: 1000,
			slideToClickedSlide: true,
			spaceBetween: 8,
			grabCursor: true,
			// Кнопки "вліво/вправо"

			navigation: {
				prevEl: '.product-preview-images__arrow_prev',
				nextEl: '.product-preview-images__arrow_next',
			},


			// Брейкпоінти

			breakpoints: {
				320: {
					slidesPerView: 2,

				},
				479.98: {
					slidesPerView: 4,

				},
				600.98: {
					slidesPerView: 6,

				}
			},

			// Події
			on: {

			}
		});
		// Створюємо слайдер
		new Swiper('.product-images__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Thumbs, Controller, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			speed: 1000,
			grabCursor: true,
			navigation: {
				prevEl: '.item-catalog__navigation-btn_prev-slide-gallery',
				nextEl: '.item-catalog__navigation-btn_next-slide-gallery',
			},
			thumbs: {
				swiper: thumbsSwiper
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			// Події
			on: {

			}
		});
	}


	//===================================================================================================//

	if (document.querySelector('.item-catalog__slider')) { // Вказуємо склас потрібного слайдера
		const sl = new Swiper('.item-catalog__slider', { // Вказуємо склас потрібного слайдера
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			spaceBetween: 0,
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

	// Свайпер на сторінці з товарами

	if (document.querySelector('.other-presets__slider')) { // Вказуємо склас потрібного слайдера
		new Swiper('.other-presets__slider', { // Вказуємо склас потрібного слайдера
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			speed: 800,

			pagination: {
				el: '.workbook-content__pagination',
				clickable: true,
			},

			// Скроллбар
			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.navigation-other-preset-prev',
				nextEl: '.navigation-other-preset-next',
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20,
				},

				479.98: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				991.98: {
					slidesPerView: 3,
					spaceBetween: 40,
				},
				1200.98: {
					slidesPerView: 4,
					spaceBetween: 60,
					// Події
					on: {

					},
				},

			},

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