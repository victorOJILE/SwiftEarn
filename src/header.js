import { firebase_app, callSignout, passwordReset, Link, request } from './auth.js';
import { getFirestore, doc, collection, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, increment, startAt, orderBy, limit } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import * as icons from './icons.js';
import loader from '../components/loader.js';

const db = getFirestore(firebase_app);

const currentTheme = localStorage.getItem("swf-theme");
if (currentTheme == "dark") {
 document.body.classList.toggle("dark-theme");
}

export { db, getFirestore, doc, collection, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, increment, startAt, orderBy, limit };

export default function app(name, uid) {
 const body = document.body;
 const asideL = asideLeft(name, uid);
 const [mainComp, hamburger, userIcon] = main();
 const asideR = asideRight();

 hamburger.ae('click', function() {
  asideL.classList.toggle("-left-full");
  asideL.ariaHidden = false;
  document.body.style.overflow = 'hidden';
 });

 userIcon.ae('click', function() {
  asideR.classList.toggle('hidden');
  setTimeout(() => {
   asideR.classList.toggle('-top-full');
   asideR.classList.toggle('top-20')
  }, 0);
 });

 body.innerHTML = '';
 body.append(asideL, mainComp, asideR);

 return mainComp;
}

let userIsVendor, loadedData, headerRendered;

function asideLeft(pageName, uid) {
 const closeSidebarIcon = svg(icons.closeSidebar);

 const aside = cEl('aside', { class: 'bg-main fixed top-0 -left-full md:static h-screen md:col-span-1 w-9/12 md:w-auto max-w-sm z-20 overflow-auto scroll-bar text-blue-200 text-md', ariaHidden: true },
  cEl('div', { class: 'flex items-center p-3 md:pt-10' },
   cEl('a', { href: '/SwiftEarn/', class: 'flex-grow md:mx-auto' },
    cEl('img', { src: '/SwiftEarn/static/images/Logo.png' })
   ),
   cEl('div', {}, closeSidebarIcon)
  )
 );

 const lists = [
  [
   {
    link: '/SwiftEarn/overview.html',
    icon: icons.dashboard,
    text: 'Overview',
    path: '../pages/overview.js',
    pathname: 'overview.html'
		},
   {
    link: '/SwiftEarn/marketplace.html',
    icon: icons.marketplace,
    text: 'Marketplace',
    path: '../pages/marketplace.js',
    pathname: 'marketplace.html'
		},
   {
    link: '/SwiftEarn/vendors.html',
    icon: icons.vendors,
    text: 'Vendors',
    path: '../pages/vendors.js',
    pathname: 'vendors.html'
		},
   {
    link: '/SwiftEarn/overview.html',
    icon: icons.contests,
    text: 'Contests',
    path: '../pages/overview.js',
    pathname: 'overview.html'
		},
   {
    link: '/SwiftEarn/transactions.html',
    icon: icons.transaction,
    text: 'Transactions',
    path: '../pages/transactions.js',
    pathname: 'transactions.html'
		},
   {
    link: '/SwiftEarn/withdrawal.html',
    icon: icons.withdrawal,
    text: 'Withdrawal',
    path: '../pages/withdrawal.js',
    pathname: 'withdrawal.html'
		}
	],
	 [
   {
    link: '/SwiftEarn/profile.html',
    icon: icons.gear,
    text: 'Settings',
    path: '../pages/profile.js',
    pathname: 'profile.html'
		},
   {
    link: '/SwiftEarn/help.html',
    icon: icons.help,
    text: 'Help'
		}
	],
	 [
   {
    link: 'javascript:(void)',
    icon: icons.logout,
    text: 'Log out',
    click: callSignout
		}
	 ]
 ];

 let vendorNavs = {
  icon: icons.products,
  text: 'Products',
  children: [
   {
    link: '/SwiftEarn/product/addProduct.html',
    icon: icons.cartPlus,
    text: 'Add Product',
    path: '../pages/product/addProduct.js',
    pathname: 'product/addProduct.html'
  },
   {
    link: '/SwiftEarn/product/products.html',
    icon: icons.products,
    text: 'My Products',
    path: '../pages/product/products.js',
    pathname: 'product/products.html'
  },
   {
    link: '/SwiftEarn/vendors/signup.html',
    icon: icons.transaction,
    text: 'Sales History',
    path: '../pages/vendors/signup.js',
    pathname: 'vendors/signup.html'
  },
   {
    link: '/SwiftEarn/vendors/signup.html',
    icon: icons.personGear,
    text: 'Vendor Profile',
    path: '../pages/vendors/signup.js',
    pathname: 'vendors/signup.html'
  },
   {
    link: '/SwiftEarn/vendors/signup.html',
    icon: icons.contests,
    text: 'Set Up Contest',
    path: '../pages/vendors/signup.js',
    pathname: 'vendors/signup.html'
  }
   ]
 };

 loadedData && userIsVendor && lists[0].splice(2, 0, vendorNavs);

 iter(lists, list => generateNav(aside, list, pageName));

 const themeToggle = cEl('input',
 {
  class: 'switch-input',
  type: 'checkbox',
  id: 'switch',
  checked: currentTheme == 'dark',
  event: {
   change() {
    document.body.classList.toggle("dark-theme");

    localStorage.setItem("swf-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
   }
  }
 });

 aside.append(
  cEl('div', { class: 'flex items-center justify-between px-4 mt-4 mb-12' }, 'Theme', cEl('span', { class: 'flex justify-between items-center ml-2' }, svg(icons.sun), themeToggle,
   cEl('label', { class: 'switch-label cursor-pointer', htmlFor: 'switch' }), svg(icons.moon))));

 !userIsVendor && !loadedData && request(
  getDoc(doc(db, 'users', uid)),
  function(res) {
   loadedData = true;
   const data = res.data();

   EventBus.publish('loaded-data', data);

   userIsVendor = data.role === 'vendor';

   if (userIsVendor) {
    let li = document.querySelectorAll('aside li')[1];

    let dropdown = cEl('div', { class: 'hidden mx-2 text-sm bg-gray-900' });

    let list = cEl('li', {},
     cEl('a', {
       event: {
        click(e) {
         dropdown.classList.toggle('hidden');
        }
       },
       href: 'javascript:(void)',
       class: 'p-3 pr-1 flex items-center trans justify-between'
      },
      cEl('div', { class: 'flex-grow flex items-center' },
       svg(icons.products),
       'Products'
      ),
      svg(icons.chevronDown)
     ),
     dropdown
    );

    generateLists(vendorNavs.children, dropdown, pageName);

    li.insertAdjacentElement('afterend', list);
   }
  }
 );

 closeSidebarIcon.ae('click', function() {
  aside.classList.add("-left-full");
  aside.ariaHidden = true;
  document.body.style.overflow = 'auto';
 });

 return aside;
}

function main() {
 const hamburger = cEl('div', { class: 'hamburger inline-block md:hidden mr-3', id: 'hamburger' }, cEl('span'), cEl('span'), cEl('span'));
 const profile = cEl('span', { class: 'inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700', id: 'profileIcon' }, svg(icons.user));

 const div = cEl('div', { class: 'md:col-span-4 bg-custom-main-bg overflow-auto pt-20 md:pt-0' },
  cEl('header', { class: 'trans fixed w-full left-0 top-0 z-10 md:static' },
   cEl('div', { class: 'p-2 md:p-3 flex items-center justify-between container mx-auto' },
    hamburger,
    cEl('div'),
    cEl('div', {},
     cEl('span', { class: 'mr-2 inline-block hover:bg-gray-500 p-2 text-blue-200 rounded-full transition duration-700 relative' },
      cEl('span', { class: 'p-1 absolute top-0 right-0 bg-green-500 rounded-full font-bold', style: { fontSize: '0.65rem' } }),
      svg(icons.notification)
     ), profile)
   )
  )
 );

 if (!headerRendered) {
  headerRendered = true;
  let waiting = false;
  window.addEventListener('scroll', function(e) {
   if (waiting) return;
   waiting = true;

   if (this.oldScroll <= window.pageYOffset && window.pageYOffset > window.innerHeight) {
    setTimeout(() => {
     document.getElementsByTagName('header')[0].classList.add('-top-full');
     waiting = false;
    }, 300);
   } else {
    setTimeout(() => {
     document.getElementsByTagName('header')[0].classList.remove('-top-full');
     waiting = false;
    }, 300);
   }
   this.oldScroll = window.pageYOffset;
  });
 }

 return [div, hamburger, profile];
}

function asideRight() {
 return cEl('aside', { class: 'bg-gray-900 border-2 border fixed -top-full hidden right-2 w-48 z-10 p-1 color2 trans profileBar text-sm font-light' },
  cEl('ul', { class: 'text-blue-200' },
   cEl('li', {
    class: 'p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800',
    event: {
     click(e) {
      Link(e, { name: 'Settings', path: '../pages/profile.js', pathname: 'profile.html' });
     }
    }
   }, svg(icons.settings), 'Profile'),
   cEl('li', {
    event: {
     click: passwordReset
    },
    class: 'p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800'
   }, svg(icons.lockIcon), 'Reset password'),
   cEl('li', {
    event: {
     click: callSignout
    },
    class: 'p-2 pr-1 flex items-center trans mb-1 hover:bg-gray-800'
   }, svg(icons.logout), 'Log out'),
   cEl('li', { class: 'p-2 pr-1 flex items-center trans hover:bg-gray-800' }, svg(icons.help), 'Help')
  )
 );
}

function generateNav(aside, list, pageName) {
 const ul = cEl('ul');

 aside.appendChild(cEl('nav', { class: 'border-b-2 border-gray-600 py-3' }, ul));

 generateLists(list, ul, pageName);
}

function generateLists(lists, parent, pageName, drop) {
 iter(lists, list => {
  let li;
  if (list.children) {
   let dropdown = cEl('div', { class: 'hidden mx-2 text-sm bg-gray-900' });

   li = cEl('li', {},
    cEl('a', {
      event: {
       click(e) {
        e.preventDefault();
        dropdown.classList.toggle('hidden');
       }
      },
      href: '',
      class: (drop ? 'p-0' : 'p-3') + ' pr-1 flex items-center trans justify-between'
     },
     cEl('div', { class: 'flex-grow flex items-center' },
      svg(list.icon),
      list.text
     ),
     svg(icons.chevronDown)
    ),
    dropdown
   );

   generateLists(list.children, dropdown, pageName, true);
  } else {
   li = cEl('li', {},
    cEl('a', {
      event: {
       click(e) {
        Link(e, { name: list.text, path: list.path, pathname: list.pathname })
       }
      },
      href: list.link,
      class: 'p-3 pr-1 flex items-center trans ' + (pageName == list.text ? 'bg-blue-800 hover:bg-blue-800' : 'hover:bg-gray-800')
     },
     cEl('div', { class: 'flex-grow flex items-center' },
      svg(list.icon),
      list.text
     )
    )
   );
   list.click && li.ae('click', list.click);
  }

  parent.append(li);
 });
}