import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, doc, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import Header from '../header.js';
import moreProductsFromVendor from '../components/moreProductsFromVendor.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { icons } from '../icons.js';
import loader from '../components/loader.js';

const db = getFirestore(firebase_app);

function VendorComp(uid) {

 let vendorPage = new URL(location.href);
 let vendor_id = decodeURIComponent(vendorPage.searchParams.get('vendor_id'));

 const comp = cEl('div', {}, loader());

 getDoc(doc(db, 'vendors', vendor_id))
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
       cEl('img', { src: data.businessImageUrl || '/SwiftEarn/static/images/username-icon.svg', alt: data.vendor_name })
      ),
      cEl('div', { class: 'text-center' },
       cEl('h3', { class: 'text-lg color4', textContent: data.vendor_name }),
       cEl('p', { class: 'text-sm text-gray-500', textContent: data.businessName })
      ),
      cEl('div', { class: 'p-4 text-xs color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: description }),
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
     moreProductsFromVendor(uid, data.vendor_name, { getDocs, query, collection, where }),
     HighDemandProducts()
    );
   }
  });

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' }, comp);

 return main;
}

function AuthWrapper() {
 const page = cEl('header', { class: 'fixed top-0 left-0 w-full' },
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: '/SwiftEarn/' },
    cEl('img', { src: '/SwiftEarn/static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: '/SwiftEarn/login.html', textContent: 'Login', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
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
 let myPage = type ? Header('Vendors', user.uid) : AuthWrapper();

 myPage.append(VendorComp(user.uid));
}