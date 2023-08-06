import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, getDocs, doc, collection } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import Header from '../header.js';
import Vendors from '../components/vendors.js';
import HighDemandProducts from '../components/highDemandProducts.js';

const db = getFirestore(firebase_app);

export { db, getDoc, getDocs, doc, collection };

function VendorsComp(user) {
 const becomeVendor = cEl('div');
 
 if(user && user.product_id) {
  getDoc(doc(db, 'user', user.product_id))
   .then(res => {
    const data = res.data();
    if(!data.role.includes('vendor')) {
     becomeVendor.append(cEl('div', { class: 'mt-4 mb-12' },
       cEl('button', { class: 'text-lg py-3 px-8 rounded-lg border-2 border font-bold font-special', textContent: 'Become a vendor!', event: { click: () => location.href = '/SwiftEarn/SwiftEarn/vendors/signup.html' } })
      ));
    }
   });
 }
 
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
		cEl('div', { class: 'px-2 mb-4 max-w-xl' },
			cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Our Vibrant Vendor Network: Where Affiliates and Brands Converge' }),
			cEl('p', { class: 'text-xs color4', innerText: 'Join a Diverse Community of Influencers, Creators, and Entrepreneurs Who Drive Innovation and Excellence in Affiliate Marketing.\n\nUncover a World of Opportunities to Collaborate and Flourish.' })
		),
		becomeVendor,
		Vendors({ title: 'Top Vendors' }),
		Vendors({ title: 'More Vendors', addMore: true }),
		HighDemandProducts()
	);
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
  
 myPage.append(VendorsComp(user));
}
