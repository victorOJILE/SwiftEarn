import { Head } from 'next/head';
import { useAuthContext } from '../pages/_app.js';
import HomeStats from '../components/homeStats.js';
import WeeklyChart from '../components/weeklyChart.js';
import Transactions from '../components/transactions.js';
import Activities from '../components/activities.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import Vendors from '../components/vendors.js';

export default function Overview({ uid }) {
	const { data } = useAuthContext();
 
 return	(
 	<>
 		<Head>
 			<title>SwiftEarn - Affiliate dashboard</title>
				<meta name="description" content="Manage and monitor your activities! Experience complete control and efficiency as you effortlessly manage your activities, track progress, and unlock valuable insights." />
 		</Head>
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
		 <h1 className="bg-8 text-2xl md:text-3xl p-2">Dashboard</h1>
 		<h4 className="text-xs md:text-sm px-2 py-4">{'Welcome back, ' + data.firstName}</h4>
 		{ (!data.bankName || !data.bankAccName || !data.bankAcctNo) && (<div className="border-l-2 border-blue-400 p-2 mb-2 rounded-sm">
 			<h2 className="text-md text-blue-700 mb-2">
 				<svg className="mr-2" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg">
 				 <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
 				</svg>
 				Incomplete Profile
 			</h2>
 			<p className="text-xs text-blue-400">Dear customer, please update your profile to ensure smooth transactions and enhance your experience.</p>
 		</div>) }
		 <section className="pt-2">
		  <HomeStats uid={uid} />
		 </section>
		 <section className="py-4 bg-custom-main-bg p-3 mb-12 rounded-lg">
			 <h2 className="md:text-center">Weekly visitors statistics</h2>
			 <WeeklyChart uid={uid} />
		 </section>
		 <div className="grid xl:grid-cols-2 gap-5">
			 <Activities uid={uid} />
			 <Transactions uid={uid} showMore />
		 </div>
		 <HighDemandProducts />
		 <Vendors title="Top Influencers / Vendors" addMore />
		</main>
		</>
	);
}