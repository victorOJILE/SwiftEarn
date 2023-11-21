//import { db, getDocs, collection, where, query, orderBy, limit } from '../header.js';
import { vendors } from '../icons.js';
import loader from './loader.js';

export default function Vendors(config) {
 const section = cEl('section', { class: 'mt-12' }, loader());

 /*const q = query(collection(db, "users"), where('role', '==', 'affiliate-vendor'), orderBy("total_sales"), limit(config.addMore ? 6 : 5));
  
 getDocs(query(collection(db, "users"), where('role', '==', 'affiliate-vendor') ))
  .then(doc => {*/
   const data = [];
   //doc.forEach((d) => data.push(d.data()));

   const len = data.length;
   section.empty();

   section.append(
    cEl('div', {},
     cEl('h2', { class: 'flex items-center text-xl' },
      cEl('span', { class: 'color4' }, svg(vendors)),
      document.createTextNode(config.title)
     ),
     data.length ? cEl('ul', { class: config.listCls || 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors' },
      ...data.map(each => generateVendor(each))
     ) : cEl('div', { class: 'p-3 mt-4 mx-auto border text-center text-sm', textContent: 'Sorry, we currently have no vendors!' })
    ),
    (config.addMore && data && data.length > 5) && cEl('div', { class: 'text-center border-2 border' },
     cEl('a', { href: '/SwiftEarn/vendors.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more' })
    ) || '');/*
  })
  .catch(e => console.error(e));
 
		{
  "total_sales": 10000,
  "conversion_rate": 0.05,
  "total_commission": 5000,
}
	*/

 return section;
}

function generateVendor(vendor) {
 return cEl('li', {},
  cEl('a', { href: '/SwiftEarn/vendors/info.html?vendor_id=' + encodeURIComponent(vendor.vendor_id) },
   cEl('div', { className: 'w-24 h-24 mx-auto rounded-full overflow-hidden' },
    cEl('img', { src: vendor.businessImageUrl || '/SwiftEarn/static/images/username-icon.svg', alt: 'Vendor picture' })
   ),
   cEl('small', { textContent: vendor.vendor_name || '' })
  )
 );
}