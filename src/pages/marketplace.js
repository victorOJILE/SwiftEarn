import generateList from '../components/productList.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { icons } from '../icons.js';
import loader from '../components/loader.js';

export default function marketplace() {
	let data;
	let comp = cEl('div', {}, loader());

	const form = cEl('form', { name: 'searhMarketPlace', class: 'grid grid-cols-6 items-center bg-gray-500 mx-4 max-w-xl mx-auto' },
		cEl('input', { class: 'col-span-5 p-3 bg-gray-500 placeholder-gray-300 text-xs text-gray-100 outline-none', type: 'search', name: 'q', placeholder: 'Search marketplace' }),
		cEl('button', { class: 'col-span-1 text-gray-100 py-2 flex items-center justify-center', type: 'submit' }, svg(icons.search))
	);
	
	form.ae('submit', (e) => e.preventDefault());
	
	const pagination = cEl('div', { class: 'container flex items-center justify-center text-gray-400 mt-4' });
		
	async function getData() {
		let productPage = new URL(location.href);
		let currentPage = productPage.searchParams.get('page');
		
		data = [
			{
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
			}
	];
		let len = data.length;
		
		let slicedPage = currentPage ? (currentPage * 15) - 15 : 0;
		data = data.slice(slicedPage, 15);
		function rerender(data) {
			comp.empty();
			comp.append(cEl('ul', { class: 'color2 bg-custom-main-bg grid md:grid-cols-2 md:gap-12' },
				...data.map(product => generateList(product))
			));
		}
		rerender(data);
		
		form.ae('submit', function() {
			let q = form.q.value;
			if(!q) rerender(data);
			let qSplit = q.split(' ');
			let match = [];
			
			for (let product of data) {
				let result = {	product,	count: 0	};
				for(let word of qSplit) {
					if (word && product.title.toLowerCase().indexOf(word.toLowerCase()) != -1) {
						result.count++;
					}
				}
				if(result.count) {
					match.push(result);
				}
			}
			match = match.sort((a, b) => a.count - b.count).reverse();
			match = match.map(a => a.product);
			
			match.length ? rerender(match) : rerender(data);
		});
		setTimeout(() => {
			marketplacePagination(150);
		
			window.addEventListener('resize', () => marketplacePagination(150));
		}, 500);
	}
	getData();
	
	function marketplacePagination(len) {
		if(len < 15) return;
		pagination.innerHTML = '';
		// 15 is the maximum number of allowed children in the DOM
		let count = Math.floor(len / 15);
		// 35 is the custom client width for the link element below
		let looplen = pagination.clientWidth / 35;
		let linkCount = 1;
		
		for (; linkCount <= count && linkCount < looplen; linkCount++) {
			let text = linkCount == Math.floor(looplen) ? count : linkCount;
			let url = linkCount > 1 ? './marketplace.html?page=' + text : './marketplace.html';
			
			let link = cEl('a', { href: url, textContent: text, className: 'border-2 border mr-1 w-8 h-8 flex justify-center items-center' });
			pagination.append(link);
		}
		
		if (linkCount > Math.floor(looplen)) {
			pagination.insertBefore(cEl('span', { textContent: '...', className: 'mr-1' }), pagination.lastElementChild);
		}
	}
	
	
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
		cEl('section', { class: 'mb-4' },
			cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'SwiftEarn Marketplace' }),
			cEl('p', { class: 'text-xs md:text-lg color4 md:py-4', textContent: 'Welcome to our vibrant and dynamic marketplace, where endless possibilities and extraordinary deals await you!' })
		),
		cEl('section', {},
			form
		),
		cEl('section', { class: 'my-12' },
			cEl('h2', { class: 'text-xl my-2 flex items-center' },
				cEl('span', { class: 'color4' }, svg(icons.marketplace)),
				document.createTextNode('Available Products')
			),
			comp,	pagination
		),
		HighDemandProducts()
	);
	
	return main;
}
