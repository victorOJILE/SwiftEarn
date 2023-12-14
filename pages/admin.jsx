import { Head } from 'next/head';
import { useState, useEffect, useLayoutEffect, lazy } from 'react';
import { db, doc, collection, getDocs, setDoc, deleteDoc, query, where, orderBy, limit } from '../firebase/firestore';
import useRequest from '../src/useRequest.js';
import * as icons from '../src/icons.js';
import LoaderM from '../components/loader.js';

const TabularData = lazy(() => import('../components/tabularData.js'));

export default function Admin({ uid }) {
	const [pageConfig, setPageConfig] = useState({
		name: 'Approved users',
		page: 'App_users'
	});

	return (
		<>
			<Head>
				<title>SwiftEarn Admin</title>
			</Head>
			<HeaderComp pageName={pageConfig.name}>
				{	paths[pageConfig.page]()	}
			</HeaderComp>
		</>
	);
}

function HeaderComp({ pageName, children }) {
	const [openLeftNav, setOpenLeftNav] = useState(' -left-full');

	useLayoutEffect(() => {
		let waiting = false;
		window.addEventListener('scroll', function(e) {
			if (waiting) return;
			waiting = true;

			if (this.oldScroll <= window.pageYOffset && window.pageYOffset > window.innerHeight) {
				setTimeout(() => {
					document.getElementsByTagName('header')[0].classList.add('-top-full');
					waiting = false;
				}, 300);
			} else {
				setTimeout(() => {
					document.getElementsByTagName('header')[0].classList.remove('-top-full');
					waiting = false;
				}, 300);
			}
			this.oldScroll = window.pageYOffset;
		});
	}, []);

	return (
		<>
			<AsideLeft open={openLeftNav} setOpen={setOpenLeftNav} pageName={pageName} />
			<div className="md:col-span-4 bg-custom-main-bg overflow-auto pt-20 md:pt-0">
				<header className="trans fixed w-full left-0 top-0 z-10 md:static">
					<div className="p-2 md:p-3 flex items-center justify-between container mx-auto">
						<div className="hamburger inline-block md:hidden mr-3" id="hamburger" onClick={() => {
								setOpen("");
								document.body.style.overflow = 'hidden';
							}}><span></span><span></span><span></span></div>
						<div></div>
						<div>
							<span className="mr-2 inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700 relative">
								<span className="p-1 absolute top-0 right-0 bg-green-500 rounded-full font-bold" style={{ fontSize: '0.65rem' }}></span>
								{icons.notification}
							</span>
						</div>
					</div>
				</header>
				{ children }
			</div>
		</>
	);

	function AsideLeft({ open, setOpen, pageName }) {
		const lists = [
   [
				{
					icon: icons.app_users,
					text: 'Approved users',
					path: 'App_users'
    },
				{
					icon: icons.users,
					text: 'Pending users',
					path: 'Pend_users'
		  },
				{
					icon: icons.vendors,
					text: 'Vendors',
					path: 'Vendors'
	   	}
	   ],
	   [
				{
					icon: icons.products,
					text: 'Approved products',
					path: 'App_products'
	   	},
				{
					icon: icons.products,
					text: 'Pending products',
					path: 'Pend_products'
	   	},
				{
					icon: icons.vendors,
					text: 'Rejected products',
					path: 'Rej_products'
	   	}
   	],
   	[
				{
					icon: icons.withdrawal,
					text: 'Approved withdrawals',
					path: 'App_withdrawal'
	   	},
				{
					icon: icons.withdrawal_pend,
					text: 'Pending withdrawals',
					path: 'Pend_withdrawal'
	   	},
				{
					icon: icons.withdrawal_rej,
					text: 'Rejected withdrawals',
					path: 'Rej_withdrawal'
	   	}
   	]
  ];

		function LiFunc({ list }) {
			return (
				<ul>
				{
				 list.map(li => (
				 	<li>
				 	 <a onClick={e => Link(e, { name: li.text, page: li.path })} href="" className={"p-3 pr-1 flex items-center trans " + (pageName == li.text ? "bg-blue-800 hover:bg-blue-800" : "hover:bg-gray-800")}>
				 	  <div className="flex-grow flex items-center">
				 	   {li.icon}
				 	   {li.text}
				 	  </div>
				   </a>
				  </li>
				 ))
				}
				</ul>
			);
		};

		return (
			<aside className={"bg-main fixed top-0 md:static h-screen md:col-span-1 w-9/12 md:w-auto max-w-sm z-20 overflow-auto scroll-bar text-blue-200 text-md" + open} ariaHidden>
   <div className="flex items-center p-3 md:pt-10">
    <a href="/" className="flex-grow md:mx-auto">
     <img src="Logo.png" />
    </a>
    <div onClick={() => {
 				setOpen('-left-full');
 				document.body.style.overflow = 'auto';
 			}}>{icons.closeSidebar}</div>
   </div>
   {
   	lists.map(list => (
   		<nav className="border-t-2 border-gray-600 py-3">
   			<LiFunc list={list}/>
   		</nav>
   	))
   }
   </aside>
		);
	}
}

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

function CreateUsers({ data }) {
	return (
		<li className="rounded-xl p-3 bg-8 mb-4">
  <h2>{ data.fullName }</h2>
  <div className="py-2 flex items-center">
   <p className="text-sm text-gray-500">{ data.email }</p>
  </div>
  <small className="text-sm text-gray-500"><span className="font-bold">Joined on: </span><span>{ dtf.format(data.registration_date) }</span></small>
  <div className="flex items-center text-sm text-white mt-3 font-bold">
   <span className="inline-block border-2 border-green-700 bg-green-800 hover:bg-green-600 trans w-28 p-1 text-center rounded-sm">Approve user</span>
  </div>
  </li>
	);
}

function UseList({ heading, useTable, children }) {

	return (<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
  <section>
   <div>
    <h1 className="text-xl flex items-center justify-between">{ heading } {useTable ? icons.users : icons.products}</h1>
    {
    	useTable ? <div className="bg-custom-main-bg p-3 border rounded-md my-5">{children}</div> : <section>{children}</section>
    }
   </div>
  </section>
 </main>);
}

function WithdrawalComp({ name, type }) {
 const [data, setData] = useState(null);
 const [length, SetLength] = useState(300);

 useEffect(() => {
  useRequest(
   getDocs(query(collection(db, "transactions"), where('status', '==', type), orderBy('timeCreated', 'desc'), limit(length))),
   function(res) {
    let data = [];
    res.forEach(d => data.push(d.data()));

    setData(data);
   }
  );
 }, [length]);

 return (
  <section className="mt-6">
   <div className="overflow-auto">
    <h2 className="text-xl">{name}</h2>
    <div className="bg-custom-main-bg overflow-auto my-2">
     {
      data ? data.length ? 
       <CreateTable data={data} /> : ( <div className="h-24 flex items-center justify-center"> <span className="block p-3 border text-sm">No {type.toLowerCase()} transactions!</span></div>
      ) : <LoaderM />
     }
    </div>
   </div>
  </section>
 );
}

function CreateTable({ data, showMore }) {
		let theads = ['No', 'Details', { text: 'Date', props: {className: 'p-2' }}, 'Status', 'Amount'];
		
		let dataMap = data.map((d, ind) => [
		+(ind +1),
		dtf.format(new Date(d.paid_at || d.timeCreated)),
		d.detail,
		<span style={{ backgroundColor: data.gateway_response === 'Successful' ? '#2F9B76C7' : '#7A2E2EC9' }} className="inline-block p-1 w-full rounded-md">{ d.gateway_response || d.status }</span>,
		{ obj: true, text: new Intl.NumberFormat('en', { 
   style: 'currency', currency: d.currency
  }).format(d.amount), props: { className: d.amount > 0 ? 'text-green-400' : 'text-red-400' } }
	]);
	
 return (
 	<TabularData data={dataMap} theads={theads} />
 );
}

const paths = {
	App_users() {
		const [data, setData] = useState(null);

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "users"), orderBy('registration_date', 'desc'))),
				function(res) {
					let data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<UseList heading="Approved users" useTable>
  		{
  			data ? (
  				data.length ? (
  					<ul className="bg-9">{data.map(user => <CreateUsers data={user} />)}</ul>
  				) : <div className="border p-3 text-center">No users</div>
  			) : LoaderM
  		}
  	</UseList>
		);
	},
	Pend_users() {
		const [data, setData] = useState(null);

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "users"), where('status', '==', 'Pending'), orderBy('registration_date', 'desc'))),
				function(res) {
					let data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<UseList heading="Pending users" useTable>
  		{
  			data ? (
  				data.length ? (
  					<ul className="bg-9">{data.map(user => <CreateUsers data={user} />)}</ul>
  				) : <div className="border p-3 text-center">No pending users</div>
  			) : LoaderM
  		}
  	</UseList>
		);
	},
	Vendors() {
		const [data, setData] = useState(null);

		function GenerateVendor({ vendor }) {
			return (
				<li>
    <a href={"/vendors/" + vendor.user_id}>
     <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
      <img src={ vendor.photoUrl || '/username-icon.svg' } alt={ vendor.fullName || '' } />
     </div>
     <small>{ vendor.fullName }</small>
    </a>
    </li>
			);
		}

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "users"), where('role', '==', 'vendor'))),
				function(res) {
					const data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<section className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto">
	  	<div>
		   <h2 className="flex items-center text-xl">
		    <span className="color4">{icons.vendors}</span>
		    Vendors
		   </h2>
		   {
		   	data ? (
		   		data.length ? <ul className="my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors">{data.map(vendor => <GenerateVendor vendor={vendor} />)}</ul> : <div className="h-24 flex items-center justify-center"><span className="block p-3 border text-sm">No vendors!</span></div>
		   	) : LoaderM
		   }
	   </div>
  	</section>
		);
	},
	App_products() {
		const [data, setData] = useState(null);

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "products"), where('status', '==', 'Approved'))),
				function(res) {
					let data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<UseList heading="Approved products">
  		{
  			data ? (
  				data.length ? (
  					<ul className="color2 bg-custom-dark grid md:grid-cols-2 gap-6">{
  						data.map(prd => <GenerateList product={prd}>
  					 <button className="bg-red-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded" onClick={e => {
  					  e.target.innerHTML = loader;
  				   setDoc(doc(db, 'products', prd.product_id), { status: 'Rejected' }, { merge: true })
  					  .then(() => {
  					   e.target.innerHTML = 'Rejected!';
  					   e.target.disabled = true;
  					  })
  					  .catch(e => e.target.innerHTML = 'Reject');
  					 }}>Reject</button>
  				  </GenerateList>
  						)
  					}</ul>
  				) : <div className="border p-3 text-center">No approved products</div>
  			) : LoaderM
  		}
  	</UseList>
		);
	},
	Pend_products() {
		const [data, setData] = useState(null);

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "products"), where('status', '==', 'Pending'))),
				function(res) {
					let data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<UseList heading="Pending products">
  		{
  			data ? (
  				data.length ? (
  					<ul className="color2 bg-custom-dark grid md:grid-cols-2 gap-6">{
  						data.map(prd => <GenerateList product={prd}>
  						<div>
  							<button className="bg-green-600 p-1 mt-2 mr-3 px-3 text-xs font-bold text-gray-100 rounded" onClick={e => {
  							 e.target.innerHTML = loader;
  							 e.target.nextElementChild.disabled = true;
  							 setDoc(doc(db, 'products', prd.product_id), { status: 'Approved' }, { merge: true })
  							 .then(() => {
  							  e.target.innerHTML = 'Approved!';
  							  e.target.disabled = true;
  							  e.target.nextElementChild.disabled = false;
  							  e.target.nextElementChild.innerHTML = 'Reject';
  							 })
  							 .catch(e => e.target.innerHTML = 'Approve');
  							}}>Approve</button> 
  							<button className="bg-red-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded" onClick={e => {
  								e.target.innerHTML = loader;
  								e.target.previousElementChild.disabled = true;
  								setDoc(doc(db, 'products', prd.product_id), { status: 'Rejected' }, { merge: true })
  								.then(() => {
  									e.target.innerHTML = 'Rejected!';
  									e.target.disabled = true;
  									e.target.previousElementChild.disabled = false;
  									e.target.previousElementChild.innerHTML = 'Approve';
  								})
  								.catch(e => e.target.innerHTML = 'Reject');
  							}}>Reject</button>
  						</div>
  				  </GenerateList>
  					)
  					}</ul>
  				) : <div className="border p-3 text-center">No pending products</div>
  			) : LoaderM
  		}
  	</UseList>
		);
	},
	Rej_products() {
		const [data, setData] = useState(null);

		useEffect(() => {
			useRequest(
				getDocs(query(collection(db, "products"), where('status', '==', 'Rejected'))),
				function(res) {
					let data = [];
					res.forEach(d => data.push(d.data()));

					setData(data);
				});
		}, []);

		return (
			<UseList heading="Rejected products">
  		{
  			data ? (
  				data.length ? (
  					<ul className="color2 bg-custom-dark grid md:grid-cols-2 gap-6">{
  						data.map(prd => <GenerateList product={prd}>
  						<button className="bg-green-600 p-1 mt-2 px-3 text-xs font-bold text-gray-100 rounded" click={e => {
  							e.target.innerHTML = loader;
  						 setDoc(doc(db, 'products', prd.product_id), { status: 'Approved' }, { merge: true })
  						 .then(() => {
  						  e.target.innerHTML = 'Approved!';
  						  e.target.disabled = true;
  						 })
  						 .catch(e => e.target.innerHTML = 'Approve');
  						}}>Approve</button>
  				  </GenerateList>
  						)
  					}</ul>
  				) : <div className="border p-3 text-center">No rejected products</div>
  			) : LoaderM
  		}
  	</UseList>
		);
	},
	App_withdrawal() {
		return <WithdrawalComp name="Approved Transactions" type="Approved" />
	},
	Pend_withdrawal() {
		// TODO:
		// Add a prop to accept withdrawals
		return <WithdrawalComp name="Pending Transactions" type="Pending" />
	},
	Rej_withdrawal() {
		return <WithdrawalComp name="Rejected Transactions" type="Declined" />
	}
}

const adminHistory = [];
let currentPage;

function Link(e, config) {
	if (e) e.preventDefault();

	if (!config.page || currentPage == config.page) return;

	headerComp(config.name).appendChild(paths[config.page]());
	document.body.style.overflow = 'auto';
	!config.notToHistory && adminHistory.push(config);

	currentPage = config.page;
}

window.addEventListener("popstate", (e) => {
	if (!adminHistory.length) return;
	adminHistory.pop();
	if (adminHistory.length) {
		let prevPage = adminHistory[adminHistory.length - 1];

		Link(undefined, {
			name: prevPage.name,
			path: prevPage.path,
			pathname: prevPage.pathname,
			notToHistory: true
		});
	}
});

let Loader = <span><svg className="spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg></span>;

function GenerateList({ product, children }) {

	return (
		<li className="grid grid-cols-7 md:grid-cols-1 border-b-2 border-gray-400 py-4">
	  <div className="col-span-2 p-3 md:p-0">
 			<img src={ product.productImageUrl || 'krakenimages-376KN_ISplE-unsplash.jpg' } />
			</div>
	  <div className="col-span-5 py-2 pr-2">
	   <a className="pr-1" href={"/product/" + product.product_id }>
  		<h3 className="font-bold line-clamp text-xs sm:text-sm">{ product.name || 'Check for more information' }</h3>
    <p className="font-light text-gray-400 text-xs sm:text-sm">{'By ' + (product.vendor_name || '') }</p>
    <div className="text-xs">
     <span className="font-bold">{ rtf.format(product.price) }</span>
     <span className="px-2 text-gray-400">|</span>
     <span className="text-yellow-600">{ (product.commission || '') + '% comm' }</span>
    </div>
 		</a>
 		{ children }
 		</div>
  </li>
	);
}