//import { db, updateDoc, getDoc, doc, arrayUnion } from '../header.js';

const invalidChar = ['(', ')', '<', '>', '!', '?', '/', '\\', '{', '}', '[', ']'];
const countries = [
		"Select country",
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

+(function Payment() {
 const params = new URL(location.href).searchParams;
 const aff_id = params.get('aff_id');
 const prd_id = params.get('prd_id');
 
 //if(!aff_id || !prd_id) return alert('Error: Invalid URL.\nPlease check your URL and try again!');
 
 let product;
 let productName = cEl('h2', { textContent: 'The Ultimate Money Machine', class: 'text-xl py-4' });
 
 async function getProductName() {
  try {
   product = await getDoc(doc(db, 'products', prd_id));
   productName.textContent = product.name;
  } catch (e) {
   // TODO: Check type of error, if empty response (no product with id "prd_id", manipulated url)
 
   // alert('Invalid product id. Please check for url validity.');
  }
 }
 // getProductName();
 
 function sendTransactionInfo(formData) {
  const data = {
   prd_id,
   timeCreated: Date.now(),
   status: 'Pending',
   code: 0
  };
  
  iter(formData, key => data[key[0]] = key[1]);
  
  updateDoc(doc(db, 'transactions', aff_id), { list: arrayUnion(data) })
  .then(() => {
   const paystackScript = cEl('script', { src: 'https://js.paystack.co/v1/inline.js' });
   document.body.append(paystackScript);
   
   main.empty();
   main.append(confirmPayment(product, data, paystackScript));
  })
  .catch(err => {
   // TODO: Check type of error, if no transaction document with id "aff_id", (manipulated url)
   
   // alert('Invalid aff_id. Please check for url validity.');
   
  });
 }
 
 function field(textContent, name, type, placeholder) {
  return cEl('div', { class: 'rounded-lg bg-9 py-3' },
   cEl('label', { textContent, class: 'inline-block mb-1' }),
   cEl('input', { ariaLabel: textContent, class: 'w-full p-3 bg-7 color2', type, name, placeholder, required: true })
  );
 }
 
 const main = cEl('main', { class: 'p-3 mx-auto max-w-xl text-gray-600' });
 /*
 main.append(
  cEl('h1', { textContent: 'Checkout Information', class: 'text-2xl mt-4' }),
  cEl('p', { class: 'text-md mb-6' },
   svg('<svg stroke="lightgray" fill="lightgray" stroke-width="0" viewBox="0 0 512 512" width="1.2em" height="1.2em" class="inline-block mr-2" xmlns="http://www.w3.org/2000/svg"> <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" /></svg>'),
   text('Complete your details by filling in the form below')
  ),
  productName,
  cEl('hr'),
  cEl('form', { class: 'text-sm my-6 font-bold border p-3 rounded-lg',
   event: {
    submit: function(e) {
     e.preventDefault();
      
     this.getElementsByTagName('button')[0].innerHTML = loader;
     sendTransactionInfo(new FormData(this));
    }
   }
   },
   field('Full name:', 'fullName', 'text', 'Enter full name'),
   field('Phone number:', 'phoneNo', 'number', 'Enter phone number'),
   field('Email address:', 'email', 'email', 'Enter email address'),
   cEl('div', { class: 'rounded-lg bg-9 py-3' },
    cEl('label', { textContent: 'Country:', class: 'inline-block mb-1' }),
    cEl('select', { name: 'country', class: 'w-full p-3 bg-7 color2' },
     ...countries.map(each => new Option(each) )
    )
   ),
   cEl('button', { type: 'submit', textContent: 'Continue',
    class: 'py-3 mb-4 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center'
   }))
 );
 */
 let inputs = main.getElementsByTagName('input');
 
 iter(inputs, input => {
  input.ae('input', function() {
   this.value = Array.from(this.value).filter(key => !invalidChar.includes(key)).join('');
  });
 });
 main.append(...confirmPayment())
 
 document.body.innerHTML = '';
 document.body.append(
  cEl('header', { style: { background: 'transparent' } },
   cEl('img', { src: './static/images/Logo.png', class: 'w-48 py-2 mx-auto' })
  ),
  main
 );
})();

function confirmPayment(product = {}, data, paystackScript) {
 let loaded = false;
 
 function payWithPaystack(event) {
  event.preventDefault();
  
  if(!loaded) alert('Payment service not loaded! Please check your internet connection.');
  
  let email = data.email;
  let amount = this.amount;
  
  if (+amount.value < product.amount) {
   return alert('Error initiating request! Please check the amount and try again.');
  }
  elId('continuePayment').classList.add('d-none');
  elId('spinner').classList.remove('d-none');
  try {
   const handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY',
    email: email || "ojilevictor11@gmail.com",
    amount: amount.value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    callback: function(response) {
     
     alert('Payment has been made successfully');
     //this happens after the payment is completed successfully
     var reference = response.reference;
     alert('Payment complete! Reference: ' + reference);
     // Make an AJAX call to your server with the reference to verify the transaction
 
     fetch('paystack.js', {
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({ reference }),
       referrerPolicy: '', // no-referrer-when-downgrade
      })
      .then(res => res.json())
      .then(res => {
 
      })
      .catch(error => alert(error));
    },
    onClose: function() {
     let continuePayment = elId('continuePayment');
     continuePayment.textContent = "Try again";
     continuePayment.classList.remove('d-none');
     continuePayment.nextElementSibling.classList.add('d-none');
    },
   });
   handler.openIframe();
  } catch (e) {
   setTimeout(() => {
    alert('Sorry, there was a problem initiating this transaction!');
    let continuePayment = elId('continuePayment');
    continuePayment.textContent = "Try again!";
    continuePayment.classList.remove('d-none');
    elId('spinner').classList.add('d-none');
   }, 200);
  }
 }

 paystackScript.onload = function() {
  loaded = true;
 };
   
 return [
  cEl('h1', { textContent: 'Payment confirmation', class: 'text-2xl py-4' }),
  cEl('hr'),
  cEl('h2', { textContent: 'The Ultimate Money Machine' || product.name, class: 'text-xl py-4' }),
  cEl('form', { class: 'text-sm font-bold border rounded-lg p-1', event: { submit: payWithPaystack } },
   cEl('div', { class: 'bg-9 p-3' },
    cEl('label', { textContent: 'Amount', class: 'inline-block mb-1' }),
    cEl('div', { class: 'grid grid-cols-6' },
     cEl('input', { value: 'NGN', class: 'col-span-1 text-center border', disabled: true }),
     cEl('input', { textContent: 'Amount', class: 'p-3 bg-7 color2 col-span-5', type: 'number', name: 'amount', value: product.amount, required: true })
    ),
    cEl('div', { class: 'flex justify-between pt-2' },
     cEl('span', { textContent: 'Charge' }),
     cEl('span', { textContent: '0.00 NGN' })
    ),
    cEl('div', { class: 'flex justify-between pt-2' },
     cEl('span', { textContent: 'Product price' }),
     cEl('span', { textContent: (product.amount || '0.00') +  ' NGN' })
    ),
   )
  )
 ];
 
}