import { db, getDocs, where, collection, query } from '../src/header.js';
import { chevronLeft, chevronRight, marketplace } from '../src/icons.js';
import loader from './loader.js';

export default function highDemandProducts() {
 const comp = cEl('section', { class: 'py-8 bg-custom-main-bg relative' }, loader());
 let loaded = false;
 
 function getData() {
  getDocs(query(collection(db, "products"), where('status', '==', 'Approved')))
  .then(doc => {
   loaded = true;
   let data = [];
   doc.forEach(d => data.push(d.data()));
   
   data = data.slice(0, 5);
   if (!data.length) {
    comp.empty();
    comp.append(
     cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No products at the moment!', class: 'block p-3 border text-sm' }))
    );
    return;
   }
   
   const carousel = cEl('ul', { class: 'flex overflow-auto color2 mb-4 carousel' }, ...data.map(each => generateHighDemandProducts(each)));
   const buttonLeft = cEl('button', { class: 'absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer left-0' }, svg(chevronLeft));
   const buttonRight = cEl('button', { class: 'absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-50 text-black text-2xl outline-none cursor-pointer right-0' }, svg(chevronRight));
   const carousel_dots = cEl('div', { class: 'text-center py-2 carousel-dots' },
    ...data.map(each => cEl('span', { class: 'inline-block w-3 h-3 rounded-full border-2 border mx-1 bg-gray-400 transition-colors duration-900' }))
   );
   
   comp.empty();
   
   comp.append(
    carousel, buttonLeft, buttonRight, carousel_dots,
    cEl('div', { class: 'text-center border' },
     cEl('a', { href: '/SwiftEarn/marketplace.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more' })
    )
   );
  
   navigateCarousel(carousel, buttonLeft, buttonRight, carousel_dots);
  })
  .catch(e => !loaded && setTimeout(getData, 5000));
 }
 getData();
 
 const div = cEl('section', {},
  cEl('h2', { class: 'text-xl mt-12 mb-2 flex items-center' },
   cEl('span', { class: 'color4' }, svg(marketplace)),
   'High Demand Products'
  ),
  comp
 );

 return div;
}

function generateHighDemandProducts(product) {
 return cEl('li', { className: 'm-2' },
  cEl('div', { className: 'mb-2 overflow-hidden' },
   cEl('img', { src: product.productImageUrl || '/SwiftEarn/static/images/krakenimages-376KN_ISplE-unsplash.jpg' })
  ),
  cEl('a', { href: '/SwiftEarn/product/product.html?prdid=' + encodeURIComponent(product.product_id) },
   cEl('h3', { className: 'line-clamp', textContent: product.name }),
   cEl('p', { className: 'text-sm text-gray-400', textContent: `Created by: ${product.vendor_name}` }),
   cEl('span', { className: 'font-bold', textContent: `${product.currency}${product.price}` }),
   cEl('span', { className: 'px-2 text-gray-400' },
    cEl('span', { textContent: '|' })
   ),
   cEl('span', { className: 'text-sm text-yellow-600', textContent: (product.commission) + '% comm' })
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