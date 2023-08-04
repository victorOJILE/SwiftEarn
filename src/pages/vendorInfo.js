/*import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';*/
import Header from '../header.js';
import AuthWrapper from '../components/authWrapper.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { icons } from '../icons.js';
import loader from '../components/loader.js';
import moreProductsFromVendor from '../components/moreProductFromVendor.js';
//const db = getFirestore(firebase_app);


function VendorComp(uid) {
 
	let vendorPage = new URL(location.href);
	let vendor_id = decodeURIComponent(vendorPage.searchParams.get('vendor_id'));
	
	let comp = cEl('div', {}, loader());
	/*
	getDoc(doc(db, 'vendors', vendor_id))
		.then(data => {*/
		let data = {
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
				cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
					cEl('div', { class: 'rounded-full mt-6 w-28 h-28 border-4 border-gray-500 mx-auto overflow-hidden' },
						cEl('img', { src: '/static/images/' + data.business_logo, alt: data.contact_name })
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
				),
				moreProductsFromVendor(uid),
 			HighDemandProducts()
				);
		}
	//	});
		
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' }, comp
		);

	return main;
}

//unsubscribe.then(res => {
 let myPage =/* res === 2 ? Header('Vendors', res.uid) :*/ AuthWrapper();
 
 myPage.append(VendorComp(/*res.uid*/));
//});