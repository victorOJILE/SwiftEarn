import { useState, useLayoutEffect, useRef, memo } from 'react';
import { db, collection, getDocs, query, where } from '../firebase/firestore';
import Loader from './loader.js';
import GenerateList from './productList.js';
import { useRequest } from '../src/useRequest.js';
import { marketplace } from '../src/icons.js';

const MoreProducts = memo(function MoreProducts({ uid, vendorName }) {
 const [data, setData] = useState([]);
 const [load, setLoad] = useState(false);
 const section = useRef(null);
 
 useLayoutEffect(() => {
  function load() {
   if (isVisible(section.current)) {
    window.removeEventListener('scroll', load);
    useRequest(
     getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), where('vendor_id', '==', uid))),
     function(res) {
      const data = [];
      res.forEach(d => data.push(d.data()));
  
      setData(data);
     }
    );
   }
  }
  window.addEventListener('scroll', load);
  
  return () => window.removeEventListener('scroll', load);
 }, []);
 
 return (
  <section ref={section}>
   <h2 className="text-xl mt-12 mb-2 flex items-center">
    <span className="color4">
     {marketplace}</span>
   <>'Products from { vendorName || 'this vendor'}</>
   </h2>
   { data.length ? (
    <ul className="color2 bg-custom-dark grid md:grid-cols-2 gap-6">
     {data.map(product => <GenerateList product={product} />)}
    </ul>
   ) : <Loader /> }
  </section>
 );
});

export default MoreProducts;