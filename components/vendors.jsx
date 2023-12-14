import { useState, useLayoutEffect, useRef, memo } from 'react';
import { Link } from 'next/link';
import { useRequest } from '../src/useRequest.js';
import { db, getDocs, collection, where, query, orderBy, limit } from '../firebase/firestore';
import { vendors } from '../src/icons.js';
import Loader from './loader.js';

const Vendors = memo(function Vendors({ title, addMore }) {
 const [data, setData] = useState(null);
 const section = useRef(null);

 useLayoutEffect(() => {
  function load() {
   if (isVisible(section.current)) {
    window.removeEventListener('scroll', load);
    useRequest(
     getDocs(query(collection(db, "users"), where('role', '==', 'vendor'), orderBy("sales", 'desc'), limit(addMore ? 6 : 5))),
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
  <section ref={section} className="mt-12">
   <h2 className="flex items-center text-xl">
    <span className="color4">{vendors}</span>
    {title}
   </h2>
    { data && <GenerateList data={data} /> }
    {
     data ? ( addMore && data.length > 5 && (
       <div className="text-center border-2 border">
        <Link href="/vendors"><a className="block p-2 text-green-500 text-sm">View more</a></Link>
       </div>
      )
     ) : <Loader />
    }
  </section>
 );
});

export default Vendors;

function GenerateList({ data }) {
 return (
  data.length ? <ul className="my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold">
   { data.map((vendor, ind) => <GenerateVendor vendor={vendor} ind={ind} />) }
  </ul> : <div className="h-24 flex items-center justify-center"><span className="block p-3 border text-sm">Sorry, we currently have no vendors!</span></div>
 );
}

function GenerateVendor({ vendor, ind }) {
 return (
  <li key={ind}>
   <Link href={'/vendors/' + vendor.user_id}><a>
    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
     <img src={ vendor.photoUrl || "username-icon.svg" } alt={vendor.fullName} />
    </div>
    <small>{ vendor.fullName }</small>
   	</a>
   </Link>
  </li>
 );
}