//import { firebase_app, unsubscribe } from '../auth.js';
import Header from '../header.js';
import Vendors from '../components/vendors.js';
import HighDemandProducts from '../components/highDemandProducts.js';

function VendorsComp() {
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
	/* Hide this if user has a role of a vendor, get from sessionStorage*/
		cEl('div', { class: 'px-2 mb-4 max-w-xl' },
			cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Become a Vendor and Unleash Your Business Potential!' }),
			cEl('p', { class: 'text-xs color4', innerText: 'Take the next step and become a vendor on our platform to unlock the full potential of your business. \n\nExpand your reach, increase sales, and tap into a vibrant network of buyers.' })
		),
		cEl('div', { class: 'mt-4 mb-12' },
			cEl('button', { class: 'text-lg py-3 px-8 rounded-lg border-2 border font-bold font-special', textContent: 'Become a vendor!', event: { click: () => location.href = '/vendors/signup.html' } })
		),
		Vendors({ title: 'Top Vendors', listCls: 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors' }),
		Vendors({ title: 'More Vendors', listCls: 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors', addMore: true }),
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
 let myPage =/* res === 2 ? */Header('Vendors'/*, res.uid*/) /*: authWrapper()*/;
 
 myPage.append(VendorsComp(/*res.uid*/));
//});