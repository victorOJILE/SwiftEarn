import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDocs, where, collection, query } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

import loader from '../components/loader.js';
import { icons } from '../icons.js';
import Header from '../header.js';
import generateList from '../components/productList.js';
import HighDemandProducts from '../components/highDemandProducts.js';

const db = getFirestore(firebase_app);

function Marketplace() {
 let productPage = new URL(location.href);
 let currentPage = productPage.searchParams.get('page');

 let comp = cEl('div', {}, loader());

 const form = cEl('form', { name: 'searhMarketPlace', class: 'grid grid-cols-6 items-center bg-gray-500 mx-4 max-w-xl mx-auto' },
  cEl('input', { class: 'col-span-5 p-3 bg-gray-500 placeholder-gray-300 text-xs text-gray-100 outline-none', type: 'search', name: 'q', placeholder: 'Search marketplace' }),
  cEl('button', { class: 'col-span-1 text-gray-100 py-2 flex items-center justify-center', type: 'submit' }, svg(icons.search))
 );

 const pagination = cEl('div', { class: 'container flex items-center justify-center text-gray-400 mt-4' });

 function getData() {
  getDocs(collection(db, 'products'))
   .then(doc => {
    let data = [];
    doc.forEach(d => data.push(d.data()));
 	  let len = data.length;
    let slicedPage = currentPage ? (currentPage * 15) - 15 : 0;
    data = data.slice(slicedPage, 15);
    
    if(!len) {
     comp.empty();
     comp.append(
      cEl('section', { class: 'px-2' },
       cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No products at the moment!', class: 'block p-3 border text-sm' }))
      )
     );
     return;
    }
    
    function rerender(data) {
     comp.empty();
     
     comp.append(cEl('ul', { class: 'color2 bg-custom-main-bg grid md:grid-cols-2 md:gap-12' },
      ...data.map(product => (product.vendor_id && generateList(product)) || '')
     ));
    }
    
    rerender(data);

    form.ae('submit', function(e) {
     e.preventDefault();
     let q = form.q.value;
     if (!q) rerender(data);
     let qSplit = q.split(' ');
     let match = [];

     for (let product of data) {
      let result = { product, count: 0 };
      for (let word of qSplit) {
       if (word && product.title.toLowerCase().indexOf(word.toLowerCase()) != -1) {
        result.count++;
       }
      }
      if (result.count) {
       match.push(result);
      }
     }
     match = match.sort((a, b) => a.count - b.count).reverse();
     match = match.map(a => a.product);

     match.length ? rerender(match) : rerender(data);
    });
    setTimeout(function() { // Marketplace pagination
     if (len < 15) return;
     pagination.innerHTML = '';
     // 15 is the maximum number of allowed children in the DOM
     let count = Math.floor(len / 15);
     // 35 is the custom client width for the link element below
     let looplen = pagination.clientWidth / 35;
     let linkCount = 1;

     for (; linkCount <= count && linkCount < looplen; linkCount++) {
      let text = linkCount == Math.floor(looplen) ? count : linkCount;
      let url = linkCount > 1 ? './marketplace.html?page=' + text : './marketplace.html';

      let link = cEl('a', { href: url, textContent: text, className: 'border-2 border mr-1 w-8 h-8 flex justify-center items-center' });
      pagination.append(link);
     }

     if (linkCount > Math.floor(looplen)) {
      pagination.insertBefore(cEl('span', { textContent: '...', className: 'mr-1' }), pagination.lastElementChild);
     }

     window.addEventListener('resize', () => marketplacePagination(len));
    }, 500);
  });
 };
 getData();

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
  cEl('section', { class: 'mb-4' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'SwiftEarn Marketplace' }),
   cEl('p', { class: 'text-xs md:text-lg color4 md:py-4', textContent: 'Welcome to our vibrant and dynamic marketplace, where endless possibilities and extraordinary deals await you!' })
  ),
  cEl('section', {},
   form
  ),
  cEl('section', { class: 'my-12' },
   cEl('h2', { class: 'text-xl my-2 flex items-center' },
    cEl('span', { class: 'color4' }, svg(icons.marketplace)),
    document.createTextNode('Available Products')
   ),
   comp, pagination
  ),
  HighDemandProducts()
 );

 return main;
}

function AuthWrapper() {
 const page = cEl('header', { class: 'fixed top-0 left-0 w-full'},
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: '/' },
    cEl('img', { src: '/static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: '/login.html', textContent: 'Login', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
  )
 );
 const body = document.body;
 body.classList.remove('grid');
 body.classList.remove('md:grid-cols-5');
 body.innerHTML = '';
 body.append(page);

 return body;
}

unsubscribe.authenticate = function(type, user) {
 let myPage = type ? Header('Marketplace', user.uid) : AuthWrapper();
  
 myPage.append(Marketplace());
}
