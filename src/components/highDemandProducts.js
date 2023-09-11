//import { db, getDocs, where, collection, query } from '../header.js';
import { chevronLeft, chevronRight, marketplace } from '../icons.js';
import loader from './loader.js';

export default function highDemandProducts() {
 let products = [
  {
   title: 'The Complete Python Bootcamp from Zero to Hero in Python',
   imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
   vendor: 'Julius Berger',
   currentPrice: '#3,000',
   oldPrice: '#4,500',
   commission: '50'
		},
  {
   title: 'Affiliate Marketing Accelerator Program',
   imgsrc: 'space-art-5626853_1282.jpg',
   vendor: 'Nwnaka Chukwu',
   currentPrice: '#2,500',
   oldPrice: '#5,000',
   commission: '45'
			},
  {
   title: 'AMAZON KDP FOR SMARTPHONE',
   imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
   vendor: 'Gregory Joshua',
   currentPrice: '#1,500',
   oldPrice: '#3,000',
   commission: '50'
			},
  {
   title: 'The Complete Python Bootcamp from Zero to Hero in Python',
   imgsrc: 'space-art-5626853_1282.jpg',
   vendor: 'Julius Berger',
   currentPrice: '#3,000',
   oldPrice: '#4,500',
   commission: '50'
			}
	];
 let comp = loader();
 if (0) {
 
 } else {
  const carousel = cEl('ul', { class: 'flex overflow-auto color2 mb-4 carousel' }, ...products.map(each => generateHighDemandProducts(each)));
  const buttonLeft = cEl('button', { class: 'absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer left-0' }, svg(chevronLeft));
  const buttonRight = cEl('button', { class: 'absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer right-0' }, svg(chevronRight));
  const carousel_dots = cEl('div', { class: 'text-center py-2 carousel-dots' },
   ...products.map(each => cEl('span', { class: 'inline-block w-3 h-3 rounded-full border-2 border mx-1 bg-gray-400 transition-colors duration-900' }))
  );

  comp = cEl('section', { class: 'py-8 bg-custom-main-bg relative' },
   carousel, buttonLeft, buttonRight, carousel_dots,
   cEl('div', { class: 'text-center border' },
    cEl('a', { href: urlPrefix + 'marketplace.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more' })
   )
  );

  navigateCarousel(carousel, buttonLeft, buttonRight, carousel_dots);
 }

 const div = cEl('section', {},
  cEl('h2', { class: 'text-xl mt-12 mb-2 flex items-center' },
   cEl('span', { class: 'color4' }, svg(marketplace)),
   document.createTextNode('High Demand Products')
  ), comp);

 return div;
}

function generateHighDemandProducts(product) {
 return cEl('li', { className: 'm-2' },
  cEl('div', { className: 'mb-2 overflow-hidden' },
   cEl('img', { src: urlPrefix + 'static/images/' + product.imgsrc })
  ),
  cEl('a', { href: product.href || '' },
   cEl('h3', { className: 'line-clamp', textContent: product.title || '' }),
   cEl('p', { className: 'text-sm text-gray-400', textContent: product.vendor || '' }),
   cEl('span', { className: 'font-bold', textContent: product.currentPrice || '' }),
   cEl('span', { className: 'px-2 text-gray-400' },
    cEl('span', { textContent: '|' })
   ),
   cEl('span', { className: 'text-sm text-yellow-600', textContent: (product.commission || '') + '% comm' })
  )
 );
}

function navigateCarousel(carousel, buttonLeft, buttonRight, carousel_dots) {

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
   isVisble: () => buttonLeft.classList.add('hidden'),
   notVisible: () => buttonLeft.classList.remove('hidden')
  });

 observeElem(carousel.children[carousel.children.length - 1], carousel, {
  isVisble: () => buttonRight.classList.add('hidden'),
  notVisible: () => buttonRight.classList.remove('hidden')
 });

 observeElem(carousel.children, carousel, {
  isVisble: function(elem) {
   let index = getTargIndex(elem);
   let dot = carousel_dots.children[index];
   for (let dot of carousel_dots.children) {
    dot.classList.remove('bg-gray-400');
   }
   dot.classList.add('bg-gray-400');
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