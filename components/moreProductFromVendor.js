import { db, collection, getDocs, query, where } from '../src/header.js';
import loader from './loader.js';
import generateList from './productList.js';
import { request } from '../src/auth.js';
import { marketplace } from '../src/icons.js';

export default function MoreProducts(uid, vendorName) {
 const comp = cEl('div', {}, loader());
 
 const div = cEl('section', {},
  cEl('h2', { class: 'text-xl mt-12 mb-2 flex items-center' },
   cEl('span', { class: 'color4' }, svg(marketplace)),
   'Products from ' + (vendorName || 'this vendor')
  ),
  comp
 );
 
 window.addEventListener('scroll', function load() {
  if(isVisible(div)) {
   window.removeEventListener('scroll', load);
   request(
    getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), where('vendor_id', '==', uid))),
    function(res) {
     const data = [];
     res.forEach(d => data.push(d.data()));
     
     if(data.length) {
      comp.empty();
      comp.append(
       cEl('ul', { class: 'color2 bg-custom-dark grid md:grid-cols-2 gap-6' },
        ...data.map(generateList)
       ));
     }
    }
   );
  }
 });
 
 return div;
}