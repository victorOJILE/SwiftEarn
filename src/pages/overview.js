import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, getDocs, collection, doc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import Header from '../header.js';
import homeStats from '../components/homeStats.js';
import weeklyChart from '../components/weeklyChart.js';
import Transactions from '../components/transactions.js';
import Activities from '../components/activities.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import Vendors from '../components/vendors.js';

const db = getFirestore(firebase_app);

function Overview(uid) {
	const welcome = cEl('p', { textContent: 'Welcome back' });
	
	let data = sessionStorage.getItem('user');

	if(!data) {
		getDoc(doc(db, 'users', uid))
			.then(res => {
				data = res.data();
				welcome.textContent = 'Welcome back, ' + data.lastName;
				sessionStorage.setItem('user', JSON.stringify(data));
			});
	} else {
		data = JSON.parse(data);
		welcome.textContent = 'Welcome back, ' + data.lastName;
	}
	
	const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
		cEl('div', {},
			cEl('h1', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Dashboard' }),
			cEl('div', { class: 'md:text-md p-3 bg-8 flex justify-between items-center' },
				cEl('div', {},
					welcome,
					cEl('p', { class: 'color4 pr-2', style: { fontSize: '0.65rem' }, textContent: 'Get Ready to Boost Your Sales and Make an Impact Today!' })
				),
				cEl('div', { class: 'text-center' },
					cEl('img', { class: 'w-16', src: '/static/images/coffee-badge.webp' })
				)
			)
		),
		cEl('section', { class: 'pt-2' },
			homeStats(uid)
		),
		cEl('section', { class: 'py-4 bg-custom-main-bg p-3 mb-12 rounded-lg' },
			cEl('h2', { class: 'md:text-center', textContent: 'Weekly visitors statistics' }),
			//weeklyChart(uid)
		),
		cEl('div', { class: 'grid xl:grid-cols-2 gap-5' },
			Activities(uid),
			Transactions(uid)
		),
		HighDemandProducts(),
		Vendors({ title: 'Top Influencers / Vendors', listCls: 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold', sliced: true, addMore: true })
	);

	return main;
}

unsubscribe.authenticate = function(type, user) {
 if (type) {
  let myPage = Header('Overview', user.uid);
  myPage.append(Overview(user.uid));
 } else {
  location.href = '/SwiftEarn/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
}
