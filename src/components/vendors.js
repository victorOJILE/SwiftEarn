//import { collection, query, orderBy, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import { db, getDocs, collection } from '../pages/vendors.js';
import { icons } from '../icons.js';
import loader from './loader.js';

export default function vendors(config) {
 const section = cEl('section', { class: 'mt-12' }, loader());

 /*const q = query(collection(db, "vendors"), orderBy("total_sales"), limit(config.addMore ? 6 : 5));
  */
 getDocs(collection(db, 'vendors'))
  .then(doc => {
   const data = [];
   doc.forEach((d) => data.push(d.data()));

   const len = data.length;
   section.empty();

   section.append(
    cEl('div', {},
     cEl('h2', { class: 'flex items-center text-xl' },
      cEl('span', { class: 'color4' }, svg(icons.vendors)),
      document.createTextNode(config.title)
     ),
     data.length ? cEl('ul', { class: config.listCls || 'my-6 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 text-center color4 font-bold vendors' },
      ...data.map(each => generateVendor(each))
     ) : cEl('div', { class: 'p-3 mt-4 mx-auto border text-center', textContent: 'Sorry, we currently have no vendors!' })
    ),
    (config.addMore && data && len > 5) && cEl('div', { class: 'text-center border-2 border' },
     cEl('a', { href: '/SwiftEarn/vendors.html', class: 'block p-2 text-green-500 text-sm', textContent: 'View more' })
    ) || '');
  })
  .catch(e => console.error(e));
 /*
		{
  "total_sales": 10000,
  "conversion_rate": 0.05,
  "total_commission": 5000,
}

To calculate the conversion rate, you'll need the number of successful conversions (e.g., purchases) and the total number of interactions (e.g., clicks or visits) the vendor received during a specific time period.
Conversion Rate = (Number of Conversions / Total Number of Interactions) * 100


Conversion Rate:

Number of Conversions (successful purchases): 100
Total Number of Interactions (clicks/views): 2,000
Conversion Rate = (100 / 2,000) * 100 = 5%

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