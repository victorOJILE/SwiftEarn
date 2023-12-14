import { lazy } from 'react';
import { Head } from 'next/head';
import { Link } from 'next/link';
import { Image } from 'next/image';
import { useRouter } from 'next/router';
import { db, getDoc, getDocs, query, collection, updateDoc, doc, setDoc, increment } from '../../firebase/firestore';
import Loader from '../../components/highDemandProducts.js';
import { clock, longArrowRight, copy } from '../../src/icons.js';

const HighDemandProducts = lazy(() => import('../../components/highDemandProducts.js'));
const MoreProductsFromVendor = lazy(() => import('../../components/moreProductFromVendor.js'));

export default function ProductComp({ uid, data }) {
 const router = useRouter();
 
 if(router.isFallback) {
 	return <Loader />
 }
 
 return (
 	<>
 	<Head>
 		<title>{`${data.name} - ${data.vendor_name}`}</title>
 		<meta name="title" content={`${data.name} - ${data.vendor_name}`} />
 		<meta name="description" content={data.description} />
 	</Head>
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
   <section className="px-2">
   	<ProductComp data={data} uid={uid} />
   </section>
  </main>
  </>
 );
}

function ProductComp({ data, uid }) {
 return (
  <>
   <div className="grid md:grid-cols-2 md:gap-6">
    <div className="mb-4 max-w-2xl mx-auto">
     <Image className="img-placeholder" src={ data.productImageUrl || "krakenimages-376KN_ISplE-unsplash.jpg" } onLoad={(e) => e.target.classList.remove('img-placeholder')} />
    </div>
    <div>
    <h2 className="text-xl mb-2 md:text-3xl">{ data.name }</h2>
    <p className="color4 mb-2">{ data.description }</p>
    <small className="text-gray-400"> Created by: 
     <Link href={ "/vendors/info?vdid=" + data.vendor_id }><a className="text-blue-400 font-normal underline">{ data.vendor_name }</a></Link>
    </small>
    <div className="my-2 flex items-center">
     <span className="mr-3 font-bold text-2xl">{ new Intl.NumberFormat('en', {
       style: 'currency',
       currency: 'USD'
      }).format(data.price)
     }</span>
     <span>|</span>
     <span className="ml-3">{ data.commission + '% comm' }</span>
    </div>
    <div className="flex items-center text-yellow-600 text-xs">
     {clock}
     We have limited time left!
    </div>
    <div className="mt-4 mb-8">
 				<a href={data.jvPageUrl} className="underline flex items-center text-green-500">
      Check JV Page 
      {longArrowRight}</a>
    </div>
   </div>
  </div>
  <a href={ data.productPageUrl }>
   <div className="bg-green-900 p-2 text-center" style={{ backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }}>
    <button className="bg-green-900 text-gray-300 p-3 px-6 w-8/12 rounded font-bold">See product page</button>
   </div>
  </a>
  <div className="my-12">
   <h3 className="text-xl my-4">Get affiliate link</h3>
   { uid ? (<div className="p-4 text-gray-300 relative" style={{ backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }}>
    <div className="overflow-auto" style={{ whiteSpace: 'nowrap' }}>{ `${location.origin}/product/info?aff_id=${uid}&prdid=${data.product_id}&prdpg=${ encodeURIComponent(data.productPageUrl)}` }</div>
    <span className="absolute top-0 right-0 cursor-pointer copyAffilliate" style={{ backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }} onClick={() => copyToClipboard(`${location.origin}/product/info?aff_id=${uid}&prdid=${data.product_id}&prdpg=${ encodeURIComponent(data.productPageUrl)}`) }>{copy}</span>
    </div>) : (
    	<div className="p-4 text-gray-300 text-center" style={{ backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }}>
    		Please, login to get your affiliate link
    		<Link href="/login">
    			<a className="inline-block p-4 bg-green-800">LOGIN</a>
    		</Link>
    	</div>
    ) }
   </div>
   {trackVisitors(data.product_id)}
   <MoreProductsFromVendor uid={data.vendor_id} vendorName={data.vendor_name} />
   <HighDemandProducts />
  </>
 );
}

function trackVisitors(product_id) {
 if (getCookie()['prdvw'+product_id]) return;

 updateDoc(doc(db, 'products', product_id), {
   views: increment(1)
  })
  .then(() => document.cookie = encodeURIComponent('prdvw' + product_id) + "=1;max-age=3600")
  .catch(e => console.error('Cannot send analytics data: ', e));
}

export async function getStaticPaths() {
	const res = await getDocs(query(collection(db, "products"), where('status', '==', 'Approved')));
	
	let paths = [];
	res.forEach(d => paths.push(d.data()));
	
	paths = paths.map(product => ({ params: { id: product.product_id }}));
	
	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	let data = await getDoc(doc(db, 'products', params.id));
	
	return { props: { data: data.data() } };
}

/*

 const router = useRouter();
 const [data, setData] = useState(null);

 useEffect(() => {
 	let product_id = router.query.prdid;
 	
  if (product_id) {
   product_id = decodeURIComponent(product_id);
   useRequest(
    getDoc(doc(db, 'products', product_id)),
    function(res) {
     if (res.exists()) {
      const data = res.data();

      document.title = `${data.name} - ${data.vendor_name}`;
      let description = Array.from(document.head.getElementsByTagName('meta')).find(e => e.name === 'description');

      if (description) {
       description.content = data.description;
      }
      setData(data);
     }
    }
   );
  } else {
   router.push('/marketplace');
  }
 }, []);

 return (
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
   <section className="px-2">
   {
    data ? (
     data.length ? <ProductComp data={data} uid={uid} /> : (
      <div className="h-24 flex items-center justify-center">
       <span className="block p-3 border text-sm">No product data!</span></div>
     )
    ) : <Loader />
   }
   </section>
  </main>
 );

*/