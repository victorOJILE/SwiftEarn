import { db, doc, getDocs } from '../src/header.js';
import loader from './loader.js';

export default function Transactions(uid) {
 const tableData = cEl('div', { class: 'bg-custom-main-bg overflow-auto my-2' }, loader());

 const section = cEl('section', { class: 'mt-6' },
  cEl('div', { class: 'overflow-auto' },
   cEl('h2', { class: 'text-xl', textContent: 'Transactions' }),
   tableData
  )
 );
 
 let slicedLength = 10;
 
 function render(data) {
  tableData.empty();
  tableData.append(
   cEl('table', { class: "text-sm", width: "100%", style: { minWidth: "20rem" } },
    cEl('thead', {},
     cEl('tr', {},
      cEl('th', { class: 'p-2', textContent: 'No.' }),
      cEl('th', { class: 'text-left pl-3', textContent: 'Date' }),
      cEl('th', { textContent: 'Status' }),
      cEl('th', { textContent: 'Amount' })
     )
    ),
    cEl('tbody', { class: 'text-center color2' },
     ...data.slice(0, slicedLength).map((each, ind) => createRow(each, ind + 1))
    )
   )
  );
 }
 
 function getData() {/*
  getDocs(doc(db, 'transactions', uid))
  .then(doc => {*/
   let data = [];
   //doc.forEach(d => data.push(d.data()));
   
   if(!data.length) {
    tableData.empty();
    tableData.append(
     cEl('div', { class: 'h-24 flex items-center justify-center' }, cEl('span', { textContent: 'No transactions!', class: 'block p-3 border text-sm' }))
    );
    return;
   }
   
   render(data);
   
   data.length > 10 && section.append(
    cEl('div', { class: 'text-center border-2 border' },
     cEl('a', { href: 'javascript:(void)', class: 'block p-2 text-green-500 text-sm', textContent: 'View all', event: {
      click() {
       slicedLength = undefined;
       render(data);
       this.parentElement.remove();
      }
     } })
    )
   );/*
  })
  .catch(e => setTimeout(getData, 5000))*/
 }
 getData();
 /*
 let data = [
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$350'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$120'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Rejected',
   amount: '$35'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$60'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$350'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$120'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Rejected',
   amount: '$35'
		},
  {
   date: '10 Jul 2023, 12:30',
   status: 'Completed',
   amount: '$60'
		}
	];
 */

 return section;
}

function createRow(data, ind) {
 return cEl('tr', {},
  cEl('td', { textContent: ind }),
  cEl('td', { textContent: data.date }),
  cEl('td', { textContent: data.status }),
  cEl('td', { textContent: data.amount, class: 'text-green-400' })
 );
}