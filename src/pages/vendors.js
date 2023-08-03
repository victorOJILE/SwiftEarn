import Vendors from '../components/vendors.js';
import HighDemandProducts from '../components/highDemandProducts.js';

export default function vendorsComp() {
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
	/* Hide this if user is a has a role of a vendor, get from sessionStorage*/
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
