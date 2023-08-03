/*import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDocs, where, collection, query } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';*/
import loader from '../components/loader.js';
import { icons } from '../icons.js';
import Header from '../header.js';
import generateList from '../components/productList.js';
import HighDemandProducts from '../components/highDemandProducts.js';

//const db = getFirestore(firebase_app);

function Marketplace(uid) {
 let productPage = new URL(location.href);
 let currentPage = productPage.searchParams.get('page');

// const q = query(collection(db, "products"), where('vendor_id', '==', uid));

 let comp = cEl('div', {}, loader());

 const form = cEl('form', { name: 'searhMarketPlace', class: 'grid grid-cols-6 items-center bg-gray-500 mx-4 max-w-xl mx-auto' },
  cEl('input', { class: 'col-span-5 p-3 bg-gray-500 placeholder-gray-300 text-xs text-gray-100 outline-none', type: 'search', name: 'q', placeholder: 'Search marketplace' }),
  cEl('button', { class: 'col-span-1 text-gray-100 py-2 flex items-center justify-center', type: 'submit' }, svg(icons.search))
 );

 const pagination = cEl('div', { class: 'container flex items-center justify-center text-gray-400 mt-4' });

 function getData() {
/*  getDocs(q)
   .then(doc => {
    let data = [];
    doc.forEach(d => data.push(d.data()));
    console.log(data);

    return;*/
    let data = [
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 		},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
      vendor: 'Julius Berger',
      currentPrice: '#3,000',
      oldPrice: '#4,500',
      commission: '50'
 			},
     {
      title: 'Affiliate Marketing Accelerator Program',
      imgsrc: 'krakenimages-376KN_ISplE-unsplash.jpg',
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
 			}
 	];
    
    let slicedPage = currentPage ? (currentPage * 15) - 15 : 0;
    //data = data.slice(slicedPage, 15);

    function rerender(data) {
     comp.empty();
     comp.append(cEl('ul', { class: 'color2 bg-custom-main-bg grid md:grid-cols-2 md:gap-12' },
      ...data.map(product => generateList(product))
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
     if (data.length < 15) return;
     pagination.innerHTML = '';
     // 15 is the maximum number of allowed children in the DOM
     let count = Math.floor(data.length / 15);
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

     window.addEventListener('resize', () => marketplacePagination(150));
    }, 500);
   //});
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

function authWrapper() {
 const formDiv = cEl('div');

 const header = cEl('header', {},
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: '/' },
    cEl('img', { src: '/static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: '/blog.html', textContent: 'Blog', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
  ),
  cEl('section', { class: 'container mx-auto pt-12 pb-20 md:pr-8 md:pt-24 md:pb-32 grid md:grid-cols-2 items-center' },
   cEl('div', { class: 'hidden md:block px-4 py-8 md:pr-6 color2' },
    cEl('small', { class: 'color4 md:block', textContent: 'Welcome to Swift Earn' }),
    cEl('h1', { class: 'text-4xl font-bold leading-normal', textContent: 'Simplify Your Online Business Journey and Boost Your Profits' }),
    cEl('p', { class: 'mt-2', textContent: 'Our entire team is dedicated to providing you with the highest standard of quality affiliate marketing services.' })
   ), formDiv
  )
 );
 document.body.innerHTML = '';
 document.body.append(header);

 return formDiv;
}

//unsubscribe.then(res => {
 let myPage = /*res === 2 ?*/ Header('Marketplace'/*, res.uid*/)/* : authWrapper()*/;
 
 myPage.append(Marketplace(/*res.uid*/));
//});