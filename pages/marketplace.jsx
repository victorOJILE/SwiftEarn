import { Head } from 'next/head';
import { useState, useEffect, useLayoutEffect, useCallback, lazy, useRef } from 'react';
import { Link } from 'next/link';
import { db, getDocs, where, collection, query, orderBy } from '../firebase/firestore';
import Loader from '../components/loader.js';
import { useRequest } from '../src/useRequest.js';
import { search, marketplace } from '../src/icons.js';
import GenerateList from '../components/productList.js';

let currentPage = new URL(location.href).searchParams.get('page');
let slicedPage = currentPage ? (currentPage * 15) - 15 : 0;

const HighDemandProducts = lazy(() => import('../components/highDemandProducts.js'));

export default function Marketplace() {
 const [data, setData] = useState(null);
 const [pages, setPages] = useState(null);
 const pagination = useRef(null);
 
 const formSubmit = useCallback(function(e) {
  e.preventDefault();
  let q = form.q.value;
  if (!q) return setData(prev => ({
   ...prev,
   searchData: data.data
  }));

  let qSplit = q.split(' ');
  let match = [];

  for (let product of data.data) {
   let result = { product, count: 0 };
   for (let word of qSplit) {
    if (word && product.title.toLowerCase().indexOf(word.toLowerCase()) != -1) {
     result.count++;
    }
   }
   if (result.count) {
    match.push(result);
   }
  }

  match.sort((a, b) => a.count - b.count);
  map.reverse();
  match = match.map(a => a.product);

  match.length ? setData(prev => ({
   ...prev,
   searchData: match
  })) : setData(prev => ({
   ...prev,
   searchData: data.data
  }));
 }, []);

 useEffect(() => {
  useRequest(
   getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), orderBy('sales', 'desc'))),
   function(res) {
    let data = [];
    res.forEach(d => data.push(d.data()));

    setData({
     data,
     searchData: data.slice(slicedPage, 15)
    });
   }
  );
 }, []);

 useLayoutEffect(() => {
  function marketplacePagination() {
   if (!data || data.data.length < 15) return;
   // 15 is the maximum number of allowed products on a page
   const count = Math.floor(data.data.length / 15);
   // 35 is the custom client width for the link element below
   const looplen = pagination.current.clientWidth / 35;
   let linkCount = 1;
   
   const pagesArr = [];

   for (; linkCount <= count && linkCount < looplen; linkCount++) {
    let text = linkCount == Math.floor(looplen) ? count : linkCount;
    let url = linkCount > 1 ? '/marketplace?page=' + text : '/marketplace';

    pagesArr.push(
     <Link href={url}><a className="border-2 border mr-1 w-8 h-8 flex justify-center items-center">{text}</a></Link>
    );
   }

   if (linkCount > Math.floor(looplen)) {
    pagesArr.splice(pagesArr.length -2, 0, <span className="mr-1">...</span>);
   }
   
   setPages(pagesArr);
  }
  
  window.addEventListener('resize', marketplacePagination);
  
  return () => window.removeEventListener('resize', marketplacePagination);
 }, [data]);

 return (
 	<>
 	<Head>
 		<title>SwiftEarn - Your one-stop marketplace for all your needs!</title>
			<meta name="description" content="Discover an exceptional affiliate marketing marketplace filled with diverse products, exclusive deals, and expertly curated collections. Start exploring now and make your shopping dreams come true!" />
 	</Head>
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
   <section className="mb-4">
    <h2 className="text-2xl md:text-3xl mb-2">SwiftEarn Marketplace</h2>
    <p className="text-sm md:text-lg color4 md:py-4">Welcome to our vibrant and dynamic marketplace, where endless possibilities and extraordinary deals await you!</p>
   </section>
   <section>
    <form name="searhMarketPlace" className="grid grid-cols-6 items-center bg-gray-500 mx-4 max-w-xl mx-auto" onSubmit={formSubmit}>
     <input className="col-span-5 p-3 bg-gray-500 placeholder-gray-300 text-xs text-gray-100 outline-none" type="search" name="q" placeholder="Search marketplace" />
     <button className="col-span-1 text-gray-100 py-2 flex items-center justify-center" type="submit">{search}</button>
    </form>
   </section>
   <section className="my-12">
    <h2 className="text-xl my-2 flex items-center">
     <span className="color4">{marketplace}</span>
     'Available Products'
    </h2>
    {
     data ? (
      data.data.length ? (
       <ul className="color2 bg-custom-main-bg grid md:grid-cols-2 md:gap-12">
        { data.searchData.map(product => <GenerateList product={product} />) }
       </ul>
      ) : <div className="h-24 flex items-center justify-center"> <span className="block p-3 border text-sm">No products at the moment!</span></div>
     ) : <Loader />
    }
    <div ref={pagination} className="container flex items-center justify-center text-gray-400 mt-4">{pages}</div>
   </section>
   <HighDemandProducts />
  </main>
  </>
 );
}