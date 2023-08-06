import Header from '../header.js';
import AddProductComp from '../components/addProductComp.js';
import { unsubscribe } from '../auth.js';

unsubscribe.authenticate = function(type, user) {
 if (type) {
  let myPage = Header('Add Product', user.uid);
  myPage.append(AddProductComp(user.uid));
 } else {
  location.href = '/login.html?redirect=true&page=' + new URL(location.href).pathname;
 }
}
