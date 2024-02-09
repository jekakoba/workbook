// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


let particles = document.querySelectorAll('canvas.particles'),
	radius = 1.95,
	number = 60

particles.forEach(node => {
	const color = node.dataset.color,
		ctx = node.getContext('2d'),
		clr = hexToRgbA(color),
		width = window.innerWidth,
		height = window.innerHeight

	node.width = width
	node.height = height
	ctx.fillStyle = clr

	let dots = {
		num: number,
		distance: 200,
		d_radius: 200,
		velocity: -.9,
		array: []
	}

	function Dot() {
		this.x = Math.random() * width
		this.y = Math.random() * height
		this.vx = dots.velocity + Math.random()
		this.vy = dots.velocity + Math.random()
		this.radius = Math.random() * radius
	}

	Dot.prototype = {
		create: function () {
			ctx.beginPath()
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
			ctx.fill()
		},

		animate: function () {
			if (this.x < 0 || this.x > width) {
				this.vx = -this.vx
			}
			if (this.y < 0 || this.y > height) {
				this.vy = -this.vy
			}
			this.x += this.vx
			this.y += this.vy
		}
	}

	function createDots() {
		ctx.clearRect(0, 0, width, height)
		for (let i = 0; i < dots.num; i++) {
			if (!dots.array[i]) {
				dots.array[i] = new Dot()
				dots.array[i].create()
			} else {
				dots.array[i].animate()
				dots.array[i].create()
			}
		}
		requestAnimationFrame(createDots)
	}

	createDots()
})

function hexToRgbA(hex) {
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		let c = hex.substring(1).split('')
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]]
		}
		c = `0x${c.join('')}`
		return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, 1`
	}
	throw new Error('Bad Hex')
}



const goTop = document.querySelector('.top');

if (goTop) {
	window.addEventListener('scroll', function (e) {
		window.scrollY > window.innerHeight / 2 ? goTop.classList.add('back-to-top-show') : goTop.classList.remove('back-to-top-show');
	});

}
