import { db, collection, getDocs, query, where } from '../src/header.js';
import loader from './loader.js';
import generateList from './productList.js';

export default function MoreProducts(uid, vendorName) {
 const comp = cEl('div', {}, loader());
 
 let loaded = false;
 
 function getData() {
  getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), where('vendor_id', '==', uid)))
  .then(doc => {
   loaded = true;
   const data = [];
   doc.forEach(d => data.push(d.data()));
   
   if(data.length) {
    comp.empty();
    comp.append(
     cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
      ...data.map(generateList)
     )
    );
   }
  })
  .catch(e => !loaded && setTimeout(getData, 5000));
 }
 
 const div = cEl('section', {},
  cEl('h2', { class: 'text-xl p-2', textContent: 'Products from ' + vendorName || 'this vendor' }),
  comp
 );
 
 window.addEventListener('scroll', function load() {
  if(isVisible(div)) {
   window.removeEventListener('scroll', load);
   getData();
  }
 });
 
 return div;
}