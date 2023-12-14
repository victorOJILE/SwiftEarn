import { Head } from 'next/head';
import { Link } from 'next/link';
import Vendors from '../components/vendors.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { useAuthContext } from '../pages/_app.js';

export default function VendorsComp() {
 const { data } = useAuthContext();
 
	return (
		<>
			<Head>
				<title>SwiftEarn - Our vibrant vendor network</title>
				<meta name="description" content="Explore our top vendors and partner brands. Join a diverse community of influencers, creators, and entrepreneurs who drive innovation and excellence in affiliate marketing. Uncover a world of opportunities to collaborate and flourish." />
			</Head>
	 <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
 		<div className="px-2 mb-4 max-w-xl">
 			<h2 className="text-2xl md:text-3xl mb-2">Our Vibrant Vendor Network: Where Affiliates and Brands Converge</h2>
 			<p className="text-sm color4">Join a Diverse Community of Influencers, Creators, and Entrepreneurs Who Drive Innovation and Excellence in Affiliate Marketing.\n\nUncover a World of Opportunities to Collaborate and Flourish.</p>
 		</div>
 	 {
 	  data.role != 'vendor' && <div className="mt-4 mb-12">
     <Link><a className="text-lg py-3 px-8 rounded-lg border-2 border font-bold font-special" href="/vendors/signup">Become a vendor!</a></Link>
    </div>
 	 }
 		<Vendors title="Top Vendors" />
 		<Vendors title="More Vendors" addMore />
 		<HighDemandProducts />
		</main>
		</>
	);
}