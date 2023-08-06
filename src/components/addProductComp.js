import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import { firebase_app } from '../auth.js';
import { getFirestore, getDoc, getDocs, setDoc, doc, query, collection, where, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const db = getFirestore(firebase_app);

export { db, getDocs, query, collection, where };

export default function AddProduct(uid, productData) {
 let edit = productData && productData.product_id;

 // productData here means we are trying to edit an existing product using this interface
 let product_id = edit || generateId();

 function sendRequest(data) {
  return setDoc(doc(db, 'products', product_id), data, { merge: true });
 }

 const storage = getStorage();
 
 let username;
 if (!edit) {
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
 } else {
  username = productData.vendor_name
 }

 let currentFile;

 const img = cEl('img', { src: edit && productData.productImageUrl || '/static/images/background.jpg', alt: 'Product image' });

 const submit = cEl('button', {
  type: 'submit',
  textContent: 'Continue',
  class: 'py-3 mb-4 mx-3 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center'
 });

 const section = cEl('section', { class: 'color2 bg-9' },
  cEl('form', {
    name: 'setting',
    class: 'text-xs',
    autoComplete: true,
    event: {
     submit: function(e) {
      e.preventDefault();
      let formData = new FormData(this);
      let data = edit && productData || {
       vendor_id: uid,
       addedAt: Date.now(),
       sales: 0,
       conversion: '0%',
       vendor_name: username,
       product_id,
       status: 'Pending',
       aff_id: `/analytics?action=aff&id=${uid}swift${product_id}`
      };

      iter(formData, key => data[key[0]] = key[1]);

      let productImg;

      try {
       productImg = data.productImageUrl;
      } catch (e) {
       console.error(e);
      }
      
      delete data.productImageUrl;

      function err(e) {
       submit.innerHTML = 'Continue';
       console.error(e);
      }

      submit.innerHTML = loader;
      // Upload image
      if (productImg && productImg.type.match(new RegExp('image.*')) && productImg.type.match(new RegExp('jpg||png||gif||webp', 'i'))) {

       const imageRef = ref(storage, 'images/' + productImg.name);

       uploadBytes(imageRef, productImg).then((snapshot) => {
         getDownloadURL(imageRef)
          .then(url => {
           sendRequest({
             // Add productImageUrl to product data
             ...data,
             productImageUrl: url
            })
            .then(() => {
             updateDoc(doc(db, 'vendors', uid), { products: arrayUnion(product_id) })
             .then(() => location.href = '/SwiftEarn/product/products.html')
            });
          })
          .catch(err);
        })
        .catch(err);
      } else {
       if (confirm('No product image was added! Do you want to continue?')) {
        sendRequest(data)
         .then(() => {
          updateDoc(doc(db, 'vendors', uid), { products: arrayUnion(product_id) })
          .then(() => location.href = '/SwiftEarn/product/products.html')
         });
       }
      }
     }
    }
   },
   cEl('div', { class: edit ? 'py-12' : 'my-12' },
    cEl('h3', { class: 'text-lg mb-2 text-center', textContent: 'Product Information' }),
    cEl('div', { class: 'flex flex-col items-center' },
     cEl('div', { class: 'mt-6 mx-auto w-24 h-24 rounded-full bg-7 overflow-hidden' },
      img
     ),
     cEl('button', { class: 'relative p-1 px-3 text-xs font-bold bg-gray-700 text-gray-100 rounded-lg mt-2 overflow-hidden', type: 'button' },
      cEl('span', { textContent: 'Upload image' }),
      cEl('input',
      {
       class: 'absolute top-0 left-0 h-full opacity-0',
       type: 'file',
       name: 'productImageUrl',
       event: {
        change: function() {
         try {
          let file = this.files[0];

          if (!file.type.match(new RegExp('image.*')) && !file.type.match(new RegExp('jpg||png||gif||webp', 'i'))) {
           return alert('Please upload an image file of these formats: .jpg .png .gif .webp');
          }

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
   cEl('div', { class: 'm-3 mb-8 grid' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Name:', htmlFor: 'name' }),
    cEl('input', { class: 'block p-3 bg-7 color2', id: 'name', name: 'name', value: edit && productData.name || '', placeholder: 'Enter product name' }),
   ),
   cEl('div', { class: 'm-3 mb-8 grid' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Description:', htmlFor: 'descr' }),
    cEl('textarea', { class: 'block p-3 bg-7 color2 h-36', name: 'description', id: 'descr', value: edit && productData.description || '', placeholder: 'Enter product description' })
   ),
   cEl('div', { class: 'm-3 mb-8 grid' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Category:', htmlFor: 'category' }),
    cEl('select', { class: 'block p-3 bg-7 color2', id: 'category', name: 'category' },
     new Option('Category', ''),
     new Option('E-commerce'),
     new Option('Forex'),
     new Option('CryptoCurrency'),
     new Option('Amazon KDP'),
     new Option('Facebook Ads'),
     new Option('Freelance'),
     new Option('Designs')
    ),
   ),
   cEl('div', { class: 'grid grid-cols-2 gap-4 m-3 mb-8' },
    cEl('div', {},
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Price:', htmlFor: 'price' }),
     cEl('div', { class: 'grid grid-cols-2' },
      cEl('select', { class: 'text-center bg-7 color2', name: 'currency' },
       new Option('USD', '$'),
       new Option('EUR', '€'),
       new Option('GBP', '£'),
       new Option('NGN', '₦'),
       new Option('GHS', '¢'),
       new Option('ZAR', 'R')
      ),
      cEl('input', { class: 'p-3 bg-7 color2', type: 'number', name: 'price', id: 'price', value: edit && productData.price || '', placeholder: 'Price' })
     )
    ),
    cEl('div', {},
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'Affiliate Commission:', htmlFor: 'comm' }),
     cEl('div', { class: 'grid grid-cols-6' },
      cEl('select', { class: 'text-center col-span-2 bg-7 color2', disabled: true },
       new Option('%'),
      ),
      cEl('input', { class: 'col-span-4 p-3 bg-7 color2', type: 'number', name: 'commission', id: 'comm', value: edit && productData.commission || '', placeholder: '0' })
     )
    )
   ),
   cEl('div', { class: 'm-3 mb-8' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'JV Page URL:', htmlFor: 'jvPageUrl' }),
    cEl('textarea', { class: 'w-full p-3 bg-7 color2 h-24', name: 'jvPageUrl', id: 'jvPageUrl', value: edit && productData.jvPageUrl || '', placeholder: 'Enter URL' }),
   ),
   cEl('div', { class: 'm-3 mb-8' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Page URL:', htmlFor: 'productPageUrl' }),
    cEl('textarea', { class: 'w-full p-3 bg-7 color2 h-24', name: 'productPageUrl', placeholder: 'Enter URL', id: 'productPageUrl', value: edit && productData.productPageUrl || '' })
   ),
   submit
  )
 );

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
  cEl('div', { class: 'mb-4 max-w-xl mx-auto' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Add New Product' }),
   cEl('p', { textContent: 'Update your profile. Manage contact details, payment info, and preferences for enhanced performance.', class: "color4 pr-2 text-xs" }),
  ),
  edit || section
 );

 return edit ? section : main;
}

function id() {
 let idVals = [],
  i = 48,
  limit = 58,
  id = "";

 while (i < limit) {
  idVals.push(String.fromCodePoint(i));
  if (i == 57) {
   i = 64;
   limit = 91
  }
  if (i == 90) {
   i = 96;
   limit = 123
  }
  i++;
 }

 return function(salt = 25) {
  for (let j = 0; j < salt; j++) {
   id += idVals[Math.floor(Math.random() * 60)];
  }
  return id;
 }
}

const generateId = id();

const loader = '<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>';