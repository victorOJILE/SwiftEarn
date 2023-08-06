import { firebase_app, unsubscribe } from '../auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { getFirestore, setDoc, getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import Header from '../header.js';

const db = getFirestore(firebase_app);

function Profile(uid) {
 const countries = [
		"",
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
 const banks = [
		'', "Access Bank Plc ", "Citibank Nigeria Limited", "Ecobank Nigeria Plc", "First Bank Plc", "First City Monument Bank Plc", "Fidelity Bank Plc", "Globus Bank Limited", "Guaranty Trust Bank Plc", "Heritage Banking Company Ltd", "Keystone Bank Limited", "Parallex Bank Ltd", "Polaris Bank Plc", "Premium Trust Bank", "Providus Bank", "Stanbic IBTC Bank Plc", "Standard Chartered Bank Nigeria Ltd.", "Sterling Bank Plc", "Sun Trust Bank Nigeria Limited", "Titan Trust Bank Ltd", "Union Bank of Nigeria Plc", "United Bank for Africa", "Unity Bank Plc", "Wema Bank Plc", "Zenith Bank Plc", "Optimus Bank", "Jaiz Bank Plc", "Taj Bank", "Lotus Bank"];

 function updateRequest(data) {
  return setDoc(doc(db, 'users', uid), data, { merge: true });
 }

 const storage = getStorage();
 
 async function getData() {
  try {
   getDoc(doc(db, 'users', uid))
   .then(res => {
    const data = res.data();
    const form = document.forms.setting;
    
    for(let key in data) {
     if(key == 'profilePictureUrl') {
      if(data[key]) img.src = data[key];
     } else if(form[key]) {
      form[key].value = data[key];
     }
    }
   }).catch(e => getData());
  } catch(e) {
   getData();
  }
 }
 getData();
 
 function field({ label, type, name, useDatalist, id, arr }) {
  return cEl('div', { class: 'py-2 px-3 bg-8 rounded-lg' },
   cEl('div', { class: 'bg-9 flex justify-between items-center' },
    cEl('div', { class: 'p-3 flex-grow' },
     cEl('input', { ariaLabel: label, class: 'w-full p-3 bg-7 color2', type, disabled: true, list: id, name: id || name, placeholder: label }),
     useDatalist ? cEl('datalist', { id: id },
      ...arr.map(each => cEl('option', { value: each, textContent: each }))
     ) : ''
    ),
    cEl('button', {
      type: 'button',
      class: 'p-2 color4',
      event: {
       click: function() {
        if (this.firstElementChild.nodeName.toLowerCase() == 'img') {
         // Enable its input field
         this.previousElementSibling.firstElementChild.disabled = false;
         // Change icon to a check mark
         this.innerHTML = '<svg stroke="green" fill="green" stroke-width="0" viewBox="0 0 512 512" width="1.6em" height="1.6em"  xmlns="http://www.w3.org/2000/svg"> <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" /></svg>';
        } else if (!this.firstElementChild.classList.contains('spin')) {
         // send update request
         let data = {};
         data[id || name] = this.previousElementSibling.firstElementChild.value;
         this.innerHTML = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.6em" height="1.6em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';
         updateRequest(data)
          .then(() => {
           this.innerHTML = `<img class="w-5" src="/SwiftEarn/static/images/faEdit.svg" />`;
           this.previousElementSibling.firstElementChild.disabled = true;
          })
          .catch(e => console.log(e));
        }
       }
      }
     },
     cEl('img', { class: 'w-5', src: '/SwiftEarn/static/images/faEdit.svg' })
    )
   )
  )
 }

 let currentFile;
 const img = cEl('img', { src: '/SwiftEarn/static/images/username-icon.svg', alt: 'Profile picture' });

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  cEl('div', { class: 'mb-4 max-w-xl' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Profile settings' }),
   cEl('p', { textContent: 'Update your profile. Manage contact details, payment info, and preferences for enhanced performance.', class: "color4 pr-2 text-xs" }),
  ),
  cEl('section', {},
   cEl('form', { name: 'setting', class: 'text-xs' },
    cEl('div', { class: 'my-12' },
     cEl('div', { class: 'flex flex-col items-center' },
      cEl('div', { class: 'mt-6 mx-auto w-24 h-24 rounded-full bg-7 overflow-hidden' },
       img
      ),
      cEl('button', { class: 'relative p-1 px-3 text-xs font-bold bg-gray-700 text-gray-100 rounded-lg mt-2 overflow-hidden', type: 'button' },
       cEl('span', { textContent: 'Upload' }),
       cEl('input',
       {
        class: 'absolute top-0 left-0 h-full opacity-0',
        type: 'file',
        name: 'profilePictureUrl',
        event: {
         change: function() {
          try {
           let file = this.files[0];
           if (!file.type.match(new RegExp('image.*')) && file.type.match(new RegExp('jpg||png||gif||webp', 'i'))) return alert('Please upload an image file of these formats: .jpg .png .gif .webp');

           if (currentFile) URL.revokeObjectURL(currentFile);
           let url = URL.createObjectURL(file);
           img.src = url;
           currentFile = url;
           this.disabled = true;
           this.parentElement.firstElementChild.innerHTML = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';
           let stop = () => {
            
           }
           // Upload image
           // Create a reference to 'images/imageName.jpg'
           const imageRef = ref(storage, 'images/' + file.name);

           uploadBytes(imageRef, file).then((snapshot) => {
             getDownloadURL(imageRef)
              .then(url => {
               updateRequest({
                 // Add profilePictureUrl to vendor data
                 profilePictureUrl: url
                })
                .then(stop)
              })
              .catch(stop);
            })
            .catch(err => console.error(err));
          } catch (e) {
           if (e.name == 'TypeError') return;
           alert('Please upload an image file!');
           console.error(e.stack);
          }
         }
        }
       })
      )
     )
    ),
    cEl('h3', { class: 'text-lg mb-2', textContent: 'Basic Information' }),
    cEl('div', { class: 'grid md:grid-cols-2 md:gap-4' },
     field({ label: 'Edit First Name', type: 'text', name: 'firstName' }),
     field({ label: 'Edit Last Name', type: 'text', name: 'lastName' }),
     field({ label: 'Edit Email Address', type: 'email', name: 'email' }),
     field({ label: 'Edit Phone No', type: 'number', name: 'phoneNumber' }),
     field({ label: 'Edit Country', useDatalist: true, id: 'country', arr: countries })
    ),
    cEl('h3', { class: 'text-lg mb-2 mt-12', textContent: 'Account Information' }),
    field({ label: 'Edit Bank Name', useDatalist: true, id: 'bank', arr: banks }),
    cEl('div', { class: 'grid md:grid-cols-2 md:gap-4' },
     field({ label: 'Edit Account Name', type: 'text', name: 'bankAccName' }),
     field({ label: 'Edit Account No', type: 'number', name: 'bankAccNo' })
    ),
    cEl('h3', { class: 'text-lg mb-2 mt-12', textContent: 'Social media handles' }),
    cEl('div', { class: 'grid md:grid-cols-2 md:gap-4' },
     field({ label: 'Edit Instagram Handle', type: 'text', name: 'instaHandle' }),
     field({ label: 'Edit Twitter Handle', type: 'text', name: 'twitHandle' }),
     field({ label: 'Edit Facebook Handle', type: 'text', name: 'fbHandle' })
    )
   )
  )
 );

 return main;
}

unsubscribe.authenticate = function(type, user) {
 if (type) {
  let myPage = Header('Settings', user.uid);
  myPage.append(Profile(user.uid));
 } else {
  location.href = '/SwiftEarn/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
}
