import { Head } from 'next/head';
import { useState, useEffect, lazy } from 'react';
import { db, getDocs, where, collection, query, doc, orderBy, deleteDoc } from '../../firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useRequest } from '../../src/useRequest.js';
import { products } from '../../src/icons.js';
import Loader from '../../components/loader.js';

const storage = getStorage();

const EditProduct = lazy(() => import('../../components/addProductComp.js'));

const statusIcons = {
 'Approved': <svg className="mr-1" stroke="green" fill="green" strokeWidth="0" viewBox="0 0 16 16" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
 </svg>,
 'Declined': <svg className="mr-1" stroke="darkred" fill="darkred" strokeWidth="0" viewBox="0 0 16 16" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
 </svg>,
 'Pending': <svg className="mr-1" stroke="#B8B251DB" fill="#B8B251DB" strokeWidth="0" viewBox="0 0 16 16" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627z" />
 </svg>
};

const dtf = new Intl.DateTimeFormat('en-US', {
 hour: '2-digit',
 minute: '2-digit',
 year: 'numeric',
 month: 'short',
 day: '2-digit'
});

const rtf = new Intl.NumberFormat('en', {
 style: 'currency',
 currency: 'USD'
});

export default function ManageProducts({ uid }) {
	const [showEdit, setShowEdit] = useState(false);
	
 return (
 	<>
 	<Head>
 		<title>SwiftEarn - My Products</title>
			<meta name="description" content="Manage your products!" />
 	</Head>
  <main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
   <section>
    <div>
     <h1 className="text-xl flex items-center justify-between">
      My products
      {products}
     </h1>
     <Products uid={uid} setShowEdit={setShowEdit} />
    </div>
   </section>
  </main>
 	{ showEdit && (
 		<div className="absolute top-0 w-full p-6 h-screen overflow-auto z-20" style={{ backgroundColor: '#000000A1' }}>
    <button onClick={() => setShowEdit(false)}>
     <svg style="width: 30px; height: 30px;" viewbox="-5 -5 40 40">
      <path d="M2 2L28 28" stroke="maroon" strokeWidth="5" />
     	<path d="M2 28L28 2" stroke="maroon" strokeWidth="5" />
    	</svg>
    </button>
    <EditProduct uid={uid} productData={data} />
   </div>) }
  </>
 );
}

function Products({ uid, setShowEdit }) {
	const [data, setData] = useState(null);
 const [refresh, setRefresh] = useState(false);

 useEffect(() => {
  useRequest(
   getDocs(query(collection(db, "products"), where('vendor_id', '==', uid), orderBy('addedAt', 'desc'))),
   function(res) {
    let data = [];
    res.forEach(d => data.push(d.data()));
    
    setData(data);
   })
 }, [refresh]);
 
 return (
 	<div className="bg-custom-main-bg p-3 border rounded-md my-5">
   {
    data ? (
     data.length ? (
      <ul className="bg-9 grid md:grid-cols-2 gap-4">
       {data.map(product => <CreateCard data={product} uid={uid} setRefresh={setRefresh} setShowEdit={setShowEdit} />)}
      </ul>
     ) : <div className="border p-3 text-center">No products</div>
    ) : <Loader />
   }
  </div>
 );
}

function CreateCard({ data, uid, setRefresh, setShowEdit }) {
 const [elem, setElem] = useState({
  deleteI: deleteIcon,
  showEdit: false
 });
 
 return (
  <li className="rounded-xl p-3 bg-8 mb-4">
   <h2>{ data.name }</h2>
   <div className="py-2 flex items-center">
    <span className="font-bold mr-2 text-lg">{ rtf.format(data.price) }</span>
    <small className="text-sm text-gray-500">{ data.commission + '% comm' }</small>
    <small className="flex items-center font-bold px-3" style={{ color: data.status === 'Approved' ? 'green' : data.status === 'Pending' ? '#B8B251DB' : 'darkred' }}>
     {statusIcons[data.status]}
     {data.status}
    </small>
   </div>
   <small className="text-sm text-gray-500">
    <span className="font-bold">Added on: </span><span>{ dtf.format(data.addedAt) }</span>
   </small>
   <div className="flex items-center text-sm text-white mt-3 font-bold">
    <span className="inline-block border-2 border-green-700 bg-green-800 hover:bg-green-600 trans w-28 p-1 text-center rounded-sm" onClick={e => setShowEdit(true)}>Edit</span>
    <span className="px-3" onClick={ async function(e) {
      setElem(prev => ({
      ...prev,
       deleteI: loaderIcon
      }));
       
      try {
       data.productImageUrl && await deleteObject(ref(storage, data.productImageUrl));

       await deleteDoc(doc(db, 'products', data.product_id));

       setRefresh(prev => !prev);
      } catch (e) {
       setElem(prev => ({
        ...prev,
        deleteI: deleteIcon
       }));
       
       console.log(e);
       alert('Error: Cannot complete product deletion. Please try again!');
      }
     }
    }>{elem.deleteI}</span>
   </div>
  </li>
 );
}

const deleteIcon = <svg stroke="darkred" fill="darkred" strokeWidth="0" viewBox="0 0 448 512" width="1.2em" height="1.2em" className="mx-2" xmlns="http://www.w3.org/2000/svg"> <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" /></svg>;

const loaderIcon = <svg className="mx-2 spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;