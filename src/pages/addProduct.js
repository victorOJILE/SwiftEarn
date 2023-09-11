import { unsubscribe } from '../auth.js';
import Header from '../header.js';
import AddProductComp from '../components/addProductComp.js';

unsubscribe.authenticate = function(uid) {
 Header('Add Product', uid).append(AddProductComp(uid));
}