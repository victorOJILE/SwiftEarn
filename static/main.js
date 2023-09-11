const elCls = (cls) => document.getElementsByClassName(cls);

const cEl = function(elem, props = {}, ...children) {
	let element = document.createElement(elem);
	if (props && typeof props == 'object') {
		for (let prop in props) {
			element[prop] = props[prop];
		}
	}
	children && element.append(...children);
	return element;
}

function isVisible(elem) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	let topVisible = coords.top > 0 && coords.top < windowHeight;
	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
	return topVisible || bottomVisible;
}

const carousel = elCls("carousel")[0];

const useIntersectionObserver = Boolean(IntersectionObserver);

function observeElem(elem, par, config) {
	let observer = new IntersectionObserver(
		function(entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					let el = entry.target;
					if (entry.intersectionRatio >= (config.intersect || 1.0)) {
						config.isVisible(el);
						typeof config.notVisible == 'boolean' && observer.unobserve(el);
					}
				} else {
					typeof config.notVisible == 'function' && config.notVisible(entry.target);
				}
			});
		}, {
			root: par,
			rootMargin: config.rootMargin || "0px",
			threshold: 1.0,
		});
	if (elem.length) {
		for (let el of elem) {
			observer.observe(el);
		}
	} else {
		observer.observe(elem);
	}
}

function navigateCarousel() {
	const buttonLeft = elCls("prev")[0];
	const buttonRight = elCls("next")[0];
	const carousel_dots = elCls('carousel-dots')[0];
	if (!carousel_dots) return;

	function getTargIndex(targ) {
		let parent = targ.parentElement;
		let index = 0;
		for (let child of parent.children) {
			if (child == targ) return index;
			index++
		}
		return -1;
	}

	observeElem(
		carousel.children[0], carousel, {
			isVisible: () => buttonLeft.classList.add('hidden'),
			notVisible: () => buttonLeft.classList.remove('hidden')
		});

	observeElem(carousel.children[carousel.children.length - 1], carousel, {
		isVisible: () => buttonRight.classList.add('hidden'),
		notVisible: () => buttonRight.classList.remove('hidden')
	});

	observeElem(carousel.children, carousel, {
		isVisible: function(elem) {
			let index = getTargIndex(elem);
			let dot = carousel_dots.children[index];
			for (let dot of carousel_dots.children) {
				dot.classList.remove('bg-white');
			}
			dot.classList.add('bg-white');
		}
	});

	carousel_dots.addEventListener('click', function(ev) {
		let targ = ev.target;
		if (targ.nodeName.toLowerCase() == 'span') {
			let index = getTargIndex(targ);
			let li = carousel.children[index];
			let liOffset = li.offsetLeft;
			if (liOffset > carousel.scrollLeft) {
				carousel.scrollBy({
					left: carousel.scrollLeft + liOffset,
					behavior: "smooth"
				});
			} else {
				carousel.scrollBy({
					left: -(carousel.scrollLeft - liOffset),
					behavior: "smooth"
				});
			}
		}
	});

	buttonLeft.addEventListener("click", () => {
		carousel.scrollBy({
			left: -carousel.offsetWidth / 2,
			behavior: "smooth"
		});
	});

	buttonRight.addEventListener("click", () => {
		carousel.scrollBy({
			left: carousel.offsetWidth / 2,
			behavior: "smooth"
		});
	});
}
navigateCarousel();

+
(function showElements() {
	const bounceInElem = elCls('bounceInAnim')[0];
	if (!bounceInElem) return;
	if (bounceInElem) {
		observeElem(
			bounceInElem, undefined, {
				isVisible: (elem) => setTimeout(() => elem.classList.add('bounceIn'), 1000),
				notVisible: (elem) => setTimeout(() => elem.classList.remove('bounceIn'), 1000)
			});
	} else {
		return
	}

	function addFadeInUpFunc(par, cls, mar) {
		observeElem(
			par.children, undefined, {
				isVisible: (elem) => elem.classList.remove(cls),
				notVisible: true,
				rootMargin: mar,
				intersect: 0.5
			}
		);
	}
	
	addFadeInUpFunc(elCls('fadeInUp1')[0], 'fadeInUp', '80%');
	for (let elem of elCls('fadeIn')) addFadeInUpFunc(elem, 'fadeInUp', "20%");
	
	let fadeInCorner = Array.from(elCls('fadeInCorner'));
	
	let scrollBusy = false;
	if(fadeInCorner) {
		window.addEventListener('scroll', function watch() {
			if(scrollBusy) return;
			scrollBusy = true;
			for(let elem of fadeInCorner) {
				if (isVisible(elem)) {
					elem.classList.remove(elem.dataset.corner);
					fadeInCorner.splice(fadeInCorner.findIndex(el => el == elem), 1);
					if(!fadeInCorner.length) window.removeEventListener('scroll', watch);
				}
			}
			setTimeout(() => scrollBusy = false, 200);
		});
	}
})()
+
(function() {
	function getTogglers() {
		return cEl('span', { className: 'pr-1', innerHTML: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.2em" height="1.2em"  xmlns="http://www.w3.org/2000/svg"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
			<svg class="hidden" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.2em" height="1.2em"  xmlns="http://www.w3.org/2000/svg"> <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" /></svg>` });
	}

	function generateFaq(data) {
		let togglers = getTogglers();
		let toggler = cEl('div', { className: 'flex items-center justify-between p-3' },
			cEl('h2', { textContent: data.question, className: 'mr-3 text-sm' }), togglers
		);
		let answer = cEl('div', { className: 'hidden p-4' });
		for (let ans of data.answers) {
			answer.append(cEl('p', { className: 'leading-relaxed mb-4', innerHTML: ans }));
		}
		let li = cEl('li', { className: 'mb-3 border-2 border-gray-200 rounded-lg' }, toggler, answer);
		toggler.addEventListener('click', function() {
			for (let toggle of togglers.children) {
				toggle.classList.toggle('hidden');
			}
			answer.classList.toggle('hidden');
		});
		return li;
	}

	let faqs = [
		{
			question: 'What is SwiftEarn in particular?',
			answers: ['SwiftEarn is an innovative online platform where you get to learn and earn, simplifying the process of starting an online business.', 'We have an online marketplace for vendors, affiliates and massive buyers, providing you with the necessary tools, products, and training to sell services and digital products without the usual complexities.', 'By partnering with top course creators and vendors, we offer you an opportunity to earn a share of their profits as an affiliate.']
			}, {
			question: 'How do I become an affiliate on SwiftEarn?',
			answers: ["Getting started with SwiftEarn is simple. Just sign up for free on our website, and upon registration, explore our marketplace's offerings, select the products you wish to promote, and start earning commissions.", "Signing up as an affiliate on SwiftEarn is absolutely <b>free</b>, because we earn only if you earn.", ""]
			}, {
			question: 'Is there a cost to join SwiftEarn?',
			answers: ['Absolutely not. Joining SwiftEarn is completely free. We firmly believe in the principle of "pay when you get paid."', 'There are no registration fees or annual subscriptions required. We only earn a small transaction fee when you earn (make a sale and receive payment).', "Whether you're a beginner or an experienced marketer, SwiftEarn offers opportunities for everyone."]
			}, {
			question: 'How does SwiftEarn help me track my sales and performance?',
			answers: ['SwiftEarn offers a robust analytics system integrated into your personalized dashboard, ensuring you have a clear understanding of your sales performance, earnings, and payment schedules.']
			}, {
			question: 'Who are the vendors and affiliates?',
			answers: ['The vendor refers to the person who owns the product that is been sold.', 'Affiliates are marketers who recommend the products on the platform to people and when any of the people they refer buys, they get a commission.', 'Customers are simply those who purchase the products being sold on SwiftEarn.']
			},
			{
			question: 'How often are payments made to affiliates?',
			answers: ['At SwiftEarn, we believe in rewarding your efforts promptly. As an affiliate, you will receive payments on a weekly basis.', 'This allows you to enjoy the fruits of your sales efforts more frequently and helps you maintain a steady income stream.']
			}, {
			question: 'How do I withdraw my earnings from SwiftEarn?',
			answers: ['Withdrawing your earnings from SwiftEarn is simple and convenient. Once you have accumulated sufficient funds in your account, you can initiate a withdrawal request.', 'SwiftEarn pays both vendors and affiliates via bank deposit. Your money is sent to a valid bank account bearing your registered name.', 'Affiliates and vendors are paid on a weekly basis at the end of the week.']
			}, {
			question: 'Is there a minimum sales threshold to receive payments as an affiliate on SwiftEarn?',
			answers: ['SwiftEarn does not impose a minimum sales threshold for affiliates to receive payments.', 'You will receive payments for your successful sales regardless of the quantity or value of those sales.']
			}, {
			 question: 'Does SwiftEarn provide training or resources for beginners in affiliate marketing?',
			 answers: ['Yes. We provide comprehensive training resources, guides, and tutorials to help beginners understand the fundamentals of affiliate marketing and navigate the platform effectively.']
			}
		];
	let faqDomUl = document.getElementsByClassName('faqs')[0];
	faqs.forEach(each => faqDomUl.append(generateFaq(each)));
})()

/* Scroll to top */

let bottomToTop = document.getElementsByClassName('scrollToTop')[0];
bottomToTop.onclick = () => document.body.scrollIntoView();

window.addEventListener('scroll', function() {
	if (document.documentElement.scrollTop >= window.innerHeight) {
		bottomToTop.classList.remove('hidden');
	} else {
		bottomToTop.classList.add('hidden');
	}
});
