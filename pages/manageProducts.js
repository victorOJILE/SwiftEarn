import { db, getDocs, where, collection, query, doc, deleteDoc, updateDoc } from '../src/header.js';
import { getStorage, ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
import EditProduct from '../components/addProductComp.js';
import loader from '../components/loader.js';

const storage = getStorage();

let tableData, tableDataPar, sliceLength = 10;

function renderData(uid) {
 getDocs(query(collection(db, "products"), where('vendor_id', '==', uid)))
  .then(doc => {
   let data = [];
   doc.forEach(d => data.push(d.data()));

   tableDataPar.empty();
   tableData.empty();
   tableDataPar.append(tableData);

   if (data.length) {
    tableData.append(
     cEl('table', { class: "text-sm", style: { minWidth: "20rem" } },
      cEl('thead', {},
       cEl('tr', {},
        cEl('th', { class: 'p-2 py-4', textContent: 'No.' }),
        cEl('th', { class: 'text-left px-3', textContent: 'Name' }),
        cEl('th', { class: 'px-2', textContent: 'Date' }),
        cEl('th', { class: 'px-2', textContent: 'Status' }),
        cEl('th', { class: 'px-2', textContent: 'Commission' }),
        cEl('th', { class: 'px-2', textContent: 'Price' })
       )
      ),
      cEl('tbody', { class: 'text-center color2' },
       ...data.slice(0, sliceLength).map((each, ind) => createRow(each, ind + 1, uid))
      )
     ));
    data.length > 10 && tableDataPar.append(cEl('div', { class: 'text-center border-2 border' },
     cEl('a', {
      href: 'javascript:(void)',
      event: {
       click() {
        sliceLength = undefined;
        renderData(uid);
        this.parentElement.remove();
       }
      },
      class: 'block p-2 text-green-500 text-sm',
      textContent: 'View all'
     })
    ))
   } else {
    tableData.append(
     cEl('div', { class: 'border p-3 text-center', textContent: 'No products' })
    );
   }
  })
  .catch(e => console.log(e));
}

function createRow(data, ind, uid) {
 return cEl('tr', {},
  cEl('td', { textContent: ind }),
  cEl('td', { class: 'pr-4' },
   cEl('span', { textContent: data.name, class: 'block whitespace-nowrap w-64 overflow-hidden truncate' })
  ),
  cEl('td', { textContent: new Date(data.addedAt).toLocaleDateString('en-GB'), class: 'whitespace-nowrap px-2 py-3' }),
  cEl('td', { textContent: data.status, class: 'px-2' }),
  cEl('td', { textContent: data.commission + "%", class: 'px-2' }),
  cEl('td', { textContent: data.currency + data.price, class: 'text-green-400 px-2 font-bold' }),
  cEl('td', { class: 'px-2' },
   cEl('div', { class: 'flex items-center' },
    cEl('button', {
     textContent: 'Edit',
     class: 'p-1 px-3 bg-blue-600 rounded-sm text-gray-100 font-bold',
     event: {
      click: function() {
       if (this.modal) {
        document.body.append(this.modal);
       } else {
        let modal = cEl('div', { class: 'absolute top-0 w-full p-6 h-screen overflow-auto z-20', style: { backgroundColor: '#000000A1' } },
         EditProduct(uid, data)
        );
        let close = cEl('button', {
          event: {
           click: function() {
            modal.remove();
           }
          }
         },
         svg(`<svg style="width: 30px; height: 30px;" viewbox="-5 -5 40 40">
        <path d="M2 2L28 28" stroke="maroon" stroke-width="5" />
        <path d="M2 28L28 2" stroke="maroon" stroke-width="5" />
       </svg>`)
        );
        modal.prepend(close);
        document.body.append(modal);
        this.modal = modal;
       }
      }
     }
    }),
    cEl('button', {
     event: {
      click: async function() {
       this.innerHTML = loaderIcon;
       try {
        await deleteObject(ref(storage, data.productImageUrl));

        await deleteDoc(doc(db, 'products', data.product_id));

        renderData(uid);
       } catch (e) {
        this.innerHTML = deleteIcon;
        console.log(e);
        alert('Error: Cannot complete product deletion. Please try again!');
       }
      }
     }
    }, svg(deleteIcon))
   )
  )
 );
}

export default function ManageProducts(uid) {
 tableDataPar = cEl('div');
 tableData = cEl('div', { class: 'bg-custom-main-bg overflow-auto my-2' }, loader());

 tableDataPar.append(tableData);

 renderData(uid);

 const section = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto' },
  cEl('section', { class: 'mt-6' },
   cEl('div', { class: 'overflow-auto' },
    cEl('h1', { class: 'text-xl', textContent: 'My products' }),
    tableDataPar
   )
  )
 );

 return section;
}

const deleteIcon = `<svg stroke="red" fill="red" stroke-width="0" viewBox="0 0 448 512" width="1.2em" height="1.2em" class="mx-2" xmlns="http://www.w3.org/2000/svg"> <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" /></svg>`;

const loaderIcon = `<svg class="mx-2 spin" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="1em" height="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z" /></svg>`;
