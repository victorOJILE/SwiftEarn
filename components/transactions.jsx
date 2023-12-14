import { useState, useEffect, memo } from 'react';
import { Link } from 'next/link';
import { db, doc, getDocs, where, collection, query, orderBy } from '../firebase/firestore';
import { useRequest } from '../src/useRequest.js';
import TabularData from './tabularData.js';
import Loader from './loader.js';

const Transactions = memo(function Transactions({ uid, showMore }) {
 const [data, setData] = useState(null);

 useEffect(() => {
  useRequest(
   getDocs(query(collection(db, "transactions"), where('aff_id', '==', uid), orderBy('timeCreated', 'desc'))),
   function(res) {
    let data = [];
    res.forEach(d => data.push(d.data()));

    setData(data);
   }
  );
 }, []);

 return (
  <section className="mt-6">
   <div className="overflow-auto">
    <h2 className="text-xl"> Transactions</h2>
    <div className="bg-custom-main-bg overflow-auto my-2">
     {
      data ? data.length ? 
       <CreateTable data={data} /> : ( <div className="h-24 flex items-center justify-center"> <span className="block p-3 border text-sm">No transactions!</span></div>
      ) : <Loader />
     }
    </div>
   </div>
   {
    showMore && data && data.length > 10 && (
     <div className="text-center border-2 border">
      <Link href="/transactions"><a className="block p-2 text-green-500 text-sm">View all</a></Link>
     </div>
    )
   }
  </section>
 );
});

export default Transactions;

const dtf = new Intl.DateTimeFormat('en-US', {
 hour: '2-digit',
 minute: '2-digit',
 year: 'numeric',
 month: 'short',
 day: '2-digit'
});

const inf = new Intl.NumberFormat('en', { 
 style: 'currency', currency: 'USD'
});

function CreateTable({ data, showMore }) {
		let theads = ['No', 'Details', { text: 'Date', props: {className: 'p-2' }}, 'Status', 'Amount'];
		
		let dataMap = (showMore ? data.slice(0, 10) : data).map((d, ind) => [
		+(ind +1),
		dtf.format(new Date(d.paid_at || d.timeCreated)),
		d.detail,
		<span style={{ backgroundColor: data.gateway_response === 'Successful' ? '#2F9B76C7' : '#7A2E2EC9' }} className="inline-block p-1 w-full rounded-md">{ d.gateway_response || d.status }</span>,
		{ obj: true, text: inf.format(d.amount), props: { className: d.amount > 0 ? 'text-green-400' : 'text-red-400' } }
	]);
	
 return (
 	<TabularData data={dataMap} theads={theads} />
 );
}