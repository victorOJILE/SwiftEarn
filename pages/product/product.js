import { Link } from '../../src/auth.js';
import { db, getDoc, updateDoc, doc, setDoc, increment } from '../../src/header.js';
import HighDemandProducts from '../../components/highDemandProducts.js';
import { clock, longArrowRight, copy } from '../../src/icons.js';
import loader from '../../components/loader.js';
import moreProductsFromVendor from '../../components/moreProductFromVendor.js';

export default function ProductComp(uid, searchParams) {
 let comp = cEl('section', { class: 'px-2' }, loader());

 let product_id = searchParams && searchParams.prdid || new URL(location.href).searchParams.get('prdid');

 if (product_id) {
  product_id = decodeURIComponent(product_id);

  let loaded = false;

  function getData() {
   getDoc(doc(db, 'products', product_id))
    .then(res => {
     loaded = true;
     comp.empty();
     
     if (res.exists()) {
      const data = res.data();
      
      document.title = `${data.name} - ${data.vendor_name}`;
      let description = Array.from(document.head.getElementsByTagName('meta')).find(e => e.name === 'description');
      
      if (description) {
       description.content = data.description;
      }
      
      productComp(data, comp);
     } else {
      comp.append(
       cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No product data!', class: 'block p-3 border text-sm' }))
      );
     }
    })
    .catch(e => !loaded && setTimeout(getData, 5000));
  }
  getData();
 } else {
  location.href = '/SwiftEarn/marketplace.html';
 }

 const main = cEl('main', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  comp);

 return main;
}

function productComp(data, comp) {
 comp.append(
  cEl('div', { class: 'grid md:grid-cols-2 md:gap-6' },
   cEl('div', { class: 'mb-4 max-w-2xl mx-auto' },
    cEl('img', { class: 'img-placeholder', src: data.productImageUrl || '/SwiftEarn/static/images/krakenimages-376KN_ISplE-unsplash.jpg', event: { load() { this.classList.remove('img-placeholder') } } })
   ),
   cEl('div', {},
    cEl('h2', { class: 'text-xl mb-2 md:text-3xl', textContent: data.name }),
    cEl('p', { class: 'color4 mb-2', textContent: data.description }),
    cEl('small', { class: 'text-gray-400', textContent: 'Created by: ' },
     cEl('a', {
      event: {
       click(e) {
        Link(e, paths.vendorInfo, { vdid: encodeURIComponent(data.vendor_id) })
       }
      },
      href: '/SwiftEarn/vendors/info.html?vdid=' + encodeURIComponent(data.vendor_id),
      class: 'text-blue-400 font-normal underline',
      textContent: data.vendor_name
     })
    ),
    cEl('div', { class: 'my-2 flex items-center' },
     cEl('span', {
      class: 'mr-3 font-bold text-2xl',
      textContent: new Intl.NumberFormat('en', {
       style: 'currency',
       currency: 'USD'
      }).format(data.price)
     }),
     cEl('span', { textContent: '|' }),
     cEl('span', { class: 'ml-3', textContent: data.commission + '% comm' })
    ),
    cEl('div', { class: 'flex items-center text-yellow-600 text-xs' },
     svg(clock), 'We have limited time left!'
    ),
    cEl('div', { class: 'mt-4 mb-8' },
     cEl('a', { href: data.jvPageUrl, class: 'underline flex items-center text-green-500' },
      'Check JV Page ', svg(longArrowRight)
     )
    )
   )
  ),
  cEl('a', { href: data.productPageUrl },
   cEl('div', { class: 'bg-green-900 p-2 text-center', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
    cEl('button', { class: 'bg-green-900 text-gray-300 p-3 px-6 w-8/12 rounded font-bold', textContent: 'See product page' })
   )
  ),
  cEl('div', { class: 'my-12' },
   cEl('h3', { class: 'text-xl my-4', textContent: 'Get affiliate link' }),
   cEl('div', { class: 'p-4 text-gray-300 relative', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
    cEl('div', { class: 'overflow-auto', style: { whiteSpace: 'nowrap' }, textContent: location.origin + location.pathname + `?aff_id=${uid}&prdid=${data.product_id}&prdpg=${ encodeURIComponent(data.productPageUrl)}` }),
    cEl('span', { class: 'absolute top-0 right-0 cursor-pointer copyAffilliate', data: { link: location.origin + location.pathname + `?aff_id=${uid}&prdid=${data.product_id}&prdpg=${ encodeURIComponent(data.productPageUrl)}` }, style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }, event: { click() { copyToClipboard(this.dataset.link) } } }, svg(copy))
   )
  ),
  trackVisitors(data.product_id),
  moreProductsFromVendor(data.vendor_id, data.vendor_name),
  HighDemandProducts());
}

function trackVisitors(product_id) {
 let productCookie = document.cookie && Object.fromEntries(document.cookie.split(';').map(e => e.split('=')))[' ' + encodeURIComponent('prdvw' + product_id)];
 if (productCookie) return;

 updateDoc(doc(db, 'products', product_id), {
   views: increment(1)
  })
  .then(() => document.cookie = encodeURIComponent('prdvw' + product_id) + "=1;max-age=3600")
  .catch(e => console.error('Cannot send analytics data: ', e));

 return '';
}