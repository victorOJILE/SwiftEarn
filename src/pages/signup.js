import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import otherAuthOptions from '../components/otherAuthOptions.js';

const firebaseConfig = {
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "swiftearn-e35b4.firebaseapp.com",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1",
};

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore(firebase_app);

const auth = getAuth(firebase_app);

function authWrapper() {
 const formDiv = cEl('div');

 const header = cEl('header', {},
  cEl('nav', { class: 'container mx-auto flex items-center justify-between p-3' },
   cEl('a', { href: './' },
    cEl('img', { src: './static/images/Logo.png', alt: 'SwiftEarn official logo', class: 'w-32' })
   ),
   cEl('a', { href: './blog.html', textContent: 'Blog', class: 'py-2 mx-4 px-4 text-gray-300 hover:text-green-500' })
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
 phoneNumber: '',
 country: '',
 role: "affiliate",
 vendor_id: "",
 photoUrl: "",
 bankName: '',
 bankAccName: '',
 bankAccNo: '',
 affiliateEarning: '0',
 currency: 'USD'
};

function setDocuments(uid) {
 return setDoc(doc(db, 'users', uid),
  Object.assign(userData, {
   _id: user.uid,
   email,
   password,
   firstName: names[0],
   lastName: names.slice(1).join(' '),
   registration_date: Date.now()
  })
 );
}

let verifiedEmail;

function handleSubmit(e) {
 e.preventDefault();

 let { fullName, email, confEmail, password } = form;
 email = email.value;
 password = password.value;
 fullName = fullName.value;

 let names = fullName.split(' ');
 if (names.length < 2) return alert('Invalid Full name');

 if (email !== confEmail.value) {
  emailNotMatch.classList.remove('hidden');
  let emailNotMatchInput = emailNotMatch.previousElementSibling.lastElementChild;
  emailNotMatchInput.addEventListener('blur', () => emailNotMatch.classList.add('hidden'), { once: true });
  return;
 }

 submitButton.innerHTML = '<span class="loader"></span>';
 let cover = cEl('div', { class: 'form-cover rounded-lg' });
 form.append(cover);
 
 let done = {};
 
 async function addUser() {
  try {
   let result;
   
   if(!done.createdAccount) {
    result = await createUserWithEmailAndPassword(auth, email, password);
    done.createdAccount = true;
   }
   
   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
   
   if(!done.updatedProfile) {
    await updateProfile(auth.currentUser, { displayName: `${names[0]} ${names.slice(1).join(' ')}` });
    done.updatedProfile = true;
   }
   
   await setDoc(doc(db, 'users', result.user.uid),
    Object.assign(userData, {
     user_id: result.user.uid,
     firstName: names[0],
     lastName: names.slice(1).join(' '),
     registration_date: Date.now(),
     email,
     aff_id: ''
    })
   );

   location.href = './overview.html';
  } catch (error) {
   cover.remove();
   if (error.code == 'auth/email-already-in-use') {
    submitButton.innerHTML = 'Create account';
    emailInUse.classList.remove('hidden');
    let emailInUseInput = emailInUse.previousElementSibling.lastElementChild;
    emailInUseInput.addEventListener('blur', () => emailInUse.classList.add('hidden'), { once: true })
   } else if(error.code == 'auth/network-request-failed') {
    setTimeout(addUser, 1000);
   }
   console.log(error);
  }
 }

 // If verifiedEmail is truthy, email has been verified successfully but there was an error creating the user
 if (verifiedEmail !== email) { // if email changes from the input, re-verify email, else createUser
  const modal = cEl('dialog');

  function sendEmail() {
   const verificationCode = String(Math.floor(Math.random() * 9999) + 1000).slice(0, 4);

   emailjs.send("service_af1tg34", "template_ps840sm", {
     user_email: email,
     user_fullname: fullName || '',
     code: verificationCode
    })
    .then(function(response) {
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
         submit: function(e) {
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
       cEl('img', { src: './static/images/inbox1.png', class: 'w-3/5 mx-auto' }),
       cEl('div', { class: 'mt-2' },
        cEl('h1', { textContent: verificationCode }),
        cEl('h2', { textContent: 'OTP Verification', class: 'text-xl mb-1' }),
        cEl('p', { class: 'text-gray-600 leading-relaxed', innerHTML: "We've sent a verification code to: <b>" + 'ojilevictor11@gmail.com' + '</b>' })
       ),
       cEl('div', {
         class: 'p-3 mt-4 flex justify-between text-lg',
         event: {
          focusin: function(e) {
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
            sendEmail();
           }
          }
         })
        )
       ),
       cEl('button', { class: 'mt-6 mb-3 w-full p-3 rounded-md bg-blue-700 text-gray-50 text-sm font-bold', textContent: 'Verify code' }),
       cEl('p', { class: 'text-gray-600' },
        text('OTP expires in '),
        cEl('b', {},
         text('00:'),
         minutes,
         text(':'),
         seconds
        )
       )
      )
     );

     modal.open || document.body.append(modal);
     modal.open || modal.showModal();
    })
    .catch(function(err) {
     cover.remove();
    });
  }

  sendEmail();
 } else {
  addUser();
 }
}

const form = cEl('form', { class: 'relative bg-gray-100 rounded-md py-6 px-8 w-11/12 max-w-sm mx-auto', event: { submit: handleSubmit } },
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
   cEl('input', { type: 'email', name: 'email', class: 'border-0 text-sm bg-white outline-0 flex-grow p-3', id: 'email', placeholder: 'name@yahoo.com', pattern: '\S+@\S+\.\S+', required: true })
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
 cEl('div', { class: 'mb-12' },
  cEl('label', { class: 'font-bold text-sm', htmlFor: 'password', textContent: 'Password:' }),
  cEl('br'),
  cEl('div', { class: 'flex items-center bg-white mt-1' },
   cEl('div', { class: 'w-10 pl-2 border-r-2' },
    svg(lockIcon)
   ),
   cEl('input', { class: 'bg-white w-3/4 p-3 text-sm', type: 'password', name: 'password', id: 'password', pattern: '[A-Za-z0-9#$&@%]{8,35}', placeholder: 'abcABC123#$&', required: true }),
   eyes
  ),
  cEl('small', { class: 'hidden info text-yellow-400 py-1 email-info' },
   svg(infoIcon),
   document.createTextNode('Invalid password!')
  )
 ),
 cEl('div', { class: 'text-center' },
  submitButton,
  cEl('p', { class: "py-2", style: { fontSize: "0.7rem" } },
   document.createTextNode('Already have an account.'),
   cEl('a', { href: "./login.html", class: "text-green-500 font-bold underline", textContent: 'Login' })
  )
 ),
 cEl('div', { class: 'mt-8 mb-4 text-center font-special text-md' },
  cEl('hr'),
  cEl('span', { class: 'inline-block px-3 bg-gray-100', style: { transform: 'translateY(-50%)' }, textContent: 'OR' })
 ),
 otherAuthOptions(auth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, setDocuments)
);

myForm.append(form);

const emailService = document.createElement('script');
emailService.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
emailService.addEventListener('load', function(e) {
 emailjs.init("uFRTU9gjM5PBsekhn");
})
document.body.append(emailService);