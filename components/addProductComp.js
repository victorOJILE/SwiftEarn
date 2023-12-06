import { db, addDoc, setDoc, doc, query, collection, where } from '../src/header.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import Img from './mediaUpload.js';

const storage = getStorage();

export default function AddProduct(uid, productData, vendor_name) {
 let edit = productData && productData.product_id;

 // productData here means we are trying to edit an existing product using this UI component
 let product_id = edit;
 
 async function sendRequest(data) {
  if(edit) {
   await setDoc(doc(db, 'products', product_id), data, { merge: true });
   
   return product_id;
  } else {
   let docRef = await addDoc(collection(db, 'products'), data);
   
   await setDoc(doc(db, 'products', docRef.id), { product_id: docRef.id }, { merge: true });
   
   return docRef.id;
  }
 }
 
 let username = edit && productData.vendor_name;

 EventBus.subscribe('loaded-data', data => username = data.fullName || 'SwiftEarn vendor');
 
 let oldProductImage = edit && productData.productImageUrl, canvas;
 
 const { imageUpload, renderImage } = Img(canv => canvas = canv, { width: 200, height: 150 });
 
 oldProductImage && renderImage(oldProductImage);
 
 const section = cEl('section', { class: 'color2 bg-9' },
  cEl('form', { name: 'setting',
   class: 'text-sm py-8',
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
      status: 'Pending',
      affiliates: 0
     };

     iter(formData, key => data[key[0]] = key[1]);
     
     delete data.photoUrl;

     for(let key in data) {
      if(data[key] === '') return alert('Incomplete data');
     }
     
     submit.innerHTML = loader;
     
     try {
     if (canvas) { // Upload image
      canvas.toBlob(async (blob) => {
       let docRefId;
       try {
       docRefId = await sendRequest(data);
       } catch(e) {
        submit.innerHTML = 'Continue';
        return;
       }
       
       product_id = product_id || docRefId;
       
       const imageRef = ref(storage, 'products/' + uid + product_id);
       
       await uploadBytes(imageRef, blob);
       
       // Add productImageUrl to product data
       let productImageUrl = await getDownloadURL(imageRef);
       
       await setDoc(doc(db, 'products', product_id), { productImageUrl }, { merge: true });
       
       location.href = '/SwiftEarn/product/products.html';
      });
     } else {
      if (oldProductImage || confirm('No product image! Do you want to continue?')) {
       sendRequest(data, submit)
       .then(() => location.href = '/SwiftEarn/product/products.html');
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
   cEl('div', { class: 'md:grid md:grid-cols-2 items-start' },
    cEl('div', {}, imageUpload),
    cEl('div', { class: 'pt-10 md:pt-0' },
     cEl('div', { class: 'mb-8' },
      cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Name:', htmlFor: 'name' }),
      cEl('input', { class: 'w-full p-3 bg-7 color2', id: 'name', name: 'name', value: edit && productData.name || '', placeholder: 'Enter product name' }),
     ),
     cEl('div', { class: 'mb-8' },
      cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Description:', htmlFor: 'descr' }),
      cEl('textarea', { class: 'w-full p-3 bg-7 color2 h-36', name: 'description', id: 'descr', value: edit && productData.description || '', placeholder: 'Enter product description' })
     )
    )
   ),
   cEl('div', { class: 'mb-8 grid' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Category:', htmlFor: 'category' }),
    cEl('select', { class: 'w-full p-3 bg-7 color2', id: 'category', name: 'category', defaultValue: edit && productData.category || '' },
     new Option('Category', ''), ...['Sales and Marketing', 'E-commerce', 'Forex', 'CryptoCurrency', 'Amazon KDP', 'Facebook Ads', 'Freelance', 'Sports', 'Education & Study', 'Designs', 'Software', 'Entertainment & Art'].map(cat => new Option(cat))
    )
   ),
   cEl('div', { class: 'grid grid-cols-2 gap-4 mb-8' },
    cEl('div', {},
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Price:', htmlFor: 'price' }),
     cEl('div', { class: 'grid grid-cols-5' },
      cEl('select', { class: 'text-center col-span-2 bg-7 color2', name: 'currency', disabled: true },
       new Option('USD')
      ),
      cEl('input', { class: 'p-3 col-span-3 bg-7 color2', type: 'number', name: 'price', id: 'price', value: edit && productData.price || '', placeholder: 'Price' })
     )
    ),
    cEl('div', {},
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'Commission:', htmlFor: 'comm' }),
     cEl('div', { class: 'grid grid-cols-6' },
      cEl('select', { class: 'text-center col-span-2 bg-7 color2', disabled: true },
       new Option('%'),
      ),
      cEl('input', { class: 'col-span-4 p-3 bg-7 color2', type: 'number', name: 'commission', id: 'comm', value: edit && productData.commission || '', placeholder: '0' })
     )
    )
   ),
   cEl('div', { class: 'grid md:grid-cols-2 gap-4' },
    cEl('div', { class: 'mb-4' },
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'JV Page URL:', htmlFor: 'jvPageUrl' }),
     cEl('input', { class: 'w-full p-3 bg-7 color2', id: 'jvPageUrl', name: 'jvPageUrl', value: edit && productData.jvPageUrl || '', placeholder: 'Enter your JV page URL' })
    ),
    cEl('div', { class: 'mb-8' },
     cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product Page URL:', htmlFor: 'productPageUrl' }),
     cEl('input', { class: 'w-full p-3 bg-7 color2', id: 'productPageUrl', name: 'productPageUrl', value: edit && productData.productPageUrl || '', placeholder: 'Enter your product page URL' }),
    )
   ),
   cEl('div', { class: 'mb-4' },
    cEl('label', { class: 'block mb-2 font-bold', textContent: 'Product download or Thank you Page URL:', htmlFor: 'thanksPageUrl' }),
    cEl('textarea', { class: 'w-full p-3 bg-7 color2 h-24', name: 'thankYouPageUrl', placeholder: 'Enter your product page URL', id: 'thanksPageUrl', value: edit && productData.productPageUrl || '' })
   ),
   cEl('button', {
    type: 'submit',
    textContent: 'Continue',
    class: 'py-3 mb-4 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center'
   })
  )
 );

 const main = cEl('main', { class: 'p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
  cEl('div', { class: 'mb-4 max-w-xl' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Add New Product' }),
   cEl('p', { textContent: 'Effortlessly add, update, and showcase your product with a few clicks. Elevate your online presence with hassle-free product management – your success starts here!', class: "color4 pr-2 text-sm" }),
  ),
  edit || section
 );

 return edit ? section : main;
}

const loader = '<span><svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em"  xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg></span>';