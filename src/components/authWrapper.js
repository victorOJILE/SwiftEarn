export default function authWrapper() {
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
  ),
 );
 document.body.innerHTML = '';
 document.body.append(header);
 
 return formDiv;
}
