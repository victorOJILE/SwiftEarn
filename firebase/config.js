import { initializeApp } from 'firebase/app';

const firebase_app = initializeApp({
 apiKey: process.env.FB_APIKEY,
 authDomain: process.env.FB_AUTHDOMAIN,
 projectId: process.env.FB_PROJECTID,
 storageBucket: process.env.FB_STORAGEBUCKET,
 messagingSenderId: process.env.FB_MESSAGINGSENDERID,
 appId: process.env.FB_APPID,
 measurementId: process.env.FB_MEASUREMENTID
});

export default firebase_app;