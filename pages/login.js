import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';

const firebaseConfig = {
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "victorojile.github.io",//swiftearn-e35b4.firebaseapp.com",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1",
};

const firebase_app = initializeApp(firebaseConfig);

const auth = getAuth(firebase_app);

const google = new GoogleAuthProvider();
const params = new URL(location.href).searchParams;

function authWrapper() {
 const formDiv = cEl('div');

 const header = cEl('header', {},
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: '/SwiftEarn/' },
    cEl('img', { src: '/SwiftEarn/static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: '/SwiftEarn/blog.html', textContent: 'Blog', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
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

const envelope = `<svg stroke="darkslategray" fill="darkslategray" stroke-width="0" viewBox="0 0 512 512" width="1.3em" height="1.3em"  xmlns="http://www.w3.org/2000/svg"> <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>`;

const lockIcon = `<svg stroke="darkslategray" fill="darkslategray" stroke-width="0" viewBox="0 0 448 512" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg"> <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" /></svg>`;

const infoIcon = `<svg class="inline-block w-4 mr-1" focusable="false" viewBox="64 64 896 896" fill="rgb(251, 191, 36)">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>`;

const eyeOpen = `<svg class="w-5 hidden" focusable="false" viewBox="64 64 896 896" title="Hide password"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" /><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>`;

const eyeClose = `<svg class="w-5" focusable="false" viewBox="64 64 896 896" title="View password">
<path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" /><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" /></svg>`;

const googleIcon = (
 `<svg class="mr-2" width="2.2em" height="2.2em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Capa_1" style="enable-background:new 0 0 150 150;" version="1.1" viewBox="10 5 120 120" xml:space="preserve"><style type="text/css">.st0 {fill: #1A73E8}.st1 {fill: #EA4335}.st2 {fill: #4285F4}.st3 {fill: #FBBC04}.st4 {fill: #34A853}.st5 {fill: #4CAF50}.st6 {fill: #1E88E5}.st7 {fill: #E53935}.st8 {fill: #C62828}

									.st9 {
										fill: #FBC02D;
									}

									.st10 {
										fill: #1565C0;
									}

									.st11 {
										fill: #2E7D32;
									}

									.st12 {
										fill: #F6B704;
									}

									.st13 {
										fill: #E54335;
									}

									.st14 {
										fill: #4280EF;
									}

									.st15 {
										fill: #34A353;
									}

									.st16 {
										clip-path: url(#SVGID_2_);
									}

									.st17 {
										fill: #188038;
									}

									.st18 {
										opacity: 0.2;
										fill: #FFFFFF;
										enable-background: new;
									}

									.st19 {
										opacity: 0.3;
										fill: #0D652D;
										enable-background: new;
									}

									.st20 {
										clip-path: url(#SVGID_4_);
									}

									.st21 {
										opacity: 0.3;
										fill: url(#_45_shadow_1_);
										enable-background: new;
									}

									.st22 {
										clip-path: url(#SVGID_6_);
									}

									.st23 {
										fill: #FA7B17;
									}

									.st24 {
										opacity: 0.3;
										fill: #174EA6;
										enable-background: new;
									}

									.st25 {
										opacity: 0.3;
										fill: #A50E0E;
										enable-background: new;
									}

									.st26 {
										opacity: 0.3;
										fill: #E37400;
										enable-background: new;
									}

									.st27 {
										fill: url(#Finish_mask_1_);
									}

									.st28 {
										fill: #FFFFFF;
									}

									.st29 {
										fill: #0C9D58;
									}

									.st30 {
										opacity: 0.2;
										fill: #004D40;
										enable-background: new;
									}

									.st31 {
										opacity: 0.2;
										fill: #3E2723;
										enable-background: new;
									}

									.st32 {
										fill: #FFC107;
									}

									.st33 {
										opacity: 0.2;
										fill: #1A237E;
										enable-background: new;
									}

									.st34 {
										opacity: 0.2;
									}

									.st35 {
										fill: #1A237E;
									}

									.st36 {
										fill: url(#SVGID_7_);
									}

									.st37 {
										fill: #FBBC05;
									}

									.st38 {
										clip-path: url(#SVGID_9_);
										fill: #E53935;
									}

									.st39 {
										clip-path: url(#SVGID_11_);
										fill: #FBC02D;
									}

									.st40 {
										clip-path: url(#SVGID_13_);
										fill: #E53935;
									}

									.st41 {
										clip-path: url(#SVGID_15_);
										fill: #FBC02D;
									}
								</style>
								<g>
									<path class="st14" d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5   C115,101.8,120,90,120,76.1L120,76.1z" />
									<path class="st15" d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9   L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z" />
									<path class="st12" d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z" />
									<path class="st13" d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3   l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z" />
								</g>
							</svg>`);

const myForm = authWrapper();

let emailNotRecognized = cEl('small', { class: 'hidden info text-yellow-500 py-1' }, svg(infoIcon),
 'Email address does not exist!'
);

let wrongPassword = cEl('small', { class: 'hidden info text-yellow-400 py-1 email-info' }, svg(infoIcon),
 'Wrong password!'
);

let eyes = cEl('span', { class: 'flex items-center px-4 eyeicon' },
 svg(eyeOpen), svg(eyeClose)
);
let eyesChildren = eyes.children;

eyes.addEventListener('click', function() {
 for (let eye of eyesChildren) {
  eye.classList.toggle('hidden');
 }
});

eyesChildren[0].onclick = () => eyes.previousElementSibling.type = 'password';

eyesChildren[1].onclick = () => eyes.previousElementSibling.type = 'text';

let submitBtn = cEl('button', { type: 'submit', class: 'py-3 px-8 bg-blue-900 color2 rounded-lg font-bold', textContent: 'Continue' });

function handleSubmit(e) {
 e.preventDefault();

 let { email, password } = form;
 submitBtn.innerHTML = '<span class="loader"></span>';
 let cover = cEl('div', { class: 'form-cover rounded-lg' });
 form.append(cover);


  signInWithEmailAndPassword(auth, email.value, password.value)
   .then(result => {
    document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
     
    location.href = new URL(location.href).searchParams.get('page') || '/SwiftEarn/overview.html';
   })
   .catch((error) => {
    cover.remove();
    submitBtn.innerHTML = 'Continue';

    if (error.code == 'auth/user-not-found') {
     emailNotRecognized.classList.remove('hidden');
     let emailInput = emailNotRecognized.previousElementSibling;
     emailInput.addEventListener('blur', () => emailNotRecognized.classList.add('hidden'), { once: true })
    }
    if (error.code == "auth/wrong-password") {
     wrongPassword.classList.remove('hidden');
     let passwordInput = wrongPassword.previousElementSibling.firstElementChild;
     passwordInput.addEventListener('blur', () => wrongPassword.classList.add('hidden'), { once: true })
    }
    console.log(error);
   });
}

function loginWithGoogle() {
 signInWithPopup(auth, google)
  .then(result => {
   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
   
   location.href = params.get('redirect') ? params.get('page') : '/SwiftEarn/overview.html';
  })
  .catch(e => console.error(e));
}

const form = cEl('form',
 { class: 'relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto', event: { submit: handleSubmit } },
 cEl('h1', { class: 'text-2xl md:text-4xl font-bold mb-8 leading-normal text-center', textContent: 'LOGIN' }),
 cEl('div', { class: 'mb-6' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'email', textContent: 'Email address:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(envelope)
   ),
   cEl('input', { type: 'email', name: 'email', class: 'border-0 text-sm bg-white outline-0 flex-grow p-3', id: 'email', placeholder: 'name@yahoo.com', required: true })
  ), emailNotRecognized
 ),
 cEl('div', {},
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'password', textContent: 'Password:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(lockIcon)
   ),
   cEl('input', { class: 'bg-white w-3/4 p-3 text-sm', type: 'password', name: 'password', id: 'password', pattern: '.[A-Za-z0-9]{8,35}', placeholder: 'abcABC123#$&', required: true }),
   eyes
  ),
  wrongPassword
 ),
 cEl('div', { class: 'p-3 mb-2 text-right' },
  cEl('a', { class: 'text-xs underline text-green-500', textContent: 'Forgot password' })
 ),
 cEl('div', { class: 'text-center' },
  submitBtn,
  cEl('p', { class: "py-2 text-xs" },
   'You do not have an account. ',
   cEl('a', { href: "/SwiftEarn/signup.html", class: "text-green-500 font-bold underline", textContent: 'Sign up' })
  )
 ),
 cEl('div', { class: 'mt-8 text-center font-special text-md' },
  cEl('hr'),
  cEl('span', { class: 'inline-block px-3 bg-gray-100', style: { transform: 'translateY(-50%)' }, textContent: 'OR' })
 ),
 cEl('div', { class: 'py-5 font-semibold text-md text-gray-500' },
  cEl('a', { href: 'javascript:(void)', class: 'flex items-center py-2 px-3 mb-5 w-full rounded-xl border-2 border-gray-300', event: { click: loginWithGoogle } },
   svg(googleIcon), 'Continue with Google'
  )
 )
);

myForm.append(form);