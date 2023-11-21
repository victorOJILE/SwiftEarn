import { unsubscribe } from '../auth.js';
import Header, { db, getDoc, doc } from '../header.js';
import Vendors from '../components/vendors.js';
import HighDemandProducts from '../components/highDemandProducts.js';

function VendorsComp(uid) {
 const becomeVendor = cEl('div');
 
 if(uid) {
  getDoc(doc(db, 'user', uid))
   .then(res => {
    const data = res.data();
    if(!data.role.includes('vendor')) {
     becomeVendor.append(cEl('div', { class: 'mt-4 mb-12' },
       cEl('button', { class: 'text-lg py-3 px-8 rounded-lg border-2 border font-bold font-special', textContent: 'Become a vendor!', event: { click: () => location.href = '/SwiftEarn/vendors/signup.html' } })
      ));
    }
   });
 }
 
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
		cEl('div', { class: 'px-2 mb-4 max-w-xl' },
			cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Our Vibrant Vendor Network: Where Affiliates and Brands Converge' }),
			cEl('p', { class: 'text-sm color4', innerText: 'Join a Diverse Community of Influencers, Creators, and Entrepreneurs Who Drive Innovation and Excellence in Affiliate Marketing.\n\nUncover a World of Opportunities to Collaborate and Flourish.' })
		),
		becomeVendor,
		Vendors({ title: 'Top Vendors' }),
		Vendors({ title: 'More Vendors', addMore: true }),
		HighDemandProducts()
	);
	return main;
}

unsubscribe.authenticate = function(uid) {
 Header('Vendors', uid).append(VendorsComp(uid));
}