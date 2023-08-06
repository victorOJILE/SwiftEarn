import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { onAuthStateChanged, signOut, getAuth } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';

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

const auth = getAuth(firebase_app);

class Unsubscribe {
 run(type, user) {
  this.authenticate(type, user);
 }
}

const unsubscribe = new Unsubscribe();

onAuthStateChanged(auth, user => {
 try {
  if (user) {
   if (!user.reloadUserInfo) {
    // User is authenticated but offline
    throw new Error('');
   }
   
   const cookie = document.cookie;
   console.log(cookie);
   //const time = cookie.split(';').find(e => e.includes('uid='+ user.uid));
   
   
   let hrs = Math.floor(Math.floor((new Date().getTime() - user.reloadUserInfo.lastLoginAt) / 1000) / 60 / 60);
 
   if (hrs >= 2) {
    signOut(auth)
     .then(() => {
      // User is authenticated but login has expired
      alert('Your session has expired! Please Login.')
      return unsubscribe.run(false);
     })
     .catch(e => console.error(e));
   }
   
   // User is authenticated
   return unsubscribe.run(true, user);
   
  } else {
   // User is not authenticated
   return unsubscribe.run(false);
  }
 } catch (e) {
  document.body.innerHTML = '';
  console.error(e);
  document.body.append(cEl('div', { class: 'py-64 px-12 text-center text-red-700', textContent: 'Error loading page. Please check your internet connection and try again!' }));
 }
});


export { firebase_app, unsubscribe };