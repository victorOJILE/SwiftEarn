import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, setDoc, doc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import Header from '../header.js';

const db = getFirestore(firebase_app);


function VendorSetting(uid) {
 function updateRequest(col, data) {
  return setDoc(doc(db, col, uid), data, { merge: true });
 }

 const storage = getStorage();

 let username;
  setTimeout(() => {
   let user = sessionStorage.getItem('user');
   if (user) {
    user = JSON.parse(user);
    username = `${user.firstName} ${user.lastName}`;
   } else {
    getDoc(doc(db, 'users', uid))
     .then(res => {
      aside.innerHTML = '';
      let data = res.data();
      username = `${data.firstName} ${data.lastName}`;
     });
   }
  }, 10000);
 
 let currentFile;
 const img = cEl('img', { class: 'w-2/3', src: '/SwiftEarn/static/images/username-icon.svg', alt: 'Profile picture' });

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  cEl('div', { class: 'mb-4 max-w-xl' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Join our vibrant marketplace as a vendor and unlock new opportunities for growth.' }),
   cEl('p', { textContent: "Expand your brand's presence, boost your sales, and establish valuable connections in our vibrant community of buyers and sellers.", class: "color4 pr-2 text-xs" }),
  ),
  cEl('form', {
    name: 'setting',
    class: 'text-xs',
    event: {
     submit: (e) => e.preventDefault()
    }
   },
   cEl('div', { class: 'my-12' },
    cEl('h3', { class: 'text-lg mb-2', textContent: 'Business picture' }),
    cEl('div', { class: 'flex flex-col items-center' },
     cEl('div', { class: 'mt-6 mx-auto w-24 h-24 rounded-full bg-7 overflow-hidden flex items-center justify-center' },
      img
     ),
     cEl('button', { class: 'relative p-1 px-3 text-xs text-gray-100 font-bold bg-gray-700 rounded-lg mt-2 overflow-hidden', type: 'button' },
      cEl('span', { textContent: 'Upload' }),
      cEl('input',
      {
       class: 'absolute top-0 left-0 h-full opacity-0',
       type: 'file',
       name: 'businessImageUrl',
       event: {
        change: function() {
         try {
          let file = this.files[0];
          if (!file.type.match(new RegExp('image.*')) || !file.type.match(new RegExp('jpg||png||gif||webp', 'i'))) return alert('Please upload an image file of these formats: .jpg .png .gif .webp');

          if (currentFile) URL.revokeObjectURL(currentFile);
          let url = URL.createObjectURL(file);
          img.src = url;
          currentFile = url;
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
   cEl('div', { class: 'rounded-lg bg-9 p-3' },
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
     click: function(e) {
      this.disabled = true;
      this.innerHTML = loader;
      let formData = new FormData(main.getElementsByTagName('form')[0]);

      let data = {
       vendor_name: username,
       createdAt: Date.now(),
       products: [],
       vendorEarning: '$0',
       vendor_id: uid,
       conversions: '0%',
       interactions: 0,
       total_sales: 0
      };

      iter(formData, key => data[key[0]] = key[1]);
      
      // data.businessDescription = JSON.stringify(data.businessDescription)
      
      let profileImg;
      
      try {
       profileImg = data.businessImageUrl.files[0];
      } catch(e) {
       console.error(e);
      }
      delete data.businessImageUrl;
      
      let err = (e) => {
       console.error(e);
       this.disabled = false;
       this.innerHTML = 'Continue';
      }

      if (profileImg && profileImg.type.match(new RegExp('image.*')) && file.type.match(new RegExp('jpg||png||gif||webp', 'i'))) {
       // Upload image
       const imageRef = ref(storage, 'images/' + profileImg.name);

       uploadBytes(imageRef, profileImg).then((snapshot) => {
         getDownloadURL(imageRef)
          .then(url => {
           updateRequest('vendors', {
            // Add businessImageUrl to vendor data
            ...data,
            businessImageUrl: url
           })
           .then(() => {
            updateRequest('users', {
             role: 'affiliate-vendor'
            })
            .then(() => location.href = '/SwiftEarn/product/products.html');
           })
          })
          .catch(err);
        })
        .catch(err);
      } else {
       updateRequest('vendors', data)
        .then(() => {
         updateRequest('users', {
           role: 'affiliate-vendor'
          })
          .then(() => location.href = '/SwiftEarn/product/products.html');
        })
        .catch(err);
      }
     }
    }
   }))
 );

 return main;
}

unsubscribe.authenticate = function(type, user) {
 if (type) {
  let myPage = Header('Vendors', user.uid);
  myPage.append(VendorSetting(user.uid));
 } else {
  location.href = '/SwiftEarn/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
}

const loader = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';