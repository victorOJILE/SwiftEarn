import { db, getDoc, setDoc, doc, query, collection, where, updateDoc } from '../src/header.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import Img from './mediaUpload.js';

const storage = getStorage();

export default function AddProduct(uid, productData, vendor_name) {
 let edit = productData && productData.product_id;

 // productData here means we are trying to edit an existing product using this UI component
 let product_id = edit || generateId();
 
 async function sendRequest(data, submit) {
  if(edit) {
   await setDoc(doc(db, 'products', product_id), data, { merge: true });
   submit.innerHTML = 'Continue';
  } else {
   let querySnapshot = await getDoc(doc(db, 'products', product_id));
   
   if (querySnapshot.exists()) {
    await sendRequest(data);
   } else {
    setDoc(doc(db, 'products', product_id), data)
    .then(() => location.href = '/SwiftEarn/product/products.html');
   }
  }
 }
 
 // This EventBus may/would not run if this component is called by manageProduct
 
 let username = edit && productData.vendor_name;

 EventBus.subscribe('loaded-data', function(data) {
  username = `${data.firstName} ${data.lastName}`;
 });
 
 let oldProductImage = edit && productData.productImageUrl, canvas;
 
 const { imageUpload, renderImage } = Img(canv => canvas = canv, {
  width: 300,
  height: 200
 });
 
 oldProductImage && renderImage(oldProductImage);
 
 const section = cEl('section', { class: 'color2 bg-9' },
  cEl('form', { name: 'setting',
   class: 'text-sm',
   event: {
    submit(e) {
     e.preventDefault();
     
     let submit = this.getElementsByTagName('button')[1];
     let formData = new FormData(this);
     let data = edit && productData || {
      vendor_id: uid,
      addedAt: Date.now(),
      sales: 0,
      conversion: '0%',
      vendor_name: username,
      product_id,
      status: 'Pending'
     };

     iter(formData, key => data[key[0]] = key[1]);
     
     delete data.photoUrl;

     submit.innerHTML = loader;
     
     try {
     if (canvas) { // Upload image
      canvas.toBlob(async (blob) => {
       const imageRef = ref(storage, 'products/' + uid + product_id);
       
       await uploadBytes(imageRef, blob);
       
       // Add productImageUrl to product data
       data.productImageUrl = await getDownloadURL(imageRef);
       
       await sendRequest(data, submit);
      });
     } else {
      if (oldProductImage || confirm('No product image! Do you want to continue?')) {
       sendRequest(data, submit);
      } else {
       submit.innerHTML = 'Continue';
      }
     }
     } catch(e) {
      submit.innerHTML = 'Continue';
      console.error(e);
     }
    }
   } },
   cEl('div', { class: edit ? 'py-12' : 'my-12' },
    cEl('h2', { class: 'text-lg mb-2 text-center', textContent: 'Product Information' }),
    imageUpload
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
    cEl('select', { class: 'block p-3 bg-7 color2', id: 'category', name: 'category', defaultValue: edit && productData.category || '' },
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
      cEl('select', { class: 'text-center bg-7 color2', name: 'currency', defaultValue: edit && productData.currency },
       new Option('USD'),
       new Option('NGN'),
       new Option('GHS'),
       new Option('ZAR')
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
   cEl('button', {
    type: 'submit',
    textContent: 'Continue',
    class: 'py-3 mb-4 mx-3 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center'
   })
  )
 );

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
  cEl('div', { class: 'mb-4 max-w-xl mx-auto' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Add New Product' }),
   cEl('p', { textContent: 'Update your profile. Manage contact details, payment info, and preferences for enhanced performance.', class: "color4 pr-2 text-sm" }),
  ),
  edit || section
 );

 return edit ? section : main;
}

const generateId = (function() {
 let idVals = [],
  i = 48,
  limit = 58;

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
  let id = '';
  for (let j = 0; j < salt; j++) {
   id += idVals[Math.floor(Math.random() * 60)];
  }
  return id;
 }
})();

const loader = '<span><svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg></span>';