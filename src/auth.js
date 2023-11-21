import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, signOut, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';

const firebase_app = initializeApp({
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "swiftearn-e35b4.firebaseapp.com",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1"
});

const auth = getAuth(firebase_app);

function callSignout() {
 return signOut(auth);
}

const unsubscribe = {};
//setTimeout(() => unsubscribe.authenticate('f'), 3000)


onAuthStateChanged(auth, user => {
 try {
  if (user) {
   if (!user.reloadUserInfo) {
    // User is authenticated but offline
    throw new Error('');
   }
   
   let cookie = document.cookie, expired = false;
   
   if (cookie) {
    cookie = Object.fromEntries(cookie.split(';').map(e => e.split('=')));
    if(!cookie.lastRefresh) {
     expired = true;
    }
   } else {
    expired = true;
   }

   if (expired) {
    callSignout()
     .then(() => {
      alert('Your session has expired! Please Login.');
      
      location.href = '/SwiftEarn/login.html?page=' + new URL(location.href).pathname;
     })
     .catch(e => console.error(e));
     return;
   }

   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
   
   // TODO: getAdditionalUserInfo and save to session storage then use to set profileIcon name (e.g OJ) in header.js
   
   console.log(user);
   // User is authenticated
   return unsubscribe.authenticate(user.uid);
  } else {
   // User is not authenticated
   
   location.href = '/SwiftEarn/login.html?page=' + new URL(location.href).pathname;
  }
 } catch (e) {
  document.body.innerHTML = '';
  document.body.append(cEl('div', { class: 'py-64 px-12 text-center text-red-700', textContent: 'Error loading page.' }));
  console.error(e)
 }
});

export { firebase_app, callSignout, auth, unsubscribe, updateProfile, updateEmail, updatePassword };