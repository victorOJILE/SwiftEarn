import { useState, useLayoutEffect, useRef, memo } from 'react';
import { Link } from 'next/link';
import { useRequest } from '../src/useRequest.js';
import { db, getDocs, where, collection, query, orderBy, limit } from '../firebase/firestore';
import GenerateList from './productList.js';
import { marketplace } from '../src/icons.js';
import Loader from './loader.js';

const HighDemandProducts = memo(function HighDemandProducts() {
 const [data, setData] = useState(null);
 const section = useRef(null);
 
 useLayoutEffect(() => {
  function load() {
   if (!isVisible(section.current)) return;
   
   window.removeEventListener('scroll', load);
   useRequest(
    getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), orderBy('sales', 'desc'), limit(5))),
    function(res) {
     let data = [];
     res.forEach(d => data.push(d.data()));
 
     setData(data);
    }
   );
  }
  window.addEventListener('scroll', load);
  
  return () => window.removeEventListener('scroll', load);
 }, []);
 
 return (
  <section ref={section}>
   <h2 className="text-xl mt-12 mb-2 flex items-center">
    <span className="color4">{marketplace}</span>
    'High Demand Products'
   </h2>
   {
    data ? (
     data.length ? (
      <ul className="color2 bg-custom-dark grid md:grid-cols-2 gap-6">
       { data.map(product => <GenerateList product={product} />) }
      </ul>
     ) : (
      <div className="h-24 flex items-center justify-center">
       <span className="block p-3 border text-sm">No products at the moment!</span>
      </div>
     )
    ) : <Loader />
   }
  </section>
 );
});

export default HighDemandProducts;