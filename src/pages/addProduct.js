import Header from '../header.js';
import AddProductComp from '../components/addProductComp.js';
//import { unsubscribe } from '../auth.js';

/*
unsubscribe.then(res => {
 if(res === 0) alert('Your session has expired!');
 if(res === 0 || res === 1) {
  location.href = '/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
 if(res === 2) {*/
let myPage = Header('My Products', /* res.uid*/ );
myPage.append(AddProductComp(/*res.uid*/ ));
/*
 }
});*/
