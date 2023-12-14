import { Head } from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { db, doc, addDoc, getDoc, setDoc, collection } from '../firebase/firestore';

const invalidChar = ['(', ')', '<', '>', '!', '?', '/', '\\', '{', '}', '[', ']'];
const countries = [
		"Åland Islands", "Albania", "Algeria",
		"American Samoa", "Andorra",
		"Angola", "Anguilla",
		"Antigua &amp; Barbuda",
		"Antarctica", "Argentina",
		"Armenia", "Aruba", "Australia",
		"Austria", "Azerbaijan",
		"Bahamas", "Bahrain",
		"Bangladesh", "Barbados",
		"Belarus", "Belgium", "Belize",
		"Benin", "Bermuda", "Bhutan",
		"Bolivia", "Bonaire",
		"Bosnia &amp; Herzegovina",
		"Botswana", "Brazil",
		"British Indian Ocean Territory",
		"British Virgin Islands",
		"Brunei", "Bulgaria",
		"Burkina Faso", "Burundi", "Cambodia", "Cameroon",
		"Canada", "Cape Verde",
		"Cayman Islands", "Central African Republic",
		"Chad", "Chile", "China",
		"Christmas Island", "Cocos (Keeling) Islands", "Colombia",
		"Comoros", "Congo", "Congo (DRC)",
		"Cook Islands", "Costa Rica",
		"Côte d’Ivoire", "Croatia",
		"Cuba", "Curaçao", "Cyprus",
		"Czech", "Denmark", "Djibouti",
		"Dominica", "Dominican Republic",
		"Ecuador", "Egypt",
		"El Salvador", "Equatorial Guinea",
		"Eritrea", "Estonia", "Ethiopia",
		"Falkland Islands", "Faroe Islands",
		"Fiji", "Finland", "France",
		"French Guiana", "French Polynesia",
		"Gabon", "Gambia", "Georgia",
		"Germany", "Ghana", "Gibraltar",
		"Greece", "Greenland", "Grenada",
		"Guadeloupe", "Guam", "Guatemala",
		"Guinea", "Guinea-Bissau",
		"Guyana", "Haiti", "Heard &amp; McDonald Islands",
		"Honduras", "Hong Kong", "Hungary",
		"Iceland", "India", "Indonesia",
		"Iran", "Iraq", "Ireland",
		"Isle of Man", "Israel", "Italy",
		"Jamaica", "Japan", "Jersey",
		"Jordan", "Kazakhstan", "Kenya",
		"Kiribati", "Korea North",
		"Korea South", "Kosovo",
		"Kuwait", "Kyrgyzstan", "Laos",
		"Latvia", "Lebanon", "Lesotho",
		"Liberia", "Libya", "Liechtenstein",
		"Lithuania", "Luxembourg",
		"Macao SAR", "Macedonia", "Madagascar", "Malawi", "Malaysia",
		"Maldives", "Mali", "Malta",
		"Marshall Islands", "Martinique", "Mauritania",
		"Mauritius", "Mayotte", "Mexico",
		"Micronesia", "Moldova", "Monaco",
		"Mongolia", "Montenegro",
		"Montserrat", "Morocco",
		"Mozambique", "Myanmar",
		"Namibia", "Nauru", "Nepal",
		"Netherlands", "Nevis",
		"New Caledonia", "New Zealand",
		"Nicaragua", "Niger", "Nigeria",
		"Niue", "Norfolk Island",
		"Northern Mariana Islands",
		"Norway", "Oman", "Pakistan",
		"Palau", "Palestinian Authority",
		"Panama", "Papua New Guinea",
		"Paraguay", "Peru", "Philippines",
		"Pitcairn Islands", "Poland",
		"Portugal", "Puerto Rico",
		"Qatar", "Réunion", "Romania",
		"Russia", "Rwanda", "Samoa",
		"San Marino", "São Tomé &amp; Príncipe",
		"Saudi Arabia", "Senegal",
		"Serbia", "Seychelles", "Sierra Leone",
		"Singapore", "Sint Maarten",
		"Slovakia", "Slovenia", "Solomon Islands",
		"Somalia", "South Africa",
		"South Georgia &amp; South Sandwich Islands",
		"South Sudan", "Spain",
		"Sri Lanka", "Sudan", "Suriname",
		"Svalbard &amp; Jan Mayen",

		"Sweden", "Switzerland", "Syria",
		"Taiwan", "Tajikistan",
		"Tanzania", "Thailand", "Togo",
		"Tokelau", "Tonga",
		"Trinidad &amp; Tobago", "Tunisia",
		"Turkey", "Turkmenistan", "Turks &amp; Caicos Islands",
		"Tuvalu", "Uganda", "Ukraine",
		"United Arab Emirates",
		"United Kingdom", "United States", "Uruguay",
		"Uzbekistan", "Vanuatu",
		"Vatican City", "Venezuela",
		"Vietnam", "Wallis &amp; Futuna",
		"Yemen", "Zambia", "Zimbabwe"
	];

const loader = <svg className="spin" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>;

const productIcon = <svg className="w-10" fill="currentColor" stroke="currentColor" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58"><path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" /></svg>;

const infoIcon = <svg className="w-10 mr-2" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" width="1em" height="1em"  xmlns="http://www.w3.org/2000/svg">
 <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" /><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
</svg>;
/*
let data = {
 id: 2009945086,
 domain: "test",
 status: "success",
 reference: "rd0bz6z2wu",
 amount: 20000,
 "message": null,
 "gateway_response": "Successful",
 "paid_at": "2022-08-09T14:21:32.000Z",
 "created_at": "2022-08-09T14:20:57.000Z",
 "channel": "card",
 "currency": "NGN",
 "ip_address": "100.64.11.35",
 "metadata": "",
 "log": {
  "start_time": 1660054888,
  "time_spent": 4,
  "attempts": 1,
  "errors": 0,
  "success": true,
  "mobile": false,
  "input": [],
  "history": [
   {
    "type": "action",
    "message": "Attempted to pay with card",
    "time": 3
        },
   {
    "type": "success",
    "message": "Successfully paid with card",
    "time": 4
        }
      ]
 },
 "fees": 100,
 "fees_split": null,
 "authorization": {
  "authorization_code": "AUTH_ahisucjkru",
  "bin": "408408",
  "last4": "4081",
  "exp_month": "12",
  "exp_year": "2030",
  "channel": "card",
  "card_type": "visa ",
  "bank": "TEST BANK",
  "country_code": "NG",
  "brand": "visa",
  "reusable": true,
  "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
  "account_name": null
 },
 "customer": {
  "id": 89929267,
  "first_name": null,
  "last_name": null,
  "email": "hello@email.com",
  "customer_code": "CUS_i5yosncbl8h2kvc",
  "phone": null,
  "metadata": null,
  "risk_action": "default",
  "international_format_phone": null
 },
 "plan": null,
 "split": {},
 "order_id": null,
 "paidAt": "2022-08-09T14:21:32.000Z",
 "createdAt": "2022-08-09T14:20:57.000Z",
 "requested_amount": 20000,
 "pos_transaction_data": null,
 "source": null,
 "fees_breakdown": null,
 "transaction_date": "2022-08-09T14:20:57.000Z",
 "plan_object": {},
 "subaccount": {}
};
*/

export default function Payment() {
	const router = useRouter();
	const [product, setProduct] = useState(null);
	const [clientData, setClientData] = useState({
		user_id: aff_id,
		prdid,
		status: 'Pending',
		code: 'sale',
	});
	const [submitBtnHtml, setSubmitBtnHtml] = useState('Continue');
	const [showConfirm, setShowConfirm] = useState(false);
	const [refresh, setRefresh] = useState(false);
	
	const aff_id = router.query.aff_id;
	const prdid = router.query.prdid;
	
 if(!aff_id || !prdid) return alert('Error: Invalid URL.\nPlease check your URL and try again!');
 
 useEffect(() => {
  getDoc(doc(db, 'products', prdid))
  .then(res => {
  	setProduct(res.data());
  })
  .catch(e => {
   // TODO: Check type of error, if empty response (no product with id "prdid", manipulated url)

   // alert('Invalid product id. Please check for url validity.');
   
   setRefresh(prev => !prev);
  });
 }, [refresh]);
 
 function updateData(e) {
 	setClientData(prev => ({
 		...prev,
 		[e.target.name]: Array.from(e.target.value).filter(key => !invalidChar.includes(key)).join('')
 	}));
 }
 
	const sendTransactionInfo = useCallback(function() {
  if(!product) return alert('Product information not loaded. Please, check your internet connection and try again!');
  
  // clientData assignment here doesn't re-render the component but updates the value
  
  clientData.detail = encodeURIComponent('Product sale: ' + product.name);
  clientData.timeCreated = Date.now();
  
  let transactionId = sessionStorage.getItem('swfpayid') && sessionStorage.getItem('swfpayuser') === clientData.email;
  
  function runCallB() {
   let main = document.getElementsByTagName('main')[0];
   
   main.scrollBy({
    left: main.scrollWidth,
    behavior: "smooth"
   });
   
   setShowConfirm(true);
  }
  
  function setOrAddDoc() {
   return transactionId ? setDoc(doc(db, 'transactions', transactionId), clientData, { merge: true }) : addDoc(doc(collection(db, 'transactions')), clientData);
  }
  
  setOrAddDoc()
   .then(docRef => {
    if(!transactionId) {
    	sessionStorage.setItem('swfpayid', docRef.id);
    	sessionStorage.setItem('swfpayuser', clientData.email);
    }
    runCallB();
   })
   .catch(err => {
   	
   });
 }, []);
 
 return (
 	<>
 		<Head>
 			<title>SwiftEarn - Payment</title>
 		</Head>
   <header style={{ background: 'transparent' }}>
    <img src="Logo.png" className="w-48 py-2 mx-auto" />
   </header>
   <main className="p-3 mx-auto max-w-xl text-gray-600 overflow-hidden flex">
   	<div className="w-full flex-shrink-0">
   		<h1 className="text-2xl mt-4">Checkout Information</h1>
   		<p className="text-md mb-6 flex items-center">
    		{infoIcon}	Complete your details by filling in the form below
   		</p>
  		 { product && <h2 className="text-xl py-4">{product.name}</h2> }
   		<hr />
   		<form className="text-sm my-6 font-bold border p-3 rounded-lg" onSubmit={e => {
       e.preventDefault();
       
       setSubmitBtnHtml(Loader);
       
       sendTransactionInfo();
      }}>
    		<Field text="Full name:" name="fullName" type="text" placeholder="Enter full name" value={clientData.fullName} setClientData={setClientData} />
    		<Field text="Phone number:"  name="phoneNo" type="number" placeholder="Enter phone number" value={clientData.phoneNo} setClientData={setClientData} />
    		<Field text="Email address:" name="email" type="email" placeholder="Enter email address" value={clientData.email} setClientData={setClientData} />
    		<div className="rounded-lg bg-9 py-3">
    			<label className="block mb-1">Country</label>
     		<select name="country" className="w-full p-3 bg-7 color2" value={clientData.country} setClientData={setClientData}>
      		<option	value="">Select country</option>
      		{	countries.map(each => <option value={each}>{each}</option>) }
     		</select>
    		</div>
    		<button type="submit" className="py-3 mb-4 w-full text-sm text-gray-100 bg-blue-700 rounded-sm font-bold">{submitBtnHtml}</button>
    	</form>
  		</div>
  		{ showConfirm && <ConfirmPayment product={product} data={clientData} setShowConfirm={setShowConfirm} setSubmitBtnHtml={setSubmitBtnHtml} /> }
   </main>
  </>
 );
};

function Field({ text, name, type, placeholder, value, setClientData }) {
 return (
 	<div className="rounded-lg bg-9 py-3">
  	<label className="block mb-1">{text}</label>
  	<input ariaLabel={text} className="w-full p-3 bg-7 color2" type={type} name={name} placeholder={placeholder} value={value} onInput={setClientData} />
  </div>
 );
}

function ConfirmPayment({ product, data, setShowConfirm, setSubmitBtnHtml }) {
 function payWithFW(e) {
  e.preventDefault();
  
  e.target.getElementsByTagName('button')[0].textContent = 'Loading...';
  
  let email = data.email || 'ojilevictor11@gmail.com';
  let amount = e.target.amount.value;

  if (+amount < product.amount + (product.charge || 0)) {
   return alert('Error initiating request! Please check the product price and try again.');
  }
  
  fetch('payment_init.js', {
   method: 'post',
   headers: {
    'Content-Type': 'application/json'
   },
   body: JSON.stringify({
   	...data,
    email,
    amount
   }),
   redirect: 'follow',
   credentials: 'same-origin'
  })
  .catch(err => {
   e.target.getElementsByTagName('button')[0].textContent = 'Continue';
  });
 }
 
 return (
 	<div className="w-full flex-shrink-0">
 		<h1 className="text-2xl pt-4">Payment confirmation</h1>
 		<p className="my-5 text-yellow-600 flex items-center text-sm"> {infoIcon} Please, confirm product checkout information!</p>
 		<span className="inline-block text-blue-600 hover:text-blue-400 text-xs py-3 font-bold" onClick={() => {
	 			setShowConfirm(false);
	 			setSubmitBtnHtml('Continue');
	 		}}>« Go back «</span>
 		<hr />
 		<p className="text-gray-500 text-md py-4 flex items-center justify-between"> {product.name} {productIcon}</p>
 		<form className="text-sm font-bold p-1 m-3" onSubmit={ payWithFW }>
  		<div className="border rounded-lg bg-9 p-3 mb-3">
   		<label className="inline-block mb-1">Amount</label>
   		<div className="grid grid-cols-6">
    		<input value="NGN" className="col-span-1 text-center border" disabled />
    		<input placeholder="Amount" className="p-3 bg-7 color2 col-span-5" type="number" name="amount" value={product.amount} min={product.amount} required />
	    </div>
	    <div className="flex justify-between pt-3">
	     <span>Charge</span>
	     <span>0.10 USD</span>
	    </div>
	    <div className="flex justify-between pt-3">
	     <span>Price</span>
	     <span>{ (product.amount || '0.00') + ' USD' }</span>
	    </div>
   	</div>
  		<button type="submit" className="py-3 mb-4 w-full text-gray-100 bg-blue-700 rounded-sm font-bold">Continue</button>
  	</form>
  </div>
 );
}