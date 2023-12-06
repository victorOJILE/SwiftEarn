import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const firebaseConfig = {
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "victorojile.github.io",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1",
};

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);

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

const userIcon = `<svg stroke="darkslategray" fill="darkslategray" stroke-width="0" viewBox="0 0 496 512" width="1.4em" height="1.4em" xmlns="http://www.w3.org/2000/svg"> <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" /></svg>`;

const infoIcon = `<svg class="inline-block w-4 mr-1" focusable="false" viewBox="64 64 896 896" fill="rgb(251, 191, 36)">
<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" /><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" /></svg>`;

const envelope = `<svg stroke="darkslategray" fill="darkslategray" stroke-width="0" viewBox="0 0 512 512" width="1.3em" height="1.3em"  xmlns="http://www.w3.org/2000/svg"> <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" /></svg>`;

const lockIcon = `<svg stroke="darkslategray" fill="darkslategray" stroke-width="0" viewBox="0 0 448 512" width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg"> <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" /></svg>`;

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

let emailInUse = cEl('small', { class: 'hidden info text-yellow-500 py-1' },
 svg(infoIcon),
 document.createTextNode('Email address already used!')
);

let emailNotMatch = cEl('small', { class: 'hidden info text-yellow-500 py-1' },
 svg(infoIcon),
 document.createTextNode('Email address does not match!')
);

let eyes = cEl('div', { class: 'flex items-center px-1 eyeicon w-8' },
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

let submitButton = cEl('button', { type: 'submit', class: 'py-3 px-8 bg-blue-900 color2 rounded-lg font-bold', textContent: 'Create account' });

const userData = {
 role: "affiliate",
 currency: 'USD'
};

let verifiedEmail;

function handleSubmit(e) {
 e.preventDefault();

 let { fullName, email, confEmail, password } = form;
 email = email.value;
 password = password.value;
 fullName = fullName.value;
 
 if (fullName.split(' ') < 2) return alert('Invalid Full name');
 
 if (email !== confEmail.value) {
  emailNotMatch.classList.remove('hidden');
  let emailNotMatchInput = emailNotMatch.previousElementSibling.lastElementChild;
  emailNotMatchInput.addEventListener('blur', () => emailNotMatch.classList.add('hidden'), { once: true });
  return;
 }
 
 let [firstName, ...rest] = fullName.split(' ');
 
 submitButton.innerHTML = '<span class="loader"></span>';
 let cover = cEl('div', { class: 'form-cover rounded-lg' });
 form.append(cover);

 let done = {};

 async function addUser() {
  try {
   let result;

   if (!done.createdAccount) {
    result = await createUserWithEmailAndPassword(auth, email, password);
    done.createdAccount = true;
   }

   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;

   if (!done.updatedProfile) {
    await updateProfile(auth.currentUser, { displayName: fullName });
    done.updatedProfile = true;
   }

   await setDoc(doc(db, 'users', result.user.uid),
    Object.assign(userData, {
     user_id: result.user.uid,
     firstName,
     lastName: rest.join(' '),
     fullName,
     registration_date: Date.now(),
     email,
    })
   );

   location.href = params.get('redirect') ? decodeURIComponent(params.get('page')) : '/SwiftEarn/overview.html';
  } catch (error) {
   cover.remove();
   if (error.code == 'auth/email-already-in-use') {
    submitButton.innerHTML = 'Create account';
    emailInUse.classList.remove('hidden');
    let emailInUseInput = emailInUse.previousElementSibling.lastElementChild;
    emailInUseInput.addEventListener('blur', () => emailInUse.classList.add('hidden'), { once: true })
   } else if (error.code == 'auth/network-request-failed') {
    setTimeout(addUser, 5000);
   }
   console.log(error);
  }
 }

 // If verifiedEmail is truthy, email has been verified successfully but there was an error creating the user
 if (verifiedEmail !== email) { // if email changes from the input, re-verify email, else createUser
  
  function sendEmail() {
   const verificationCode = String(Math.floor(Math.random() * 9999) + 1000).slice(0, 4);

   emailjs.send("service_af1tg34", "template_ps840sm", {
     user_email: email,
     user_fullname: fullName || '',
     code: verificationCode
    })
    .then(() => verifyOTP(addUser, sendEmail, email, cover, verificationCode))
    .catch(() => {
     cover.remove();
     submitButton.innerHTML = 'Create account';
    });
  }

  sendEmail();
 } else {
  addUser();
 }
}

function signUpWithGoogle() {
 signInWithPopup(auth, google)
 .then(result => {
 // The signed-in user info.
   const user = result.user;
   alert(JSON.stringify(user));
    
   let [firstName, ...rest] = user.displayName.split(' ');
   setDoc(doc(db, 'users', uid),
    Object.assign(userData, {
     user_id: user.uid,
     email: user.email,
     firstName,
     lastName: rest.join(' '),
     fullName: user.displayName,
     registration_date: Date.now()
    })
   )
   .then(() => location.href = params.get('redirect') ? decodeURIComponent(params.get('page')) : '/SwiftEarn/overview.html');

   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
  })
  .catch(e => console.error(e));
}

const form = cEl('form', 
{ class: 'relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto', event: { submit: handleSubmit } },
 cEl('h1', { class: 'text-2xl md:text-4xl font-bold mb-8 leading-normal text-center', textContent: 'GET STARTED' }),
 cEl('div', { class: 'mb-6' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'fullName', textContent: 'Enter full name:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center border bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(userIcon)
   ),
   cEl('input', { type: 'text', name: 'fullName', class: 'border-0 text-sm bg-white outline-0 flex-grow p-3', id: 'fullName', placeholder: 'John Doe', required: true })
  )
 ),
 cEl('div', { class: 'mb-6' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'email', textContent: 'Email address:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(envelope)
   ),
   cEl('input', { type: 'email', name: 'email', class: 'border-0 text-sm bg-white outline-0 flex-grow p-3', id: 'email', placeholder: 'name@yahoo.com', required: true })
  ), emailInUse
 ),
 cEl('div', { class: 'mb-6' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'confEmail', textContent: 'Confirm email address:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(envelope)
   ),
   cEl('input', { type: 'email', name: 'confEmail', class: 'border-0 text-sm bg-white outline-0 flex-grow p-3', id: 'confEmail', placeholder: 'name@yahoo.com', required: true })
  ), emailNotMatch
 ),
 cEl('div', { class: 'mb-6' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'password', textContent: 'Password:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(lockIcon)
   ),
   cEl('input', { class: 'bg-white w-3/4 p-3 text-sm', type: 'password', name: 'password', id: 'password', pattern: '[A-Za-z0-9]{8,35}', placeholder: 'abcABC123#$&', required: true }),
   eyes
  ),
  cEl('small', { class: 'hidden info text-yellow-400 py-1 email-info' },
   svg(infoIcon),
   'Invalid password!'
  )
 ),
 cEl('div', { class: 'mb-4 text-center text-xs' },
  'By clicking on sign-up, you agree to the ',
  cEl('a', { textContent: 'SwiftEarn Terms and Conditions', href: './tos.html', class: "text-green-500 font-bold underline leading-relaxed" }), ' and ',
  cEl('a', { textContent: 'Privacy Policy.', href: './', class: "text-green-500 font-bold underline" })
 ),
 cEl('div', { class: 'text-center' },
  submitButton,
  cEl('p', { class: "py-2 text-xs" },
   'Already have an account. ',
   cEl('a', { href: "/SwiftEarn/login.html", class: "text-green-500 font-bold underline", textContent: 'Login' })
  )
 ),
 cEl('div', { class: 'mt-8 text-center font-special text-md' },
  cEl('hr'),
  cEl('span', { class: 'inline-block px-3 bg-gray-100', style: { transform: 'translateY(-50%)' }, textContent: 'OR' })
 ),
 cEl('div', { class: 'py-5 font-semibold text-md text-gray-500' },
  cEl('a', { href: 'javascript:(void)', class: 'flex items-center py-2 px-3 mb-5 w-full rounded-xl border-2 border-gray-300', event: { click: signUpWithGoogle } },
   svg(googleIcon), 'Continue with Google'
  )
 )
);

myForm.append(form);

const emailService = document.createElement('script');
emailService.async = true;
emailService.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
emailService.addEventListener('load', function(e) {
 emailjs.init("uFRTU9gjM5PBsekhn");
})
document.body.append(emailService);

function verifyOTP(addUser, sendEmail, email, cover, verificationCode) {
 const modal = cEl('dialog');

 // Verification code timeout countdown timer
 const timeout = Date.now() + (60 * 60 * 1000);
 let minutes = cEl('span', { textContent: '59' }),
  seconds = cEl('span', { textContent: '59' });

 let countdown = setInterval(function() {
  let remainingTime = timeout - Date.now();

  if (remainingTime <= 0) {
   clearInterval(countdown);
   modal.remove();
   cover.remove();
  }

  // Display the remaining time
  minutes.textContent = String(Math.floor((remainingTime / (1000 * 60)) % 60)).padStart(0, 2);
  seconds.textContent = String(Math.floor((remainingTime / 1000) % 60)).padStart(0, 3);
 }, 1000);

 // open a dialogue to collect verification code from the user

 let focusIsBackspaceTriggered = false;

 function inputValidation(e) {
  if (e.target.value) {
   e.target.value = e.target.value[0];
   if (e.target.nextElementSibling) e.target.nextElementSibling.focus();
  } else if (e.key === 'Backspace') {
   if (e.target.previousElementSibling) {
    focusIsBackspaceTriggered = true;
    e.target.previousElementSibling.focus();
   }
  }
 }

 modal.empty();
 modal.append(
  cEl('form', {
    class: 'p-4 bg-white text-sm text-center relative',
    event: {
     submit(e) {
      e.preventDefault();
      let data = '';
      iter(new FormData(this), key => data += key[1]);
      if (data == verificationCode) {
       // In case of user creation error, save the verified email, which indicates that the user has verified the email
       verifiedEmail = email;
       modal.close()
       addUser();
      }
     }
    }
   },
   cEl('img', { src: '/SwiftEarn/static/images/inbox1.png', class: 'w-3/5 mx-auto' }),
   cEl('div', { class: 'mt-2' },
    cEl('h2', { textContent: 'OTP Verification', class: 'text-xl mb-1' }),
    cEl('p', { class: 'text-gray-600 leading-relaxed', innerHTML: "We've sent a verification code to: <b>" + email + '</b>' })
   ),
   cEl('div', {
     class: 'p-3 mt-4 flex justify-between text-lg',
     event: {
      focusin(e) {
       if (focusIsBackspaceTriggered) {
        focusIsBackspaceTriggered = false;
        e.target.focus();
        return;
       }

       let inputs = this.children;
       for (let input of inputs) {
        if (!input.value) {
         input.focus();
         break;
        }
       }
      }
     }
    },
    cEl('input', { type: 'number', class: 'border rounded-lg p-2 text-center w-12', name: 'num1', event: { keyup: inputValidation } }),
    cEl('input', { type: 'number', name: 'num2', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation } }),
    cEl('input', { type: 'number', name: 'num3', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation } }),
    cEl('input', { type: 'number', name: 'num4', class: 'border rounded-lg p-2 w-12 text-center', event: { keyup: inputValidation } })
   ),
   cEl('center', {},
    cEl('p', { class: 'mt-2 text-gray-600' },
     text("Didn't get the OTP? "),
     cEl('b', {
      class: "text-green-500 hover:bg-gray-200",
      textContent: 'RESEND OTP',
      event: {
       click: function() {
        clearInterval(countdown);
        modal.remove();
        sendEmail();
       }
      }
     })
    )
   ),
   cEl('button', { class: 'mt-6 mb-3 w-full p-3 rounded-md bg-blue-700 text-gray-50 text-sm font-bold', textContent: 'Verify code' }),
   cEl('p', { class: 'text-gray-600' },
    text('OTP expires in '),
    cEl('b', {}, '00:', minutes, ':', seconds)
   )
  )
 );

 document.body.append(modal);
 modal.showModal();
}