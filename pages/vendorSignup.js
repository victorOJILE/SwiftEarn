import { db, setDoc, doc } from '../src/header.js';

export default function VendorSignup(uid) {
 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  cEl('div', { class: 'mb-4 max-w-xl' },
   cEl('h2', { class: 'text-2xl md:text-3xl mb-2', textContent: 'Join our vibrant marketplace as a vendor and unlock new opportunities for growth.' }),
   cEl('p', { textContent: "Expand your brand's presence, boost your sales, and establish valuable connections in our vibrant community of buyers and sellers.", class: "color4 pr-2 text-sm" }),
  ),
  cEl('form', 
   {
    class: 'text-sm',
    event: {
     submit(e) {
      e.preventDefault();
      
      const submitBtn = this.getElementsByTagName('button')[0];
      submitBtn.disabled = true;
      submitBtn.innerHTML = loader;
      
      let formData = new FormData(this);
      
      let data = {
       createdVendorAcctAt: Date.now(),
       vendorEarning: '$0',
       conversions: '0%',
       interactions: 0,
       total_sales: 0,
       role: 'affiliate-vendor'
      };
      
      iter(formData, key => data[key[0]] = key[1]);
      
      setDoc(doc(db, 'users', uid), data, { merge: true })
      .then(res => location.href = '/SwiftEarn/product/products.html')
      .catch(e => {
       submitBtn.disabled = true;
       submitBtn.innerHTML = 'Continue';
       console.error(e);
      });
     }
    }
   },
   cEl('div', { class: 'rounded-lg bg-9 p-3 mt-12' },
    cEl('label', { textContent: 'Business Name:', class: 'inline-block mb-1' }),
    cEl('input', { ariaLabel: 'Enter Business Name', class: 'w-full p-3 bg-7 color2', type: 'text', name: 'businessName', placeholder: 'Enter Business Name', required: true })
   ),
   cEl('div', { class: 'rounded-lg bg-9 p-3' },
    cEl('label', { textContent: 'About Me:', class: 'inline-block mb-1' }),
    cEl('textarea', { ariaLabel: 'Write about yourself', class: 'w-full h-24 p-3 bg-7 color2', name: 'aboutMe', placeholder: 'Write about yourself', required: true })
   ),
   cEl('div', { class: 'rounded-lg bg-9 p-3' },
    cEl('label', { textContent: 'Business Description:', class: 'inline-block mb-1' }),
    cEl('textarea', { ariaLabel: 'Enter Business description', class: 'w-full h-24 p-3 bg-7 color2', name: 'businessDescription', placeholder: 'Write about your business', required: true })
   ),
   cEl('button', {
    type: 'submit',
    textContent: 'Continue',
    class: 'py-3 mb-4 mx-3 w-1/2 text-sm text-gray-100 bg-blue-700 rounded-sm font-bold text-center'
   }))
 );

 return main;
}

const loader = `<svg class="spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>`;