import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { onAuthStateChanged, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, getDoc, getDocs, setDoc, where, collection, query } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import loader from './components/loader.js';
import { icons } from './icons.js';

const firebaseConfig = {
	apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
	authDomain: "swiftearn-e35b4.firebaseapp.com",
	projectId: "swiftearn-e35b4",
	storageBucket: "swiftearn-e35b4.appspot.com",
	messagingSenderId: "25885277320",
	appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
	measurementId: "G-7Q7DF5L5X1",
};

const firebase_app = initializeApp(firebaseConfig);

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export { firebase_app, auth, getFirestore, db, doc, getDoc, getDocs, setDoc, where, collection, query };

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
	document.body.classList.toggle("dark-theme");
} else if (currentTheme == "light") {
	document.body.classList.toggle("light-theme");
}

const pages = {
	'/overview.html': {
		link: './pages/overview.js',
		name: 'Overview'
	},
	'/marketplace.html': {
		link: './pages/marketplace.js',
		name: 'Marketplace'
	},
	'/vendors.html': {
		link: './pages/vendors.js',
		name: 'Vendors'
	},
	'/vendors/signup.html': {
		link: './pages/vendorSignup.js',
		name: 'Vendors'
	},
	'/vendors/info.html': {
		link: './pages/vendorInfo.js',
		name: 'Vendors'
	},
	'/product/product.html': {
		link: './pages/product.js',
		name: 'Marketplace'
	},
	'/product/addProduct.html': {
		link: './pages/addProduct.js',
		name: 'Add Product'
	},
	'/product/products.html': {
		link: './pages/manageProducts.js',
		name: 'Manage products'
	},
	'/withdrawal.html': {
		link: './pages/withdrawal.js',
		name: 'Withdrawal'
	},
	'/profile.html': {
		link: './pages/profile.js',
		name: 'Settings'
	},
	'/login.html': './pages/login.js',
	'/signup.html': './pages/signup.js'
}

const url = new URL(location.href).pathname;
let pageName;

(function() {
	if (!pages[url]) return // 404 page

	let myPage;

	function showAuth(show) {
		myPage = authWrapper();

		import(show)
			.then(currentPage => {
				myPage.empty();

				myPage.append(currentPage.default({
					createUserWithEmailAndPassword,
					signInWithEmailAndPassword,
					signInWithPopup,
					GoogleAuthProvider,
					FacebookAuthProvider,
					signOut
				}));
			});
	}
	if (url == '/signup.html' || url.pathname == '/login.html') {
		showAuth(pages[url]);
		return;
	}
	
	onAuthStateChanged(auth, user => {
		try {
			if (user) {
				if (!user.reloadUserInfo) {
					// User is authenticated but offline
					throw new Error('');
				}
	
				let hrs = Math.floor(Math.floor((new Date().getTime() - user.reloadUserInfo.lastLoginAt) / 1000) / 60 / 60);
	
				if (hrs >= 2) {
					signOut(auth)
						.then(() => {
							alert('Your session has expired!');
							location.href = '/login.html?redirect=true&page=' + url;
						})
						.catch(e => console.error(e));
					return;
				}
				pageName = pages[url].name;
				myPage = app(user.uid);
	
				import(pages[url].link)
					.then(currentPage => {
						try { myPage.lastElementChild.remove() } catch (e) {}
						myPage.append(currentPage.default(user.uid, myPage));
					});
	
			} else {
				location.href = '/login.html?redirect=true&page=' + url;
			}
		} catch (e) {
			myPage.lastElementChild.remove();
			console.error(e);
			myPage.append(cEl('div', { class: 'py-64 px-12 text-center text-red-700', textContent: 'Error loading page. Please check your internet connection and try again!' }));
		}
	});
})();

function app(uid) {
	const body = document.body;
	const asideL = asideLeft();
	const mainComp = main();
	const asideR = asideRight(uid);

	mainComp[1].ae('click', function() {
		asideL.classList.toggle("-left-full");
		asideL.ariaHidden = false;
		document.body.style.overflow = 'hidden';
	});
	mainComp[2].ae('click', function() {
		asideR.classList.toggle('hidden');
		setTimeout(() => {
			asideR.classList.toggle('-top-full');
			asideR.classList.toggle('top-20')
		}, 0);
	});
	body.innerHTML = '';
	body.append(asideL, mainComp[0], asideR);
	return mainComp[0];
}

function asideLeft() {
	const closeSidebarIcon = svg(icons.closeSidebar);

	const firstNavUl = cEl('ul', { id: 'mainNav' });
	const secondNavUl = cEl('ul', { class: 'border-t-2 pt-6 mt-6 border-gray-600' });

	const firstNavLists = [
		{
			link: '/overview.html',
			icon: icons.dashboard,
			text: 'Overview'
		},
		{
			link: '/marketplace.html',
			icon: icons.marketplace,
			text: 'Marketplace'
		},
		{
			link: '/vendors.html',
			icon: icons.vendors,
			text: 'Vendors'
		},
		{
			link: '/withdrawal.html',
			icon: icons.withdrawal,
			text: 'Withdrawal'
		},
		{
			link: '/analytics.html',
			icon: icons.analytics,
			text: 'Analytics'
		},
		{
			link: '',
			icon: icons.contests,
			text: 'Contests'
		}
	];

	const secondNavLists = [
		{
			link: '/profile.html',
			icon: icons.settings,
			text: 'Settings'
		},
		{
			link: '/help.html',
			icon: icons.help,
			text: 'Help'
		}
	];

	const themeToggle = cEl('input', { class: 'switch-input', type: 'checkbox', id: 'switch', checked: true });

	if (currentTheme == 'dark') {
		themeToggle.checked = false;
	}

	themeToggle.addEventListener("change", function() {
		if (prefersDarkScheme.matches) {
			document.body.classList.toggle("light-theme");
			var theme = document.body.classList.contains("light-theme") ?
				"light" :
				"dark";
		} else {
			document.body.classList.toggle("dark-theme");
			var theme = document.body.classList.contains("dark-theme") ?
				"dark" :
				"light";
		}
		localStorage.setItem("theme", theme);
	});

	const aside = cEl('aside', { class: 'bg-main fixed top-0 -left-full md:static h-screen md:col-span-1 w-9/12 md:w-auto max-w-sm md:max-w-xl z-20 flex flex-col justify-between overflow-auto scroll-bar', ariaHidden: true },
		cEl('div', {}, cEl('div', { class: 'flex items-center p-3 md:pt-10' },
				cEl('div', { class: 'flex-grow md:text-center' },
					cEl('a', { href: '#' },
						cEl('img', { src: '/static/images/Logo.png' })
					)
				),
				cEl('div', {}, closeSidebarIcon)
			),
			cEl('nav', { class: 'border-t-2 border-gray-600 p-3 py-4 text-blue-200 overflow-auto' },
				firstNavUl
			)
		),
		cEl('div', {},
			cEl('nav', { class: 'text-blue-200 p-3' },
				secondNavUl
			),
			cEl('nav', { class: 'flex items-center justify-between p-4 mb-12 border-t-2 border-gray-600' },
				cEl('span', { class: 'color4 md:hidden', textContent: 'Theme' }),
				cEl('div', { class: 'flex items-center justify-end' },
					svg(icons.moon),
					themeToggle,
					cEl('label', { class: 'switch-label mx-4 cursor-pointer', htmlFor: 'switch' }),
					svg(icons.sun)
				)
			)
		)
	);

	function generateLists(lists, parent) {
		iter(lists, list => {
			return parent.append(
				cEl('li', { data: { text: list.text }, class: 'mb-2' },
					cEl('a', { href: list.link, class: 'p-3 pr-1 flex items-center trans ' + (pageName == list.text ? 'bg-blue-800 hover:bg-blue-800' : 'hover:bg-gray-900') },
						cEl('div', { class: 'flex-grow flex items-center' },
							svg(list.icon),
							document.createTextNode(list.text)
						)
					)
				)
			);
		});
	}
	generateLists(firstNavLists, firstNavUl);
	generateLists(secondNavLists, secondNavUl);

	closeSidebarIcon.ae('click', function() {
		aside.classList.add("-left-full");
		aside.ariaHidden = true;
		document.body.style.overflow = 'auto';
	});

	return aside;
}

function main() {
	const hamburger = cEl('div', { class: 'hamburger inline-block md:hidden mr-3', id: 'hamburger' }, cEl('span'), cEl('span'), cEl('span'));
	const profile = cEl('span', { class: 'mr-2 inline-block hover:bg-gray-500 p-2 text-blue-200 bg-gray-700 rounded-full transition duration-700' }, svg(icons.user));

	const div = cEl('div', { class: 'md:col-span-4 bg-custom-main-bg overflow-auto' },
		cEl('header', { class: 'fixed top-0 w-full md:static z-10 trans' },
			cEl('div', { class: 'p-3 flex items-center justify-between container mx-auto' },
				hamburger,
				cEl('a', { href: '#', class: 'inline-block md:hidden' },
					cEl('img', { src: '/static/images/Logo.png', alt: 'SwiftEarn Logo', class: 'w-32' })
				),
				cEl('div'),
				cEl('div', {},
					cEl('span', { class: 'mr-2 inline-block hover:bg-gray-500 p-2 bg-gray-700 text-blue-200 rounded-full transition duration-700 relative' },
						cEl('span', { class: 'p-1 absolute top-0 right-0 bg-green-500 rounded-full font-bold', style: { fontSize: '0.65rem' } }),
						svg(icons.notification)
					), profile)
			)
		),
		loader()
	);

	function displayHeader() {
		let header = document.getElementsByTagName('header')[0];
		if (!header || !header.classList.contains('fixed')) {
			setTimeout(displayHeader, 1000);
			return;
		}

		window.addEventListener('scroll', function(e) {
			if (this.oldScroll > this.scrollY) {
				header.classList.add('top-0');
				header.classList.remove('-top-full');
			} else if (this.scrollY > window.innerHeight / 2) {
				header.classList.remove('top-0');
				header.classList.add('-top-full');
			}
			this.oldScroll = this.scrollY;
		});
	}

	setTimeout(displayHeader, 1000);
	return [div, hamburger, profile];
}

function asideRight(uid) {
	const aside = cEl('aside', { class: 'bg-custom-main-bg border-2 border fixed -top-full hidden right-4 w-56 z-10 color2 trans profileBar' }, loader());


	function getData() {
		getDoc(doc(db, 'users', uid))
			.then(res => {
				aside.empty();
				let data = res.data();
				sessionStorage.setItem('user', JSON.stringify(data));

				if (data.role.includes('vendor')) {
					const vendors = Array.from(elId('mainNav').children).find(li => li.dataset.text == 'Vendors');
					const products = cEl('li', { class: 'mb-2' },
						cEl('div', {
								class: 'font-bold p-3 flex items-center trans',
								event: {
									click: function() {
										for (let span of this.lastElementChild.children) {
											span.classList.toggle('hidden');
										}
										this.parentElement.classList.toggle('bg-gray-900');
										this.nextElementSibling.classList.toggle('hidden');
									}
								}
							},
							cEl('div', { class: 'flex-grow flex items-center' },
								svg(icons.cart),
								document.createTextNode('My Products')
							),
							cEl('div', {},
								cEl('span', {}, svg(icons.plus)),
								cEl('span', { class: 'hidden' }, svg(icons.minus))
							)
						),
						cEl('ul', { class: 'text-xs hidden pb-1' },
							cEl('li', { class: 'm-1' },
								cEl('a', { href: '/product/addProduct.html', class: 'py-2 px-3 flex items-center trans ' + (pageName == 'Add Product' ? 'bg-blue-800 hover:bg-blue-800' : 'bg-gray-800 hover:bg-gray-900') },
									svg(icons.cartPlus),
									document.createTextNode('Add Product')
								)
							),
							cEl('li', { class: 'm-1' },
								cEl('a', { href: '/product/products.html', class: 'py-2 px-3 flex items-center trans ' + (pageName == 'Manage Products' ? 'text-blue-100 bg-blue-800 hover:bg-blue-800' : 'bg-gray-800 hover:bg-gray-900') },
									svg(icons.vendors),
									document.createTextNode('Manage Products')
								)
							)
						)
					);

					vendors.insertAdjacentElement('afterend', products);
				}

				aside.append(cEl('section', { class: 'mt-6' },
					cEl('div', { class: 'relative mb-6' },
						cEl('div', { class: 'w-24 h-24 border-2 border rounded-full mx-auto overflow-hidden' },
							cEl('img', { src: '/static/images/' + (data.profilePictureUrl || 'userImage.svg'), alt: 'Profile picture' })
						),
						cEl('div', { class: 'absolute top-full left-1/2 w-16 mx-auto', style: { transform: "translate(-50%, -50%)" } },
							cEl('img', { src: rank[data.rank || 1] })
						)
					),
					cEl('div', { class: 'text-center p-4' },
						cEl('h2', { class: 'text-lg', textContent: `${data.firstName || 'SwiftEarn' } ${data.lastName || 'user' }` }),
						cEl('p', { class: 'text-xs text-gray-400', textContent: data.title || 'Affiliate Marketer' })
					),
					cEl('div', { class: 'text-center mb-6' },
						cEl('a', { class: 'inline-block underline text-green-600', href: '/profile.html', textContent: 'Edit profile' })
					)
				));

			})
			.catch(e => getData());
	}
	getData();

	return aside;
}

function authWrapper() {
	const formDiv = cEl('div', {},
		cEl('div', { class: 'h-56 flex items-center justify-center' }, cEl('span', { class: 'loader' }))
	);

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
			),
			cEl('div', {},
				formDiv
			)
		)
	);
	document.body.innerHTML = '';
	document.body.append(header);

	return formDiv;
}