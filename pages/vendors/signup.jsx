import { Head } from 'next/head';
import { useState, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { db, setDoc, doc } from '../../firebase/firestore';
import { useAuthContext } from '../pages/_app.js';

export default function VendorSignup({ uid }) {
	const router = useRouter();
	const context = useAuthContext();
	const [data, setData] = useState({
 	 createdVendorAcctAt: Date.now(),
  	role: 'vendor'
 });
	const [submitBtn, setSubmitBtn] = useState({
		text: 'Continue',
		disabled: false
	});
	
	useLayoutEffect(() => {
		let form = document.forms.myForm;
		let newCtx = {};
		
		for(let key in context.data) {
			if (form[key]) newCtx[key] = context.data[key];
		}
	 setData(prev => Object.assign(prev, newCtx));
	}, [context.data]);
	
	function updateData(e) {
		setData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	}
	
	const handleSubmit = useCallback(function(e) {
  e.preventDefault();

  setSubmitBtn({
  	disabled: true,
  	text: <Loader />
  });
  
  setDoc(doc(db, 'users', uid), data, { merge: true })
   .then(res => router.push('product/products'))
   .catch(e => {
   	setSubmitBtn({
    	disabled: false,
    	text: 'Continue'
    });
    
    console.error(e);
   });
 }, []);
	
 return (
 	<>
 	<Head>
 		<title>SwiftEarn - Empower your business, join our vendor network and thrive!</title>
			<meta name="description" content="Expand your brand's presence, boost your sales, and establish valuable connections in our vibrant community of buyers and sellers. Join our thriving marketplace and showcase your exceptional products to a wide and enthusiastic customer base" />
 	</Head>
 	<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen">
  	<div className="mb-4 max-w-xl">
   	<h2 className="text-2xl md:text-3xl mb-2">Join our vibrant marketplace as a vendor and unlock new opportunities for growth.</h2>
   	<p className="color4 pr-2 text-sm">Expand your brand's presence, boost your sales, and establish valuable connections in our vibrant community of buyers and sellers.</p>
  	</div>
  	<form name="myForm" className="text-sm" onSubmit={handleSubmit}>
   <div className="rounded-lg bg-9 p-3 mt-12">
   	<label className="inline-block mb-1">Business Name:'</label>
    <input ariaLabel="Enter Business Name" className="w-full p-3 bg-7 color2" type="text" name="businessName" placeholder="Enter Business Name" value={data.businessName} onInput={updateData} required />
   </div>
   <div className="rounded-lg bg-9 p-3">
    <label className="inline-block mb-1">About Me:</label>
    <textarea ariaLabel="Write about yourself" className="w-full h-24 p-3 bg-7 color2" name="aboutMe" placeholder="Write about yourself" value={data.aboutMe} onInput={updateData} required></textarea>
   </div>
   <div className="rounded-lg bg-9 p-3">
    <label className="inline-block mb-1">Business Description:</label>
    <textarea ariaLabel="Enter Business description" className="w-full h-24 p-3 bg-7 color2" name="businessDescription" placeholder="Write about your business" value={data.businessDescription} onInput={updateData} required></textarea>
   </div>
   <button type="submit" className="py-3 mb-4 mx-3 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center" disabled={submitBtn.disabled}>{submitBtn.text}</button>
   </form>
  </main>
  </>
 );
}

const Loader = <svg className="spin" stroke="currentColor" fill="currentColor" strokeEidth="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;