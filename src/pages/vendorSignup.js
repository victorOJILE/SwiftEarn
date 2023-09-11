//import { auth, unsubscribe, updateUser } from '../auth.js';
import Header/*, { db, getDoc, setDoc, doc } */from '../header.js';

function VendorSetting(uid) {
 function updateRequest(col, data) {
  return setDoc(doc(db, col, uid), data, { merge: true });
 }

 let user, username, currentFile;
 
 function getUser() {
   user = sessionStorage.getItem('user');
   if (user) {
    user = JSON.parse(user);
    username = `${user.firstName} ${user.lastName}`;
   } else {
    getDoc(doc(db, 'users', uid))
     .then(res => {
      let data = res.data();
      user = data;
      username = `${data.firstName} ${data.lastName}`;
     })
     .catch(() => setTimeout(getUser, 5000));
   }
 }
// setTimeout(getUser, 10000);
 
 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  cEl('div', { class: 'mb-4 max-w-xl' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Join our vibrant marketplace as a vendor and unlock new opportunities for growth.' }),
   cEl('p', { textContent: "Expand your brand's presence, boost your sales, and establish valuable connections in our vibrant community of buyers and sellers.", class: "color4 pr-2 text-sm" }),
  ),
  cEl('form', 
   {
    name: 'vendorSignup',
    class: 'text-sm',
    event: {
     submit: (e) => e.preventDefault()
    }
   },
   cEl('div', { class: 'rounded-lg bg-9 p-3 mt-12' },
    cEl('label', { textContent: 'Business Name:', class: 'inline-block mb-1' }),
    cEl('input', { ariaLabel: 'Enter Business Name', class: 'w-full p-3 bg-7 color2', type: 'text', name: 'businessName', placeholder: 'Enter Business Name' })
   ),
   cEl('div', { class: 'rounded-lg bg-9 p-3' },
    cEl('label', { textContent: 'About Me:', class: 'inline-block mb-1' }),
    cEl('textarea', { ariaLabel: 'Write about yourself', class: 'w-full h-24 p-3 bg-7 color2', name: 'aboutMe', placeholder: 'Write about yourself' })
   ),
   cEl('div', { class: 'rounded-lg bg-9 p-3' },
    cEl('label', { textContent: 'Business Description:', class: 'inline-block mb-1' }),
    cEl('textarea', { ariaLabel: 'Enter Business description', class: 'w-full h-24 p-3 bg-7 color2', name: 'businessDescription', placeholder: 'Write about your business' })
   ),
   cEl('button', {
    type: 'button',
    textContent: 'Continue',
    class: 'py-3 mb-4 mx-3 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center',
    event: {
     click: async function(e) {
      this.disabled = true;
      this.innerHTML = loader;
      let formData = new FormData(document.forms.vendorSignup);

      let data = {
       vendor_name: username,
       createdAt: Date.now(),
       photoUrl: user.photoUrl,
       products: [],
       vendorEarning: '$0',
       vendor_id: uid,
       conversions: '0%',
       interactions: 0,
       total_sales: 0
      };

      iter(formData, key => data[key[0]] = key[1]);
      
      await updateRequest('vendors', data);
      await updateRequest('users', {
        role: 'affiliate-vendor'
       });
      
      location.href = '../product/products.html';
     }
    }
   }))
 );

 return main;
}
/*
unsubscribe.authenticate = function(uid) {*/
 Header('Vendors'/*, uid*/).append(VendorSetting(/*uid*/));
//}

const loader = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';