import { db, getDoc, doc } from '../src/header.js';
import moreProductsFromVendor from '../components/moreProductFromVendor.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { vendors } from '../src/icons.js';
import loader from '../components/loader.js';

export default function VendorComp(uid) {
 let vendorPage = new URL(location.href);
 let vendor_id = vendorPage.searchParams.get('vdid');

 const comp = cEl('div', {}, loader());

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' }, comp);

 if (!vendor_id) return location.href = '/SwiftEarn/vendors.html';

 vendor_id = decodeURIComponent(vendor_id);
 
 let loaded = false;
 function getData() {
  getDoc(doc(db, 'users', vendor_id))
  .then(res => {
   loaded = true;
   const data = res.data();
 
   comp.empty();
   if (data) {
    document.title = `${data.vendor_name}: ${data.businessName}`;
    let descrLength = isMobile ? 150 : 300;
    const description = '<p class="leading-relaxed mb-3">' + data.businessDescription.replace(/\\n/g, '</p><p class="leading-relaxed mb-3">') + '</p>';
    
    comp.append(
     cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
      cEl('div', { class: 'grid grid-cols-6 gap-4 pt-6' },
       cEl('div', { class: 'col-span-2' },
        cEl('img', { class: 'rounded-full w-20 md:w-32 border-4 border-gray-500 mx-auto', src: data.photoUrl || '/SwiftEarn/static/images/username-icon.svg', alt: data.vendor_name })
       ),
       cEl('div', { class: 'col-span-4' },
        cEl('h2', { class: 'text-xl color4', textContent: `${data.firstName} ${data.lastName}` }),
        cEl('p', { class: 'text-sm md:text-lg text-gray-500', textContent: data.businessName })
       )
      ),
      cEl('div', { class: 'p-4 text-sm md:text-lg color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: description })
     ),
     moreProductsFromVendor(uid, data.vendor_name),
     HighDemandProducts()
    );
   }
  })
  .catch(e => !loaded && setTimeout(getData, 5000));
 }
 getData();

 return main;
}