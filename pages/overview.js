import homeStats from '../components/homeStats.js';
import weeklyChart from '../components/weeklyChart.js';
import Transactions from '../components/transactions.js';
import Activities from '../components/activities.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import Vendors from '../components/vendors.js';

export default function Overview(uid) {
 const welcomeMsg = cEl('h4', { class: 'text-xs md:text-sm px-2 py-4', textContent: 'Hey! Welcome back.' });

 EventBus.subscribe('loaded-data', function(data) {
  welcomeMsg.textContent = 'Welcome back, ' + data.firstName;
 });
 
	const main = cEl('main', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
		cEl('h1', { class: 'bg-8 text-2xl md:text-3xl p-2', textContent: 'Dashboard' }),
		welcomeMsg,
		cEl('section', { class: 'pt-2' },	homeStats(uid)),
		cEl('section', { class: 'py-4 bg-custom-main-bg p-3 mb-12 rounded-lg' },
			cEl('h2', { class: 'md:text-center', textContent: 'Weekly visitors statistics' }),
			weeklyChart(uid)
		),
		cEl('div', { class: 'grid xl:grid-cols-2 gap-5' },
			Activities(uid),
			Transactions(uid, true)
		),
		HighDemandProducts(),
		Vendors({ title: 'Top Influencers / Vendors', listCls: 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold', addMore: true })
	);

	return main;
}