import { Link, request } from '../src/auth.js';
import { db, getDocs, where, collection, query, orderBy, limit } from '../src/header.js';
import generateList from './productList.js';
import { marketplace } from '../src/icons.js';
import loader from './loader.js';

export default function highDemandProducts() {
 const comp = cEl('section', {}, loader());

 const div = cEl('section', {},
  cEl('h2', { class: 'text-xl mt-12 mb-2 flex items-center' },
   cEl('span', { class: 'color4' }, svg(marketplace)),
   'High Demand Products'
  ),
  comp
 );
 
 window.addEventListener('scroll', function load() {
  if(isVisible(div)) {
   window.removeEventListener('scroll', load);
   request(
    getDocs(query(collection(db, "products"), where('status', '==', 'Approved'), orderBy('sales', 'desc'), limit(5))),
    function(res) {
     let data = [];
     res.forEach(d => data.push(d.data()));
     
     comp.empty();
     
     if (!data.length) {
      comp.append(
       cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No products at the moment!', class: 'block p-3 border text-sm' }))
      );
     } else {
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