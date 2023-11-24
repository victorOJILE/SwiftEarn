import { db, collection, getDocs, query, where } from '../src/header.js';
import loader from './loader.js';
import generateList from './productList.js';

export default function MoreProducts(uid, vendorName) {
 const comp = cEl('div', {}, loader());
 
 let loaded = false;
 
 function getData() {
  getDocs(query(collection(db, "products"), where('vendor_id', '==', uid)))
  .then(doc => {
   loaded = true;
   const data = [];
   doc.forEach(d => data.push(d.data()));
   
   if(data && data.length) {
    comp.empty();
    comp.append(
     cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
      ...data.map(each => generateList(each))
     )
    );
   }
  })
  .catch(e => !loaded && setTimeout(getData, 5000));
 }
 getData();
 
 return cEl('section', {},
  cEl('h2', { class: 'text-xl p-2', textContent: 'Products from ' + (vendorName || 'this vendor') }),
  comp
 );
}