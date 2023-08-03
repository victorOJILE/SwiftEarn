/*import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import { db } from '../project368hdo37.js';*/
import loader from './loader.js';
import generateList from './productList.js';

export	default function moreProductsFromVendor(uid, vendorName) {
	let data;
	let comp = cEl('div', {}, loader());
	/*const q = query(collection(db, "products", where('vendor_id', '==', uid)));

	getDocs(q)
	.then(doc => {
		const	data = [];
		doc.forEach((d) => data.push(d.data()));
		console.log(data);*/
	async function getData() {
		data = [{
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
			}
		];
		comp.empty();
		if (data && data.length) {
			comp.append(cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' }, ...data.map(each => generateList(each))));
		}
//	});
}
	const section = cEl('section', {},
		cEl('h2', { class: 'text-xl p-2', textContent: 'Products from ' + (vendorName || 'this vendor') }), comp);

	function load() {
		if (isVisible(section)) {
			getData();
			window.removeEventListener('scroll', load);
		}
	}
	setTimeout(getData, 500);
	window.addEventListener('scroll', load);

	return section;
}