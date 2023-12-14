import { Head } from 'next/head';
import { useRouter } from 'next/router';
import { db, getDoc, getDocs, query, collection, doc, setDoc } from '../../firebase/firestore';
import MoreProductsFromVendor from '../../components/moreProductFromVendor.js';
import HighDemandProducts from '../../components/highDemandProducts.js';
import Loader from '../../components/loader.js';

export default function VendorComp({ uid, data }) {
	const router = useRouter();
	
	if(router.isFallback) {
 	return <Loader />
 }
 
	return (
		<>
			<Head>
				<title>{`${data.vendor_name}: ${data.businessName}`}</title>
				<meta name="description" content={data.businessDescription} />
			</Head>
			<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
		 	{
		 		data && (
		 			<>
	     	<section className="bg-custom-main-bg py-4 px-2">
	      	<div className="grid grid-cols-6 gap-4 pt-6">
	       	<div className="col-span-2">
	        	<img className="rounded-full w-20 h-20 md:w-32 md:h-32 border-4 border-gray-500 mx-auto" src={data.photoUrl || 'username-icon.svg'} alt={ data.vendor_name } />
	       	</div>
	       	<div className="col-span-4">
	        	<h2 className="text-xl color4">{ `${data.firstName} ${data.lastName}` }</h2>
	        	<p className="text-sm md:text-lg text-gray-500">{ data.businessName }</p>
	       	</div>
	      	</div>
	      	<div className="p-4 text-sm md:text-lg color2 overflow-hidden max-h-64" style={{ boxShadow: "inset 0px -41px 23px -19px darkgray" }}>{ data.description }</div>
	     	</section>
	     	<MoreProductsFromVendor uid={uid} vendorName={data.fullName} />
	      <HighDemandProducts />
	    	</>
		 		)
		 	}
	 	</main>
 	</>
	);
}

export async function getStaticPaths() {
	const res = await getDocs(query(collection(db, "users"), where('role', '==', 'vendor')));

	let paths = [];
	res.forEach(d => paths.push(d.data()));

	paths = paths.map(vendor => ({ params: { id: vendor.user_id } }));

	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	let data = getDoc(doc(db, 'users', params.id));
	
	if(!data.exists()) throw new Error('No such vendor: ' + params.id);
	
	return { props: { data: data.data() } };
}

/*

	const router = useRouter();
	const [data, setData] = useState(null);

	useEffect(() => {
		let vendor_id = new URL(location.href).searchParams.get('vdid');

		if (!vendor_id) return router.push('/vendors');

		vendor_id = decodeURIComponent(vendor_id);

		useRequest(
			getDoc(doc(db, 'users', vendor_id)),
			function(res) {
				if (res.exists()) {
					const data = res.data();

					document.title = `${data.vendor_name}: ${data.businessName}`;
					setData(data);
				}
			}
		);
	}, []);

	return (
		<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
	 	{
	 		data && (
	 			<>
     	<section className="bg-custom-main-bg py-4 px-2">
      	<div className="grid grid-cols-6 gap-4 pt-6">
       	<div className="col-span-2">
        	<img className="rounded-full w-20 md:w-32 border-4 border-gray-500 mx-auto" src={data.photoUrl || 'username-icon.svg'} alt={ data.vendor_name } />
       	</div>
       	<div className="col-span-4">
        	<h2 className="text-xl color4">{ `${data.firstName} ${data.lastName}` }</h2>
        	<p className="text-sm md:text-lg text-gray-500">{ data.businessName }</p>
       	</div>
      	</div>
      	<div className="p-4 text-sm md:text-lg color2 overflow-hidden max-h-64" style={{ boxShadow: "inset 0px -41px 23px -19px darkgray" }}>{ data.description }</div>
     	</section>
     	<MoreProductsFromVendor uid={uid} vendorName={data.fullName} />
      <HighDemandProducts />
    	</>
	 		)
	 	}
 	</main>
	);

*/
