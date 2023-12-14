import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, collection, getDocs, setDoc, deleteDoc, query, where, orderBy } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import * as icons from '../src/icons.js';
import loaderM from '../components/loader.js';

const firebase_app = initializeApp({
	apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
	authDomain: "victorojile.github.io",
	projectId: "swiftearn-e35b4",
	storageBucket: "swiftearn-e35b4.appspot.com",
	messagingSenderId: "25885277320",
	appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
	measurementId: "G-7Q7DF5L5X1"
});

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

onAuthStateChanged(auth, user => {
	try {
		if (user) {
			if (!user.reloadUserInfo) {
				// User is authenticated but offline
				throw new Error('');
			}

			let cookie = document.cookie,
				expired = false;

			if (cookie) {
				cookie = Object.fromEntries(cookie.split(';').map(e => e.split('=')));
				if (!cookie.lastRefresh) expired = true;
			} else {
				expired = true;
			}

			if (expired) {
				signOut(auth).then(() => {
					alert('Your session has expired! Please Login.');
					location.href = '/SwiftEarn/login.html?page=' + encodeURIComponent(new URL(location.href).pathname);
				});

				return;
			}

			// User is authenticated

			document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
			
			let access = prompt('Enter your access key', '');
			
			if(access == 'poiuytrewq')	Link(undefined, { name: 'Approved users', page: 'app_users' });
		} else {
			// User is not authenticated

			location.href = '/SwiftEarn/login.html?page=' + encodeURIComponent(new URL(location.href).pathname);
		}
	} catch (e) {
		document.body.innerHTML = '';
		document.body.append(
			cEl('div', { class: 'px-12 text-center text-gray-200 flex items-center justify-center', style: { height: '80vh' } },
				cEl('div', {},
					cEl('p', { textContent: 'There was an error while loading this page!' }),
					cEl('a', { href: location.href, textContent: 'Try again', class: 'inline-block p-3 border bg-gray-300 text-gray-700 my-6 rounded-md' })
				)
			)
		);
		console.error(e)
	}
});

let requestQueue = [];

window.addEventListener('online', function() {
	if (requestQueue.length) {
		Promise.all(requestQueue)
			.then(() => requestQueue = []);
	}
});

function request(query, callback) {
	let loadedData;

	async function getData() {
		try {
			const res = await query;
			loadedData = true;

			callback(res);
		} catch (e) {
			!loadedData && (navigator.onLine && setTimeout(getData, 5000) || requestQueue.push(getData));
		}
	}
	getData();
}

function headerComp(pageName) {
	let headerRendered;

	function asideLeft() {
		const closeSidebarIcon = svg(icons.closeSidebar);

		const aside = cEl('aside', { class: 'bg-main fixed top-0 -left-full md:static h-screen md:col-span-1 w-9/12 md:w-auto max-w-sm z-20 overflow-auto scroll-bar text-blue-200 text-md', ariaHidden: true },
			cEl('div', { class: 'flex items-center p-3 md:pt-10' },
				cEl('a', { href: '/SwiftEarn/', class: 'flex-grow md:mx-auto' },
					cEl('img', { src: '/SwiftEarn/static/images/Logo.png' })
				),
				cEl('div', {}, closeSidebarIcon)
			)
		);

		const lists = [
   [
				{
					icon: icons.app_users,
					text: 'Approved users',
					path: 'app_users'
    },
				{
					icon: icons.users,
					text: 'Pending users',
					path: 'pend_users'
		  },
				{
					icon: icons.vendors,
					text: 'Vendors',
					path: 'vendors'
	   	}
	   ],
	   [
				{
					icon: icons.products,
					text: 'Approved products',
					path: 'app_products'
	   	},
				{
					icon: icons.products,
					text: 'Pending products',
					path: 'pend_products'
	   	},
				{
					icon: icons.vendors,
					text: 'Rejected products',
					path: 'rej_products'
	   	}
   	]
  ];

		iter(lists, navList => {
			const ul = cEl('ul');

			aside.appendChild(cEl('nav', { class: 'border-t-2 border-gray-600 py-3' }, ul));

			iter(navList, list => {
				let li = cEl('li', {},
					cEl('a', {
							event: {
								click(e) {
									Link(e, { name: list.text, page: list.path })
								}
							},
							href: '',
							class: 'p-3 pr-1 flex items-center trans ' + (pageName == list.text ? 'bg-blue-800 hover:bg-blue-800' : 'hover:bg-gray-800')
						},
						cEl('div', { class: 'flex-grow flex items-center' },
							svg(list.icon),
							list.text
						)
					)
				);
				list.click && li.ae('click', list.click);

				ul.append(li);
			});
		});

		closeSidebarIcon.ae('click', function() {
			aside.classList.add("-left-full");
			aside.ariaHidden = true;
			document.body.style.overflow = 'auto';
		});

		return aside;
	}

	function main() {
		const hamburger = cEl('div', { class: 'hamburger inline-block md:hidden mr-3', id: 'hamburger' }, cEl('span'), cEl('span'), cEl('span'));

		const div = cEl('div', { class: 'md:col-span-4 bg-custom-main-bg overflow-auto pt-20 md:pt-0' },
			cEl('header', { class: 'trans fixed w-full left-0 top-0 z-10 md:static' },
				cEl('div', { class: 'p-2 md:p-3 flex items-center justify-between container mx-auto' },
					hamburger,
					cEl('div'),
					cEl('div', {},
						cEl('span', { class: 'mr-2 inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700 relative' },
							cEl('span', { class: 'p-1 absolute top-0 right-0 bg-green-500 rounded-full font-bold', style: { fontSize: '0.65rem' } }),
							svg(icons.notification)
						),
						cEl('span', { class: 'inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700', id: 'profileIcon' }, svg(icons.user))
					)
				)
			)
		);

		if (!headerRendered) {
			headerRendered = true;
			let waiting = false;
			window.addEventListener('scroll', function(e) {
				if (waiting) return;
				waiting = true;

				if (this.oldScroll <= window.pageYOffset && window.pageYOffset > window.innerHeight) {
					setTimeout(() => {
						document.getElementsByTagName('header')[0].classList.add('-top-full');
						waiting = false;
					}, 300);
				} else {
					setTimeout(() => {
						document.getElementsByTagName('header')[0].classList.remove('-top-full');
						waiting = false;
					}, 300);
				}
				this.oldScroll = window.pageYOffset;
			});
		}

		return [div, hamburger];
	}

	const body = document.body;
	const asideL = asideLeft();
	const [mainComp, hamburger] = main();

	hamburger.ae('click', function() {
		asideL.classList.toggle("-left-full");
		asideL.ariaHidden = false;
		document.body.style.overflow = 'hidden';
	});

	body.innerHTML = '';
	body.append(asideL, mainComp);

	return mainComp;
}

const statusIcons = {
	'Approved': `<svg class="mr-1" stroke="green" fill="green" stroke-width="0" viewBox="0 0 16 16" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg">
 <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
</svg>`,
	'Declined': `<svg class="mr-1" stroke="darkred" fill="darkred" stroke-width="0" viewBox="0 0 16 16" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg">
 <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
</svg>`,
	'Pending': `<svg class="mr-1" stroke="#B8B251DB" fill="#B8B251DB" stroke-width="0" viewBox="0 0 16 16" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg">
 <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627z" />
</svg>`
};

const dtf = new Intl.DateTimeFormat('en-US', {
	hour: '2-digit',
	minute: '2-digit',
	year: 'numeric',
	month: 'short',
	day: '2-digit'
});

const rtf = new Intl.NumberFormat('en', {
	style: 'currency',
	currency: 'USD'
});

function createUsers(data, uid) {
	return cEl('li', { class: 'rounded-xl p-3 bg-8 mb-4' },
		cEl('h2', { textContent: data.fullName }),
		cEl('div', { class: 'py-2 flex items-center' },
			cEl('p', { class: 'text-sm text-gray-500', textContent: data.email })
		),
		cEl('small', { class: 'text-sm text-gray-500' }, cEl('span', { textContent: 'Joined on: ', class: 'font-bold' }), cEl('span', { textContent: dtf.format(data.registration_date) })),
		cEl('div', { class: 'flex items-center text-sm text-white mt-3 font-bold' },
			cEl('span', {
				class: 'inline-block border-2 border-green-700 bg-green-800 hover:bg-green-600 trans w-28 p-1 text-center rounded-sm',
				textContent: 'Approve user',
				event: {
					click() {

					}
				}
			})
		)
	);
}

function useList(heading, useTable) {
	const comp = useTable ? cEl('div', { class: 'bg-custom-main-bg p-3 border rounded-md my-5' }) : cEl('section');
	comp.appendChild(loaderM());

	return [cEl('main', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
		cEl('section', {},
			cEl('div', {},
				cEl('h1', { class: 'text-xl flex items-center justify-between', textContent: heading }, svg(useTable ? icons.users : icons.products)),
				comp
			)
		)
	), comp];
}

function noData(textContent) {
	return cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent, class: 'block p-3 border text-sm' }));
}

const paths = {
	app_users() {
		const [main, list] = useList('Approved users', true);

		request(
			getDocs(query(collection(db, "users"), orderBy('registration_date', 'desc'))),
			function(res) {
				let data = [];
				res.forEach(d => data.push(d.data()));

				list.empty();

				if (data.length) {
					list.append(
						cEl('ul', { class: 'bg-9' }, ...data.map(createUsers))
					);
				} else {
					list.append(
						cEl('div', { class: 'border p-3 text-center', textContent: 'No users' })
					);
				}
			});

		return main;
	},
	pend_users() {
		const [main, list] = useList('Pending users', true);


		return main;
	},
	vendors() {
		const div = cEl('div', {},
			cEl('h2', { class: 'flex items-center text-xl' },
				cEl('span', { class: 'color4' }, svg(icons.vendors)),
				'Vendors'
			),
			loaderM()
		);

		function generateVendor(vendor) {
			return cEl('li', {},
				cEl('a', { href: '/SwiftEarn/vendors/info.html?vdid=' + encodeURIComponent(vendor.user_id) },
					cEl('div', { className: 'w-24 h-24 mx-auto rounded-full overflow-hidden' },
						cEl('img', { src: vendor.photoUrl || '/SwiftEarn/static/images/username-icon.svg', alt: vendor.fullName || '' })
					),
					cEl('small', { textContent: vendor.fullName })
				)
			);
		}

		request(
			getDocs(query(collection(db, "users"), where('role', '==', 'vendor'))),
			function(res) {
				const data = [];
				res.forEach(d => data.push(d.data()));

				div.lastElementChild.remove();

				div.append(
					data.length ? cEl('ul', { class: 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors' },
						...data.map(generateVendor)
					) : cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No vendors!', class: 'block p-3 border text-sm' }))
				);
			}
		);

		return cEl('section', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' }, div);
	},
	app_products() {
		const [main, list] = useList('Approved products');

		request(
			getDocs(query(collection(db, "products"), where('status', '==', 'Approved'))),
			function(res) {
				let data = [];
				res.forEach(d => data.push(d.data()));

				list.empty();

				if (!data.length) {
					list.appendChild(noData('No approved products!'));
				} else {
					list.append(
						cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
							...data.map(product => generateList(
								product,
								cEl('button', {
									class: 'bg-green-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded',
									textContent: 'Reject',
									event: {
										click() {
											this.innerHTML = loader;
											setDoc(doc(db, 'products', this.dataset.id), { status: 'Rejected' }, { merge: true })
												.then(() => {
													this.innerHTML = 'Rejected!';
													this.disabled = true;
												})
												.catch(e => this.innerHTML = 'Reject');
										}
									}
								})
							))
						));
				}
			}
		);

		return main;
	},
	pend_products() {
		const [main, list] = useList('Pending products');

		request(
			getDocs(query(collection(db, "products"), where('status', '==', 'Pending'))),
			function(res) {
				let data = [];
				res.forEach(d => data.push(d.data()));

				list.empty();

				if (!data.length) {
					list.append(noData('No pending products!'));
				} else {
					list.append(
						cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
							...data.map(product => {
								return generateList(
									product,
									cEl('div', {},
										cEl('button', {
											class: 'bg-green-600 p-1 mt-2 mr-3 px-3 text-xs font-bold text-gray-100 rounded',
											textContent: 'Approve',
											event: {
												click() {
													this.innerHTML = loader;
													this.nextElementChild.disabled = true;
													setDoc(doc(db, 'products', this.parentElement.dataset.id), { status: 'Approved' }, { merge: true })
														.then(() => {
															this.innerHTML = 'Approved!';
															this.disabled = true;
															this.nextElementChild.disabled = false;
															this.nextElementChild.innerHTML = 'Reject';
														})
														.catch(e => this.innerHTML = 'Approve');
												}
											}
										}),
										cEl('button', {
											class: 'bg-red-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded',
											textContent: 'Reject',
											event: {
												click() {
													this.innerHTML = loader;
													this.previousElementChild.disabled = true;

													setDoc(doc(db, 'products', this.parentElement.dataset.id), { status: 'Rejected' }, { merge: true })
														.then(() => {
															this.innerHTML = 'Rejected!';
															this.disabled = true;
															this.previousElementChild.disabled = false;
															this.previousElementChild.innerHTML = 'Approve';
														})
														.catch(e => this.innerHTML = 'Reject');
												}
											}
										})
									)

								);
							})
						));
				}
			}
		);

		return main;
	},
	rej_products() {
		const [main, list] = useList('Rejected products');

		request(
			getDocs(query(collection(db, "products"), where('status', '==', 'Rejected'))),
			function(res) {
				let data = [];
				res.forEach(d => data.push(d.data()));

				list.empty();

				if (!data.length) {
					list.append(noData('No rejected products!'));
				} else {
					list.append(
						cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
							...data.map(product => {
								return generateList(
									product,
									cEl('button', {
										class: 'bg-green-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded',
										textContent: 'Approve',
										event: {
											click() {
												this.innerHTML = loader;
												setDoc(doc(db, 'products', this.dataset.id), { status: 'Approved' }, { merge: true })
													.then(() => {
														this.innerHTML = 'Approved!';
														this.disabled = true;
													})
													.catch(e => this.innerHTML = 'Approve');
											}
										}
									})
								)
							})
						));
				}
			}
		);

		return main;
	}
}

const adminHistory = [];
let currentPage;

function Link(e, config) {
	if (e) e.preventDefault();

	if (!config.page || currentPage == config.page) return;

	headerComp(config.name).appendChild(paths[config.page]());
	document.body.style.overflow = 'auto';
	!config.notToHistory && adminHistory.push(config);

	currentPage = config.page;
}

window.addEventListener("popstate", (e) => {
	adminHistory.pop();
	if (adminHistory.length) {
		let prevPage = adminHistory[adminHistory.length - 1];

		Link(undefined, {
			name: prevPage.name,
			path: prevPage.path,
			pathname: prevPage.pathname,
			notToHistory: true
		});
	}
});

let loader = '<span><svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg></span>';

function generateList(product, actions) {
	actions.dataset.id = product.product_id;

	return cEl('li', { class: 'grid grid-cols-7 md:grid-cols-1 border-b-2 border-gray-400 py-4' },
		cEl('div', { class: 'col-span-2 p-3 md:p-0' },
			cEl('img', { src: product.productImageUrl || '/SwiftEarn/static/images/krakenimages-376KN_ISplE-unsplash.jpg' })
		),
		cEl('div', { class: 'col-span-5 py-2 pr-2' },
			cEl('a', { class: 'pr-1', href: '/SwiftEarn/product/product.html?prdid=' + encodeURIComponent(product.product_id) },
				cEl('h3', { class: 'font-bold line-clamp text-xs sm:text-sm', textContent: product.name || 'Check for more information' }),
				cEl('p', { class: 'font-light text-gray-400 text-xs sm:text-sm', textContent: 'By ' + (product.vendor_name || '') }),
				cEl('div', { class: 'text-xs' },
					cEl('span', { class: 'font-bold', textContent: rtf.format(product.price) }),
					cEl('span', { class: 'px-2 text-gray-400' },
						cEl('span', { textContent: '|' })
					),
					cEl('span', { class: 'text-yellow-600', textContent: (product.commission || '') + '% comm' })
				)
			),
			actions
		)
	);
}