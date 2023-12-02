import { db, doc, getDocs, where, collection, query, orderBy } from '../src/header.js';
import { Link } from '../src/auth.js';
import loader from './loader.js';

export default function Transactions(uid, showMore) {
 const tableData = cEl('div', { class: 'bg-custom-main-bg overflow-auto my-2' }, loader());

 const section = cEl('section', { class: 'mt-6' },
  cEl('div', { class: 'overflow-auto' },
   cEl('h2', { class: 'text-xl', textContent: 'Transactions' }),
   tableData
  )
 );
 
 let slicedLength = showMore ? undefined : 10;
 
 function render(data) {
  tableData.empty();
  tableData.append(
   cEl('table', { class: "text-sm", style: { width: '100%', minWidth: "35rem" } },
    cEl('thead', {},
     cEl('tr', {},
      cEl('th', { textContent: 'No.' }),
      cEl('th', { class: 'p-2', textContent: 'Date' }),
      cEl('th', { textContent: 'Status' }),
      cEl('th', { textContent: 'Ref' }),
      cEl('th', { textContent: 'Amount' })
     )
    ),
    cEl('tbody', { class: 'text-center color2' },
     ...data.slice(0, slicedLength).map((each, ind) => createRow(each, ind + 1))
    )
   )
  );
 }
 
 let loadedData = false;
 function getData() {
  getDocs(query(collection(db, "transactions"), where('aff_id', '==', uid), orderBy('timeCreated', 'desc')))
  .then(doc => {
   let data = [];
   loadedData = true;
   doc.forEach(d => data.push(d.data()));
   
   /*
  let data = [
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '350',
     currency: 'USD'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '120',
     currency: 'USD'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Declined',
     amount: '-20000',
     currency: 'NGN'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '-60000',
     currency: 'NGN'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '350',
     currency: 'USD'
   	},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '120',
     currency: 'USD'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Declined',
     amount: '-3500',
     currency: 'NGN'
   		},
    {
     reference: 'BU3FU2D5JID',
     paid_at: '2022-08-09T14:21:32.000Z',
     gateway_response: 'Successful',
     amount: '60',
     currency: 'USD'
   		}
   	];
   	*/
   if(!data.length) {
    tableData.empty();
    tableData.append(
     cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No transactions!', class: 'block p-3 border text-sm' }))
    );
    return;
   }
   
   render(data);
   
   showMore && data.length > 10 && section.append(
    cEl('div', { class: 'text-center border-2 border' },
     cEl('a', { href: 'javascript:(void)', class: 'block p-2 text-green-500 text-sm', textContent: 'View all', event: {
      click() {
       if(showMore) {
        Link(undefined, {
         name: 'Transactions',
         path: '../path/transactions.js',
         pathname: 'transactions.html'
        });
       }
      }
     } })
    )
   );
  })
  .catch(e => !loadedData && setTimeout(getData, 5000));
 }
 getData();
 
 return section;
}

const dtf = new Intl.DateTimeFormat('en-US', {
 hour: '2-digit',
 minute: '2-digit',
 year: 'numeric',
 month: 'short',
 day: '2-digit'
});

function createRow(data, ind) {
 return cEl('tr', {},
  cEl('td', { textContent: ind }),
  cEl('td', { textContent: dtf.format(new Date(data.paid_at || data.timeCreated)) }
  ),
  cEl('td', {},
   cEl('span', { textContent: data.gateway_response, style: { backgroundColor: data.gateway_response === 'Successful' ? '#2F9B76C7' : '#7A2E2EC9' }, class: 'inline-block p-1 w-full rounded-md' })
  ),
  cEl('td', { textContent: data.reference, class: 'px-3' }),
  cEl('td', { textContent: new Intl.NumberFormat('en', { 
    style: 'currency', currency: data.currency
   }).format(data.amount), class: data.amount > 0 ? 'text-green-400' : 'text-red-400' })
 );
}