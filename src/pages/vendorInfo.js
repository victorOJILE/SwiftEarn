import { unsubscribe } from '../auth.js';
import Header, { db, getDoc, doc } from '../header.js';
import moreProductsFromVendor from '../components/moreProductsFromVendor.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { vendors } from '../icons.js';
import loader from '../components/loader.js';

function VendorComp(uid) {

 let vendorPage = new URL(location.href);
 let vendor_id = vendorPage.searchParams.get('vendor_id');

 if (vendor_id) vendor_id = decodeURIComponent(vendor_id);

 const comp = cEl('div', {}, loader());

 if (vendor_id) {
  getDoc(doc(db, 'users', vendor_id))
   .then(res => {
    const data = res.data();

    comp.empty();
    if (data) {
     document.title = data.vendor_name + ': ' + data.businessName;
     let descrLength = isMobile ? 150 : 300;
     const description = '<p class="leading-relaxed mb-3">' + data.businessDescription.replace(/\\n/g, '</p><p class="leading-relaxed mb-3">') + '</p>';

     comp.append(
      cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
       cEl('div', { class: 'rounded-full mt-6 w-20 h-20 border-4 border-gray-500 mx-auto overflow-hidden' },
        cEl('img', { src: data.businessImageUrl || '../static/images/username-icon.svg', alt: data.vendor_name })
       ),
       cEl('div', { class: 'text-center' },
        cEl('h3', { class: 'text-lg color4', textContent: data.vendor_name }),
        cEl('p', { class: 'text-sm text-gray-500', textContent: data.businessName })
       ),
       cEl('div', { class: 'p-4 text-sm color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: description }),
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
      ),
      moreProductsFromVendor(uid, data.vendor_name),
      HighDemandProducts()
     );
    }
   });
 } else {
  location.href = '../vendors.html';
 }

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' }, comp);

 return main;
}

unsubscribe.authenticate = function(uid) {
 Header('Vendors', uid).append(VendorComp(uid));
}