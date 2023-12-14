import { auth } from '../firebase/auth';
import { db, doc, addDoc, collection } from '../firebase/firestore';

export default function Membership({ uid, comp }) {
	
	async function subscribe(e) {
		e.target.textContent = "Please wait...";
		
		try {
			if(!sessionStorage.getItem('swfsub')) {
				let docRef = await addDoc(doc(collection(db, 'transactions')), {
					code: 'subscription',
					timeCreated: Date.now(),
					user_id: uid,
					status: 'Pending'
				});
				sessionStorage.setItem('swfsub', docRef.id);
			}
			
			await fetch('payment_init.js', {
	   method: 'post',
	   headers: {
	    'Content-Type': 'application/json'
	   },
	   body: JSON.stringify({
	    email: auth.currentUser.email,
	    amount: 7, // $7 for membership subscription
	    detail: 'Affiliate subscription',
	    code: 'subscription'
	   }),
	   redirect: 'follow',
	   credentials: 'same-origin'
	  });
			
		} catch(err) {
   e.target.textContent = 'Get Started';
  };
	}
	
	return (
		<main className="p-3 md:p-6 bg-9 color2 overflow-auto md:h-screen container mx-auto text-center">
			<h1 className="text-2xl">Choose your right plan!</h1>
			<ul className="my-6 md:my-10 flex flex-wrap">
				<li className="w-full md:w-1/2 border rounded-md px-3 py-6">
					<h3 className="text-yellow-600 text-lg font-bold">Affiliate plan</h3>
					<p className="text-sm text-gray-500">Get complete access to our affiliate services</p>
					<div className="my-6">
						<div className="font-bold text-4xl" dangerouslyInsertHTML={ '&#128178;'}>
							<span className="inline-block transform -translate-x-2">7</span>
						</div>
						<small className="text-gray-500 text-base">/365 days</small>
					</div>
					<button type="button" className="bg-yellow-600 text-white p-3 mb-6 rounded-md text-base font-semibold text-center w-4/5 max-w-lg cursor-pointer" onClick={subscribe}>Get Started</button>
				</li>
			</ul>
		</main>
	);
}