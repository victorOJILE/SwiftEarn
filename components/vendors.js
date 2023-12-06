import { Link, request } from '../src/auth.js';
import { db, getDocs, collection, where, query, orderBy, limit } from '../src/header.js';
import { vendors } from '../src/icons.js';
import loader from './loader.js';

export default function Vendors(config) {
 const div = cEl('div', {},
  cEl('h2', { class: 'flex items-center text-xl' },
   cEl('span', { class: 'color4' }, svg(vendors)),
   config.title
  ),
  loader()
 );
 
 window.addEventListener('scroll', function load() {
  if(isVisible(div)) {
   window.removeEventListener('scroll', load);
   request(
    getDocs(query(collection(db, "users"), where('role', '==', 'vendor'), orderBy("sales", 'desc'), limit(config.addMore ? 6 : 5))),
    function(res) {
     const data = [];
     res.forEach(d => data.push(d.data()));
     
     div.lastElementChild.remove();
  
     div.append(
      data.length ? cEl('ul', { class: config.listCls || 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors' },
        ...data.map(generateVendor)
       ) : cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'Sorry, we currently have no vendors!', class: 'block p-3 border text-sm' })),
       // TODO:
       
      config.addMore && data.length > 5 && cEl('div', { class: 'text-center border-2 border' },
       cEl('a', { href: '/SwiftEarn/vendors.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more' })
      ) || '');
    }
   );
  }
 });
 
 
 return cEl('section', { class: 'mt-12' }, div);
}

function generateVendor(vendor) {
 
 return cEl('li', {},
  cEl('a', { event: {
   click(e) {
    Link(e, paths.vendorInfo, { vdid: encodeURIComponent(vendor.user_id) })
   }
  }, href: '/SwiftEarn/vendors/info.html?vdid=' + encodeURIComponent(vendor.user_id) },
   cEl('div', { className: 'w-24 h-24 mx-auto rounded-full overflow-hidden' },
    cEl('img', { src: vendor.photoUrl || '/SwiftEarn/static/images/username-icon.svg', alt: vendor.fullName || '' })
   ),
   cEl('small', { textContent: vendor.fullName })
  )
 );
}
