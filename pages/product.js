import { db, getDoc, doc } from '../src/header.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { clock, longArrowRight, copy } from '../src/icons.js';
import loader from '../components/loader.js';
import moreProductsFromVendor from '../components/moreProductFromVendor.js';

export default function ProductComp(uid) {
 let comp = cEl('section', { class: 'px-2' }, loader());

 let product_id = new URL(location.href).searchParams.get('prdid');
 
 if (product_id) {
  product_id = decodeURIComponent(product_id);
  
  let loaded = false;
  
  function getData() {
   getDoc(doc(db, 'products', product_id))
   .then(res => {
    loaded = true;
    const data = res.data();
    
    comp.empty();
    if (!data || !data.name) {
     comp.append(
      cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No product data!', class: 'block p-3 border text-sm' }))
     )
    } else {
     document.title = `${data.name} - ${data.vendor_name}`;
     let description = Array.from(document.head.getElementsByTagName('meta')).find(e => e.name === 'description');
     
     if(description) {
      description.content = data.description;
     }
     
     comp.append(
      cEl('div', { class: 'grid md:grid-cols-2 md:gap-6' },
       cEl('div', { class: 'mb-4 max-w-2xl mx-auto' },
        cEl('img', { class: 'img-placeholder', src: data.productImageUrl || '/SwiftEarn/static/images/krakenimages-376KN_ISplE-unsplash.jpg', event: { load() { this.classList.remove('img-placeholder') }  } })
       ),
       cEl('div', 
        {},
        cEl('h2', { class: 'text-xl mb-2 md:text-3xl', textContent: data.name }),
        cEl('p', { class: 'color4 mb-2', textContent: data.description }),
        cEl('small', { class: 'text-gray-400', textContent: 'Created by: ' },
         cEl('a', { href: '/SwiftEarn/vendors/info.html?vdid=' + encodeURIComponent(data.vendor_id), class: 'text-blue-400 font-normal underline', textContent: data.vendor_name })
        ),
        cEl('div', { class: 'my-2 flex items-center' },
         cEl('span', { class: 'mr-3 font-bold text-2xl', textContent: (data.currency || '$') + data.price }),
         cEl('span', { textContent: '|' }),
         data.oldPrice ? cEl('del', { class: 'ml-3 text-gray-400', textContent: data.oldPrice }) : '',
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
        cEl('div', { class: 'overflow-auto', textContent: location.origin + location.pathname + `?aff_id=${uid}&prdid=${product_id}&jv=${ encodeURIComponent(data.jvPageUrl)}` }),
        cEl('span', { class: 'absolute top-0 right-0 cursor-pointer copyAffilliate', data: { link: location.origin + location.pathname + `?aff_id=${uid}&prdid=${product_id}&jv=${ encodeURIComponent(data.jvPageUrl)}` }, style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }, event: { click() { copyToClipboard(this.dataset.link) } } }, svg(copy))
       )
      ),
      //moreProductsFromVendor(data.vendor_id, data.vendor_name),
      HighDemandProducts());
    }
   })
   .catch(e => !loaded && setTimeout(getData, 5000));
  }
  getData();
 } else {
  location.href = '/SwiftEarn/marketplace.html';
 }

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  comp);

 return main;
}
/*
      cEl('h2', { class: 'my-4 text-xl', textContent: 'Product Owner Information' }),
      cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
       vendorInformation(data.vendor_id)
      ),*/
/*
function vendorInformation(vendor_id) {
 let comp = cEl('div', {}, loader());
 
  getDoc(doc(db, 'users', vendor_id))
   .then(res => {
  const data = res.data();
  console.log(data);
 comp.empty();
 if (data && data.vendor_name) {
  let descrLength = isMobile ? 150 : 300;
  comp.append(
   cEl('div', { class: 'rounded-full mt-12 w-28 h-28 border-4 border-gray-500 mx-auto overflow-hidden' },
    cEl('img', { src: data.businessImageUrl, alt: data.vendor_name || 'SwiftEarn Vendor' })
   ),
   cEl('div', { class: 'text-center' },
    cEl('h3', { class: 'text-lg color4', textContent: data.vendor_name }),
    cEl('p', { class: 'text-sm text-gray-500', textContent: data.name })
   ),
   cEl('div', { class: 'p-4 text-sm color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: '<p class="leading-relaxed mb-3">' + data.business_description.replace(/\n/g, '</p><p class="leading-relaxed mb-3">') + '</p>' }),
   cEl('span', {
    class: 'block text-green-400 text-sm p-4 underline mt-3',
    textContent: 'See more',
    event: {
     click: function() {
      if (this.textContent == 'See more') {
       this.previousElementSibling.classList.remove('max-h-64');
       this.previousElementSibling.style.boxShadow = '';
       this.textContent = 'See less';
      } else {
       this.previousElementSibling.classList.add('max-h-64');
       this.previousElementSibling.style.boxShadow = 'inset 0px -41px 23px -19px darkgray';
       this.textContent = 'See more';
      }
     }
    }
   })
  );
 }
 });

 return comp;
}
*/