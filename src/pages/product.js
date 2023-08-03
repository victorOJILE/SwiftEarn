import HighDemandProducts from '../components/highDemandProducts.js';
import { icons } from '../icons.js';
import loader from '../components/loader.js';
import moreProductsFromVendor from '../components/moreProductFromVendor.js';

export default function productComp(uid) {
	let data;
	let comp = cEl('div', {}, loader());
	(async function getData() {
		data = {
			_id: "product1",
			vendor_id: "vendor1",
			vendor: 'Shanks George',
			name: "Python Packaging: Create and Publish Your Own Modules",
			description: "Unlock the Power of Python Packaging: Learn to Create, Publish, and Share Your Own Custom Modules",
			price: '$9.99',
			oldPrice: '$45',
			commission: '30%',
			image_url: "krakenimages-376KN_ISplE-unsplash.jpg",
			JVPageUrl: '',
			productPageUrl: '',
			affLink: 'https://aff.swiftearn.com/vendor1/product1',
			contests: ["contest1"],
			sku: "PROD12345",
			availability: true,
			category: "Electronics",
			tags: ["gadgets", "technology", "smart devices"],
			average_rating: 4.5,
		};

		if (data && data.constructor.name == "Object") {
			comp.empty();
			comp.append(cEl('section', { class: 'px-2' },
					cEl('div', { class: 'grid md:grid-cols-2 md:gap-6' },
						cEl('div', { class: 'mb-4 max-w-2xl mx-auto' },
							cEl('img', { src: '/static/images/' + data.image_url })
						),
						cEl('div', {},
							cEl('h2', { class: 'text-xl mb-2 md:text-3xl', textContent: data.name }),
							cEl('p', { class: 'color4 mb-2', textContent: data.description }),
							cEl('small', { class: 'text-gray-400', textContent: 'Created by: ' },
								cEl('a', { class: 'text-blue-400 font-normal underline', textContent: data.vendor })
							),
							cEl('div', { class: 'my-2 flex items-center' },
								cEl('span', { class: 'mr-3 font-bold text-2xl', textContent: data.price }),
								cEl('span', { textContent: '|' }),
								cEl('del', { class: 'ml-3 text-gray-400', textContent: data.oldPrice }),
								cEl('span', { class: 'ml-3', textContent: data.commission + ' comm' })
							),
							cEl('div', { class: 'flex items-center text-yellow-600 text-xs' },
								svg(icons.clock), document.createTextNode('We have limited time left!')
							),
							cEl('div', { class: 'mt-4 mb-8' },
								cEl('a', { href: '', class: 'underline flex items-center text-green-500' },
									document.createTextNode('Check JV Page '), svg(icons.longArrowRight)
								)
							)
						)
					),
					cEl('a', { href: '#' },
						cEl('div', { class: 'bg-green-900 p-2 text-center', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
							cEl('button', { class: 'bg-green-900 text-gray-300 p-3 px-6 w-8/12 rounded font-bold', textContent: 'See product page' })
						)
					),
					cEl('div', { class: 'my-12' },
						cEl('h3', { class: 'text-xl my-4', textContent: 'Get affiliate link' }),
						cEl('div', { class: 'p-4 text-gray-300 relative', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
							cEl('div', { class: 'overflow-auto', textContent: data.affLink }),
							cEl('span', { class: 'absolute top-0 right-0 cursor-pointer copyAffilliate', data: { link: data.affLink }, style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }, event: { click: function() { copyToClipboard(this.dataset.link) } } }, svg(icons.copy))
						)
					)
				),
				cEl('h2', { class: 'my-4 text-xl', textContent: 'Product Owner Information' }),
				cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
					vendorInformation(uid)
				),
				moreProductsFromVendor(uid, data.vendor),
				HighDemandProducts());
		}
	})()

	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
		comp);

	return main;
}

function vendorInformation(uid) {
	let data;
	let comp = cEl('div', {}, loader());
	async function getData() {
		data = {
			_id: "vendor1",
			user_id: "user1",
			business_title: "Data Scientist and Lead Researcher",
			business_description: "Hello, I'm Idan Chen, a data scientist, and lead researcher based in Israel. I hold a Bachelor's degree in Computer Science and have gained several years of experience working with data, including over 6 years of expertise using Python. Through my work, I have gained extensive knowledge of both SQL and NoSQL database systems and have a deep understanding of libraries such as Pandas.\nOne of my greatest joys is guiding and teaching others. Over the years, I have had the privilege of helping both individuals and companies to learn more about Python and SQL, providing guidance on concepts and best practices. I am passionate about sharing my knowledge and experience with others and firmly believe that anyone can become a successful data scientist with the right tools and guidance.\nWhether you're seeking to improve your data analysis skills, gain more knowledge about machine learning, or dive deeper into Python and SQL, I am here to help. As an instructor at Udemy, I am committed to providing students with the necessary tools to achieve their goals and succeed. I am thrilled to share my expertise with you and help you reach your full potential in the field of data science.",
			contact_name: "Idan Chen",
			contact_phone: "1234567890",
			payment_info: "PayPal",
			products: ["product1", "product2"],
			business_logo: "background.jpg",
		};
		comp.empty();
		if (data && data.constructor.name == 'Object') {
			let descrLength = isMobile ? 150 : 300;
			comp.append(
				cEl('div', { class: 'rounded-full mt-12 w-28 h-28 border-4 border-gray-500 mx-auto overflow-hidden' },
					cEl('img', { src: '/static/images/' + data.business_logo, alt: data.contact_name || 'SwiftEarn Vendor' })
				),
				cEl('div', { class: 'text-center' },
					cEl('h3', { class: 'text-lg color4', textContent: data.contact_name }),
					cEl('p', { class: 'text-sm text-gray-500', textContent: data.business_title })
				),
				cEl('div', { class: 'p-4 text-xs color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: '<p class="leading-relaxed mb-3">' + data.business_description.replace(/\n/g, '</p><p class="leading-relaxed mb-3">') + '</p>' }),
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
	}
	getData();

	return comp;
}
