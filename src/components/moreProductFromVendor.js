import { db, collection, getDocs, query, where } from '../header.js';
import loader from '../loader.js';
import generateList from './productList.js';

export default function moreProducts(uid, vendorName) {
 const comp = loader();
 
 getDocs(query(collection(db, "products"), where('vendor_id', uid)))
 .then(doc => {
  const data = [];
  doc.forEach((d) => data.push(d.data()));
  
  if(data && data.length) {
   comp.empty();
   comp.append(cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' }, ...data.map(each => generateList(each))));
  }
 });
 
 return cEl('section', {},
  cEl('h2', { class: 'text-xl p-2', textContent: 'Products from ' + (vendorName || 'this vendor') }), comp);
}