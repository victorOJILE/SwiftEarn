/*import { firebase_app, unsubscribe } from '../auth.js';
import { getFirestore, getDoc, doc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';*/
import Header from '../header.js';
import HighDemandProducts from '../components/highDemandProducts.js';
import { icons } from '../icons.js';
import loader from '../components/loader.js';
import moreProductsFromVendor from '../components/moreProductFromVendor.js';
//const db = getFirestore(firebase_app);


function ProductComp(uid) {
 let comp = cEl('div', {}, loader());

 let productPage = new URL(location.href);
 let product_id = decodeURIComponent(productPage.searchParams.get('product_id'));

 if (product_id) {
  /* getDoc(doc(db, 'products', product_id))
    .then(data => {*/
  let data = {};

  comp.empty();
  comp.append(
   cEl('section', { class: 'px-2' },
    cEl('div', { class: 'grid md:grid-cols-2 md:gap-6' },
     cEl('div', { class: 'mb-4 max-w-2xl mx-auto' },
      cEl('img', { src: '/static/images/' + data.image_url })
     ),
     cEl('div', {},
      cEl('h2', { class: 'text-xl mb-2 md:text-3xl', textContent: data.name }),
      cEl('p', { class: 'color4 mb-2', textContent: data.description }),
      cEl('small', { class: 'text-gray-400', textContent: 'Created by: ' },
       cEl('a', { class: 'text-blue-400 font-normal underline', textContent: data.vendor })
      ),
      cEl('div', { class: 'my-2 flex items-center' },
       cEl('span', { class: 'mr-3 font-bold text-2xl', textContent: data.price }),
       cEl('span', { textContent: '|' }),
       cEl('del', { class: 'ml-3 text-gray-400', textContent: data.oldPrice }),
       cEl('span', { class: 'ml-3', textContent: data.commission + ' comm' })
      ),
      cEl('div', { class: 'flex items-center text-yellow-600 text-xs' },
       svg(icons.clock), document.createTextNode('We have limited time left!')
      ),
      cEl('div', { class: 'mt-4 mb-8' },
       cEl('a', { href: data.jvPageUrl, class: 'underline flex items-center text-green-500' },
        document.createTextNode('Check JV Page '), svg(icons.longArrowRight)
       )
      )
     )
    ),
    cEl('a', { href: data.productPageUrl || '' },
     cEl('div', { class: 'bg-green-900 p-2 text-center', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
      cEl('button', { class: 'bg-green-900 text-gray-300 p-3 px-6 w-8/12 rounded font-bold', textContent: 'See product page' })
     )
    ),
    cEl('div', { class: 'my-12' },
     cEl('h3', { class: 'text-xl my-4', textContent: 'Get affiliate link' }),
     cEl('div', { class: 'p-4 text-gray-300 relative', style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" } },
      cEl('div', { class: 'overflow-auto', textContent: data.aff_id }),
      cEl('span', { class: 'absolute top-0 right-0 cursor-pointer copyAffilliate', data: { link: data.aff_id }, style: { backgroundColor: "rgba(13%, 47%, 50%, 0.63)" }, event: { click: function() { copyToClipboard(this.dataset.link) } } }, svg(icons.copy))
     )
    )
   ),
   cEl('h2', { class: 'my-4 text-xl', textContent: 'Product Owner Information' }),
   cEl('section', { class: 'bg-custom-main-bg py-4 px-2' },
    vendorInformation(uid)
   ),
   moreProductsFromVendor(uid, data.vendor),
   HighDemandProducts());

  // });
 } else {
  location.href = '/marketplace.html';
 }

 const main = cEl('main', { class: 'p-3 pt-20 md:p-6 bg-9 color2 overflow-auto md:h-screen' },
  comp);

 return main;
}

function vendorInformation(uid) {
 let comp = cEl('div', {}, loader());
 /*
  getDoc(doc(db, 'vendors', uid))
   .then(data => {*/
 let data = {
  _id: "vendor1",
  user_id: "user1",
  business_title: "Data Scientist and Lead Researcher",
  business_description: "Hello, I'm Idan Chen, a data scientist, and lead researcher based in Israel. I hold a Bachelor's degree in Computer Science and have gained several years of experience working with data, including over 6 years of expertise using Python. Through my work, I have gained extensive knowledge of both SQL and NoSQL database systems and have a deep understanding of libraries such as Pandas.\nOne of my greatest joys is guiding and teaching others. Over the years, I have had the privilege of helping both individuals and companies to learn more about Python and SQL, providing guidance on concepts and best practices. I am passionate about sharing my knowledge and experience with others and firmly believe that anyone can become a successful data scientist with the right tools and guidance.\nWhether you're seeking to improve your data analysis skills, gain more knowledge about machine learning, or dive deeper into Python and SQL, I am here to help. As an instructor at Udemy, I am committed to providing students with the necessary tools to achieve their goals and succeed. I am thrilled to share my expertise with you and help you reach your full potential in the field of data science.",
  contact_name: "Idan Chen",
  contact_phone: "1234567890",
  payment_info: "PayPal",
  products: ["product1", "product2"],
  business_logo: "background.jpg",
 };

 comp.empty();
 if (data && data.constructor.name == 'Object') {
  let descrLength = isMobile ? 150 : 300;
  comp.append(
   cEl('div', { class: 'rounded-full mt-12 w-28 h-28 border-4 border-gray-500 mx-auto overflow-hidden' },
    cEl('img', { src: '/static/images/' + data.business_logo, alt: data.contact_name || 'SwiftEarn Vendor' })
   ),
   cEl('div', { class: 'text-center' },
    cEl('h3', { class: 'text-lg color4', textContent: data.contact_name }),
    cEl('p', { class: 'text-sm text-gray-500', textContent: data.business_title })
   ),
   cEl('div', { class: 'p-4 text-xs color2 overflow-hidden max-h-64', style: { boxShadow: "inset 0px -41px 23px -19px darkgray" }, innerHTML: '<p class="leading-relaxed mb-3">' + data.business_description.replace(/\n/g, '</p><p class="leading-relaxed mb-3">') + '</p>' }),
   cEl('span', {
    class: 'block text-green-400 text-sm p-4 underline mt-3',
    textContent: 'See more',
    event: {
     click: function() {
      if (this.textContent == 'See more') {
       this.previousElementSibling.classList.remove('max-h-64');
       this.previousElementSibling.style.boxShadow = '';
       this.textContent = 'See less';
      } else {
       this.previousElementSibling.classList.add('max-h-64');
       this.previousElementSibling.style.boxShadow = 'inset 0px -41px 23px -19px darkgray';
       this.textContent = 'See more';
      }
     }
    }
   })
  );
 }
 //});

 return comp;
}

function authWrapper() {
 const formDiv = cEl('div');

 const header = cEl('header', {},
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: '/' },
    cEl('img', { src: '/static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: '/blog.html', textContent: 'Blog', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
  ),
  cEl('section', { class: 'container mx-auto pt-12 pb-20 md:pr-8 md:pt-24 md:pb-32 grid md:grid-cols-2 items-center' },
   cEl('div', { class: 'hidden md:block px-4 py-8 md:pr-6 color2' },
    cEl('small', { class: 'color4 md:block', textContent: 'Welcome to Swift Earn' }),
    cEl('h1', { class: 'text-4xl font-bold leading-normal', textContent: 'Simplify Your Online Business Journey and Boost Your Profits' }),
    cEl('p', { class: 'mt-2', textContent: 'Our entire team is dedicated to providing you with the highest standard of quality affiliate marketing services.' })
   ), formDiv
  )
 );
 document.body.innerHTML = '';
 document.body.append(header);

 return formDiv;
}

//unsubscribe.then(res => {
 let myPage = /* res === 2 ?*/ Header('Marketplace' /*, res.uid*/ ) /* : authWrapper();*/
 
 myPage.append(ProductComp( /*res.uid*/ ));
//});