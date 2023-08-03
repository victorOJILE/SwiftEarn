const elCls = (cls) => document.getElementsByClassName(cls);
const elId = (id) => document.getElementById(id);

Element.prototype.addCss = function(val = {}) {
	for (let i of Object.keys(val)) {
		this.style[i] = val[i];
	}
};

Element.prototype.empty = function() {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
}

let isMobile;
(function isMobileF() {
	if (isMobile == null) {
		try {
			document.createEvent("TouchEvent");
			isMobile = true;
		} catch (e) {
			isMobile = false;
		}
	}
})();

Element.prototype.ae = function(type, callback, props = {}) {
	this.addEventListener(type, callback, props);
};

Element.prototype.re = function(type, callback, props = {}) {
	this.removeEventListener(type, callback, props);
};

String.prototype.capitalize = function() {
	return this.length > 1 ? this[0].toUpperCase() + this.slice(1) : this.toUpperCase();
};

let useIntersectionObserver = false;
if (IntersectionObserver) {
	useIntersectionObserver = true;
}

// Create html DOM elements
/**
 * @param {string} elem - Type of element
 */
const cEl = function(elem, props = {}, ...children) {
	let element = document.createElement(elem);
	if (props && typeof props == 'object') {
		for (let prop in props) {
			let properties = {
				class() {
					if (props[prop].includes(' ')) {
						let cls = props[prop].split(' ');
						iter(cls, each => element.classList.add(each));
					} else {
						element.classList.add(props[prop]);
					}
				},
				data() {
					for (let d in props[prop]) {
						element.dataset[d] = props[prop][d];
					}
				},
				style() {
					element.addCss(props[prop]);
				},
				event() {
					for (let ev in props[prop]) {
						element.ae(ev, props[prop][ev]);
					}
				}
			}
			properties[prop] ? properties[prop]() : (element[prop] = props[prop]);
		}
	}
	if (children) {
		for (let child of children) element.append(child);
	}
	return element;
}

const iter = function(v, func) {
	if (v == null || typeof v === undefined) return alert('Error: First parameter is not an iterable!');
	if (v.constructor.name === 'Object') {
		for (let key in v) {
			func(key, v[key], v);
		}
		return;
	}

	let iterator = v[Symbol.iterator]();
	let i = 0;
	while (true) {
		let result = iterator.next();
		if (result.done) break;
		func(result.value, i++, v);
	}
}

function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		return window.clipboardData.setData("Text", text);
	} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
		let textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";
		document.body.appendChild(textarea);
		textarea.select();
		try {
			return document.execCommand("copy");
		} catch (ex) {
			console.warn("Copy to clipboard failed.", ex);
			return prompt("Copy to clipboard: Ctrl+C, Enter", text);
		} finally {
			document.body.removeChild(textarea);
		}
	}
}

function svg(str) {
	let i = cEl('i', { innerHTML: str });
	return i.firstElementChild;
}

function isVisible(elem) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	let topVisible = coords.top > 0 && coords.top < windowHeight;
	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
	return topVisible || bottomVisible;
}

/**
 * @param {object} config
 * @param {string} config.rootMargin
 * @param {Function} config.isVisible
 * @param {Function|Boolean} config.notVisible
 */
function observeElem(elem, parent, config) {
	let observer = new IntersectionObserver(
		function(entries) {
			iter(entries, entry => {
				if (entry.isIntersecting) {
					let el = entry.target;
					if (entry.intersectionRatio >= (1.0)) {
						config.isVisble(el);
						typeof config.notVisible == 'boolean' && observer.unobserve(el);
					}
				} else {
					typeof config.notVisible == 'function' && config.notVisible(entry.target);
				}
			});
		}, {
			root: parent,
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

const rank = {
	1: '/static/images/coffee-badge.webp',
	2: '/static/images/coffee-badge.webp'
};
