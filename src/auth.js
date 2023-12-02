import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth, signOut, sendPasswordResetEmail, onAuthStateChanged, updateProfile, updateEmail, updatePassword } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';

const firebase_app = initializeApp({
 apiKey: "AIzaSyCF-PBbVOapUFD52kVTwWaLWg5Rbzh5E88",
 authDomain: "victorojile.github.io",
 projectId: "swiftearn-e35b4",
 storageBucket: "swiftearn-e35b4.appspot.com",
 messagingSenderId: "25885277320",
 appId: "1:25885277320:web:d3af5cdb62625cd095b33d",
 measurementId: "G-7Q7DF5L5X1"
});

const auth = getAuth(firebase_app);

let Link;

onAuthStateChanged(auth, user => {
 try {
  if (user) {
   if (!user.reloadUserInfo) {
    // User is authenticated but offline
    throw new Error('');
   }

   let cookie = document.cookie,
    expired = false;

   if (cookie) {
    cookie = Object.fromEntries(cookie.split(';').map(e => e.split('=')));
    if (!cookie.lastRefresh) expired = true;
   } else {
    expired = true;
   }

   if (expired) {
    callSignout(undefined, true, '/SwiftEarn/login.html?page=' + new URL(location.href).pathname);
    
    return;
   }

   // User is authenticated

   document.cookie = `lastRefresh=${Date.now()};max-age=14400`;
   
   LinkMain(user.uid)
   .then(func => {
    Link = func;
    let pathname = new URL(location.href).pathname;
    
    func(undefined, { name: loadPage, path: `../pages${pathname.slice(0, -4)}js`, pathname: pathname.slice(1) });
   });
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

const swfHistory = [];

async function LinkMain(uid) {
 const header = await import('./header.js');
 let currentPage;
 
 return async function(e, config, searchParams) {
  if(!config.path || currentPage == config.path) return true;
  
  if(e) e.preventDefault();
  
  const dom = header.default(config.name, uid);
  document.body.style.overflow = 'auto';
  !config.notToHistory && swfHistory.push(config);
  
  currentPage && !config.notToHistory && history.pushState({ page: swfHistory.length }, config.name, "/" + config.pathname);
  
  currentPage = config.path;
  
  try {
   const page = await import(config.path);
   dom.appendChild(page.default(uid, searchParams));
  } catch (e) {
   console.log(e);
  }
 }
}

window.addEventListener("popstate", (e) => {
 swfHistory.pop();
 if (swfHistory.length) {
  let prevPage = swfHistory[swfHistory.length -1];
  
  Link(undefined, {
   name: prevPage.name,
   path: prevPage.path,
   pathname: prevPage.pathname,
   notToHistory: true
  });
 }
});

function callSignout(e, callAlert, url = '/SwiftEarn/login.html') {
 signOut(auth).then(() => {
  callAlert && alert('Your session has expired! Please Login.');
  location.href = url;
 });
}

function passwordReset() {
 sendPasswordResetEmail(auth, auth.currentUser.email)
 .then(() => {
  alert('A password reset url has been sent to your email.');
  location.href = '/SwiftEarn/login.html';
 });
}

export { firebase_app, callSignout, auth, passwordReset, updateProfile, updateEmail, updatePassword, Link };