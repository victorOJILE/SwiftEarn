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

const pages = {
	'/overview.html': {
		link: './pages/overview.js',
		name: 'Overview'
	},
	'/marketplace.html': {
		link: './pages/marketplace.js',
		name: 'Marketplace'
	},
	'/vendors.html': {
		link: './pages/vendors.js',
		name: 'Vendors'
	},
	'/vendors/signup.html': {
		link: './pages/vendorSignup.js',
		name: 'Vendors'
	},
	'/vendors/info.html': {
		link: './pages/vendorInfo.js',
		name: 'Vendors'
	},
	'/product/product.html': {
		link: './pages/product.js',
		name: 'Marketplace'
	},
	'/product/addProduct.html': {
		link: './pages/addProduct.js',
		name: 'Add Product'
	},
	'/product/products.html': {
		link: './pages/manageProducts.js',
		name: 'Manage products'
	},
	'/withdrawal.html': {
		link: './pages/withdrawal.js',
		name: 'Withdrawal'
	},
	'/profile.html': {
		link: './pages/profile.js',
		name: 'Settings'
	}
}

const unsubscribe = onAuthStateChanged(auth, user => {
 try {
  if (user) {
   if (!user.reloadUserInfo) {
    // User is authenticated but offline
    throw new Error('');
   }
 
   let hrs = Math.floor(Math.floor((new Date().getTime() - user.reloadUserInfo.lastLoginAt) / 1000) / 60 / 60);
 
   if (hrs >= 2) {
    signOut(auth)
     .then(() => {
      // User is authenticated but login has expired
      return 0;
     })
     .catch(e => console.error(e));
   }
   
   // User is authenticated
   return 2;
   
  } else {
   // User is not authenticated
   return 1;
  }
 } catch (e) {
  document.body.innerHTML = '';
  console.error(e);
  document.body.append(cEl('div', { class: 'py-64 px-12 text-center text-red-700', textContent: 'Error loading page. Please check your internet connection and try again!' }));
 }
});

export { firebase_app, unsubscribe };