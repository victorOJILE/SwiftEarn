import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore, doc, addDoc, getDoc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const firebase_app = initializeApp({
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "victorojile.github.io",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1"
});

const db = getFirestore(firebase_app);

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

const loader = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';

const productIcon = `<svg class="w-10" fill="currentColor" stroke="currentColor" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58"><path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" /></svg>`;

const infoIcon = `<svg class="w-10 mr-2" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" width="1em" height="1em"  xmlns="http://www.w3.org/2000/svg">
 <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" /><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
</svg>`

let data = {
 "id": 2009945086,
 "domain": "test",
 "status": "success",
 "reference": "rd0bz6z2wu",
 "amount": 20000,
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

function field(textContent, name, type, placeholder) {
 return cEl('div', { class: 'rounded-lg bg-9 py-3' },
  cEl('label', { textContent, class: 'block mb-1' }),
  cEl('input', { ariaLabel: textContent, class: 'w-full p-3 bg-7 color2', type, name, placeholder, required: false })
 );
}

let transactionId;

+
(function Payment() {
 const params = new URL(location.href).searchParams;
 const aff_id = params.get('aff_id');
 const prdid = params.get('prdid');

 if(!aff_id || !prdid) return alert('Error: Invalid URL.\nPlease check your URL and try again!');

 let product;
 let productName = cEl('h2', { class: 'text-xl py-4' });
 
 const main = cEl('main', { class: 'p-3 mx-auto max-w-xl text-gray-600 overflow-hidden flex' });

 async function getProduct() {
  try {
   product = await getDoc(doc(db, 'products', prdid));
   productName.textContent = product.name;
   render();
  } catch (e) {
   // TODO: Check type of error, if empty response (no product with id "prdid", manipulated url)

   // alert('Invalid product id. Please check for url validity.');
  }
 }
 getProduct();
 
 let previousData;
 
 function sendTransactionInfo(formData, btn) {
  const data = {
   aff_id,
   prdid,
   timeCreated: Date.now(),
   status: 'Pending',
   code: 0,
   detail: 'Purchase'
  };

  iter(formData, key => data[key[0]] = key[1]);
  
  let changed = [];
  previousData && iter(formData, key => changed.push(key[1] === previousData[key[0]]));
  
  changed = !changed.length || changed.every(e => !!e === true);
 
  previousData = data;
  
  function runCallB() {
   main.firstElementChild.style.marginRight = '2rem';
   
   let { back, div } = confirmPayment(product, data);
   
   main.appendChild(div);
   
   main.scrollBy({
    left: main.scrollWidth,
    behavior: "smooth"
   });
   
   setTimeout(() => {
    main.firstElementChild.classList.add('hidden');
    back.ae('click', () => {
   
     main.firstElementChild.classList.remove('hidden');
     btn.innerHTML = 'Continue';
   
     setTimeout(() => main.lastElementChild.remove(), 500);
    });
   }, 500);
  }
  
  if(!changed) {
   runCallB();
   return;
  }
  
  function setOrAddDoc() {
   return transactionId ? setDoc(doc(db, 'transactions', transactionId), data, { merge: true }) : addDoc(doc(collection(db, 'transactions')), data);
  }
  
  setOrAddDoc()
   .then(docRef => {
    if(!transactionId) transactionId = docRef.id;
    runCallB();
   })
   .catch(err => {
    // TODO: Check type of error, if no transaction document with id "aff_id", (manipulated url)

    // alert('Invalid aff_id. Please check for url validity.');

   });
 }
 
 function render() {
  main.append(
   cEl('div', { class: 'w-full flex-shrink-0' },
    cEl('h1', { textContent: 'Checkout Information', class: 'text-2xl mt-4' }),
    cEl('p', { class: 'text-md mb-6 flex items-center' },
     svg(infoIcon), 'Complete your details by filling in the form below'
    ),
    productName,
    cEl('hr'),
    cEl('form', {
      class: 'text-sm my-6 font-bold border p-3 rounded-lg',
      event: {
       submit(e) {
        e.preventDefault();
        
        let btn = this.getElementsByTagName('button')[0];
        btn.innerHTML = loader;
        
        sendTransactionInfo(new FormData(this), btn);
       }
      }
     },
     field('Full name:', 'fullName', 'text', 'Enter full name'),
     field('Phone number:', 'phoneNo', 'number', 'Enter phone number'),
     field('Email address:', 'email', 'email', 'Enter email address'),
     cEl('div', { class: 'rounded-lg bg-9 py-3' },
      cEl('label', { textContent: 'Country:', class: 'block mb-1' }),
      cEl('select', { name: 'country', class: 'w-full p-3 bg-7 color2' },
       new Option('Select country', ''),
       ...countries.map(each => new Option(each))
      )
     ),
     cEl('button', {
      type: 'submit',
      textContent: 'Continue',
      class: 'py-3 mb-4 w-full text-sm text-gray-100 bg-blue-700 rounded-sm font-bold'
     }))
   )
  );
 
  let inputs = main.getElementsByTagName('input');
 
  iter(inputs, input => {
   input.ae('input', function() {
    this.value = Array.from(this.value).filter(key => !invalidChar.includes(key)).join('');
   });
  });
 
  document.body.innerHTML = '';
  document.body.append(
   cEl('header', { style: { background: 'transparent' } },
    cEl('img', { src: '/static/images/Logo.png', class: 'w-48 py-2 mx-auto' })
   ),
   main
  );
 }
})();

function confirmPayment(product, data) {
 let loaded = 0;

 const paystackScript = cEl('script', { src: 'https://js.paystack.co/v1/inline.js', event: { load: () => loaded = 1 } });

 document.body.append(paystackScript);

 function payWithPaystack(e) {
  e.preventDefault();

  if (!loaded) alert('Payment service not loaded! Please check your internet connection.');

  let email = data.email;
  let amount = this.amount.value;

  if (+amount < product.amount) {
   return alert('Error initiating request! Please check the product price and try again.');
  }
  elId('continuePayment').classList.add('d-none');
  elId('spinner').classList.remove('d-none');
  try {
   const handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',
    email: email || "ojilevictor11@gmail.com",
    amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    callback(response) {
     alert('Payment has been made successfully');
     //this happens after the payment is completed successfully
     var reference = response.reference;
     alert('Payment complete! Reference: ' + reference);
     // Make an AJAX call to your server with the reference to verify the transaction
     
    },
    onClose() {
     let continuePayment = elId('continuePayment');
     continuePayment.textContent = "Try again";
     continuePayment.classList.remove('d-none');
     continuePayment.nextElementSibling.classList.add('d-none');
    },
   });
   handler.openIframe();
  } catch (e) {
   console.error(e);
  }
 }
 
 const back = cEl('span', { class: 'inline-block text-blue-600 hover:text-blue-400 text-xs py-3 font-bold', textContent: '« Go back «' });
 
 return {
  back,
  div: cEl('div', { class: 'w-full flex-shrink-0' },
  cEl('h1', { textContent: 'Payment confirmation', class: 'text-2xl pt-4' }),
  cEl('p', { class: 'my-5 text-yellow-600 flex items-center text-sm' }, svg(infoIcon), 'Please, confirm product checkout information!'),
  back,
  cEl('hr'),
  cEl('p', { class: 'text-gray-500 text-md py-4 flex items-center justify-between' }, product.name, svg(productIcon)),
  cEl('form', { class: 'text-sm font-bold p-1', event: { submit: payWithPaystack } },
   cEl('div', { class: 'border rounded-lg bg-9 p-3 mb-3' },
    cEl('label', { textContent: 'Amount', class: 'inline-block mb-1' }),
    cEl('div', { class: 'grid grid-cols-6' },
     cEl('input', { value: 'NGN', class: 'col-span-1 text-center border', disabled: true }),
     cEl('input', { textContent: 'Amount', class: 'p-3 bg-7 color2 col-span-5', type: 'number', name: 'amount', value: product.amount, min: product.amount, required: true })
    ),
    cEl('div', { class: 'flex justify-between pt-3' },
     cEl('span', { textContent: 'Charge' }),
     cEl('span', { textContent: '0.00 NGN' })
    ),
    cEl('div', { class: 'flex justify-between pt-3' },
     cEl('span', { textContent: 'Price' }),
     cEl('span', { textContent: (product.amount || '0.00') + ' NGN' })
    ),
   ),
   cEl('button', {
    type: 'submit',
    textContent: 'Continue',
    class: 'py-3 mb-4 w-full text-gray-100 bg-blue-700 rounded-sm font-bold'
   })
  )
 )
 }
}